import { useState } from "react";


const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Orbitron:wght@700;900&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg:       #0b0f14;
    --surface:  #111820;
    --border:   #1e2d3d;
    --cyan:     #00e5c0;
    --cyan-dim: #00b89a;
    --gold:     #f0c040;
    --red:      #ff4d6d;
    --green:    #00e090;
    --text:     #c9d8e8;
    --muted:    #4a6278;
    --mono:     'Share Tech Mono', monospace;
    --head:     'Orbitron', sans-serif;
  }

  body { background: var(--bg); color: var(--text); font-family: var(--mono); }

  .app {
    min-height: 100vh;
    padding: 0 0 60px;
    background:
      radial-gradient(ellipse 80% 40% at 50% -10%, rgba(0,229,192,.07) 0%, transparent 70%),
      var(--bg);
  }

  
  .header {
    padding: 40px 60px 24px;
    border-bottom: 1px solid var(--border);
    position: relative;
  }
  .header::after {
    content:'';
    position:absolute;
    bottom:-1px; left:60px;
    width:220px; height:2px;
    background: linear-gradient(90deg, var(--cyan), transparent);
  }
  .version-tag {
    font-size: 11px;
    letter-spacing: 4px;
    color: var(--muted);
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 12px;
  }
  .version-tag::before {
    content:'';
    width:28px; height:2px;
    background: var(--cyan);
  }
  .header h1 {
    font-family: var(--head);
    font-size: clamp(32px, 5vw, 56px);
    font-weight: 900;
    letter-spacing: 2px;
    line-height: 1;
  }
  .header h1 span { color: var(--cyan); }


  .main { padding: 36px 60px; display: flex; flex-direction: column; gap: 24px; }

  
  .panel {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 4px;
    overflow: hidden;
  }
  .panel-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;
    border-bottom: 1px solid var(--border);
    font-size: 11px;
    letter-spacing: 3px;
    color: var(--muted);
  }
  .panel-header .dot {
    width: 7px; height: 7px;
    border-radius: 50%;
    background: var(--cyan);
    display: inline-block;
    margin-right: 8px;
    box-shadow: 0 0 6px var(--cyan);
  }

  
  .form-row {
    display: flex;
    gap: 0;
    padding: 12px 16px;
  }
  .form-row input {
    flex: 1;
    background: transparent;
    border: 1px solid var(--border);
    color: var(--text);
    font-family: var(--mono);
    font-size: 13px;
    padding: 10px 16px;
    outline: none;
    letter-spacing: 1px;
    transition: border-color .2s;
  }
  .form-row input:focus { border-color: var(--cyan); }
  .form-row input:first-child { border-right: none; border-radius: 3px 0 0 3px; }
  .form-row input:nth-child(2) { border-radius: 0; }
  .form-row input::placeholder { color: var(--muted); }
  .btn-add {
    background: transparent;
    border: 1px solid var(--cyan);
    border-left: none;
    color: var(--cyan);
    font-family: var(--mono);
    font-size: 12px;
    letter-spacing: 2px;
    padding: 10px 20px;
    cursor: pointer;
    border-radius: 0 3px 3px 0;
    transition: background .2s, color .2s;
    white-space: nowrap;
  }
  .btn-add:hover { background: var(--cyan); color: var(--bg); }

  
  .stats-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
  }
  .stat-cell {
    padding: 20px 28px;
    border-right: 1px solid var(--border);
  }
  .stat-cell:last-child { border-right: none; }
  .stat-label {
    font-size: 10px;
    letter-spacing: 3px;
    color: var(--muted);
    margin-bottom: 8px;
  }
  .stat-value {
    font-family: var(--head);
    font-size: 36px;
    font-weight: 700;
    color: var(--cyan);
  }


  .table-wrap { overflow-x: auto; }
  table {
    width: 100%;
    border-collapse: collapse;
  }
  thead tr {
    border-bottom: 1px solid var(--border);
  }
  thead th {
    padding: 10px 20px;
    font-size: 10px;
    letter-spacing: 3px;
    color: var(--muted);
    text-align: left;
    font-weight: normal;
  }
  tbody tr {
    border-bottom: 1px solid var(--border);
    position: relative;
    transition: background .15s;
  }
  tbody tr:last-child { border-bottom: none; }
  tbody tr:hover { background: rgba(0,229,192,.03); }

  
  tbody tr .accent-bar {
    position: absolute;
    left: 0; top: 0; bottom: 0;
    width: 3px;
  }
  .pass-bar  { background: var(--green); }
  .fail-bar  { background: var(--red); }

  td {
    padding: 14px 20px;
    font-size: 13px;
    vertical-align: middle;
  }
  .td-name { padding-left: 28px; color: var(--text); letter-spacing: 1px; }
  .td-score {
    font-family: var(--head);
    font-size: 18px;
    font-weight: 700;
  }
  .score-pass { color: var(--gold); }
  .score-fail { color: var(--red); }

  .badge {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    font-size: 10px;
    letter-spacing: 2px;
    padding: 4px 10px;
    border-radius: 2px;
  }
  .badge::before {
    content: '';
    width: 6px; height: 6px;
    border-radius: 50%;
  }
  .badge-pass { background: rgba(0,224,144,.1); color: var(--green); border: 1px solid rgba(0,224,144,.3); }
  .badge-pass::before { background: var(--green); box-shadow: 0 0 5px var(--green); }
  .badge-fail { background: rgba(255,77,109,.1); color: var(--red); border: 1px solid rgba(255,77,109,.3); }
  .badge-fail::before { background: var(--red); }

  .update-cell { display: flex; gap: 8px; align-items: center; }
  .update-cell input {
    width: 72px;
    background: rgba(255,255,255,.04);
    border: 1px solid var(--border);
    color: var(--text);
    font-family: var(--mono);
    font-size: 13px;
    padding: 6px 10px;
    outline: none;
    border-radius: 3px;
    transition: border-color .2s;
  }
  .update-cell input:focus { border-color: var(--cyan); }
  .btn-save {
    background: transparent;
    border: 1px solid var(--border);
    color: var(--muted);
    font-family: var(--mono);
    font-size: 10px;
    letter-spacing: 2px;
    padding: 6px 12px;
    cursor: pointer;
    border-radius: 3px;
    transition: border-color .2s, color .2s;
  }
  .btn-save:hover { border-color: var(--cyan); color: var(--cyan); }

  
  .footer {
    text-align: center;
    padding: 28px;
    font-size: 10px;
    letter-spacing: 4px;
    color: var(--muted);
    border-top: 1px solid var(--border);
    margin: 36px 60px 0;
  }
  .footer span { margin: 0 12px; }

  
  .empty { padding: 40px; text-align: center; color: var(--muted); font-size: 13px; letter-spacing: 2px; }
