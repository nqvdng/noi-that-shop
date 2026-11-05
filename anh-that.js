/* Ảnh sản phẩm thật.
   Cách thêm: đặt ảnh vào assets/san-pham/mn-001.jpg (số 001 là mã sản phẩm),
   rồi thêm số mã đó vào danh sách bên dưới, ví dụ [1,2,5].
   Sản phẩm không có trong danh sách vẫn hiện hình vẽ minh họa. */
window.MN_PHOTOS=[];
window.mnPhoto=function(p){
  if(window.MN_PHOTOS.indexOf(p.id)<0)return "";
  return '<img class="anh-that" src="assets/san-pham/mn-'+String(p.id).padStart(3,"0")+'.jpg" alt="" loading="lazy" decoding="async" onerror="this.remove()">';
};
