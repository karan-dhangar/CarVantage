import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Invoice.css";
import api from "../api/axios";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

const Invoice = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login", { replace: true });
  };

  const [form, setForm] = useState({
    customerName: "",
    serviceName: "",
    amount: "",
    invoiceDate: "",
    paymentStatus: "Unpaid"
  });

  const [invoices, setInvoices] = useState([]);

  const [customers,setCustomers] = useState([]);

  const [services,setServices] = useState([]);
  
  const  handleGetCustomers =async()=>{
    try {
      const res = await api.get("/customer");
      setCustomers(res.data);
    } catch (error) {
      console.log("error is ", error);
    }
  }
   
  const handleGetInvoices = async () => {
    try {
      const res = await api.get("/invoices");
      setInvoices(res.data);
    } catch (error) {
      console.log("error is ", error);
    }
  };
  const handleGetServices = async()=>{
    try {
      const res = await api.get("/services");
      setServices(res.data);
    } catch (error) {
      console.log("error is ", error);
    }
  } 
   
   useEffect(() => {
     handleGetInvoices();
     handleGetCustomers();
     handleGetServices();
   }, [])

  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [editInvoice, setEditInvoice] = useState(null); // EDIT STATE

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleEditChange = (e) => {
    setEditInvoice({ ...editInvoice, [e.target.name]: e.target.value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();

    const newInvoice = {
      ...form,
      invoiceDate: dayjs(form.invoiceDate).format("DD-MM-YYYY"),
    };

    try {
      const res = await api.post("/invoices", newInvoice);
      if (res.status === 201 || res.data) {
        handleGetInvoices();
      }
    } catch (error) {
      console.log("error is ", error);
    }

 

    setForm({
      customerName: "",
      serviceName: "",
      amount: "",
      invoiceDate: "",
      paymentStatus: "Unpaid"
    });
  };

  const deleteInvoice = async(id) => {
    try {
      const deleteRes = await api.delete(`/invoices/${id}`);
      if (deleteRes.status === 200) {
        handleGetInvoices();
      }
    } catch (error) {
      console.log("error is ", error);
    }
  };

  const openInvoice = (invoice) => {
    setSelectedInvoice(invoice);
  };

  const closeInvoice = () => {
    setSelectedInvoice(null);
  };

  const openEditModal = (invoice) => {
    setEditInvoice({ ...invoice ,invoiceDate: dayjs(
      invoice.invoiceDate,
      "DD-MM-YYYY"
      ).format("YYYY-MM-DD"),});
  };

  const closeEditModal = () => {
    setEditInvoice(null);
  };

  const updateInvoice = async(e) => {
    // setInvoices(
    //   invoices.map((inv) =>
    //     inv.id === editInvoice.id ? editInvoice : inv
    //   )
    // );
    e.preventDefault();

    const updatedData = {
      ...editInvoice,
      invoiceDate: dayjs(editInvoice.invoiceDate).format("DD-MM-YYYY"),
    };

    try {
      const res = await api.put(`/invoices/${editInvoice.id}`, updatedData);
      if (res.status === 200) {
        handleGetInvoices();
        closeEditModal();
      }
    } catch (error) {
      console.log("error is ", error);
    }

    
  };

  const updatePaymentStatus = (id, status) => {
    setInvoices(
      invoices.map((inv) =>
        inv.id === id ? { ...inv, paymentStatus: status } : inv
      )
    );
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
          <li onClick={logout} className="logout-btn">Logout</li>
        </ul>
      </aside>

      {/* Main */}
      <div className="appointments-container">
        <h2>Invoices</h2>

        {/* Add Invoice */}
        <div className="add-box">
          <h3>Create Invoice</h3>
          <form onSubmit={handleSubmit}>
            <select name="customerName" value={form.customerName} onChange={handleChange} required>
              <option value="">Select Customer</option>
              {customers.map(c => (
                <option key={c.id} value={c.customerName}>{c.customerName}</option>
              ))}
            </select>

            <select name="serviceName" value={form.serviceName} onChange={handleChange} required>
              <option value="">Select Service</option>
              {services.map(s => (
                <option key={s.id} value={s.serviceName}>{s.serviceName}</option>
              ))}
            </select>

            <input type="number" name="amount" placeholder="Amount (₹)" value={form.amount} onChange={handleChange} required />
            <input type="date" name="invoiceDate" value={form.invoiceDate} onChange={handleChange} required />

            <select name="paymentStatus" value={form.paymentStatus} onChange={handleChange}>
              <option>Unpaid</option>
              <option>Paid</option>
            </select>

            <button type="submit">Create Invoice</button>
          </form>
        </div>

        {/* Table */}
        <div className="list-box">
          <h3>All Invoices</h3>
          <table>
            <thead>
              <tr>
                <th>Customer</th>
                <th>Service</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Status</th>
                <th>View</th>
                <th>Edit</th>
                <th>Payment</th>
                <th>Delete</th>
              </tr>
            </thead>

            <tbody>
              {invoices.map((inv) => (
                <tr key={inv.id}>
                  <td>{inv.customerName}</td>
                  <td>{inv.serviceName}</td>
                  <td>₹{inv.amount}</td>
                  <td>{inv.invoiceDate}</td>
                  <td className={inv.paymentStatus === "Paid" ? "paid" : "unpaid"}>{inv.paymentStatus}</td>

                  <td>
                    <button className="view-btn" onClick={() => openInvoice(inv)}>View</button>
                  </td>

                  <td>
                    <button className="edit-btn" onClick={() => openEditModal(inv)}>Edit</button>
                  </td>

                  <td>
                    {inv.paymentStatus === "Unpaid" ? (
                      <button className="pay-btn" onClick={() => updatePaymentStatus(inv.id, "Paid")}>
                        Mark Paid
                      </button>
                    ) : (
                      <button className="unpay-btn" onClick={() => updatePaymentStatus(inv.id, "Unpaid")}>
                        Mark Unpaid
                      </button>
                    )}
                  </td>

                  <td>
                    <button className="del-btn" onClick={() => deleteInvoice(inv.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* View Modal */}
      {selectedInvoice && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h2>Invoice Details</h2>
            <p><strong>Customer:</strong> {selectedInvoice.customerName}</p>
            <p><strong>Service:</strong> {selectedInvoice.serviceName}</p>
            <p><strong>Amount:</strong> ₹{selectedInvoice.amount}</p>
            <p><strong>Date:</strong> {selectedInvoice.invoiceDate}</p>
            <p><strong>Status:</strong> {selectedInvoice.paymentStatus}</p>
            <button className="close-btn" onClick={closeInvoice}>Close</button>
          </div>
        </div>
      )}

      {/* EDIT MODAL */}
      {editInvoice && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h2>Edit Invoice</h2>

            <input
              type="text"
              name="customerName"
              value={editInvoice.customerName}
              onChange={handleEditChange}
            />

            <input
              type="text"
              name="serviceName"
              value={editInvoice.serviceName}
              onChange={handleEditChange}
            />

            <input
              type="number"
              name="amount"
              value={editInvoice.amount}
              onChange={handleEditChange}
            />

            <input
              type="date"
              name="invoiceDate"
              value={editInvoice.invoiceDate}
              onChange={handleEditChange}
            />

            <select
              name="paymentStatus"
              value={editInvoice.paymentStatus}
              onChange={handleEditChange}
            >
              <option>Unpaid</option>
              <option>Paid</option>
            </select>

            <button className="save-btn" onClick={updateInvoice}>
              Save Changes
            </button>
            <button className="close-btn" onClick={closeEditModal}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Invoice;