`;

function Header() {
  return (
    <header className="header">
      <div className="version-tag">ACADEMIC TERMINAL V2.0</div>
      <h1>STUDENT <span>SCOREBOARD</span></h1>
    </header>
  );
}

function AddStudentForm({ onAdd }) {
  const [name, setName] = useState("");
  const [score, setScore] = useState("");

  const handleSubmit = () => {
    const trimmed = name.trim();
    const num = Number(score);
    if (!trimmed || score === "" || isNaN(num) || num < 0 || num > 100) return;
    onAdd({ id: Date.now(), name: trimmed, score: num, inputVal: String(num) });
    setName("");
    setScore("");
  };

  const handleKey = (e) => { if (e.key === "Enter") handleSubmit(); };

  return (
    <div className="panel">
      <div className="panel-header">
        <span><span className="dot" />REGISTER STUDENT</span>
        <span>NEW ENTRY</span>
      </div>
      <div className="form-row">
        <input
          placeholder="Student name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={handleKey}
        />
        <input
          placeholder="Score (0-100)"
          type="number"
          min="0" max="100"
          value={score}
          onChange={(e) => setScore(e.target.value)}
          onKeyDown={handleKey}
        />
        <button className="btn-add" onClick={handleSubmit}>+ ADD</button>
      </div>
    </div>
  );
}

function StatsPanel({ students }) {
  const total = students.length;
  const passed = students.filter((s) => s.score >= 40).length;
  const avg = total ? Math.round(students.reduce((a, s) => a + s.score, 0) / total) : 0;

  return (
    <div className="panel">
      <div className="stats-grid">
        {[["TOTAL", total], ["PASSED", passed], ["AVG SCORE", avg]].map(([label, val]) => (
          <div className="stat-cell" key={label}>
            <div className="stat-label">{label}</div>
            <div className="stat-value">{val}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function StudentRow({ student, onUpdate }) {
  const isPass = student.score >= 40;

  return (
    <tr>
      <div className={`accent-bar ${isPass ? "pass-bar" : "fail-bar"}`} />
      <td className="td-name">{student.name}</td>
      <td className={`td-score ${isPass ? "score-pass" : "score-fail"}`}>{student.score}</td>
      <td>
        <span className={`badge ${isPass ? "badge-pass" : "badge-fail"}`}>
          {isPass ? "PASS" : "FAIL"}
        </span>
      </td>
      <td>
        <div className="update-cell">
          <input
            type="number"
            min="0" max="100"
            value={student.inputVal}
            onChange={(e) => onUpdate(student.id, "input", e.target.value)}
          />
          <button
            className="btn-save"
            onClick={() => onUpdate(student.id, "save")}
          >SAVE</button>
        </div>
      </td>
    </tr>
  );
}

function StudentTable({ students, onUpdate }) {
  return (
    <div className="panel">
      <div className="panel-header">
        <span>STUDENT RECORDS</span>
        <span>{students.length} entries</span>
      </div>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>NAME</th>
              <th>SCORE</th>
              <th>STATUS</th>
              <th>UPDATE</th>
            </tr>
          </thead>
          <tbody>
            {students.length === 0
              ? <tr><td colSpan="4"><div className="empty">NO RECORDS FOUND</div></td></tr>
              : students.map((s) => (
                <StudentRow key={s.id} student={s} onUpdate={onUpdate} />
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  );
}


const initialStudents = [
  { id: 1, name: "Aman",  score: 78, inputVal: "78" },
  { id: 2, name: "Riya",  score: 45, inputVal: "45" },
  { id: 3, name: "Karan", score: 90, inputVal: "90" },
  { id: 4, name: "Neha",  score: 32, inputVal: "32" },
];

export default function App() {
  const [students, setStudents] = useState(initialStudents);

  const handleAdd = (student) => {
    setStudents((prev) => [...prev, student]);
  };

  const handleUpdate = (id, action, value) => {
    setStudents((prev) =>
      prev.map((s) => {
        if (s.id !== id) return s;
        if (action === "input") return { ...s, inputVal: value };
        if (action === "save") {
          const num = Number(s.inputVal);
          if (!isNaN(num) && num >= 0 && num <= 100)
            return { ...s, score: num };
        }
        return s;
      })
    );
  };

  return (
    <>
      <style>{styles}</style>
      <div className="app">
        <Header />
        <main className="main">
          <AddStudentForm onAdd={handleAdd} />
          <StatsPanel students={students} />
          <StudentTable students={students} onUpdate={handleUpdate} />
        </main>
        <footer className="footer">
          <span>ACADEMIC TERMINAL</span>·<span>SECURE SESSION</span>
        </footer>
      </div>
    </>
  );
}
