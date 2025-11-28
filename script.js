// script.js
// Reducer-style attendance tracker (vanilla JS)

// Initial students
const initialStudents = [
  { id: 1, name: "John", status: "Absent" },
  { id: 2, name: "Mary", status: "Absent" },
  { id: 3, name: "Alex", status: "Absent" },
  { id: 4, name: "Riya", status: "Absent" }
];

// Reducer function (pure)
function reducer(state, action) {
  switch (action.type) {
    case "MARK_PRESENT":
      return state.map(s => s.id === action.id ? { ...s, status: "Present" } : s);

    case "MARK_ABSENT":
      return state.map(s => s.id === action.id ? { ...s, status: "Absent" } : s);

    case "RESET":
      return state.map(s => ({ ...s, status: "Absent" }));

    case "ADD_STUDENT":
      // generate new id
      const nextId = state.length ? Math.max(...state.map(s => s.id)) + 1 : 1;
      return [...state, { id: nextId, name: action.name, status: "Absent" }];

    default:
      return state;
  }
}

// Simple store that keeps state and re-renders on dispatch
let state = [...initialStudents];

function dispatch(action) {
  state = reducer(state, action);
  renderTable();
}

// DOM refs
const tbody = document.querySelector("#attendanceTable tbody");
const resetBtn = document.getElementById("resetBtn");
const addBtn = document.getElementById("addBtn");
const newNameInput = document.getElementById("newName");

// Render function
function renderTable() {
  tbody.innerHTML = ""; // clear

  if (state.length === 0) {
    const tr = document.createElement("tr");
    const td = document.createElement("td");
    td.colSpan = 4;
    td.textContent = "No students yet. Add a student to begin.";
    td.style.fontStyle = "italic";
    tr.appendChild(td);
    tbody.appendChild(tr);
    return;
  }

  state.forEach(student => {
    const tr = document.createElement("tr");

    const tdId = document.createElement("td");
    tdId.textContent = student.id;
    tr.appendChild(tdId);

    const tdName = document.createElement("td");
    tdName.textContent = student.name;
    tr.appendChild(tdName);

    const tdStatus = document.createElement("td");
    tdStatus.textContent = student.status;
    tdStatus.className = student.status === "Present" ? "present" : "absent";
    tr.appendChild(tdStatus);

    const tdButtons = document.createElement("td");

    const presentBtn = document.createElement("button");
    presentBtn.textContent = "Present";
    presentBtn.className = "btn-present";
    presentBtn.addEventListener("click", () => dispatch({ type: "MARK_PRESENT", id: student.id }));

    const absentBtn = document.createElement("button");
    absentBtn.textContent = "Absent";
    absentBtn.className = "btn-absent";
    absentBtn.style.marginLeft = "8px";
    absentBtn.addEventListener("click", () => dispatch({ type: "MARK_ABSENT", id: student.id }));

    tdButtons.appendChild(presentBtn);
    tdButtons.appendChild(absentBtn);

    tr.appendChild(tdButtons);
    tbody.appendChild(tr);
  });
}

// Wire controls
resetBtn.addEventListener("click", () => {
  if (!confirm("Reset all students to Absent?")) return;
  dispatch({ type: "RESET" });
});

addBtn.addEventListener("click", () => {
  const name = newNameInput.value.trim();
  if (!name) {
    alert("Please enter a student name.");
    return;
  }
  dispatch({ type: "ADD_STUDENT", name });
  newNameInput.value = "";
});

// initial render
renderTable();
