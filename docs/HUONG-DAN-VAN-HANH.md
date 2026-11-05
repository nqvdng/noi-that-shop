# Hướng dẫn tự chỉnh sửa và vận hành website

Dành cho người không lập trình. Làm được hoàn toàn miễn phí, không cần Cloud session credits.

## 1. Website này gồm những gì

| Tệp | Chứa gì | Khi nào sửa |
|---|---|---|
| `index.html` | Trang chủ: giới thiệu, công trình, bản vẽ, tin tức, liên hệ | Đổi chữ, số điện thoại, bài tin tức |
| `products.js` | Danh sách sản phẩm: tên, giá, kích thước, mô tả | Thêm, sửa, xóa sản phẩm, đổi giá |
| `vat-lieu.html` | Trang vật liệu và phụ kiện | Sửa thông tin vật liệu |
| `styles.css` | Màu sắc, chữ, bố cục | Hiếm khi |
| `assets/du-an/` | Ảnh công trình | Thay ảnh |
| `assets/ban-ve/` | Ảnh bản vẽ, phối cảnh | Thay ảnh |
| `CLAUDE.md`, `docs/` | Ghi chú cho người và AI làm tiếp | Không sửa nếu không cần |

Mọi thứ nằm trong repo GitHub `nqvdng/noi-that-shop`. Sửa tệp trên GitHub thì website tự cập nhật (xem mục 5).

## 2. Cách sửa không cần cài phần mềm

**Sửa một tệp:**
1. Vào repo, bấm tên tệp cần sửa.
2. Bấm biểu tượng **bút chì** (Edit this file) ở góc phải.
3. Sửa nội dung.
4. Bấm **Commit changes** (nút xanh), bấm **Commit changes** lần nữa. Xong.

**Soạn thảo dễ hơn:** ở trang repo, nhấn phím **`.`** (dấu chấm). GitHub mở trình soạn thảo trong trình duyệt, có tìm kiếm trong toàn bộ tệp (Ctrl+Shift+F hoặc Cmd+Shift+F), rất tiện để tìm số điện thoại hay tên sản phẩm. Sửa xong, mở mục **Source Control** bên trái, gõ một dòng mô tả rồi bấm **Commit & Push**.

**Thêm ảnh:**
1. Vào thư mục đích (ví dụ `assets/du-an`).
2. Bấm **Add file > Upload files**, kéo ảnh vào, bấm **Commit changes**.
3. Ảnh nên có chiều rộng khoảng 1000 đến 1400 px, dung lượng dưới 300 KB, định dạng `.jpg`. Tên tệp không dấu, không khoảng trắng.
4. Xóa ảnh cũ: mở tệp ảnh, bấm biểu tượng thùng rác.

**Xóa tệp hoặc hoàn tác nhầm lẫn:** mọi thay đổi đều lưu lịch sử. Vào tab **Commits**, bấm vào lần sửa sai, bấm **Revert** để quay về như cũ.

## 3. Việc thường làm

### Đổi số điện thoại, email, địa chỉ
Tìm trong `index.html` khối `id="lien-he"` rồi sửa chữ trực tiếp. Liên kết Zalo có dạng `https://zalo.me/84905006046` (số điện thoại bỏ số 0 đầu, thêm 84). Tìm cụm `zalo.me` trong `index.html` và `vat-lieu.html` để đổi ở cả hai nơi.

### Thêm một sản phẩm
Mở `products.js`, chép nguyên một dòng sản phẩm có sẵn, dán xuống dưới cùng của danh sách (trước dấu `];`), nhớ có dấu phẩy sau dòng trước, rồi sửa nội dung:

```
{id:16,n:"Tên sản phẩm",room:"Phòng khách",kind:"table",mat:"Gỗ sồi",w:"#6F7F66",wood:"#B58B5A",price:5200000,dim:"900 x 900 x 420 mm",d:"Mô tả ngắn, một hai câu."}
```

