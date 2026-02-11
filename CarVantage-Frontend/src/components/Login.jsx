import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import axios from "axios";
import { baseUrl } from "../api/baseUrl";

const Login = () => {
  const nav = useNavigate();
   
   const handleLoginApi =async(values)=>{
       try{
        const response = await axios.post(`${baseUrl}/auth/login`,values);
        if(response.status === 200){
        localStorage.setItem("token",response.data.token)
        alert("Login Successful!");
      nav("/dashboard");
        } 
       }
       catch(error){
         console.log("error is ",error);
       }
        
      }

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Enter a valid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });
   
   
  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
      handleLoginApi(values);
    },
  });

  return (
    <div className="login-container">
      <h2>Login Form</h2>

      <form onSubmit={formik.handleSubmit}>
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
          <div className="error-text">{formik.errors.email}</div>
        )}

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
          <div className="error-text">{formik.errors.password}</div>
        )}

        <button type="submit" className="login-btn">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
