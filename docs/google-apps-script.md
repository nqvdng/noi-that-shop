# Nhận yêu cầu báo giá vào Google Sheet và email

Làm một lần, mất khoảng 15 phút, hoàn toàn miễn phí với tài khoản Google thường. Không cần lập trình: chỉ dán mã và bấm nút.

Kết quả: khách điền biểu mẫu ở `bao-gia.html`, mỗi yêu cầu thành một dòng trong Google Sheet của bạn và bạn nhận một email thông báo.

Nếu chưa làm gì, biểu mẫu vẫn dùng được: khách bấm gửi sẽ nhận nội dung soạn sẵn để gửi qua Zalo hoặc email.

## Bước 1. Tạo Google Sheet

1. Vào https://sheets.google.com, bấm **Trống** để tạo bảng mới.
2. Đặt tên là `Yeu cau bao gia Moc Nha`.
3. Không cần tạo cột. Mã bên dưới tự tạo hàng tiêu đề ở lần nhận đầu tiên.
4. Chỉ chia sẻ bảng cho người cần xem. Bảng chứa tên và số điện thoại của khách.

## Bước 2. Mở Apps Script và dán mã

1. Trong bảng vừa tạo, vào menu **Tiện ích mở rộng** (Extensions) > **Apps Script**.
2. Xóa hết mã có sẵn trong ô soạn thảo.
3. Dán toàn bộ mã dưới đây.
4. Bản này không gửi email, nên không phải sửa gì thêm.
5. Bấm biểu tượng đĩa mềm (Lưu), đặt tên dự án là `Nhan yeu cau`.

```javascript
// Nhận yêu cầu báo giá từ biểu mẫu bao-gia.html, ghi vào Google Sheet và gửi email thông báo.
// Không để mật khẩu hay khóa bí mật trong mã này.

const TEN_TRANG = "Yeu cau";               // tên trang tính sẽ tạo
const TOI_DA_KY_TU = 1000;                 // cắt bớt nội dung quá dài
const GIAY_TOI_THIEU = 3;                  // gửi nhanh hơn thế này coi là máy tự động
const PHUT_CHONG_TRUNG = 10;               // cùng số điện thoại trong khoảng này bị coi là trùng

const COT = ["Thời gian", "Họ tên", "Điện thoại", "Email", "Loại công trình", "Diện tích (m2)",
             "Ngân sách", "Nhu cầu", "Sản phẩm", "Vật liệu", "Ghi chú", "Trạng thái"];

function doPost(e) {
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(10000);
    const p = (e && e.parameter) || {};

    // 1. Ô bẫy thư rác phải để trống, và không được gửi quá nhanh
    if (p.website) return traVe({ ok: true });
    if (!(Number(p.elapsed) >= GIAY_TOI_THIEU)) return traVe({ ok: false, error: "nhanh" });

    // 2. Kiểm tra tối thiểu
    const ten = cat(p.name, 80), dt = cat(p.phone, 20);
    if (!ten || !/^(\+?84|0)\d{9}$/.test(dt)) return traVe({ ok: false, error: "thieu" });

    // 3. Chống trùng theo số điện thoại
    const cache = CacheService.getScriptCache();
    if (cache.get("sdt_" + dt)) return traVe({ ok: true });
    cache.put("sdt_" + dt, "1", PHUT_CHONG_TRUNG * 60);

    // 4. Ghi vào Sheet
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sh = ss.getSheetByName(TEN_TRANG);
    if (!sh) {
      sh = ss.insertSheet(TEN_TRANG);
      sh.appendRow(COT);
      sh.setFrozenRows(1);
      sh.getRange(1, 1, 1, COT.length).setFontWeight("bold");
    }
    const hang = [
      new Date(), ten, "'" + dt, cat(p.email, 120), cat(p.type, 60), cat(p.area, 10),
      cat(p.budget, 60), cat(p.needs, 300), cat(p.products, TOI_DA_KY_TU), cat(p.materials, 300),
      cat(p.note, TOI_DA_KY_TU), "Mới"
    ];
    sh.appendRow(hang);

    // 5. Không gửi email: tránh xin quyền Gmail, một số tài khoản Google chặn quyền này.
    //    Xem dòng mới bằng cách mở bảng tính (xem phần "Nhận thông báo" bên dưới).

    return traVe({ ok: true });
  } catch (err) {
    return traVe({ ok: false, error: "loi" });
  } finally {
    lock.releaseLock();
  }
}

// Mở địa chỉ Web app bằng trình duyệt sẽ thấy dòng này, dùng để kiểm tra đã đăng thành công chưa.
function doGet() {
  return traVe({ ok: true, message: "Biểu mẫu đang hoạt động" });
}

function cat(v, n) { return String(v == null ? "" : v).trim().substring(0, n); }
function traVe(o) {
  return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON);
}

// Chạy hàm này một lần trong Apps Script để cấp quyền và thử ghi một dòng mẫu.
function thuNghiem() {
  const r = doPost({ parameter: { name: "Thử nghiệm", phone: "0900000000", type: "Căn hộ", elapsed: "10", note: "Dòng thử, xóa được" } });
  Logger.log(r.getContent());
}
```

