# Hướng dẫn vận hành website Mộc Nhà Nội Thất

Dành cho người không lập trình. Mọi việc trong tài liệu làm được miễn phí, không cần Cloud session credits.

Website là một bộ tệp tĩnh lưu trên GitHub, repo `nqvdng/noi-that-shop`. Bạn sửa tệp trên GitHub, trang tự cập nhật sau 1 đến 2 phút.

## 1. Tóm tắt một trang

**Làm một lần để trang chạy thật** (mục 2):
1. Gộp ba pull request mới (danh mục, trang chi tiết, biểu mẫu báo giá).
2. Bật GitHub Pages.
3. Nối biểu mẫu báo giá với Google Sheet.
4. Thay các nội dung giả định bằng thông tin thật.
5. Nhờ quản trị website PKK Group đặt liên kết sang trang này.

**Việc hay làm** (mục 3): thêm sản phẩm, đổi giá, thêm ảnh công trình, sửa thông tin liên hệ, viết tin tức.

**Mỗi ngày** (mục 4): mở Google Sheet xem yêu cầu báo giá mới và gọi lại khách.

**Khi sửa nhầm** (mục 10): tab Commits, chọn lần sửa sai, bấm Revert.

## 2. Làm một lần để trang chạy thật

### 2.1. Gộp ba pull request
1. Vào https://github.com/nqvdng/noi-that-shop/pulls.
2. Mở từng pull request: **Mở rộng danh mục lên 41 sản phẩm**, **Trang chi tiết sản phẩm**, **Biểu mẫu nhận yêu cầu báo giá**.
3. Bấm **Merge pull request**, rồi **Confirm merge**. Thứ tự nào cũng được, đã thử gộp cả ba theo nhiều thứ tự và không bị xung đột.
4. Sau khi gộp xong cả ba, trang có: 41 sản phẩm, trang chi tiết riêng cho mỗi sản phẩm, mục "Nhận báo giá" trên thanh menu.

### 2.2. Bật GitHub Pages
1. Vào **Settings > Pages** của repo.
2. Ở **Build and deployment**, chọn **Source: GitHub Actions**.
3. Vào tab **Actions**, chọn **Deploy site to GitHub Pages**, bấm **Run workflow**.
4. Chờ dấu tích xanh. Địa chỉ trang: `https://nqvdng.github.io/noi-that-shop/`.

Lưu ý: trang đăng bằng Pages là **công khai**, kể cả khi repo ở chế độ riêng tư. Dùng Pages với repo riêng tư cần gói GitHub trả phí. Hãy kiểm tra kỹ nội dung (ảnh công trình, số điện thoại, email) trước khi bật.

### 2.3. Nối biểu mẫu báo giá với Google Sheet
Chưa nối thì biểu mẫu vẫn dùng được: khách bấm gửi sẽ nhận nội dung soạn sẵn để gửi qua Zalo hoặc email. Nối thì mỗi yêu cầu thành một dòng trong Google Sheet và bạn nhận email thông báo.

Làm theo từng bước trong `docs/google-apps-script.md` (khoảng 15 phút). Tóm tắt:
1. Tạo Google Sheet.
2. Tiện ích mở rộng > Apps Script, dán mã, sửa dòng `EMAIL_NHAN`.
3. Chạy hàm `thuNghiem` để cấp quyền.
4. Triển khai thành Ứng dụng web (chạy dưới dạng Tôi, ai cũng truy cập được), sao chép URL kết thúc bằng `/exec`.
5. Dán URL vào `config.js`, dòng `FORM_ENDPOINT`, rồi Commit.
6. Mở `bao-gia.html`, điền thử, kiểm tra có dòng mới trong Sheet và email.

### 2.4. Thay nội dung giả định
Những thứ sau đang là nội dung mẫu, thay trước khi chạy quảng bá:

| Nội dung | Ở đâu | Việc cần làm |
|---|---|---|
| Tên cửa hàng "Mộc Nhà" | `index.html`, `san-pham.html`, `bao-gia.html`, `vat-lieu.html` | Đổi sang tên thật (dùng chức năng tìm trong trình soạn thảo GitHub) |
| Giá, kích thước sản phẩm | `products.js` | Thay bằng giá thật |
| Bảo hành, thời gian làm, giao hàng | `product-details.js` | Thay bằng chính sách thật |
| Hình sản phẩm | vẽ bằng SVG trong `products.js` | Thay bằng ảnh thật (xem 3.7) |
| Số Zalo | `index.html`, `vat-lieu.html`, `config.js` | Kiểm tra số còn dùng được |
| Email nhận yêu cầu | `config.js` (dự phòng) và Apps Script | Đổi nếu cần |

