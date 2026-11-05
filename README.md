# Mộc Nhà Nội Thất

Website bán nội thất kết hợp thi công hoàn thiện. Trang tĩnh, không cần máy chủ, không cần build: chỉ HTML, CSS và JavaScript thuần.

## Cấu trúc

| Đường dẫn | Nội dung |
|---|---|
| `index.html` | Toàn bộ trang (giao diện, dữ liệu sản phẩm, mã xử lý) |
| `assets/du-an/` | Ảnh công trình đang thi công (đã cắt bỏ dòng địa chỉ và giờ chụp) |
| `assets/ban-ve/` | Ảnh phối cảnh và bảng vật liệu lấy từ bộ shop drawing |
| `favicon.svg`, `404.html`, `robots.txt` | Biểu tượng, trang lỗi, cấu hình công cụ tìm kiếm |
| `.github/workflows/pages.yml` | Tự động đăng trang lên GitHub Pages mỗi khi đẩy lên `main` |

## Xem trang

- Mở `index.html` bằng trình duyệt, hoặc
- Sau khi bật Pages (bên dưới), trang nằm ở `https://nqvdng.github.io/noi-that-shop/`.

## Bật GitHub Pages (làm một lần)

1. Vào **Settings > Pages** của repo.
2. Ở mục **Build and deployment**, chọn **Source: GitHub Actions**.
3. Vào tab **Actions**, chạy workflow **Deploy site to GitHub Pages** (hoặc đẩy một commit mới lên `main`).

Lưu ý: trang đăng bằng Pages là công khai dù repo ở chế độ riêng tư (repo riêng tư dùng Pages cần gói GitHub trả phí). Trang có địa chỉ, số điện thoại công ty và ảnh công trình, nên hãy kiểm tra nội dung trước khi bật.

## Sửa nội dung thường gặp

- **Sản phẩm, giá, kích thước:** mảng `P` trong phần `<script>` của `index.html`.
- **Ảnh công trình:** thay ảnh trong `assets/du-an/` và danh sách `shots` trong `<script>`.
- **Thông tin liên hệ:** khối `#lien-he` trong `index.html`.
- **Bài tin tức:** khối `#news` trong `index.html`.

## Nguồn nội dung

- Thông tin công ty, địa chỉ, liên hệ, công trình nền móng: hồ sơ năng lực PKK Group 2026.
- Ảnh công trình và bản vẽ: tài liệu nội bộ của dự án nội thất gỗ đang thi công.
- Ba sản phẩm "Ý tưởng từ Wood Magazine": chỉ lấy ý tưởng và thông số chung, hình vẽ minh họa tự tạo, không dùng ảnh hay bản vẽ trong tạp chí.
- Bài tin tức: bản tóm tắt tiếng Việt, diễn đạt lại từ sách The Essential Wood Book (Cedar Lane Press, 2020).
- Giá, kích thước sản phẩm mẫu và tên "Mộc Nhà": giả định, cần thay bằng số liệu thật.

## Việc cần làm tiếp

- Thay hình sản phẩm minh họa bằng ảnh thật.
- Kiểm tra số Zalo `0905 006 046` có dùng được không.
- Thông báo website bán hàng với Bộ Công Thương nếu bán hàng trực tuyến.
- Thêm trang chi tiết riêng cho từng sản phẩm và biểu mẫu nhận yêu cầu báo giá.