| Trường | Ý nghĩa |
|---|---|
| `id` | Số riêng cho mỗi sản phẩm, không trùng, tăng dần |
| `n` | Tên hiển thị |
| `room` | Phòng: `Phòng khách`, `Phòng ngủ`, `Phòng ăn`, `Văn phòng`, `Sân vườn`, `Xưởng` |
| `kind` | Kiểu hình minh họa: `sofa`, `chair`, `table`, `bed`, `cabinet`, `desk`, `lamp`, `shelf` |
| `mat` | Vật liệu chính (để lọc) |
| `w` | Màu phần bọc hoặc phụ (mã màu `#RRGGBB`) |
| `wood` | Màu gỗ (mã màu `#RRGGBB`) |
| `price` | Giá bằng số, không dấu chấm, ví dụ `5200000` |
| `dim` | Kích thước ghi chữ |
| `d` | Mô tả ngắn |

Lỗi hay gặp: thiếu dấu phẩy giữa hai sản phẩm, thiếu dấu ngoặc kép, hoặc dùng ngoặc kép bên trong mô tả. Nếu website mất hết sản phẩm sau khi sửa thì gần như chắc chắn là lỗi dấu, hãy quay về bản trước (mục 2).

Nếu dùng một giá trị `room` hoặc `mat` mới mà chưa có trong bộ lọc, mở `index.html`, tìm dòng `var rooms=` và `var mats=` rồi thêm tên mới vào.

### Đổi giá
Trong `products.js`, tìm tên sản phẩm, sửa số sau `price:`.

### Đổi ảnh công trình
Tải ảnh mới vào `assets/du-an/`. Trong `index.html`, tìm `var shots=`, mỗi dòng gồm tên tệp (không có `.jpg`) và chú thích. Sửa cho khớp tên ảnh bạn tải lên.

### Viết bài tin tức mới
Mở `index.html`, tìm khối `id="news"`. Sao chép cả khối tiêu đề (`<h3>`) và đoạn (`<p>`) làm mẫu. Muốn có nhiều bài, nhờ Claude làm trang "Tin tức" riêng (xem mục 7).

### Sửa thông tin vật liệu
Mở `vat-lieu.html`, tìm `var M=[`. Mỗi dòng là một vật liệu với các trường: `n` (tên), `d` (mô tả), `use` (dùng cho), `up` (ưu điểm), `dn` (lưu ý), `p` (mức giá từ 1 đến 4, phụ kiện để 0), `c` (màu mẫu).

## 4. Xem thử trước khi đăng (không bắt buộc)

Tải toàn bộ repo: **Code > Download ZIP**, giải nén, bấm đúp `index.html` để mở trong trình duyệt. Muốn chạy đầy đủ như trang thật, mở Terminal trong thư mục đó và chạy `python3 -m http.server 8000`, rồi vào `http://localhost:8000`.

## 5. Đăng website lên internet

1. Vào **Settings > Pages**.
2. Mục **Build and deployment**, chọn **Source: GitHub Actions**.
3. Vào tab **Actions**, chạy **Deploy site to GitHub Pages** (bấm **Run workflow**).
4. Địa chỉ trang: `https://nqvdng.github.io/noi-that-shop/`.
5. Từ đó, mỗi lần bạn lưu thay đổi lên nhánh `main`, trang tự cập nhật sau 1 đến 2 phút. Nếu chưa thấy, nhấn Ctrl+Shift+R (Cmd+Shift+R trên Mac) để tải lại.

Trang có lỗi hiển thị sau khi sửa: vào tab **Actions**, xem lần chạy gần nhất. Dấu **X đỏ** là đăng không thành, bấm vào để xem lý do. Dấu **tích xanh** là thành công.

**Lưu ý chi phí và quyền riêng tư:** trang đăng bằng GitHub Pages là **công khai** dù repo ở chế độ riêng tư. Dùng Pages với repo riêng tư cần gói GitHub trả phí. Nếu muốn miễn phí hoàn toàn, có thể chuyển repo sang công khai (kiểm tra kỹ nội dung trước) hoặc dùng dịch vụ đăng trang tĩnh khác như Cloudflare Pages hoặc Netlify; điều kiện và gói miễn phí thay đổi theo thời gian, hãy đọc trang giá hiện hành trước khi chọn.

## 6. Dùng tên miền riêng và liên kết từ website PKK Group

