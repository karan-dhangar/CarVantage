import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Appointment.css";
import dayjs from "dayjs";
import api from "../api/axios";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

const Appointments = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login", { replace: true });
  };

  const [form, setForm] = useState({
    customerName: "",
    carModel: "",
    appointmentDate: "",
    appointmentStatus: "Scheduled",
  });

  const [appointments, setAppointments] = useState([]);

  // EDIT STATE
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editForm, setEditForm] = useState({});
  const [editId, setEditId] = useState(null);

  const handleAppointmentGetApi = async () => {
    try {
      const res = await api.get("/appointment");
      setAppointments(res.data);
    } catch (error) {
      console.log("error is ", error);
    }
  };

  useEffect(() => {
    handleAppointmentGetApi();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newAppointment = {
      ...form,
      appointmentDate: dayjs(form.appointmentDate).format("DD-MM-YYYY"),
    };

    try {
      const res = await api.post("/appointment", newAppointment);
      if (res.status === 201) {
        handleAppointmentGetApi();
      }
    } catch (error) {
      console.log("error is ", error);
    }

    setForm({
      customerName: "",
      carModel: "",
      appointmentDate: "",
      appointmentStatus: "Scheduled",
    });
  };

  // DELETE
  const deleteAppointment = async (id) => {
    try {
      const deleteRes = await api.delete(`/appointment/${id}`);
      if (deleteRes.status === 200) {
        handleAppointmentGetApi();
      }
    } catch (error) {
      console.log("error is ", error);
    }
  };

  // OPEN EDIT MODAL
  const openEditModal = (appointment) => {
    setEditId(appointment.id);
    setEditForm({
      ...appointment,
      appointmentDate: dayjs(
      appointment.appointmentDate,
      "DD-MM-YYYY"
      ).format("YYYY-MM-DD"),
});
setIsEditOpen(true);

  };

  // UPDATE
  const handleEditSubmit = async (e) => {
    e.preventDefault();

    const updatedData = {
      ...editForm,
      appointmentDate: dayjs(editForm.appointmentDate).format("DD-MM-YYYY"),
    };

    try {
      const res = await api.put(`/appointment/${editId}`, updatedData);
      if (res.status === 200) {
        handleAppointmentGetApi();
        setIsEditOpen(false);
      }
    } catch (error) {
      console.log("error is ", error);
    }
  };

  return (
    <div className="dashboard-container">
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

      <div className="appointments-container">
        <h2>Appointments</h2>

        {/* Add Form */}
        <div className="add-box">
          <h3>Add Appointment</h3>
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
              type="text"
              name="carModel"
              placeholder="Car Model"
              value={form.carModel}
              onChange={handleChange}
              required
            />
            <input
              type="date"
              name="appointmentDate"
              value={form.appointmentDate}
              onChange={handleChange}
              required
            />
            <select
              name="appointmentStatus"
              value={form.appointmentStatus}
              onChange={handleChange}
            >
              <option>Scheduled</option>
              <option>Pending</option>
              <option>Completed</option>
            </select>

            <button type="submit">Add Appointment</button>
          </form>
        </div>

        {/* Table */}
        <div className="list-box">
          <h3>All Appointments</h3>
          <table>
            <thead>
              <tr>
                <th>Customer</th>
                <th>Car Model</th>
                <th>Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {appointments.map((a) => (
                <tr key={a.id}>
                  <td>{a.customerName}</td>
                  <td>{a.carModel}</td>
                  <td>{a.appointmentDate}</td>
                  <td>{a.appointmentStatus}</td>
                  <td>
                    <button className="edit-btn" onClick={() => openEditModal(a)}>Edit</button>
                    <button
                      className="del-btn"
                      onClick={() => deleteAppointment(a.id)}
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
            <h3>Edit Appointment</h3>
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
                type="text"
                value={editForm.carModel}
                onChange={(e) =>
                  setEditForm({ ...editForm, carModel: e.target.value })
                }
              />
              <input
                type="date"
                value={editForm.appointmentDate}
                onChange={(e) =>
                  setEditForm({
                    ...editForm,
                    appointmentDate: e.target.value,
                  })
                }
              />
              <select
                value={editForm.appointmentStatus}
                onChange={(e) =>
                  setEditForm({
                    ...editForm,
                    appointmentStatus: e.target.value,
                  })
                }
              >
                <option>Scheduled</option>
                <option>Pending</option>
                <option>Completed</option>
              </select>

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

export default Appointments;
