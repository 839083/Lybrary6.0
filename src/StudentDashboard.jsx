import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const StudentDashboard = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const [assignedBooks, setAssignedBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user || user.role !== "student") {
      navigate("/");
    } else {
      fetchAssignedBooks();
    }
  }, []);

  const fetchAssignedBooks = async () => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/assignments/student/${user.email}`
      );
      const data = await res.json();
      setAssignedBooks(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="student-wrapper">
      <div className="student-dashboard">
        {/* Header */}
        <div className="student-header">
          <div>
            <h1>Student Dashboard</h1>
            <p>
              Welcome, <strong>{user?.name}</strong> 📚
            </p>
          </div>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>

        {/* Assigned Books */}
        <h3>Your Assigned Books</h3>

        {loading ? (
          <p>Loading books...</p>
        ) : assignedBooks.length === 0 ? (
          <p>No books assigned to you.</p>
        ) : (
          <div className="books-grid">
            {assignedBooks.map((a) => (
              <div className="book-card" key={a._id}>
                <h4>{a.bookId?.name}</h4>
                <p><strong>Price:</strong> ₹{a.bookId?.price}</p>
                <p>
                  <strong>Start Date:</strong>{" "}
                  {new Date(a.startDate).toLocaleDateString()}
                </p>
                <p>
                  <strong>End Date:</strong>{" "}
                  {new Date(a.endDate).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* CSS */}
      <style>{`
        .student-wrapper {
          min-height: 100vh;
          width: 100vw;
          display: flex;
          justify-content: center;
          align-items: center;
          background: #f4f6f8;
        }

        .student-dashboard {
          width: 100%;
          max-width: 900px;
          background: #fff;
          padding: 30px;
          border-radius: 12px;
          box-shadow: 0 6px 16px rgba(0,0,0,0.1);
        }

        .student-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 25px;
        }

        .student-header h1 {
          color: #008080;
        }

        .logout-btn {
          background: #ff3700;
          border: none;
          color: white;
          padding: 8px 16px;
          border-radius: 6px;
          cursor: pointer;
        }

        .logout-btn:hover {
          background: #e03100;
        }

        .books-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 20px;
          margin-top: 20px;
        }

        .book-card {
          background: #f0f9f9;
          border: 1px solid #008080;
          padding: 15px;
          border-radius: 10px;
        }

        .book-card h4 {
          margin-bottom: 10px;
          color: #008080;
        }
      `}</style>
    </div>
  );
};

export default StudentDashboard;
