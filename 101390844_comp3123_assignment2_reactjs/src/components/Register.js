import React, { useState  } from 'react'
import {
    MDBContainer,
    MDBBtn,
    MDBInput,
  }
  from 'mdb-react-ui-kit';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import { Link } from "react-router-dom";
import Navbar from './Navbar';
import '../App.css'
import axios from 'axios';


export default function Register() {
    const [formData, setFormData] = useState({
        fname: '',
        lname: '',
        email: '',
        password: '',
      });
    
      const [errors, setErrors] = useState({});
      const [errorMessage, setErrorMessage] = useState()
    
      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
      };
      console.log(formData)

    
      const handleSubmit = (e) => {
        console.log(e)
        e.preventDefault();
        const newErrors = {};

        if (!formData.fname.match(/[A-Za-z]{3,16}/)) {
          newErrors.fname = 'Invalid name! (only letters, 3-16 characters)';
        }
        if (!formData.lname.match(/[A-Za-z]{3,16}/)) {
          newErrors.lname = 'Invalid last name! (only letters, 3-16 characters)';
        }
        if (!formData.password.match(/^.{6,16}$/)) {
          newErrors.password = 'Password is required';
        }
    
        setErrors(newErrors);
    
        if (Object.keys(newErrors).length === 0) {
          axios.post('http://localhost:8086/api/v1/user/signup', formData)
          .then((response) => {
            console.log('Response:', response.data);
            localStorage.setItem('loggedIn', 'true')
            window.location.replace('/employees');
  
          })
          .catch((error) => {
            console.error('Error:', error);
            setErrorMessage(error.response.data.message);

          });
          console.log('Form submitted:', formData);
        }
      };
    




  return (
    <div>
    <Navbar></Navbar>
    <MDBContainer className="p-3 my-5 d-flex flex-column w-50">
        <form onSubmit={handleSubmit}>
          <h1>Register</h1>

          <MDBInput
            name="fname"
            wrapperClass="mb-4"
            label="First Name"
            id="form1"
            type="text"
            value={formData.fname}
            onChange={handleInputChange}
            required
          />
          {errors.fname && <p className="error-message">{errors.fname}</p>}

          <MDBInput
            name="lname"wrapperClass="mb-4" label="Last Name"
            id="form1"
            type="text"
            value={formData.lname}
            onChange={handleInputChange}
            required
          />
          {errors.lname && <p className="error-message">{errors.lname}</p>}

          <MDBInput
            name="email"
            wrapperClass="mb-4"
            label="Email address"
            id="form1"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
          {errors.email && <p className="error-message">{errors.email}</p>}

          <MDBInput
            name="password"
            wrapperClass="mb-4"
            label="Password"
            id="form2"
            type="password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
          {errors.password && <p className="error-message">{errors.password}</p>}

          <MDBBtn className="mb-4" type="submit">
            Sign Up
          </MDBBtn>
        </form>

        <div className="text-center">
          <p>
            Already a member? <Link to="/login">Login</Link>
          </p>
        </div>
        <div><p className='error-message'>{errorMessage}</p></div>

      </MDBContainer>
    </div>
  )
}
