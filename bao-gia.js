/* Biểu mẫu báo giá. Cấu hình ở config.js. Hướng dẫn nhận dữ liệu vào Google Sheet: docs/google-apps-script.md */
(function(){
  var C=window.MN_CONFIG||{},P=window.MN_PRODUCTS||[];
  var $=function(id){return document.getElementById(id)};
  var vnd=function(n){return n.toLocaleString("vi-VN")+" ₫"};
  var esc=function(s){return String(s).replace(/[&<>"]/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})};
  var NEEDS=["Mua đồ có sẵn","Đặt làm theo thiết kế","Thi công hoàn thiện trọn gói","Chỉ cần tư vấn hoặc thiết kế"];
  var MATS=["Gỗ thịt","Gỗ công nghiệp (MDF, MFC)","Veneer","Laminate hoặc melamine","Đá","Da nhân tạo","Vải bọc","Kim loại","Kính","Chưa rõ, cần tư vấn"];
  var loadedAt=Date.now();

  /* ---------- trạng thái ---------- */
  var picked=[];
  try{var s=localStorage.getItem("mocnha-list");if(s)picked=JSON.parse(s)}catch(e){}
  var q=parseInt(new URLSearchParams(location.search).get("id"),10);
  if(q&&picked.indexOf(q)<0)picked.push(q);
  picked=picked.filter(function(i){return P.some(function(p){return p.id===i})});
  $("listCount").textContent=picked.length;
  if(C.ZALO_URL)$("zaloSide").href=C.ZALO_URL;

  function drawPicked(){
    $("picked").innerHTML=picked.length?picked.map(function(id){
      var p=P.filter(function(x){return x.id===id})[0];
      return '<span class="chip on">'+esc(p.n)+' <button type="button" class="rm" data-rm="'+id+'" aria-label="Bỏ '+esc(p.n)+'">×</button></span>';
    }).join(""):'<p class="hint">Chưa chọn sản phẩm nào. Bạn có thể bỏ qua nếu chưa biết cần món gì.</p>';
    $("listCount").textContent=picked.length;
    var sel=$("addProd");
    sel.innerHTML='<option value="">Thêm sản phẩm khác...</option>'+P.filter(function(p){return picked.indexOf(p.id)<0}).map(function(p){return '<option value="'+p.id+'">'+esc(p.n)+" - "+vnd(p.price)+'</option>'}).join("");
  }
  function checks(id,arr,name){
    $(id).innerHTML=arr.map(function(t,i){return '<label class="check"><input type="checkbox" name="'+name+'" value="'+esc(t)+'"><span>'+esc(t)+'</span></label>'}).join("");
  }
  checks("needs",NEEDS,"need");checks("mats",MATS,"mat");drawPicked();

  /* mẫu vật liệu khách đã chọn ở trang vat-lieu.html (lưu theo số thứ tự, đọc tên từ chính trang đó) */
  var sampleNames=[];
  try{
    var idx=JSON.parse(localStorage.getItem("mocnha-mau")||"[]");
    if(idx.length&&location.protocol!=="file:"){
      fetch("vat-lieu.html").then(function(r){return r.text()}).then(function(t){
        var names=[],re=/\{g:"\w+",n:"([^"]+)"/g,m;
        while((m=re.exec(t)))names.push(m[1]);
        sampleNames=idx.map(function(i){return names[i]}).filter(Boolean);
        if(sampleNames.length){$("sampleHint").hidden=false;$("sampleHint").textContent="Mẫu bạn đã chọn ở trang Vật liệu: "+sampleNames.join(", ")+". Chúng tôi sẽ đưa vào yêu cầu."}
      }).catch(function(){});
    }
  }catch(e){}

  document.addEventListener("click",function(e){
    var b=e.target.closest("button");if(!b||b.dataset.rm===undefined)return;
    picked=picked.filter(function(i){return i!==+b.dataset.rm});drawPicked();
  });
  $("addProd").addEventListener("change",function(e){var v=+e.target.value;if(v){picked.push(v);drawPicked()}});

  /* ---------- kiểm tra dữ liệu ---------- */
  var FIELDS=["name","phone","email","type","area","agree"];
  function setErr(id,msg){
    var el=$(id),er=$("e-"+id);er.textContent=msg||"";
    if(msg){el.setAttribute("aria-invalid","true")}else{el.removeAttribute("aria-invalid")}
    return msg;
  }
  function cleanPhone(v){return v.replace(/[\s.\-()]/g,"")}
  function validate(){
    var d=data(),errs=[];
    function add(id,m){if(setErr(id,m))errs.push([id,m])}
    add("name",!d.name?"Vui lòng nhập họ tên.":d.name.length<2?"Họ tên quá ngắn.":"");
    var ph=cleanPhone(d.phone);
    add("phone",!ph?"Vui lòng nhập số điện thoại.":!/^(\+?84|0)\d{9}$/.test(ph)?"Số điện thoại chưa đúng. Ví dụ: 0905123456.":"");
    add("email",d.email&&!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(d.email)?"Email chưa đúng. Ví dụ: ten@gmail.com.":"");
    add("type",!d.type?"Vui lòng chọn loại công trình.":"");
    var a=d.area;add("area",a!==""&&(isNaN(+a)||+a<=0||+a>100000)?"Diện tích cần là số lớn hơn 0.":"");
    add("agree",!$("agree").checked?"Vui lòng đồng ý để chúng tôi liên hệ.":"");
    var box=$("errSum");
    if(errs.length){box.hidden=false;box.innerHTML="<strong>Cần sửa "+errs.length+" chỗ:</strong><ul>"+errs.map(function(x){return '<li><a href="#'+x[0]+'">'+esc(x[1])+'</a></li>'}).join("")+"</ul>"}
    else box.hidden=true;
    return errs;
  }
  function vals(name){return [].map.call(document.querySelectorAll('input[name="'+name+'"]:checked'),function(i){return i.value})}
  function data(){
    return {
      name:$("name").value.trim(),phone:$("phone").value.trim(),email:$("email").value.trim(),
      type:$("type").value,area:$("area").value.trim(),budget:$("budget").value,
      needs:vals("need"),materials:vals("mat").concat(sampleNames.map(function(n){return "Mẫu: "+n})),
      products:picked.map(function(id){var p=P.filter(function(x){return x.id===id})[0];return p.n+" ("+p.dim+") - "+vnd(p.price)}),
      note:$("note").value.trim()
    };
  }
  function message(d){
    var L=["Chào Mộc Nhà, tôi muốn nhận báo giá.","Họ tên: "+d.name,"Điện thoại: "+d.phone];
    if(d.email)L.push("Email: "+d.email);
    L.push("Loại công trình: "+d.type);
    if(d.area)L.push("Diện tích: "+d.area+" m²");
    if(d.budget)L.push("Ngân sách tham khảo: "+d.budget);
    if(d.needs.length)L.push("Cần: "+d.needs.join(", "));
    if(d.products.length)L.push("Sản phẩm quan tâm:\n"+d.products.map(function(t,i){return (i+1)+". "+t}).join("\n"));
    if(d.materials.length)L.push("Vật liệu quan tâm: "+d.materials.join(", "));
    if(d.note)L.push("Ghi chú: "+d.note);
    return L.join("\n");
  }

  /* ---------- giới hạn gửi lại ---------- */
  function sentLog(){try{var a=JSON.parse(localStorage.getItem("mocnha-gui")||"[]");return a.filter(function(t){return Date.now()-t<864e5})}catch(e){return []}}
  function logSent(){try{var a=sentLog();a.push(Date.now());localStorage.setItem("mocnha-gui",JSON.stringify(a))}catch(e){}}
  function limited(){
    var a=sentLog(),gap=(C.MIN_SECONDS_BETWEEN||60)*1000;
    if(a.length&&Date.now()-a[a.length-1]<gap)return "Bạn vừa gửi yêu cầu. Vui lòng chờ khoảng "+Math.ceil((gap-(Date.now()-a[a.length-1]))/1000)+" giây rồi gửi lại.";
    if(a.length>=(C.MAX_PER_DAY||5))return "Hôm nay bạn đã gửi nhiều yêu cầu. Vui lòng nhắn Zalo để được hỗ trợ nhanh hơn.";
    return "";
  }

  /* ---------- gửi ---------- */
  function toast(t){var el=$("toast");el.textContent=t;el.hidden=false;clearTimeout(toast.t);toast.t=setTimeout(function(){el.hidden=true},3000)}
  function showDone(title,text,msg){
    $("qform").hidden=true;$("done").hidden=false;
    $("doneTitle").textContent=title;$("doneText").textContent=text;
    var fb=!!msg;
    ["outMsg","copyMsg","zaloBtn","mailBtn"].forEach(function(id){$(id).hidden=!fb});
    if(fb){
      $("outMsg").value=msg;
      $("zaloBtn").href=C.ZALO_URL||"https://zalo.me/";
      $("mailBtn").href="mailto:"+(C.EMAIL_TO||"")+"?subject="+encodeURIComponent("Yêu cầu báo giá nội thất")+"&body="+encodeURIComponent(msg);
    }
    $("done").focus();window.scrollTo({top:0,behavior:"smooth"});
  }
  $("copyMsg").addEventListener("click",function(){
    var m=$("outMsg");
    function fb(){m.focus();m.select();toast("Đã chọn sẵn nội dung, hãy nhấn Ctrl+C hoặc giữ để sao chép")}
    try{navigator.clipboard.writeText(m.value).then(function(){toast("Đã sao chép nội dung")},fb)}catch(e){fb()}
  });

  $("qform").addEventListener("submit",function(e){
    e.preventDefault();
    var errs=validate();
    if(errs.length){$(errs[0][0]).focus();return}
    if($("website").value){showDone("Cảm ơn bạn","Yêu cầu của bạn đã được ghi nhận.");return} /* ô bẫy thư rác: giả vờ thành công */
    var lim=limited();if(lim){var box=$("errSum");box.hidden=false;box.textContent=lim;return}
    var d=data(),msg=message(d);
    if(!C.FORM_ENDPOINT){
      showDone("Gần xong rồi","Nội dung yêu cầu đã soạn sẵn bên dưới. Hãy gửi qua Zalo hoặc email, chúng tôi sẽ phản hồi sớm.",msg);
      return;
    }
    var btn=$("send");btn.disabled=true;btn.textContent="Đang gửi...";
    var body=new URLSearchParams();
    body.set("name",d.name);body.set("phone",cleanPhone(d.phone));body.set("email",d.email);body.set("type",d.type);body.set("area",d.area);
    body.set("budget",d.budget);body.set("needs",d.needs.join("; "));body.set("products",d.products.join("; "));body.set("materials",d.materials.join("; "));
    body.set("note",d.note);body.set("website","");body.set("elapsed",String(Math.round((Date.now()-loadedAt)/1000)));
    function ok(unsure){
      logSent();
      showDone("Đã nhận yêu cầu",unsure?"Yêu cầu đã được gửi đi. Nếu sau một ngày làm việc chưa được liên hệ, bạn nhắn Zalo giúp chúng tôi nhé.":"Cảm ơn bạn. Chúng tôi sẽ gọi hoặc nhắn lại sớm.");
    }
    function bad(){
      btn.disabled=false;btn.textContent="Gửi yêu cầu";
      showDone("Chưa gửi được","Kết nối đang gặp trục trặc. Bạn gửi qua Zalo hoặc email bằng nội dung bên dưới nhé.",msg);
    }
    /* Chỉ gửi một lần để không bị trùng. Nếu trình duyệt chặn đọc phản hồi mà đang có mạng, coi như đã gửi nhưng chưa xác nhận. */
    fetch(C.FORM_ENDPOINT,{method:"POST",body:body}).then(function(r){
      return r.json().then(function(j){j&&j.ok?ok(false):bad()},function(){ok(true)});
    }).catch(function(){navigator.onLine===false?bad():ok(true)});
  });
  FIELDS.forEach(function(id){var el=$(id);el.addEventListener(id==="type"||id==="agree"?"change":"blur",function(){if(el.getAttribute("aria-invalid")||el.value)validate()})});
})();
