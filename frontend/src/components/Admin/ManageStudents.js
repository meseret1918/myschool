import React, { useEffect, useState } from 'react'; 
import { useNavigate } from 'react-router-dom'; 
import './styles/ManageStudents.css'; // Import the CSS file

const ManageStudents = () => {
  const [students, setStudents] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false); // State to handle the delete process
  const [deleteMessage, setDeleteMessage] = useState(''); // State to show confirmation message
  const [studentToDelete, setStudentToDelete] = useState(null); // State to store the student to be deleted
  const navigate = useNavigate();

  // Fetch students
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/students');
        if (!response.ok) {
          throw new Error('Error fetching students');
        }
        const data = await response.json();
        setStudents(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  const handleDelete = async (id) => {
    if (isDeleting) return; // Prevent multiple delete requests

    setStudentToDelete(id); // Set the student to be deleted
  };

  const confirmDelete = async () => {
    if (isDeleting || !studentToDelete) return; // Prevent multiple delete requests

    setIsDeleting(true); // Set deleting state
    setDeleteMessage('Deleting...'); // Show "Deleting..." message

    try {
      const response = await fetch(`http://localhost:5000/api/students/${studentToDelete}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setDeleteMessage('Student deleted successfully!');
        // Refresh students list after successful deletion
        setStudents(students.filter((student) => student.id !== studentToDelete));
      } else {
        setDeleteMessage('Error deleting student');
      }
    } catch (error) {
      setDeleteMessage('Error: ' + error.message);
    } finally {
      setIsDeleting(false); // Reset deleting state
      setStudentToDelete(null); // Reset student to delete
    }
  };

  const cancelDelete = () => {
    setStudentToDelete(null); // Reset student to delete if canceled
  };

  return (
    <div className="manage-students-container">
      <h2>Manage Students</h2>
      <h3>List of Students</h3>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : students.length === 0 ? (
        <p>No students found</p>
      ) : (
        <>
          <p>{deleteMessage && deleteMessage}</p> {/* Display the delete message conditionally */}

          {studentToDelete && ( // Show the confirmation modal if a student is selected for deletion
            <div className="confirmation-modal">
              <div>
                <p className="message">Are you sure you want to delete this student?</p> {/* Clear placement of message */}
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
                <th>No</th>
                <th>Name</th>
                <th>Email</th>
                <th>Class</th>
                <th>Parent ID</th>
                <th>Phone</th>
                <th>Date of Birth</th>
                <th>Address</th> {/* New column for address */}
                <th>Created At</th>
                <th>Add</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student, index) => (
                <tr key={student.id}>
                  <td>{index + 1}</td>
                  <td>{student.name}</td>
                  <td>{student.email}</td>
                  <td>{student.class_name}</td>
                  <td>{student.parent_id || 'N/A'}</td>
                  <td>{student.phone || 'N/A'}</td>
                  <td>{student.date_of_birth ? new Date(student.date_of_birth).toLocaleDateString() : 'N/A'}</td>
                  <td>{student.address || 'N/A'}</td> {/* Displaying the address */}
                  <td>{new Date(student.created_at).toLocaleString()}</td>
                  <td>
                    <button
                      className="add-button"
                      onClick={() => navigate('/admin/add-student')}
                    >
                      <img
                        src="/plus.png"
                        alt="Add Student"
                        style={{ width: '25px', height: '25px', cursor: 'pointer' }}
                      />
                    </button>
                  </td>
                  <td>
                    <button
                      className="edit-button"
                      onClick={() => navigate(`/admin/edit-student/${student.id}`)}
                    >
                      <img
                        src="/ic_edit.jpeg"
                        alt="Edit Student"
                        style={{ width: '25px', height: '25px', cursor: 'pointer' }}
                      />
                    </button>
                  </td>
                  <td>
                    <button
                      className="delete-button"
                      onClick={() => handleDelete(student.id)}
                      disabled={isDeleting} // Disable button during deletion
                    >
                      <img
                        src="/ic_del.jpeg"
                        alt="Delete Student"
                        style={{ width: '25px', height: '25px', cursor: 'pointer' }}
                      />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default ManageStudents;