## Bước 3. Cấp quyền và thử

1. Ở thanh trên của Apps Script, chọn hàm **thuNghiem** trong danh sách thả xuống, bấm **Chạy** (Run).
2. Google hỏi quyền: bấm **Xem lại quyền**, chọn tài khoản của bạn.
3. Nếu hiện cảnh báo "Google chưa xác minh ứng dụng này", bấm **Nâng cao** > **Đi tới Nhan yeu cau (không an toàn)** > **Cho phép**. Đây là mã của chính bạn nên yên tâm.
4. Mở lại Google Sheet: phải có thêm trang `Yeu cau` với một dòng thử. Hộp thư của bạn nhận một email. Xóa dòng thử.

Nếu hàm `thuNghiem` báo lỗi hoặc không có dòng nào, kiểm tra lại bước dán mã (thiếu hoặc thừa dấu ngoặc).

## Bước 4. Đăng thành Web app

1. Bấm **Triển khai** (Deploy) > **Tùy chọn triển khai mới** (New deployment).
2. Bấm bánh răng cạnh "Chọn loại", chọn **Ứng dụng web** (Web app).
3. Điền:
   - **Mô tả:** `Bieu mau bao gia`
   - **Thực thi dưới dạng** (Execute as): **Tôi** (Me)
   - **Ai có quyền truy cập** (Who has access): **Bất kỳ ai** (Anyone)
4. Bấm **Triển khai**. Sao chép **URL ứng dụng web**, có dạng `https://script.google.com/macros/s/.../exec`.
5. Dán URL đó vào trình duyệt: phải thấy dòng `{"ok":true,"message":"Biểu mẫu đang hoạt động"}`.

## Bước 5. Gắn vào website

1. Mở `config.js` trên GitHub (bấm biểu tượng bút chì).
2. Dán URL vào giữa hai dấu ngoặc kép:
   ```
   FORM_ENDPOINT: "https://script.google.com/macros/s/.../exec",
   ```
3. Bấm **Commit changes**. Sau 1 đến 2 phút trang cập nhật.
4. Mở `bao-gia.html`, điền thử bằng số điện thoại của bạn. Phải thấy dòng mới trong Sheet và email thông báo.

## Sau này

- **Sửa mã Apps Script:** sau mỗi lần sửa phải bấm **Triển khai** > **Quản lý bản triển khai** > bút chì > **Phiên bản mới** > **Triển khai**. Nếu chỉ lưu mà không triển khai lại, trang vẫn chạy mã cũ. URL không đổi.
- **Nhận thông báo khi có yêu cầu mới:** trong bảng tính chọn **Công cụ > Quy tắc thông báo**, đặt "Có bất kỳ thay đổi nào được thực hiện" và "Gửi email cho tôi ngay lập tức". Chưa kiểm chứng quy tắc này có chạy với dòng do script ghi hay không, bạn nên gửi thử một yêu cầu để xem. Nếu không có email, bạn mở bảng tính xem dòng mới, hoặc cài ứng dụng Google Sheets trên điện thoại.
- **Cột Trạng thái:** mỗi yêu cầu mới có chữ `Mới`. Bạn đổi tay thành `Đã gọi`, `Đã báo giá`... để theo dõi.
- **Thư rác:** biểu mẫu đã có ô bẫy ẩn, giới hạn gửi lại trên trình duyệt (config.js) và chống trùng theo số điện thoại. Nếu vẫn bị gửi bậy, nhờ người hỗ trợ thêm mã xác nhận hoặc đổi sang URL mới (Tạo triển khai mới rồi đổi `FORM_ENDPOINT`).
- **Hạn mức:** tài khoản Google thường gửi được khoảng 100 email mỗi ngày bằng Apps Script. Dư dùng cho một cửa hàng nhỏ.

## Lưu ý quyền riêng tư

- Google Sheet chứa tên, số điện thoại, đôi khi cả email của khách. Chỉ chia sẻ cho người cần dùng.
- Biểu mẫu có dòng cho khách biết thông tin dùng để liên hệ và có thể yêu cầu xóa. Khi khách yêu cầu, xóa dòng của họ trong Sheet.
- URL Web app nằm trong `config.js` nên công khai: ai biết URL đều gửi được dữ liệu vào Sheet, nhưng không đọc được dữ liệu cũ. Không đưa mật khẩu hay khóa nào khác vào repo.
- Nếu thu thập dữ liệu khách ở quy mô thật, hãy hỏi người am hiểu pháp lý về quy định bảo vệ dữ liệu cá nhân. Mình không phải luật sư.
