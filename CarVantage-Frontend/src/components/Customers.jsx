import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
//import "./Customers.css"; // optional if you want separate css

const Customers = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login", { replace: true });
  };

  // ADD FORM
  const [form, setForm] = useState({
    customerName: "",
    email: "",
    mobileNumber: "",
    carModel: "",
  });

  // LIST
  const [customers, setCustomers] = useState([]);

  // EDIT STATE
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editForm, setEditForm] = useState({});
  const [editId, setEditId] = useState(null);

  // GET ALL
  const handleCustomerGetApi = async () => {
    try {
      const res = await api.get("/customer");
      setCustomers(res.data);
    } catch (error) {
      console.log("error is ", error);
    }
  };

  useEffect(() => {
    handleCustomerGetApi();
  }, []);

  // HANDLE INPUT (ADD)
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ADD
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/customer", form);
      if (res.status === 201) {
        handleCustomerGetApi();
      }
    } catch (error) {
      console.log("error is ", error);
    }

    setForm({
      customerName: "",
      email: "",
      mobileNumber: "",
      carModel: "",
    });
  };

  // DELETE
  const deleteCustomer = async (id) => {
    try {
      const res = await api.delete(`/customer/${id}`);
      if (res.status === 200) {
        handleCustomerGetApi();
      }
    } catch (error) {
      console.log("error is ", error);
    }
  };

  // OPEN EDIT
  const openEditModal = (customer) => {
    setEditId(customer.id);
    setEditForm({
      customerName: customer.customerName,
      email: customer.email,
      mobileNumber: customer.mobileNumber,
      carModel: customer.carModel,
    });
    setIsEditOpen(true);
  };

  // UPDATE
  const handleEditSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.put(`/customer/${editId}`, editForm);
      if (res.status === 200) {
        handleCustomerGetApi();
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

      {/* Customers Section */}
      <div className="appointments-container">
        <h2>Customers</h2>

        {/* Add Customer */}
        <div className="add-box">
          <h3>Add Customer</h3>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="customerName"
              placeholder="Customer Name"
              value={form.customerName}
              onChange={handleChange}
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={form.email}
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

            <input
              type="text"
              name="carModel"
              placeholder="Car Model"
              value={form.carModel}
              onChange={handleChange}
              required
            />

            <button type="submit">Add Customer</button>
          </form>
        </div>

        {/* Customers Table */}
        <div className="list-box">
          <h3>All Customers</h3>

          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Car Model</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {customers.map((c) => (
                <tr key={c.id}>
                  <td>{c.customerName}</td>
                  <td>{c.email}</td>
                  <td>{c.mobileNumber}</td>
                  <td>{c.carModel}</td>
                  <td>
                    <button
                      className="edit-btn"
                      onClick={() => openEditModal(c)}
                    >
                      Edit
                    </button>
                    <button
                      className="del-btn"
                      onClick={() => deleteCustomer(c.id)}
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
            <h3>Edit Customer</h3>
            <form onSubmit={handleEditSubmit}>
              <input
                type="text"
                value={editForm.customerName}
                onChange={(e) =>
                  setEditForm({
                    ...editForm,
                    customerName: e.target.value,
                  })
                }
              />

              <input
                type="email"
                value={editForm.email}
                onChange={(e) =>
                  setEditForm({
                    ...editForm,
                    email: e.target.value,
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

              <input
                type="text"
                value={editForm.carModel}
                onChange={(e) =>
                  setEditForm({
                    ...editForm,
                    carModel: e.target.value,
                  })
                }
              />

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

export default Customers;
