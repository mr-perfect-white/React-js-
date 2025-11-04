import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [editId, setEditId] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (name.trim() === "" || age.trim() === "") {
      alert("Please enter both name and age");
      return;
    }

    if (isNaN(age) || age <= 0) {
      alert("Please enter a valid age");
      return;
    }

    if (editId) {

      const updatedUsers = users.map((user) =>
        user.id === editId ? { ...user, name, age } : user
      );
      setUsers(updatedUsers);
      setEditId(null);
    } else {

      const newUser = { id: Date.now(), name, age };
      setUsers([...users, newUser]);
    }


    setName("");
    setAge("");
  };


  const handleDelete = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };


  const handleEdit = (user) => {
    setEditId(user.id);
    setName(user.name);
    setAge(user.age);
  };

  return (
    <div className="container mt-5 text-center">
      <h2 className="mb-4 text-primary">User List</h2>

      
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="row justify-content-center">
          <div className="col-md-4 mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Enter user name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="col-md-2 mb-3">
            <input
              type="number"
              className="form-control"
              placeholder="Enter age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </div>
        </div>

        <button type="submit" className="btn btn-success">
          {editId ? "Update User" : "Add User"}
        </button>

        {editId && (
          <button
            type="button"
            className="btn btn-secondary ms-2"
            onClick={() => {
              setEditId(null);
              setName("");
              setAge("");
            }}
          >
            Cancel
          </button>
        )}
      </form>

      {users.length === 0 ? (
        <h5 className="text-muted">No users added yet</h5>
      ) : (
        <ul className="list-group">
          {users.map((user) => (
            <li
              key={user.id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <div>
                <strong>{user.name}</strong> — Age: {user.age}
              </div>
              <div>
                <button
                  onClick={() => handleEdit(user)}
                  className="btn btn-sm btn-warning me-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(user.id)}
                  className="btn btn-sm btn-danger"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
