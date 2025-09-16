import { useState, useEffect } from "react";
import html2canvas from "html2canvas";
import { db } from "./firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

function App() {
  const [students, setStudents] = useState([]);
  const [editing, setEditing] = useState(false);
  const [csvText, setCsvText] = useState("");
  const [loading, setLoading] = useState(false);

  // Load students from Firestore
 useEffect(() => {
  const loadCsv = async () => {
    setLoading(true); // start spinner
    try {
      const docRef = doc(db, "data", "students");
      const snap = await getDoc(docRef);
      if (snap.exists()) {
        setStudents(snap.data().names || []);
      }
    } finally {
      setLoading(false); // hide spinner
    }
  };
  loadCsv();
}, []);


  // Save PNG
  const saveAsImage = () => {
 html2canvas(document.getElementById("reportTable"), {
    backgroundColor: "#ffffff", 
    color: "#000000", // Force black text
    scale: 2                     // High resolution
}).then(canvas => {
    let link = document.createElement("a");
    const today = new Date().toISOString().slice(0, 10);
    link.download = `hifz-diary-${today}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
});
  };

  // Open CSV editor
  const openEditor = () => {
    setEditing(true);
    setCsvText(students.join("\n"));
  };

   const saveCsv = async () => {
  const newNames = csvText.split("\n").map(n => n.trim()).filter(Boolean);

  setStudents(newNames); // optimistic UI
  setEditing(false);
  setLoading(true);

  try {
    await setDoc(doc(db, "data", "students"), { names: newNames });
    console.log("Saved ✅");
  } catch (err) {
    alert("Save failed ❌");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="app-container">

      <button className="edit-btn" onClick={openEditor}>✏️ ناموں کی فہرست ترمیم کریں</button>

      {editing && (
        <div className="csv-editor">
          <textarea className="csv-textarea"
            value={csvText}
            onChange={(e) => setCsvText(e.target.value)}
          ></textarea>
          <button className="save-btn" onClick={saveCsv}>💾 فہرست محفوظ کریں</button>
        </div>
      )}

      <div className="table-wrapper" id="reportTable">
        <img src="/daslogo.png" height={100} alt="" />
        <h3 className="subtitle">سیکشن "c" کی رپورٹ:</h3>
        <table  className="report-table">
          <thead>
            <tr>
              <th>#</th>
              <th>نام</th>
              <th>سبق</th>
              <th>سبقی</th>
              <th>منزل</th>
              <th>مطالعہ</th>
              <th>ارقم بک</th>

            </tr>
          </thead>
          {loading && <div className="loader"></div>}

          <tbody>

            {students.map((name, index) => (
              <tr key={index} className="fade-in">
                <td>{index + 1}</td>
                <td>{name}</td>
                <td>
                  <select className="input">
                    <option>✅</option>
                    <option>❌</option>
                    <option>❗</option>
                  </select>
                </td>
                <td>
                  <select className="input">
                   <option>✅</option>
                    <option>❌</option>
                    <option>❗</option>
                  </select>
                </td>
                <td>
                  <select className="input">
                    <option>✅</option>
                    <option>❌</option>
                    <option>❗</option>
                  </select>
                </td>
                <td>
                  <select className="input">
                    <option>✅</option>
                    <option>❌</option>
                    <option>❗</option>
                  </select>
                </td>
                <td>
                  <select className="input">
                    <option>✅</option>
                    <option>❌</option>
                    <option>❗</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
            نوٹ: ✅ مکمل، ❌ نامکمل، ❗ بہتری کی ضرورت
      </div>

      <button onClick={saveAsImage} className="save-btn">
        📥 رپورٹ محفوظ کریں (PNG)
      </button>
    </div>
  );
}

export default App;