- **Liên kết từ website PKK Group:** thêm một nút hoặc mục menu "Nội thất" trỏ đến địa chỉ trang. Người quản trị website PKK Group làm việc này, bạn chỉ cần đưa họ địa chỉ trang.
- **Tên miền riêng** (ví dụ `noithat.pkkgroup.com.vn`): người quản lý tên miền thêm một bản ghi **CNAME** trỏ đến `nqvdng.github.io`. Sau đó vào **Settings > Pages > Custom domain**, nhập tên miền, bấm Save, và tích **Enforce HTTPS** khi tùy chọn này xuất hiện. Có thể mất vài giờ để có hiệu lực.

## 7. Dùng Claude khi không còn Cloud session credits

Credits chỉ là khuyến mãi. Sau khi hết, vẫn có các cách dùng không cần credits:

- **Chat bình thường trên claude.ai (hạn mức theo gói của bạn):** gửi tệp cần sửa (ví dụ `products.js`) và yêu cầu như "thêm 5 sản phẩm phòng bếp theo mẫu dòng đầu", nhận lại tệp đã sửa, rồi dán vào GitHub theo mục 2. Gửi kèm `CLAUDE.md` để Claude hiểu quy tắc của dự án.
- **Làm trên máy của bạn qua ứng dụng Claude (không dùng credits):** liên kết thư mục website trên máy, nhờ Claude sửa trực tiếp. Phù hợp khi sửa nhiều tệp.
- **Phiên cloud thường trên claude.ai/code:** vẫn dùng được theo hạn mức gói của bạn sau khi hết khuyến mãi.

Luôn yêu cầu Claude chỉ sửa đúng phạm vi bạn nói và cho bạn xem thay đổi trước khi lưu lên `main`.

## 8. Việc nên làm đều đặn

| Khi nào | Việc |
|---|---|
| Mỗi tháng | Rà giá và số điện thoại. Xóa sản phẩm ngừng bán. Thêm ảnh công trình mới. |
| Mỗi quý | Tải bản sao lưu: **Code > Download ZIP** và cất vào ổ cứng. Mở trang trên điện thoại kiểm tra các nút, biểu mẫu, liên kết. |
| Khi có công trình mới | Chọn ảnh đẹp, bao quát, cắt bỏ địa chỉ và gương mặt, rồi thêm vào `assets/du-an/`. |
| Khi nhận được yêu cầu báo giá | Phản hồi trong ngày và lưu lại để biết sản phẩm nào được quan tâm. |

## 9. Điều cần cẩn thận

- **Không đưa mật khẩu, khóa API, số tài khoản, giấy tờ cá nhân lên repo.**
- **Ảnh và bản vẽ của chủ đầu tư:** chỉ đăng khi được đồng ý, và cắt bỏ địa chỉ, tên người.
- **Không chép ảnh, bản vẽ hay văn bản từ tạp chí và sách.** Chỉ tự viết lại ý chính, ghi nguồn ý tưởng.
- **Giá trên trang đang là giả định.** Thay bằng giá thật trước khi chạy quảng bá.
- **Bán hàng trực tuyến:** nếu trang có chức năng đặt hàng và thanh toán, cần thông báo với Bộ Công Thương (online.gov.vn). Hãy hỏi kế toán hoặc đơn vị tư vấn pháp lý, tôi không phải luật sư.
- **Dữ liệu khách hàng từ biểu mẫu:** chỉ chia sẻ Google Sheet cho người cần dùng, và không đăng thông tin khách ra website.

## 10. Khi gặp sự cố

| Hiện tượng | Cách xử lý |
|---|---|
| Trang trắng hoặc mất sản phẩm sau khi sửa | Lỗi dấu phẩy hoặc ngoặc kép. Tab **Commits** > chọn lần sửa gần nhất > **Revert**. |
| Sửa xong nhưng trang chưa đổi | Chờ 2 phút, nhấn Ctrl+Shift+R. Kiểm tra tab **Actions** có tích xanh. |
| Ảnh không hiện | Kiểm tra tên tệp đúng chữ hoa, chữ thường, đúng đuôi `.jpg`, đúng thư mục. |
| Chữ hiển thị phông lạ | Phông chữ tải từ Google Fonts. Khi mạng chặn, trình duyệt dùng phông thay thế, nội dung vẫn đọc được. |
| Không còn nhớ đã sửa gì | Tab **Commits** liệt kê từng thay đổi kèm ngày và người sửa. |
