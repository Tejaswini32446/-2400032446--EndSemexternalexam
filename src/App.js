import React, { useReducer } from "react";

const initialState = [
  { id: 1, name: "Aarav", status: "Absent" },
  { id: 2, name: "Tejaswini", status: "Absent" },
  { id: 3, name: "Manoj", status: "Absent" },
  { id: 4, name: "Keerthi", status: "Absent" }
];

function attendanceReducer(state, action) {
  switch (action.type) {
    case "MARK_PRESENT":
      return state.map((student) =>
        student.id === action.id ? { ...student, status: "Present" } : student
      );

    case "MARK_ABSENT":
      return state.map((student) =>
        student.id === action.id ? { ...student, status: "Absent" } : student
      );

    case "RESET":
      return state.map((student) => ({ ...student, status: "Absent" }));

    default:
      return state;
  }
}

export default function App() {
  const [students, dispatch] = useReducer(attendanceReducer, initialState);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Student Attendance Tracker (useReducer)</h2>

      <table border="1" cellPadding="10" style={{ width: "500px" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Status</th>
            <th>Mark</th>
          </tr>
        </thead>

        <tbody>
          {students.map((s) => (
            <tr key={s.id}>
              <td>{s.id}</td>
              <td>{s.name}</td>
              <td>{s.status}</td>
              <td>
                <button onClick={() => dispatch({ type: "MARK_PRESENT", id: s.id })}>Present</button>
                <button onClick={() => dispatch({ type: "MARK_ABSENT", id: s.id })}>Absent</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <br />
      <button onClick={() => dispatch({ type: "RESET" })}>Reset All</button>
    </div>
  );
}
