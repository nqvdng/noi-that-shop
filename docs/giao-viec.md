# Giao việc cho các phiên Claude

Thứ tự gộp khuyến nghị: việc 1, 2, 4 chạy song song và gộp trước. Việc 3 chạy sau khi đã gộp ba việc kia, vì cần rà soát toàn bộ trang.

## Việc 1. Trang chi tiết sản phẩm (nhánh `trang-chi-tiet`)

Đọc `CLAUDE.md` trước. Tạo trang `san-pham.html` đọc `?id=` trên địa chỉ để hiển thị chi tiết một sản phẩm lấy từ `window.MN_PRODUCTS` (nạp `products.js`). Mỗi sản phẩm cần: nhiều ảnh (dựng 3 góc nhìn bằng SVG từ hàm `mnArt` hoặc biến thể do bạn viết, ví dụ mặt trước, mặt bên, chi tiết vật liệu), bảng thông số, vật liệu và tùy chọn màu, bảo hành, sản phẩm liên quan cùng phòng, nút "Gửi yêu cầu tư vấn" (mở danh sách tư vấn có sẵn hoặc liên kết đến `bao-gia.html?id=`). Dữ liệu bổ sung theo `id` đặt trong `product-details.js` mới, không sửa `products.js`. Trên `index.html` chỉ sửa chỗ để thẻ sản phẩm có liên kết "Xem chi tiết" sang `san-pham.html?id=...`. Mỗi trang có thẻ `<title>` và `description` riêng theo sản phẩm, đường dẫn quay về danh mục. Đẩy nhánh và mở pull request.

## Việc 2. Mở rộng danh mục (nhánh `mo-rong-danh-muc`)

Đọc `CLAUDE.md` trước. Thêm 20 đến 30 sản phẩm mẫu vào `products.js`, chia đều các phòng (phòng khách, phòng ngủ, phòng ăn, văn phòng, sân vườn, xưởng và thêm nếu hợp lý: bếp, phòng tắm, trẻ em). Lấy ý tưởng chung từ các số Wood Magazine trong thư viện của người dùng, nhưng không chép ảnh, bản vẽ hay văn bản; tự đặt tên tiếng Việt, tự viết mô tả, ghi `src` ("Ý tưởng từ Wood Magazine số ..."). Tự thêm các kiểu hình vẽ mới trong `mnArt` (ví dụ bàn console, kệ sách, ghế đẩu, tủ ly, bàn trang điểm, ghế bành, bàn làm việc chữ L, tủ giày, bàn bên) để mỗi sản phẩm có hình minh họa riêng, đồng nhất phong cách. Giá giả định hợp lý theo kích thước và vật liệu. Chỉ sửa `products.js`. Kiểm tra bộ lọc phòng và vật liệu trong `index.html` vẫn hiển thị đúng với các giá trị mới, nếu cần thêm giá trị lọc thì sửa tối thiểu ở `index.html`. Đẩy nhánh và mở pull request.

## Việc 3. Tối ưu Google và điện thoại (nhánh `toi-uu-seo`) — chạy sau khi đã gộp 1, 2, 4

Đọc `CLAUDE.md` trước. Rà `index.html`, `vat-lieu.html`, `san-pham.html`, `bao-gia.html`: thẻ `<title>` và `description` riêng từng trang, thẻ canonical (dùng địa chỉ `https://nqvdng.github.io/noi-that-shop/`), Open Graph, dữ liệu có cấu trúc JSON-LD (Organization, và Product cho trang chi tiết với giá giả định có ghi chú), tạo `sitemap.xml` và cập nhật `robots.txt`. Tăng tốc: ảnh có `width`/`height`, `loading="lazy"`, `decoding="async"`, nén thêm ảnh trong `assets/` nếu lớn hơn 300 KB mà không giảm chất lượng rõ rệt, tải phông chữ có `display=swap`. Kiểm tra chế độ tối và chiều rộng 360 đến 400 px trên tất cả trang, sửa chữ bị cắt, nút nhỏ hơn 44 px, độ tương phản thấp. Báo cáo bằng bảng trước và sau. Đẩy nhánh và mở pull request.

## Việc 4. Biểu mẫu nhận yêu cầu báo giá (nhánh `bieu-mau-bao-gia`)

Đọc `CLAUDE.md` trước. Tạo `bao-gia.html`, `bao-gia.js` và `config.js`. Biểu mẫu gồm họ tên, số điện thoại, email, loại công trình, diện tích, ngân sách tham khảo, ghi chú, và chọn sản phẩm hoặc vật liệu quan tâm (đọc `?id=` nếu có, và lấy danh sách tư vấn đang lưu trong trình duyệt). Kiểm tra dữ liệu nhập bằng tiếng Việt, báo lỗi rõ ràng. Gửi đi qua địa chỉ đặt trong `config.js` (`FORM_ENDPOINT`, để trống thì chuyển sang chế độ sao chép nội dung gửi Zalo và email như hiện tại). Viết kèm tệp `docs/google-apps-script.md` hướng dẫn từng bước tạo Google Apps Script nhận dữ liệu vào Google Sheet và gửi email thông báo, kèm mã Apps Script đầy đủ để dán, không đưa khóa hay mật khẩu vào repo. Có trường ẩn chống thư rác (honeypot) và giới hạn gửi lại. Thêm một liên kết "Nhận báo giá" vào thanh menu của `index.html`. Đẩy nhánh và mở pull request.
