import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/ManageParents.css'; // Import the CSS file

const ManageParents = () => {
  const [parents, setParents] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteMessage, setDeleteMessage] = useState('');
  const [parentToDelete, setParentToDelete] = useState(null);
  const navigate = useNavigate();

  // Fetch parents
  useEffect(() => {
    const fetchParents = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/parents');
        if (!response.ok) {
          throw new Error('Error fetching parents');
        }
        const data = await response.json();
        setParents(data);
      } catch (error) {
        setError('Failed to load parents. Please try again.');
        console.error('Error fetching parents:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchParents();
  }, []);

  // Handle Delete action
  const handleDelete = (id) => {
    if (isDeleting) return; // Prevent deleting while an operation is ongoing
    setParentToDelete(id);   // Show confirmation modal
  };

  // Confirm Delete
  const confirmDelete = async () => {
    if (isDeleting || !parentToDelete) return;

    setIsDeleting(true);
    setDeleteMessage('Deleting...');

    try {
      const response = await fetch(`http://localhost:5000/api/parents/${parentToDelete}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setDeleteMessage('Parent deleted successfully!');
        // Immediately update UI after successful deletion
        setParents((prevParents) =>
          prevParents.filter((parent) => parent.parent_id !== parentToDelete)
        );
      } else {
        setDeleteMessage('Error deleting parent');
        console.error('Delete failed: ', response.statusText); // Log the error for debugging
      }
    } catch (error) {
      setDeleteMessage('Error: ' + error.message);
      console.error('Delete failed: ', error); // Log the error for debugging
    } finally {
      setIsDeleting(false);
      setParentToDelete(null); // Reset the modal
    }
  };

  // Cancel Delete
  const cancelDelete = () => {
    setParentToDelete(null); // Close confirmation modal
  };

  return (
    <div className="manage-parents-container">
      <h2>Manage Parents</h2>
      <h3>List of Parents</h3>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : parents.length === 0 ? (
        <p>No parents found</p>
      ) : (
        <>
          {deleteMessage && <p>{deleteMessage}</p>} {/* Conditionally render delete message */}

          {parentToDelete && (
            <div className="confirmation-modal">
              <div>
                <p className="message">Are you sure you want to delete this parent?</p>
                <div className="buttons">
                  <button
                    className="yes-button"
                    onClick={confirmDelete}
                    disabled={isDeleting}
                  >
                    Yes
                  </button>
                  <button
                    className="no-button"
                    onClick={cancelDelete}
                    disabled={isDeleting}
                  >
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
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Address</th>
                <th>Add</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {parents.map((parent, index) => (
                <tr key={parent.parent_id}>
                  <td>{index + 1}</td>
                  <td>{parent.name}</td>
                  <td>{parent.email}</td>
                  <td>{parent.phone}</td>
                  <td>{parent.address || 'N/A'}</td>
                  <td>
                    <button
                      className="add-button"
                      onClick={() => navigate('/admin/add-parent')}
                    >
                      <img
                        src="/plus.png"
                        alt="Add Parent"
                        style={{ width: '25px', height: '25px', cursor: 'pointer' }}
                      />
                    </button>
                  </td>
                  <td>
                    <button
                      className="edit-button"
                      onClick={() => navigate(`/admin/edit-parent/${parent.parent_id}`)}
                    >
                      <img
                        src="/ic_edit.jpeg"
                        alt="Edit Parent"
                        style={{ width: '25px', height: '25px', cursor: 'pointer' }}
                      />
                    </button>
                  </td>
                  <td>
                    <button
                      className="delete-button"
                      onClick={() => handleDelete(parent.parent_id)}
                      disabled={isDeleting}
                    >
                      <img
                        src="/ic_del.jpeg"
                        alt="Delete Parent"
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

export default ManageParents;
