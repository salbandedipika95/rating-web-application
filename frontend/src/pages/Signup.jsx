import React from "react";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./Form.css";

const Signup = () => {
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      address: "",
      password: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().min(20).max(60).required("Name required"),
      email: Yup.string().email().required("Email required"),
      address: Yup.string().max(400).required("Address required"),
      password: Yup.string()
        .min(8)
        .max(16)
        .matches(/[A-Z]/, "Must include uppercase")
        .matches(/[!@#$%^&*]/, "Must include special character")
        .required("Password required"),
    }),
    onSubmit: async (values) => {
      try {
        await axios.post("http://localhost:5000/api/auth/register", values);
        alert("Signup successful!");
      } catch (err) {
        alert("Signup failed: " + err.response?.data?.error || err.message);
      }
    },
  });

  return (
    <>
      <div className="outer-container">
        <div className="form-container">
          <h2>Signup</h2>
          <form onSubmit={formik.handleSubmit}>
            <input
              name="name"
              placeholder="Full Name"
              onChange={formik.handleChange}
              value={formik.values.name}
            />
            {formik.errors.name && formik.touched.name && (
              <div className="error">{formik.errors.name}</div>
            )}

            <input
              name="email"
              type="email"
              placeholder="Email"
              onChange={formik.handleChange}
              value={formik.values.email}
            />
            {formik.errors.email && formik.touched.email && (
              <div className="error">{formik.errors.email}</div>
            )}

            <input
              name="address"
              placeholder="Address"
              onChange={formik.handleChange}
              value={formik.values.address}
            />
            {formik.errors.address && formik.touched.address && (
              <div className="error">{formik.errors.address}</div>
            )}

            <input
              name="password"
              type="password"
              placeholder="Password"
              onChange={formik.handleChange}
              value={formik.values.password}
            />
            {formik.errors.password && formik.touched.password && (
              <div className="error">{formik.errors.password}</div>
            )}

            <button type="submit">Signup</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
