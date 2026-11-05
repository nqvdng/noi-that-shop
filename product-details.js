/* Thông tin chi tiết cho trang san-pham.html.
   - MN_MAT_INFO: thông tin chung theo vật liệu (dùng cho mọi sản phẩm cùng vật liệu).
   - MN_DETAILS: thông tin riêng theo id sản phẩm (không bắt buộc, có thì ưu tiên).
   Thời gian, bảo hành, tùy chọn ở đây là nội dung mẫu, cần thay bằng thông tin thật. */

window.MN_DEFAULT_DETAIL = {
  warranty: "24 tháng cho khung và mối ghép (mẫu)",
  lead: "Hàng đặt làm: khoảng 3 đến 5 tuần sau khi chốt mẫu (mẫu)",
  delivery: "Giao và lắp tại TP.HCM, ngoài thành phố tính phí theo khoảng cách (mẫu)",
  fabrics: [["Xanh rêu", "#6F7F66"], ["Xám sương", "#9AA39A"], ["Cam đất", "#C48A5A"], ["Vàng cát", "#C9B27C"]]
};

window.MN_MAT_INFO = {
  "Gỗ sồi": {
    finish: "Sơn PU mờ, dầu tự nhiên hoặc nhuộm nâu nhạt",
    woods: [["Sồi tự nhiên", "#B58B5A"], ["Sồi nhuộm nâu", "#8B6B4A"], ["Sồi sáng", "#D2B07A"]],
    care: ["Lau bằng khăn ẩm, thấm khô ngay.", "Tránh để gần nguồn nhiệt và ánh nắng gắt kéo dài.", "Dùng miếng lót khi đặt vật nóng."]
  },
  "Gỗ óc chó": {
    finish: "Dầu tự nhiên hoặc sơn PU mờ, giữ vân gỗ",
    woods: [["Óc chó tự nhiên", "#5A3A28"], ["Óc chó đậm", "#3B281E"]],
    care: ["Lau khô, tránh để nước đọng lâu.", "Màu có thể nhạt dần nếu để dưới nắng trực tiếp.", "Bôi dầu bảo dưỡng mỗi 6 đến 12 tháng."]
  },
  "Gỗ anh đào": {
    finish: "Sơn PU mờ hoặc dầu, màu đỏ ấm lên dần theo thời gian",
    woods: [["Anh đào tự nhiên", "#A86A3C"], ["Anh đào đậm", "#7C4A2B"]],
    care: ["Màu sẽ đậm dần sau vài tháng, đây là đặc tính của gỗ.", "Lau khô, tránh hóa chất tẩy mạnh."]
  },
  "Gỗ tếch": {
    finish: "Dầu tếch hoặc để màu tự nhiên, hợp dùng ngoài trời có mái che",
    woods: [["Tếch tự nhiên", "#8B6B4A"], ["Tếch sẫm", "#6B4F33"]],
    care: ["Ngoài trời nên bôi lại dầu mỗi 6 tháng.", "Màu chuyển xám bạc nếu để không dầu, không ảnh hưởng độ bền.", "Rửa nhẹ bằng nước sạch và bàn chải mềm."]
  },
  "Gỗ thông": {
    finish: "Sơn gốc nước an toàn cho bé, hoặc dầu tự nhiên",
    woods: [["Thông sáng", "#D2B07A"], ["Thông nhuộm mật ong", "#C79A6B"]],
    care: ["Gỗ mềm hơn sồi nên tránh va đập mạnh.", "Lau khô, tránh để nước đọng.", "Kiểm tra bu lông định kỳ với đồ trẻ em."]
  },
  "Gỗ cao su": {
    finish: "Sơn PU mờ hoặc nhuộm màu, đã sấy xử lý mối mọt",
    woods: [["Cao su tự nhiên", "#C79A6B"], ["Cao su nhuộm nâu", "#8B6B4A"]],
    care: ["Lau khăn ẩm, thấm khô.", "Tránh để gần nơi ẩm kéo dài."]
  },
  "Vải bố": {
    finish: "Vải bố bọc, vỏ tháo được, nên giặt nhẹ hoặc giặt khô theo nhãn",
    woods: [["Óc chó", "#5A3A28"], ["Sồi", "#B58B5A"]],
    care: ["Hút bụi thường xuyên bằng đầu chổi mềm.", "Xử lý vết bẩn sớm bằng khăn ẩm, không chà mạnh.", "Xem nhãn giặt kèm theo vỏ bọc."]
  },
  "MFC": {
    finish: "Ván dăm phủ melamine, nhiều mã màu, dán cạnh kín",
    woods: [["Vân gỗ ấm", "#7C6A58"], ["Trắng ngà", "#CFCBC2"], ["Xám khói", "#7D8A8F"]],
    care: ["Lau khăn ẩm, tránh để nước đọng ở mép cạnh.", "Không dùng vật cứng kỳ cọ bề mặt.", "Nên dùng loại chống ẩm cho bếp và phòng tắm."]
  },
  "Đá": {
    finish: "Đá nung hoặc đá nhân tạo, chống thấm bề mặt",
    woods: [["Xám sáng", "#CFCBC2"], ["Trắng vân mây", "#E6E9E4"], ["Đen nhám", "#2E2A25"]],
    care: ["Lau sạch vết dầu, nước chanh, giấm ngay.", "Dùng miếng lót khi đặt nồi nóng.", "Không dùng chất tẩy có axit."]
  },
  "Kim loại": {
    finish: "Thép sơn tĩnh điện, màu đen mờ hoặc đồng",
    woods: [["Đen mờ", "#2E2A25"], ["Xám đậm", "#5E6659"]],
    care: ["Lau khăn khô hoặc hơi ẩm.", "Tránh để nước đọng ở mối hàn và chân.", "Dặm sơn dặm nếu bị trầy sâu để không gỉ."]
  }
};

/* Riêng từng sản phẩm. Ví dụ: MN_DETAILS[1] = { lead: "...", extra: ["..."] } */
window.MN_DETAILS = {
  1: { extra: ["Vỏ đệm tháo được để giặt.", "Có thể đặt làm chiều dài 1800 hoặc 2400 mm."] },
  5: { extra: ["Có thể đặt làm kích thước 1m6 hoặc 2m.", "Đầu giường bọc nỉ, có thể đổi màu theo bảng vải."] },
  8: { lead: "Mặt đá đặt nhập: khoảng 4 đến 6 tuần (mẫu)", extra: ["Mặt đá nặng, cần hai người khiêng khi lắp."] },
  14: { extra: ["Ngoài trời có mái che, không để dưới mưa trực tiếp."] }
};