### 2.5. Liên kết từ website PKK Group và tên miền riêng
- **Liên kết:** nhờ người quản trị `pkkgroup.com.vn` thêm một nút hoặc mục menu "Nội thất" trỏ tới địa chỉ trang. Bạn chỉ cần đưa họ địa chỉ.
- **Tên miền riêng** (ví dụ `noithat.pkkgroup.com.vn`): người quản lý tên miền thêm bản ghi **CNAME** trỏ tới `nqvdng.github.io`. Sau đó vào **Settings > Pages > Custom domain**, nhập tên miền, Save, tích **Enforce HTTPS** khi có. Có thể mất vài giờ.

## 3. Việc thường làm

### Cách sửa một tệp trên GitHub
1. Vào repo, bấm tên tệp.
2. Bấm biểu tượng **bút chì** (Edit this file).
3. Sửa, bấm **Commit changes**, bấm **Commit changes** lần nữa.

Muốn tìm nhanh trong mọi tệp: ở trang repo nhấn phím **`.`** (dấu chấm), dùng Ctrl+Shift+F (hoặc Cmd+Shift+F trên Mac) để tìm, sửa xong dùng **Source Control > Commit & Push**.

### 3.1. Đổi giá hoặc mô tả sản phẩm
Mở `products.js`, tìm tên sản phẩm, sửa số sau `price:` (không dấu chấm, ví dụ `5200000`) hoặc chữ sau `d:`.

### 3.2. Thêm sản phẩm mới
1. Mở `products.js`, chép một dòng sản phẩm có sẵn, dán xuống dưới cùng của danh sách, trước dấu `];`.
2. Dòng trước đó phải kết thúc bằng dấu phẩy.
3. Sửa nội dung theo mẫu:
```
{id:42,n:"Tên sản phẩm",room:"Phòng khách",kind:"table",mat:"Gỗ sồi",w:"#6F7F66",wood:"#B58B5A",price:5200000,dim:"900 x 900 x 420 mm",d:"Mô tả ngắn, một hai câu."}
```

| Trường | Ý nghĩa |
|---|---|
| `id` | Số riêng, không trùng, tăng dần (số lớn nhất hiện có cộng 1) |
| `n` | Tên hiển thị |
| `room` | Phòng. Đang có: Phòng khách, Phòng ngủ, Phòng ăn, Bếp, Phòng tắm, Văn phòng, Trẻ em, Sân vườn, Xưởng. Gõ phòng mới thì bộ lọc tự thêm |
| `kind` | Kiểu hình vẽ, xem bảng bên dưới |
| `mat` | Vật liệu chính. Gõ vật liệu mới thì bộ lọc tự thêm |
| `w` | Màu phần bọc hoặc phụ, mã `#RRGGBB` |
| `wood` | Màu gỗ hoặc khung, mã `#RRGGBB` |
| `price` | Giá bằng số |
| `dim` | Kích thước ghi chữ |
| `d` | Mô tả ngắn |

Kiểu hình vẽ `kind` hiện có: `sofa`, `chair`, `table`, `bed`, `cabinet`, `desk`, `lamp`, `shelf`, `armchair`, `stool`, `console`, `vanity`, `ldesk`, `shoes`, `sidetable`, `bench`, `bookcase`, `tvunit`, `wardrobe`, `kitchen`, `bathcab`, `bunk`, `kidsbed`.

Lỗi hay gặp: thiếu dấu phẩy giữa hai sản phẩm, thiếu hoặc thừa ngoặc kép, `id` trùng. Trang trống sản phẩm sau khi sửa thường là do lỗi dấu: Revert (mục 10).

Trang chi tiết của sản phẩm mới tự có tại `san-pham.html?id=42`, không cần làm thêm.

Để Google biết trang mới, mở `sitemap.xml`, chép một dòng `<url>...</url>` có sẵn, dán xuống dưới và đổi số `id` (ví dụ `san-pham.html?id=42`).

### 3.3. Sửa thông tin riêng ở trang chi tiết
Mở `product-details.js`:
- `MN_MAT_INFO`: hoàn thiện, bảo quản, các màu gỗ theo từng vật liệu (áp dụng cho mọi sản phẩm cùng vật liệu).
- `MN_DEFAULT_DETAIL`: bảo hành, thời gian làm, giao hàng chung, và các màu vải.
- `MN_DETAILS`: thông tin riêng một sản phẩm theo `id`. Ví dụ thêm dòng:
```
42: { lead: "Làm trong 2 tuần", extra: ["Có thể đặt làm kích thước khác."] },
```

