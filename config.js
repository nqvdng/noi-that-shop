/* Cấu hình biểu mẫu báo giá (bao-gia.html). Không để mật khẩu hay khóa bí mật ở đây: tệp này công khai. */
window.MN_CONFIG = {
  /* Dán địa chỉ Web app của Google Apps Script (kết thúc bằng /exec) vào đây để biểu mẫu gửi thẳng vào Google Sheet và email.
     Để trống thì biểu mẫu chuyển sang chế độ sao chép nội dung, gửi qua Zalo hoặc email. Cách tạo: docs/google-apps-script.md */
  FORM_ENDPOINT: "",
  ZALO_URL: "https://zalo.me/84905006046",
  EMAIL_TO: "khoinv@pkkgroup.com.vn",
  /* Giới hạn gửi lại, tính trên trình duyệt của khách */
  MIN_SECONDS_BETWEEN: 60,
  MAX_PER_DAY: 5
};
