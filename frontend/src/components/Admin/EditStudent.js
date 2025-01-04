import React from 'react';

const EditStudent = ({ student, onEdit, onCancel }) => {
  const [editedStudent, setEditedStudent] = React.useState(student);

  const handleEditStudent = async (event) => {
    event.preventDefault();
    onEdit(editedStudent);
  };

  return (
    <form onSubmit={handleEditStudent}>
      <h3>Edit Student</h3>
      <input
        type="text"
        placeholder="Name"
        value={editedStudent.name}
        onChange={(e) => setEditedStudent({ ...editedStudent, name: e.target.value })}
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={editedStudent.email}
        onChange={(e) => setEditedStudent({ ...editedStudent, email: e.target.value })}
        required
      />
      <input
        type="text"
        placeholder="Class"
        value={editedStudent.class_name}
        onChange={(e) => setEditedStudent({ ...editedStudent, class_name: e.target.value })}
        required
      />
      <input
        type="text"
        placeholder="Parent ID"
        value={editedStudent.parent_id}
        onChange={(e) => setEditedStudent({ ...editedStudent, parent_id: e.target.value })}
      />
      <button type="submit">Save</button>
      <button type="button" onClick={onCancel}>
        Cancel
      </button>
    </form>
  );
};

export default EditStudent;
