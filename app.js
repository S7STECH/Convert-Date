<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>محول التاريخ هجري / ميلادي</title>

<!-- مكتبة التحويل -->
<script src="https://cdn.jsdelivr.net/npm/hijri-date/lib/safe.js"></script>

<style>
body {
  font-family: 'Cairo', sans-serif;
  background: linear-gradient(135deg, #0a1628, #112240);
  color: white;
  margin: 0;
}

/* الكرت */
.container {
  max-width: 500px;
  margin: 80px auto;
  background: rgba(255,255,255,0.05);
  border-radius: 20px;
  padding: 30px;
  text-align: center;
  backdrop-filter: blur(10px);
  box-shadow: 0 20px 60px rgba(0,0,0,0.5);
  animation: fadeUp 0.6s ease;
}

h2 {
  margin-bottom: 20px;
}

/* اختيار النوع */
.select {
  width: 100%;
  padding: 12px;
  border-radius: 10px;
  border: none;
  margin-bottom: 15px;
  font-size: 16px;
}

/* الإدخال */
input {
  width: 100%;
  padding: 15px;
  border-radius: 10px;
  border: none;
  margin-top: 10px;
  font-size: 16px;
  text-align: center;
}

/* زر */
button {
  margin-top: 20px;
  padding: 15px;
  width: 100%;
  border: none;
  border-radius: 10px;
  background: linear-gradient(135deg, #c9a84c, #a07830);
  color: #000;
  font-weight: bold;
  cursor: pointer;
  transition: 0.3s;
}

button:hover {
  transform: translateY(-2px);
}

/* النتيجة */
#result {
  margin-top: 20px;
  font-size: 20px;
  opacity: 0;
}

/* أنيميشن */
.show {
  animation: pop 0.4s forwards;
}

@keyframes pop {
  from { transform: scale(0.7); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}

@keyframes fadeUp {
  from { opacity:0; transform: translateY(20px); }
  to { opacity:1; transform: translateY(0); }
}

/* الفوتر */
footer {
  text-align: center;
  margin-top: 40px;
  color: #aaa;
  font-size: 14px;
}
</style>
</head>

<body>

<div class="container">
  <h2>🔁 محول التاريخ هجري / ميلادي</h2>

  <select id="type" class="select">
    <option value="h2g">هجري ➜ ميلادي</option>
    <option value="g2h">ميلادي ➜ هجري</option>
  </select>

  <input type="text" id="date" placeholder="مثال: 1447-01-10 أو 2026-05-05">

  <button onclick="convert()">تحويل</button>

  <div id="result"></div>
</div>

<footer>
  إعداد التقني حسين بن سعيد – s7s_tec
</footer>

<script>
function convert() {
  let type = document.getElementById("type").value;
  let input = document.getElementById("date").value;
  let resultBox = document.getElementById("result");

  let parts = input.split("-");
  if (parts.length !== 3) {
    resultBox.innerHTML = "⚠️ أدخل التاريخ بصيغة صحيحة";
    resultBox.classList.add("show");
    return;
  }

  let y = parseInt(parts[0]);
  let m = parseInt(parts[1]) - 1;
  let d = parseInt(parts[2]);

  try {
    if (type === "h2g") {
      let hijri = new HijriDate(y, m, d);
      let g = hijri.toGregorian();

      resultBox.innerHTML = 
        "📅 التاريخ الميلادي: " + 
        g.getFullYear() + "-" + 
        (g.getMonth()+1) + "-" + 
        g.getDate();

    } else {
      let g = new Date(y, m, d);
      let h = new HijriDate(g);

      resultBox.innerHTML = 
        "📅 التاريخ الهجري: " + 
        h.getFullYear() + "-" + 
        (h.getMonth()+1) + "-" + 
        h.getDate();
    }

    resultBox.classList.remove("show");
    void resultBox.offsetWidth;
    resultBox.classList.add("show");

  } catch(e) {
    resultBox.innerHTML = "⚠️ خطأ في التحويل";
    resultBox.classList.add("show");
  }
}
</script>

</body>
</html>
