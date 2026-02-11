import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./Registration.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../api/baseUrl";


const Registration = () => {
    const nav = useNavigate();
   
    const handleRegistration = async(values)=>{
      try{ 
      const response = await axios.post(`${baseUrl}/auth/register`,values);
      if(response.status===200){
        alert("Registration Successful!");
        nav("/login");
      }
      } 
       catch(error){
         console.log("error is ",error);
       }

       
    }
    const validationSchema = Yup.object({
        fullName: Yup.string()
          .required("Full Name is required")
          .min(3, "Name must be at least 3 characters"),
    
        email: Yup.string()
          .email("Invalid email format")
          .required("Email is required"),
    
        username: Yup.string()
          .required("Username is required")
          .min(3, "Username must be at least 3 characters"),
    
        mobile: Yup.string()
          .matches(/^[0-9]{10}$/, "Mobile number must be 10 digits")
          .required("Mobile number is required"),
    
        password: Yup.string()
          .required("Password is required")
          .min(6, "Password must be at least 6 characters"),
    
        confirmPassword: Yup.string()
          .oneOf([Yup.ref("password"), null], "Passwords must match")
          .required("Confirm Password is required")
      });
       
      const formik = useFormik({
        initialValues: {
          fullName: "",
          email: "",
          username: "",
          mobile: "",
          password: "",
          confirmPassword: ""
        },
        validationSchema,
        onSubmit: (values) => {
          console.log("Registration Data: ", values);
          handleRegistration(values);
        }
      });
    
       

    return (
        <div className="reg-container">
  <h2>Registration Form</h2>

      <form onSubmit={formik.handleSubmit}>

        {/* Full Name */}
        <label>Full Name</label>
        <input
          type="text"
          name="fullName"
          value={formik.values.fullName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Enter full name"
        />
        {formik.touched.fullName && formik.errors.fullName && (
          <div style={{ color: "red" }}>{formik.errors.fullName}</div>
        )}

        {/* Email */}
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Enter email"
        />
        {formik.touched.email && formik.errors.email && (
          <div style={{ color: "red" }}>{formik.errors.email}</div>
        )}

        {/* Username */}
        <label>Username</label>
        <input
          type="text"
          name="username"
          value={formik.values.username}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Enter username"
        />
        {formik.touched.username && formik.errors.username && (
          <div style={{ color: "red" }}>{formik.errors.username}</div>
        )}

        {/* Mobile */}
        <label>Mobile</label>
        <input
          type="text"
          name="mobile"
          value={formik.values.mobile}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Enter mobile number"
        />
        {formik.touched.mobile && formik.errors.mobile && (
          <div style={{ color: "red" }}>{formik.errors.mobile}</div>
        )}

        {/* Password */}
        <label>Password</label>
        <input
          type="password"
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Enter password"
        />
        {formik.touched.password && formik.errors.password && (
          <div style={{ color: "red" }}>{formik.errors.password}</div>
        )}

        {/* Confirm Password */}
        <label>Confirm Password</label>
        <input
          type="password"
          name="confirmPassword"
          value={formik.values.confirmPassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Re-enter password"
        />
        {formik.touched.confirmPassword && formik.errors.confirmPassword && (
          <div style={{ color: "red" }}>{formik.errors.confirmPassword}</div>
        )}

        {/* Submit Button */}
        <button className="reg-btn" type="submit">Register</button>
        <button className="reg-btn" type="button" onClick={()=>{nav("/login")}}>Login</button>
      </form>
    </div>
  
    )
}

export default Registration
