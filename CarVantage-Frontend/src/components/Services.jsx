import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

const Services = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login", { replace: true });
  };

  // ADD FORM
  const [form, setForm] = useState({
    serviceName: "",
    price: "",
    timeRequired: "",
    serviceDate: "",
  });

  // LIST
  const [services, setServices] = useState([]);

  // EDIT STATE
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editForm, setEditForm] = useState({});
  const [editId, setEditId] = useState(null);

  // GET ALL
  const handleServicesGetApi = async () => {
    try {
      const res = await api.get("/services");
      setServices(res.data);
    } catch (error) {
      console.log("error is ", error);
    }
  };

  useEffect(() => {
    handleServicesGetApi();
  }, []);

  // HANDLE ADD INPUT
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ADD
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newService = {
      ...form,
      serviceDate: dayjs(form.serviceDate).format("DD-MM-YYYY"),
    };

    try {
      const res = await api.post("/services", newService);
      if (res.status === 201) {
        handleServicesGetApi();
      }
    } catch (error) {
      console.log("error is ", error);
    }

    setForm({
      serviceName: "",
      price: "",
      timeRequired: "",
      serviceDate: "",
    });
  };

  // DELETE
  const deleteService = async (id) => {
    try {
      const res = await api.delete(`/services/${id}`);
      if (res.status === 200) {
        handleServicesGetApi();
      }
    } catch (error) {
      console.log("error is ", error);
    }
  };

  // OPEN EDIT
  const openEditModal = (service) => {
    setEditId(service.id);
    setEditForm({
      serviceName: service.serviceName,
      price: service.price,
      timeRequired: service.timeRequired,
      serviceDate: dayjs(
        service.serviceDate,
        "DD-MM-YYYY"
      ).format("YYYY-MM-DD"),
    });
    setIsEditOpen(true);
  };

  // UPDATE
  const handleEditSubmit = async (e) => {
    e.preventDefault();

    const updatedService = {
      ...editForm,
      serviceDate: dayjs(editForm.serviceDate).format("DD-MM-YYYY"),
    };

    try {
      const res = await api.put(`/services/${editId}`, updatedService);
      if (res.status === 200) {
        handleServicesGetApi();
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

      {/* Services Section */}
      <div className="appointments-container">
        <h2>Services</h2>

        {/* Add Service */}
        <div className="add-box">
          <h3>Add Service</h3>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="serviceName"
              placeholder="Service Name"
              value={form.serviceName}
              onChange={handleChange}
              required
            />

            <input
              type="number"
              name="price"
              placeholder="Price (₹)"
              value={form.price}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="timeRequired"
              placeholder="Time Required"
              value={form.timeRequired}
              onChange={handleChange}
              required
            />

            <input
              type="date"
              name="serviceDate"
              value={form.serviceDate}
              onChange={handleChange}
              required
            />

            <button type="submit">Add Service</button>
          </form>
        </div>

        {/* Table */}
        <div className="list-box">
          <h3>All Services</h3>
          <table>
            <thead>
              <tr>
                <th>Service</th>
                <th>Price (₹)</th>
                <th>Time Required</th>
                <th>Service Date</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {services.map((s) => (
                <tr key={s.id}>
                  <td>{s.serviceName}</td>
                  <td>{s.price}</td>
                  <td>{s.timeRequired}</td>
                  <td>{s.serviceDate}</td>
                  <td>
                    <button
                      className="edit-btn"
                      onClick={() => openEditModal(s)}
                    >
                      Edit
                    </button>
                    <button
                      className="del-btn"
                      onClick={() => deleteService(s.id)}
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
            <h3>Edit Service</h3>
            <form onSubmit={handleEditSubmit}>
              <input
                type="text"
                value={editForm.serviceName}
                onChange={(e) =>
                  setEditForm({
                    ...editForm,
                    serviceName: e.target.value,
                  })
                }
              />

              <input
                type="number"
                value={editForm.price}
                onChange={(e) =>
                  setEditForm({ ...editForm, price: e.target.value })
                }
              />

              <input
                type="text"
                value={editForm.timeRequired}
                onChange={(e) =>
                  setEditForm({
                    ...editForm,
                    timeRequired: e.target.value,
                  })
                }
              />

              <input
                type="date"
                value={editForm.serviceDate}
                onChange={(e) =>
                  setEditForm({
                    ...editForm,
                    serviceDate: e.target.value,
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

export default Services;