### 3.4. Thêm ảnh công trình
1. Vào `assets/du-an`, bấm **Add file > Upload files**, kéo ảnh vào, Commit.
2. Ảnh nên rộng 1000 đến 1400 px, dưới 300 KB, `.jpg`, tên không dấu và không khoảng trắng. Cắt bỏ địa chỉ, gương mặt, tên người trước khi tải lên.
3. Mở `index.html`, tìm `var shots=`, thêm một dòng mới giống các dòng có sẵn: tên tệp (bỏ `.jpg`) và chú thích.

### 3.5. Đổi thông tin liên hệ
Mở `index.html`, tìm `id="lien-he"` và sửa chữ. Liên kết Zalo có dạng `https://zalo.me/84905006046` (số điện thoại bỏ số 0 đầu, thêm 84). Tìm `zalo.me` để sửa ở cả `index.html`, `vat-lieu.html` và `config.js`. Email nhận yêu cầu dự phòng ở `config.js`.

### 3.6. Viết tin tức, sửa vật liệu
- **Tin tức:** `index.html`, khối `id="news"`. Chép khối tiêu đề và đoạn làm mẫu.
- **Vật liệu:** `vat-lieu.html`, tìm `var M=[`. Mỗi dòng là một vật liệu: `n` tên, `d` mô tả, `use` dùng cho, `up` ưu điểm, `dn` lưu ý, `p` mức giá từ 1 đến 4, `c` màu mẫu.

### 3.7. Thay hình minh họa bằng ảnh thật
Hiện mỗi sản phẩm dùng hình vẽ SVG. Khi có ảnh thật: tải ảnh vào `assets/san-pham/` (tạo thư mục khi tải lên), đặt tên theo mã, ví dụ `mn-042.jpg`. Việc này cần sửa mã để hiển thị ảnh thay cho hình vẽ, nên nhờ Claude làm (xem mục 6) và gửi kèm tệp ảnh.

## 4. Xử lý yêu cầu báo giá mỗi ngày
1. Mở Google Sheet `Yeu cau bao gia Moc Nha`, trang `Yeu cau`. Dòng mới nhất ở dưới cùng, cột Trạng thái là `Mới`.
2. Gọi lại khách trong ngày làm việc. Nếu không gọi được, nhắn Zalo.
3. Đổi cột **Trạng thái** thành `Đã gọi`, `Đã báo giá`, `Đã chốt` hoặc `Không thành` để theo dõi.
4. Cuối tháng, đếm số yêu cầu và sản phẩm được hỏi nhiều để quyết định làm thêm mẫu nào.

Khách có thể yêu cầu xóa thông tin: xóa dòng của họ trong Sheet.

## 5. Kiểm tra sau mỗi lần sửa (2 phút)
Chờ 2 phút rồi mở trang, nhấn Ctrl+Shift+R (Cmd+Shift+R trên Mac) để tải lại:
1. Trang chủ mở bình thường, bộ lọc phòng và vật liệu chạy.
2. Mở một trang chi tiết sản phẩm.
3. Mở trang trên điện thoại, cuộn không bị tràn ngang.
4. Sửa biểu mẫu hoặc `config.js` thì gửi thử một yêu cầu bằng số của bạn.
5. Tab **Actions** có dấu tích xanh. Dấu X đỏ là đăng không thành, bấm vào xem lý do.

## 6. Dùng Claude khi không còn credits
Credits chỉ là khuyến mãi. Sau khi hết vẫn dùng được:
- **Chat thường trên claude.ai:** gửi tệp cần sửa (ví dụ `products.js`) cùng `CLAUDE.md`, yêu cầu "thêm 5 sản phẩm phòng bếp theo mẫu dòng đầu", nhận lại tệp, dán vào GitHub theo mục 3.
- **Làm trên máy bạn qua ứng dụng Claude:** liên kết thư mục website, nhờ Claude sửa trực tiếp, phù hợp khi sửa nhiều tệp. Không dùng credits.
- **Quy tắc cho Claude:** luôn nhờ làm trên nhánh riêng và mở pull request, bạn xem thay đổi rồi mới bấm Merge. `CLAUDE.md` ghi sẵn các quy tắc này.

## 7. Bảo trì đều đặn

| Khi nào | Việc |
|---|---|
| Mỗi tháng | Rà giá, số điện thoại. Xóa sản phẩm ngừng bán. Thêm ảnh công trình mới. Xem Sheet báo giá |
| Mỗi quý | Tải bản sao lưu: **Code > Download ZIP**. Mở trang trên điện thoại kiểm tra nút, biểu mẫu, liên kết. Kiểm tra email nhận thông báo vẫn đến |
| Khi có công trình mới | Chọn ảnh đẹp, bao quát, cắt bỏ địa chỉ và gương mặt rồi thêm vào `assets/du-an/` |

