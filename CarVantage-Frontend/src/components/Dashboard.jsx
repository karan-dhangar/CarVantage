import React,{useState,useEffect} from 'react'
import { useNavigate } from "react-router-dom";
import "./Dashboard.css"
import api from "../api/axios";

const Dashboard = () => {
    const navigate = useNavigate();
    const logout = () => {
        localStorage.removeItem("token");
        navigate("/login", { replace: true });
      };
    const [dashboard,setDashboard] = useState({}); 
    const handleDashboardGetApi=async()=>{
      try{
        const res = await api.get("/dashboard");
        console.log("response is ", res)
        setDashboard(res.data)
    }
    catch(error){
      console.log("error is ",error);
    }
    }
    useEffect(() => {
      handleDashboardGetApi()
    }, [])

    return (
        <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2 className="brand">🚗 Car Vantage</h2>
        <ul>
          <li>Dashboard</li>
          <li onClick={()=>{ navigate("/appointments") }}>Appointments</li>
          <li onClick={()=>{ navigate("/mechanics") }}>Mechanics</li>
          <li onClick={()=>{ navigate("/customers") }}>Customers</li>
          <li onClick={() => {navigate("/services")}}>Services</li>
          <li onClick={() => {navigate("/invoice")}}>Invoices</li>
          <li onClick={logout} className="logout-btn">Logout</li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <header className="topbar">
          <h2>Dashboard Overview</h2>
        </header>

        {/* Stats Cards */}
        <div className="stats-section">
          <div className="card">
            <h3>Total Appointments</h3>
    <p>{dashboard.totalAppointments}</p>
          </div>
          <div className="card">
            <h3>Pending Repairs</h3>
    <p>{dashboard.pendingRepairs}</p>
          </div>
          <div className="card">
            <h3>Completed Repairs</h3>
    <p>{dashboard.completedRepairs}</p>
          </div>
          <div className="card">
            <h3>Available Mechanics</h3>
    <p>{dashboard.availableMechanics}</p>
          </div>
        </div>

        {/* Tables */}
        <div className="tables-section">
          <div className="box">
            <h3>Upcoming Appointments</h3>
            <table>
              <thead>
                <tr>
                  <th>Customer</th>
                  <th>Car Model</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {
                  dashboard && dashboard.upcomingAppointments && dashboard.upcomingAppointments.length && dashboard.upcomingAppointments.map((item)=>{
                    return(
                      <tr>
                        <td>{item.customerName}</td>
                    <td>{item.carModel}</td>
                    <td>{item.appointmentDate}</td>
                    <td>{item.appointmentStatus}</td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </table>
          </div>

          <div className="box">
            <h3>Recent Service Requests</h3>
            <table>
              <thead>
                <tr>
                  <th>Service Name</th>
                  <th>Price</th>
                  <th>Date</th>
                  <th>Time Required</th>
                </tr>
              </thead>
              <tbody>
              {
                 dashboard && dashboard.recentServices &&dashboard.recentServices.length && dashboard.recentServices
                  .map((item)=>{
                    return(
                      <tr>
                        <td>{item.serviceName}</td>
                        <td>{item.price}</td>
                        <td>{item.serviceDate}</td>
                        <td>{item.timeRequired}</td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  
    )
}

export default Dashboard;
