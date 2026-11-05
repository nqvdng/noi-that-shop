/* Bảo hành theo loại sản phẩm (mẫu): 12 đến 36 tháng. Sửa số tháng ở đây khi có chính sách thật. */
window.mnWarranty=function(kind){
  var m36=["bed","wardrobe","kitchen","bunk","kidsbed","cabinet","bookcase","tvunit"],
      m12=["chair","stool","lamp","sidetable"];
  return m36.indexOf(kind)>-1?36:m12.indexOf(kind)>-1?12:24;
};