## 8. Điều cần cẩn thận
- **Không đưa mật khẩu, khóa API, số tài khoản, giấy tờ cá nhân lên repo.** URL Apps Script trong `config.js` là công khai, đó là điều bình thường.
- **Ảnh và bản vẽ của chủ đầu tư:** chỉ đăng khi được đồng ý, cắt bỏ địa chỉ và tên người.
- **Không chép ảnh, bản vẽ, văn bản từ tạp chí hay sách.** Chỉ tự viết lại ý chính và ghi nguồn ý tưởng.
- **Giá, bảo hành, thời gian làm hiện là giả định.** Thay bằng số thật trước khi quảng bá.
- **Bán hàng trực tuyến:** nếu trang cho đặt hàng và thanh toán, cần thông báo với Bộ Công Thương (online.gov.vn). Hãy hỏi kế toán hoặc đơn vị tư vấn pháp lý. Tài liệu này không phải tư vấn pháp lý.
- **Dữ liệu khách hàng:** Google Sheet chứa tên và số điện thoại, chỉ chia sẻ cho người cần dùng. Khi thu thập ở quy mô thật, hỏi người am hiểu về quy định bảo vệ dữ liệu cá nhân.

## 9. Xem thử trước khi đăng (không bắt buộc)
Tải repo: **Code > Download ZIP**, giải nén. Bấm đúp `index.html` để xem. Muốn chạy đầy đủ như trang thật (biểu mẫu, trang chi tiết), mở Terminal trong thư mục đó, chạy `python3 -m http.server 8000`, rồi vào `http://localhost:8000`.

## 10. Khi gặp sự cố

| Hiện tượng | Cách xử lý |
|---|---|
| Trang trắng hoặc mất sản phẩm sau khi sửa | Lỗi dấu phẩy hoặc ngoặc kép. Tab **Commits** > chọn lần sửa gần nhất > **Revert** |
| Sửa xong nhưng trang chưa đổi | Chờ 2 phút, nhấn Ctrl+Shift+R. Kiểm tra tab **Actions** có dấu tích xanh |
| Bấm sản phẩm báo "Không tìm thấy sản phẩm" | `id` trong đường dẫn không có trong `products.js`. Kiểm tra `id` của sản phẩm |
| Sản phẩm mới có hình trống | `kind` gõ sai. Dùng đúng một tên trong danh sách ở mục 3.2 |
| Biểu mẫu báo "Chưa gửi được" hoặc Sheet không có dòng mới | Kiểm tra `FORM_ENDPOINT` trong `config.js` đúng URL kết thúc `/exec`. Mở URL đó thử, phải thấy `"ok":true`. Sửa mã Apps Script mà chưa Triển khai lại thì chưa có hiệu lực |
| Không nhận email thông báo | Xem thư mục Spam. Kiểm tra `EMAIL_NHAN` trong Apps Script |
| Bị gửi thư rác vào Sheet | Xem mục "Thư rác" ở `docs/google-apps-script.md` |
| Ảnh không hiện | Kiểm tra tên tệp đúng chữ hoa, chữ thường, đúng đuôi `.jpg`, đúng thư mục |
| Chữ hiển thị phông lạ | Phông tải từ Google Fonts. Khi mạng chặn, trình duyệt dùng phông thay thế, nội dung vẫn đọc được |
| Không nhớ đã sửa gì | Tab **Commits** liệt kê từng thay đổi kèm ngày |

## 11. Bản đồ tệp

| Tệp | Chứa gì |
|---|---|
| `index.html` | Trang chủ: giới thiệu, sản phẩm, công trình, bản vẽ, tin tức, liên hệ |
| `san-pham.html` | Trang chi tiết, đọc `?id=` |
| `bao-gia.html`, `bao-gia.js`, `bao-gia.css` | Biểu mẫu nhận yêu cầu báo giá |
| `config.js` | Cấu hình biểu mẫu: địa chỉ Google Apps Script, Zalo, email, giới hạn gửi lại |
| `vat-lieu.html` | Vật liệu và phụ kiện, chọn mẫu để đặt |
| `products.js` | Danh sách sản phẩm và hàm vẽ hình minh họa |
| `product-details.js` | Thông tin chi tiết: hoàn thiện, bảo quản, bảo hành, màu |
| `styles.css` | Màu sắc, chữ, bố cục dùng chung |
| `assets/du-an/`, `assets/ban-ve/` | Ảnh công trình, ảnh bản vẽ |
| `404.html`, `favicon.svg`, `robots.txt`, `sitemap.xml` | Trang lỗi, biểu tượng, cấu hình và danh sách trang cho công cụ tìm kiếm |
| `.github/workflows/pages.yml` | Tự đăng trang khi có thay đổi trên `main` |
| `CLAUDE.md`, `docs/` | Quy tắc cho người và Claude làm tiếp, các hướng dẫn |
