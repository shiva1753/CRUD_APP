import { useState } from "react";
import "../src/Dashboard.css";

const DEPTS = ["Computer Science", "Electronics", "Mechanical", "Civil", "Business"];
const STATUSES = ["Active", "Inactive", "On Leave"];
const EMPTY = { name: "", roll: "", email: "", phone: "", dept: "Computer Science", gpa: "", status: "Active" };

// ── Helpers ────────────────────────────────────────────────
function StatusBadge({ status }) {
  const map = { Active: "badge-active", Inactive: "badge-inactive", "On Leave": "badge-leave" };
  return <span className={`badge ${map[status]}`}>{status}</span>;
}

function Modal({ title, onClose, children }) {
  return (
    <div className="overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{title}</h2>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>
        {children}
      </div>
    </div>
  );
}

// ── Student Form ───────────────────────────────────────────
function StudentForm({ form, onChange, onSubmit, onCancel, label }) {
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.name.trim())  e.name  = "Name is required";
    if (!form.roll.trim())  e.roll  = "Roll no is required";
    if (!form.email.trim()) e.email = "Email is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) onSubmit();
  };

  return (
    <>
      <div className="form-grid">
        <div className={`field ${errors.name ? "field-error" : ""}`}>
          <label>Full Name <span className="req">*</span></label>
          <input value={form.name}  onChange={e => onChange("name",  e.target.value)} placeholder="e.g. Aarav Sharma" />
          {errors.name  && <p className="err">{errors.name}</p>}
        </div>

        <div className={`field ${errors.roll ? "field-error" : ""}`}>
          <label>Roll Number <span className="req">*</span></label>
          <input value={form.roll}  onChange={e => onChange("roll",  e.target.value)} placeholder="e.g. CS2301" />
          {errors.roll  && <p className="err">{errors.roll}</p>}
        </div>

        <div className={`field ${errors.email ? "field-error" : ""}`}>
          <label>Email <span className="req">*</span></label>
          <input value={form.email} onChange={e => onChange("email", e.target.value)} placeholder="student@college.edu" />
          {errors.email && <p className="err">{errors.email}</p>}
        </div>

        <div className="field">
          <label>Phone</label>
          <input value={form.phone} onChange={e => onChange("phone", e.target.value)} placeholder="10-digit number" />
        </div>

        <div className="field">
          <label>Department</label>
          <select value={form.dept} onChange={e => onChange("dept", e.target.value)}>
            {DEPTS.map(d => <option key={d}>{d}</option>)}
          </select>
        </div>

        <div className="field">
          <label>GPA (0 – 10)</label>
          <input type="number" min="0" max="10" step="0.1" value={form.gpa} onChange={e => onChange("gpa", e.target.value)} placeholder="e.g. 8.5" />
        </div>

        <div className="field">
          <label>Status</label>
          <select value={form.status} onChange={e => onChange("status", e.target.value)}>
            {STATUSES.map(s => <option key={s}>{s}</option>)}
          </select>
        </div>
      </div>

      <div className="modal-footer">
        <button className="btn btn-ghost" onClick={onCancel}>Cancel</button>
        <button className="btn btn-primary" onClick={handleSubmit}>{label}</button>
      </div>
    </>
  );
}

