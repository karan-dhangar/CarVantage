import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Contact from "./components/Contact"
import Dashboard from "./components/Dashboard";
import Registration from "./components/Registration";
import Appointments from "./components/Appointments"
import Mechanics from "./components/Mechanics";
import Customers from "./components/Customers";
import Services from "./components/Services"
import Invoice from "./components/Invoice";
import About from "./components/About";

const App =()=> {
  
  return (
    <div>
      <Routes>
        <Route path="/" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/appointments" element={<Appointments />} />
        <Route path="/mechanics" element={<Mechanics />} />
        <Route path="/customers" element={<Customers />} />
        <Route path="/services" element={<Services />} />
        <Route path="/invoice" element={<Invoice />} />
        <Route path="/about" element={<About/>} />
      </Routes>
    </div>
  )
}

export default App
