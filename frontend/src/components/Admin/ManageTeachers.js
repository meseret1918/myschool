import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/ManageTeachers.css'; // Import the CSS file

const ManageTeachers = () => {
  const [teachers, setTeachers] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteMessage, setDeleteMessage] = useState('');
  const [teacherToDelete, setTeacherToDelete] = useState(null);
  const navigate = useNavigate();

  // Fetch teachers
  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/teachers');
        if (!response.ok) {
          throw new Error('Error fetching teachers');
        }
        const data = await response.json();
        setTeachers(data);
      } catch (error) {
        setError('Failed to load teachers. Please try again.');
        console.error('Error fetching teachers:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTeachers();
  }, []);

  const handleDelete = (id) => {
    if (isDeleting) return;
    setTeacherToDelete(id);
  };

  const confirmDelete = async () => {
    if (isDeleting || !teacherToDelete) return;

    setIsDeleting(true);
    setDeleteMessage('Deleting...');

    try {
      const response = await fetch(`http://localhost:5000/api/teachers/${teacherToDelete}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setDeleteMessage('Teacher deleted successfully!');
        // Wait until successful response, then update UI
        setTeachers((prevTeachers) => prevTeachers.filter((teacher) => teacher.TeacherID !== teacherToDelete));
      } else {
        setDeleteMessage('Error deleting teacher');
      }
    } catch (error) {
      setDeleteMessage('Error: ' + error.message);
    } finally {
      setIsDeleting(false);
      setTeacherToDelete(null);
    }
  };

  const cancelDelete = () => {
    setTeacherToDelete(null);
  };

  return (
    <div className="manage-teachers-container">
      <h2>Manage Teachers</h2>
      <h3>List of Teachers</h3>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : teachers.length === 0 ? (
        <p>No teachers found</p>
      ) : (
        <>
          {deleteMessage && <p>{deleteMessage}</p>} {/* Conditionally render delete message */}

          {teacherToDelete && (
            <div className="confirmation-modal">
              <div>
                <p className="message">Are you sure you want to delete this teacher?</p>
                <div className="buttons">
                  <button className="yes-button" onClick={confirmDelete} disabled={isDeleting}>
                    Yes
                  </button>
                  <button className="no-button" onClick={cancelDelete} disabled={isDeleting}>
                    No
                  </button>
                </div>
              </div>
            </div>
          )}

          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Gender</th>
                <th>Age</th>
                <th>Contact Number</th>
                <th>Email</th>
                <th>Qualification</th>
                <th>Experience (Years)</th>
                <th>Hire Date</th>
                <th>Subjects Taught</th>
                <th>Salary</th>
                <th>Add</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {teachers.map((teacher, index) => {
                const salary = Number(teacher.Salary);
                const formattedSalary = !isNaN(salary) ? salary.toFixed(2) : 'N/A';
                const age = teacher.Age !== null ? teacher.Age : 'Invalid age';

                return (
                  <tr key={teacher.TeacherID}>
                    <td>{index + 1}</td>
                    <td>{teacher.FirstName}</td>
                    <td>{teacher.LastName}</td>
                    <td>{teacher.Gender}</td>
                    <td>{age}</td>
                    <td>{teacher.ContactNumber}</td>
                    <td>{teacher.Email}</td>
                    <td>{teacher.Qualification}</td>
                    <td>{teacher.ExperienceYears}</td>
                    <td>
                      {teacher.HireDate
                        ? new Date(teacher.HireDate).toLocaleDateString()
                        : ''}
                    </td>
                    <td>{teacher.SubjectsTaught}</td>
                    <td>{formattedSalary}</td>
                    <td>
                      <button
                        className="add-button"
                        onClick={() => navigate('/admin/add-teacher')}
                      >
                        <img
                          src="/plus.png"
                          alt="Add Teacher"
                          style={{ width: '25px', height: '25px', cursor: 'pointer' }}
                        />
                      </button>
                    </td>
                    <td>
                      <button
                        className="edit-button"
                        onClick={() => navigate(`/admin/edit-teacher/${teacher.TeacherID}`)}
                      >
                        <img
                          src="/ic_edit.jpeg"
                          alt="Edit Teacher"
                          style={{ width: '25px', height: '25px', cursor: 'pointer' }}
                        />
                      </button>
                    </td>
                    <td>
                      <button
                        className="delete-button"
                        onClick={() => handleDelete(teacher.TeacherID)}
                        disabled={isDeleting}
                      >
                        <img
                          src="/ic_del.jpeg"
                          alt="Delete Teacher"
                          style={{ width: '25px', height: '25px', cursor: 'pointer' }}
                        />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default ManageTeachers;
