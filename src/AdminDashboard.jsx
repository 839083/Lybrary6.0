import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const [books, setBooks] = useState([]);
  const [students, setStudents] = useState([]);
  const [assignments, setAssignments] = useState([]);

  const [bookData, setBookData] = useState({ name: "", price: "" });

  const [assignData, setAssignData] = useState({
    bookId: "",
    studentEmail: "",
    startDate: "",
    endDate: "",
  });

  useEffect(() => {
    if (!user || user.role !== "admin") navigate("/");
    fetchBooks();
    fetchStudents();
    fetchAssignments();
  }, []);

  /* ===== FETCH DATA ===== */
  const fetchBooks = async () => {
    const res = await fetch("http://localhost:5000/api/books");
    setBooks(await res.json());
  };

  const fetchStudents = async () => {
    const res = await fetch("http://localhost:5000/api/auth/students");
    setStudents(await res.json());
  };

  const fetchAssignments = async () => {
    const res = await fetch("http://localhost:5000/api/assignments");
    setAssignments(await res.json());
  };

  /* ===== ADD BOOK ===== */
  const addBook = async () => {
    if (!bookData.name || !bookData.price) return alert("Fill all fields");

    await fetch("http://localhost:5000/api/books/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bookData),
    });

    setBookData({ name: "", price: "" });
    fetchBooks();
  };

  /* ===== ASSIGN BOOK ===== */
  const assignBook = async () => {
    if (!assignData.bookId || !assignData.studentEmail)
      return alert("Select book & student");

    await fetch("http://localhost:5000/api/assignments/assign", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(assignData),
    });

    fetchAssignments();
  };

  return (
    <div className="admin-wrapper">
      <div className="admin-dashboard">
        <h1>Admin Dashboard</h1>

        {/* ===== ADD BOOK ===== */}
        <h3>Add Book</h3>
        <input
          placeholder="Book Name"
          value={bookData.name}
          onChange={(e) => setBookData({ ...bookData, name: e.target.value })}
        />
        <input
          type="number"
          placeholder="Price"
          value={bookData.price}
          onChange={(e) => setBookData({ ...bookData, price: e.target.value })}
        />
        <button onClick={addBook}>Add Book</button>

        {/* ===== ASSIGN BOOK ===== */}
        <h3>Assign Book to Student</h3>

        <select
          onChange={(e) =>
            setAssignData({ ...assignData, bookId: e.target.value })
          }
        >
          <option value="">Select Book</option>
          {books.map((b) => (
            <option key={b._id} value={b._id}>
              {b.name}
            </option>
          ))}
        </select>

        <select
          onChange={(e) =>
            setAssignData({ ...assignData, studentEmail: e.target.value })
          }
        >
          <option value="">Select Student</option>
          {students.map((s) => (
            <option key={s._id} value={s.email}>
              {s.name}
            </option>
          ))}
        </select>

        <input
          type="date"
          onChange={(e) =>
            setAssignData({ ...assignData, startDate: e.target.value })
          }
        />
        <input
          type="date"
          onChange={(e) =>
            setAssignData({ ...assignData, endDate: e.target.value })
          }
        />

        <button onClick={assignBook}>Assign</button>

        {/* ===== ASSIGNMENTS ===== */}
        <h3>Assigned Books</h3>
        <div className="assignment-list">
          {assignments.map((a) => (
            <div className="assignment-card" key={a._id}>
              <strong>{a.bookId?.name}</strong>
              <span>{a.studentEmail}</span>
            </div>
          ))}
        </div>

        <button
          className="logout-btn"
          onClick={() => {
            localStorage.clear();
            navigate("/");
          }}
        >
          Logout
        </button>
      </div>

      {/* ===== CSS ===== */}
      <style>{`
        * {
          box-sizing: border-box;
          font-family: Arial, sans-serif;
        }

        .admin-wrapper {
          min-height: 100vh;
          width: 100vw;
          background: #f4f6f8;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .admin-dashboard {
          background: #fff;
          width: 100%;
          max-width: 900px;
          padding: 30px;
          border-radius: 12px;
          box-shadow: 0 6px 16px rgba(0,0,0,0.1);
        }

        h1 {
          text-align: center;
          color: #008080;
          margin-bottom: 20px;
        }

        h3 {
          margin-top: 25px;
          margin-bottom: 10px;
          color: #333;
        }

        input, select {
          width: 100%;
          padding: 10px;
          margin-bottom: 12px;
          border-radius: 6px;
          border: 1px solid #ccc;
        }

        button {
          padding: 10px 16px;
          background: #ff3700;
          color: white;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          margin-top: 5px;
        }

        button:hover {
          background: #e03100;
        }

        .assignment-list {
          margin-top: 15px;
          display: grid;
          gap: 10px;
        }

        .assignment-card {
          padding: 10px;
          background: #f0f9f9;
          border-left: 5px solid #008080;
          display: flex;
          justify-content: space-between;
          border-radius: 6px;
        }

        .logout-btn {
          width: 100%;
          margin-top: 30px;
          background: #333;
        }

        .logout-btn:hover {
          background: #111;
        }
      `}</style>
    </div>
  );
};

export default AdminDashboard;