// ── Main Dashboard ─────────────────────────────────────────
export default function Dashboard() {
  const [students, setStudents] = useState([]);
  const [search,   setSearch]   = useState("");
  const [modal,    setModal]    = useState(null);   // "add" | "edit" | "view" | "delete"
  const [selected, setSelected] = useState(null);
  const [form,     setForm]     = useState(EMPTY);

  const updateForm = (key, val) => setForm(f => ({ ...f, [key]: val }));
  const close      = () => { setModal(null); setSelected(null); };

  // CRUD handlers
  const handleAdd = () => {
    setStudents(prev => [{ ...form, id: Date.now() }, ...prev]);
    close();
  };

  const handleEdit = () => {
    setStudents(prev => prev.map(s => s.id === selected.id ? { ...form, id: s.id } : s));
    close();
  };

  const handleDelete = () => {
    setStudents(prev => prev.filter(s => s.id !== selected.id));
    close();
  };

  // Open modals
  const openAdd    = ()  => { setForm(EMPTY);   setModal("add"); };
  const openEdit   = (s) => { setSelected(s); setForm({ ...s }); setModal("edit"); };
  const openView   = (s) => { setSelected(s); setModal("view"); };
  const openDelete = (s) => { setSelected(s); setModal("delete"); };

  // Stats
  const total  = students.length;
  const active = students.filter(s => s.status === "Active").length;
  const avgGpa = total ? (students.reduce((sum, s) => sum + (parseFloat(s.gpa) || 0), 0) / total).toFixed(1) : "—";
  const depts  = new Set(students.map(s => s.dept)).size;

  const filtered = students.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.roll.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="dashboard">

      {/* HEADER */}
      <header className="header">
        <div>
          <h1>Student Management</h1>
          <p>Manage your student records</p>
        </div>
        <button className="btn btn-primary" onClick={openAdd}>+ Add Student</button>
      </header>

      {/* STATS */}
      <div className="stats">
        <div className="stat-card"><p className="stat-label">Total Students</p><h2 className="stat-value indigo">{total}</h2></div>
        <div className="stat-card"><p className="stat-label">Active</p><h2 className="stat-value green">{active}</h2></div>
        <div className="stat-card"><p className="stat-label">Avg GPA</p><h2 className="stat-value amber">{avgGpa}</h2></div>
        <div className="stat-card"><p className="stat-label">Departments</p><h2 className="stat-value purple">{depts}</h2></div>
      </div>

      {/* TOOLBAR */}
      <div className="toolbar">
        <input
          className="search"
          placeholder="Search by name or roll no..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <span className="record-count">{filtered.length} student(s)</span>
      </div>

      {/* TABLE */}
      <div className="table-card">
        {filtered.length === 0 ? (
          <div className="empty">
            <span className="empty-icon">🎓</span>
            <p>No students yet. Click <strong>+ Add Student</strong> to begin.</p>
          </div>
        ) : (
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Roll No</th>
                  <th>Name</th>
                  <th>Department</th>
                  <th>GPA</th>
                  <th>Status</th>
                  <th>Email</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(s => (
                  <tr key={s.id}>
                    <td className="cell-roll">{s.roll}</td>
                    <td className="cell-name">{s.name}</td>
                    <td>{s.dept}</td>
                    <td><strong>{s.gpa || "—"}</strong></td>
                    <td><StatusBadge status={s.status} /></td>
                    <td className="cell-muted">{s.email}</td>
                    <td>
                      <div className="row-actions">
                        <button className="btn-view"   onClick={() => openView(s)}>View</button>
                        <button className="btn-edit"   onClick={() => openEdit(s)}>Edit</button>
                        <button className="btn-delete" onClick={() => openDelete(s)}>Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ADD MODAL */}
      {modal === "add" && (
        <Modal title="Add New Student" onClose={close}>
          <StudentForm form={form} onChange={updateForm} onSubmit={handleAdd} onCancel={close} label="Add Student" />
        </Modal>
      )}

      {/* EDIT MODAL */}
      {modal === "edit" && (
        <Modal title="Edit Student" onClose={close}>
          <StudentForm form={form} onChange={updateForm} onSubmit={handleEdit} onCancel={close} label="Save Changes" />
        </Modal>
      )}

      {/* VIEW MODAL */}
      {modal === "view" && selected && (
        <Modal title="Student Details" onClose={close}>
          <div className="view-profile">
            <div className="avatar">
              {selected.name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase()}
            </div>
            <div className="view-info">
              <h3>{selected.name}</h3>
              <p>{selected.roll} · {selected.dept}</p>
            </div>
            <StatusBadge status={selected.status} />
          </div>
          <div className="view-grid">
            {[["Email", selected.email], ["Phone", selected.phone || "—"], ["GPA", selected.gpa || "—"], ["Department", selected.dept]].map(([k, v]) => (
              <div className="view-field" key={k}>
                <span className="vf-label">{k}</span>
                <span className="vf-value">{v}</span>
              </div>
            ))}
          </div>
          <div className="modal-footer">
            <button className="btn btn-ghost" onClick={close}>Close</button>
            <button className="btn btn-primary" onClick={() => { close(); openEdit(selected); }}>Edit</button>
          </div>
        </Modal>
      )}

      {/* DELETE MODAL */}
      {modal === "delete" && selected && (
        <Modal title="Confirm Delete" onClose={close}>
          <div className="delete-body">
            <div className="delete-icon">⚠️</div>
            <p>Delete <strong>{selected.name}</strong> ({selected.roll})?</p>
            <span>This cannot be undone.</span>
          </div>
          <div className="modal-footer">
            <button className="btn btn-ghost"   onClick={close}>Cancel</button>
            <button className="btn btn-danger"  onClick={handleDelete}>Yes, Delete</button>
          </div>
        </Modal>
      )}

    </div>
  );
}
