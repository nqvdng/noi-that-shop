# Hướng dẫn chung cho mọi phiên làm việc trên repo này

Website tĩnh bán nội thất và thi công hoàn thiện (HTML, CSS, JS thuần, không build). Người dùng nói tiếng Việt: mọi chữ trên trang và mọi lời giải thích viết tiếng Việt có dấu, câu ngắn, giọng thân thiện, không văn mẫu.

## Cấu trúc và phân chia tệp

| Tệp | Nội dung | Ai được sửa |
|---|---|---|
| `index.html` | Trang chủ | Sửa nhỏ, đúng phạm vi việc được giao |
| `products.js` | Mảng `MN_PRODUCTS` và hàm vẽ `mnArt` | Chỉ việc "mở rộng danh mục" |
| `product-details.js` (tạo mới) | Ảnh, thông số chi tiết theo `id` sản phẩm | Chỉ việc "trang chi tiết sản phẩm" |
| `san-pham.html` (tạo mới) | Trang chi tiết, đọc `?id=` | Chỉ việc "trang chi tiết sản phẩm" |
| `bao-gia.html`, `bao-gia.js`, `config.js` (tạo mới) | Biểu mẫu báo giá | Chỉ việc "biểu mẫu báo giá" |
| `vat-lieu.html` | Vật liệu và phụ kiện | Không sửa nếu không được giao |
| `styles.css` | Giao diện dùng chung | Chỉ thêm quy tắc mới ở cuối tệp, không đổi quy tắc có sẵn |
| `assets/` | Ảnh công trình và bản vẽ | Không xóa, không đổi tên |

Các phiên chạy song song. Chỉ sửa tệp thuộc phạm vi việc của mình để khi gộp không bị xung đột.

## Quy tắc bắt buộc

- Làm trên một nhánh riêng, đặt tên theo việc (ví dụ `trang-chi-tiet`, `mo-rong-danh-muc`). Không đẩy thẳng lên `main`. Tạo pull request và ghi rõ đã đổi gì.
- Không đổi thông tin liên hệ, mã số thuế, địa chỉ công ty trong phần liên hệ (lấy từ hồ sơ năng lực PKK Group).
- Không thêm dữ liệu cá nhân, địa chỉ công trình của khách, tên người trong ảnh hoặc bản vẽ.
- Không chép ảnh, bản vẽ hay đoạn văn từ tạp chí và sách tham khảo. Chỉ lấy ý tưởng chung và thông số cơ bản, tự viết lại và tự vẽ minh họa. Ghi nguồn ý tưởng ở trường `src` như các sản phẩm có sẵn.
- Giá, kích thước sản phẩm mẫu là giả định. Ghi rõ "(mẫu)" ở nơi cần, không bịa số liệu pháp lý hay chứng nhận.
- Không dùng thư viện ngoài nếu không thật sự cần. Nếu cần, chỉ tải từ cdnjs, phiên bản cố định.
- Trang phải đọc được ở chế độ sáng và tối, chạy ở chiều rộng 400 px không bị tràn ngang, có viền focus khi dùng bàn phím, tôn trọng `prefers-reduced-motion`.
- Màu và phông chữ lấy từ biến trong `styles.css` (`--paper`, `--walnut`, `--moss`, `--brass`...), không viết màu cứng trong thành phần giao diện.

## Cách chạy và kiểm tra

- Chạy thử: `python3 -m http.server 8000` rồi mở `http://localhost:8000`.
- Kiểm tra cú pháp JS: `node --check` trên từng tệp `.js`.
- Chụp màn hình bằng Playwright ở 1280 px và 400 px, chế độ sáng và tối, kiểm tra không có lỗi trong console và không có cuộn ngang.

## Dữ liệu sản phẩm

Mỗi sản phẩm trong `MN_PRODUCTS` có: `id` (số, duy nhất, tăng dần), `n` (tên), `room`, `kind` (kiểu hình vẽ), `mat`, `w` (màu vải hoặc phụ), `wood` (màu gỗ), `price` (VND, giả định), `dim`, `d` (mô tả), và `src` nếu lấy ý tưởng từ tài liệu.
