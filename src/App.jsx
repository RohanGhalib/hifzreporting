import React, { useState, useEffect } from "react";
import html2canvas from "html2canvas";

function App() {
  const [students, setStudents] = useState([]);
  const [editing, setEditing] = useState(false);
  const [csvText, setCsvText] = useState("");

  // Load students from CSV
  useEffect(() => {
    fetch("/students.csv")
      .then(res => res.text())
      .then(text => {
        const names = text.split("\n").map(line => line.trim()).filter(Boolean);
        setStudents(names);
      });
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

  // Save CSV back
  const saveCsv = () => {
    const newNames = csvText.split("\n").map(line => line.trim()).filter(Boolean);
    setStudents(newNames);
    setEditing(false);
  };

  return (
    <div className="app-container">
      <h2 className="title">📖 قرآن اسٹڈی سرکل رپورٹ</h2>

      <button className="edit-btn" onClick={openEditor}>✏️ ناموں کی فہرست ترمیم کریں</button>

      {editing && (
        <div className="csv-editor">
          <textarea
            value={csvText}
            onChange={(e) => setCsvText(e.target.value)}
          ></textarea>
          <button className="save-btn" onClick={saveCsv}>💾 فہرست محفوظ کریں</button>
        </div>
      )}

      <div className="table-wrapper">
        <table id="reportTable" className="report-table">
          <thead>
            <tr>
              <th>#</th>
              <th>نام</th>
              <th>سبق</th>
              <th>سبقی</th>
              <th>منزل</th>
            </tr>
          </thead>
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button onClick={saveAsImage} className="save-btn">
        📥 رپورٹ محفوظ کریں (PNG)
      </button>
    </div>
  );
}

export default App;
