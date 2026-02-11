import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Mechanics.css";
import api from "../api/axios";

const Mechanics = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login", { replace: true });
  };

  // ADD FORM STATE
  const [form, setForm] = useState({
    mechanicName: "",
    expertise: "",
    mobileNumber: "",
    isAvailable: true,
  });

  // MECHANICS LIST
  const [mechanics, setMechanics] = useState([]);

  // EDIT STATE
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editForm, setEditForm] = useState({});
  const [editId, setEditId] = useState(null);

  // GET ALL
  const handleGetMechanics = async () => {
    try {
      const res = await api.get("/mechanic");
      setMechanics(res.data);
    } catch (error) {
      console.log("error is ", error);
    }
  };

  useEffect(() => {
    handleGetMechanics();
  }, []);

  // HANDLE INPUT
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // ADD
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/mechanic", form);
      if (res.status === 201) {
        handleGetMechanics();
      }
    } catch (error) {
      console.log("error is ", error);
    }

    setForm({
      mechanicName: "",
      expertise: "",
      mobileNumber: "",
      isAvailable: true,
    });
  };

  // DELETE
  const deleteMechanic = async (id) => {
    try {
      const res = await api.delete(`/mechanic/${id}`);
      if (res.status === 200) {
        handleGetMechanics();
      }
    } catch (error) {
      console.log("error is ", error);
    }
  };

  // OPEN EDIT
  const openEditModal = (mechanic) => {
    setEditId(mechanic.id);
    setEditForm({
      mechanicName: mechanic.mechanicName,
      expertise: mechanic.expertise,
      mobileNumber: mechanic.mobileNumber,
      isAvailable: mechanic.available,
    });
    setIsEditOpen(true);
  };

  // UPDATE
  const handleEditSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.put(`/mechanic/${editId}`, editForm);
      if (res.status === 200) {
        handleGetMechanics();
        setIsEditOpen(false);
      }
    } catch (error) {
      console.log("error is ", error);
    }
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2 className="brand">🚗 Car Vantage</h2>
        <ul>
          <li onClick={() => navigate("/dashboard")}>Dashboard</li>
          <li onClick={() => navigate("/appointments")}>Appointments</li>
          <li onClick={() => navigate("/mechanics")}>Mechanics</li>
          <li onClick={() => navigate("/customers")}>Customers</li>
          <li onClick={() => navigate("/services")}>Services</li>
          <li onClick={() => navigate("/invoice")}>Invoices</li>
          <li onClick={logout} className="logout-btn">
            Logout
          </li>
        </ul>
      </aside>

      {/* Main */}
      <div className="appointments-container">
        <h2>Mechanics</h2>

        {/* Add Mechanic */}
        <div className="add-box">
          <h3>Add Mechanic</h3>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="mechanicName"
              placeholder="Mechanic Name"
              value={form.mechanicName}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="expertise"
              placeholder="Expertise"
              value={form.expertise}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="mobileNumber"
              placeholder="Phone Number"
              value={form.mobileNumber}
              onChange={handleChange}
              required
            />

            <div className="toggle-row">
              <span>Status</span>
              <label className="switch">
                <input
                  type="checkbox"
                  name="isAvailable"
                  checked={form.isAvailable}
                  onChange={handleChange}
                />
                <span className="slider"></span>
              </label>
              <span className={form.isAvailable ? "status-yes" : "status-no"}>
                {form.isAvailable ? "Available" : "Busy"}
              </span>
            </div>

            <button type="submit">Add Mechanic</button>
          </form>
        </div>

        {/* Table */}
        <div className="list-box">
          <h3>All Mechanics</h3>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Expertise</th>
                <th>Phone</th>
                <th>Available</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {mechanics.map((m) => (
                <tr key={m.id}>
                  <td>{m.mechanicName}</td>
                  <td>{m.expertise}</td>
                  <td>{m.mobileNumber}</td>
                  <td>
                    {m.available ? (
                      <span className="status-yes">Yes</span>
                    ) : (
                      <span className="status-no">No</span>
                    )}
                  </td>
                  <td>
                    <button
                      className="edit-btn"
                      onClick={() => openEditModal(m)}
                    >
                      Edit
                    </button>
                    <button
                      className="del-btn"
                      onClick={() => deleteMechanic(m.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* EDIT MODAL */}
      {isEditOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Edit Mechanic</h3>
            <form onSubmit={handleEditSubmit}>
              <input
                type="text"
                value={editForm.mechanicName}
                onChange={(e) =>
                  setEditForm({
                    ...editForm,
                    mechanicName: e.target.value,
                  })
                }
              />

              <input
                type="text"
                value={editForm.expertise}
                onChange={(e) =>
                  setEditForm({
                    ...editForm,
                    expertise: e.target.value,
                  })
                }
              />

              <input
                type="text"
                value={editForm.mobileNumber}
                onChange={(e) =>
                  setEditForm({
                    ...editForm,
                    mobileNumber: e.target.value,
                  })
                }
              />

              <div className="toggle-row">
                <span>Status</span>
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={editForm.isAvailable}
                    onChange={(e) =>
                      setEditForm({
                        ...editForm,
                        isAvailable: e.target.checked,
                      })
                    }
                  />
                  <span className="slider"></span>
                </label>
                <span
                  className={
                    editForm.isAvailable ? "status-yes" : "status-no"
                  }
                >
                  {editForm.isAvailable ? "Available" : "Busy"}
                </span>
              </div>

              <div className="modal-actions">
                <button type="submit">Update</button>
                <button type="button" onClick={() => setIsEditOpen(false)}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Mechanics;
