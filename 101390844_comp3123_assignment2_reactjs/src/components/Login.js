import React , { useState}from 'react';
import {
  MDBContainer,
  MDBInput,
  MDBBtn,
  }from 'mdb-react-ui-kit';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import { Link } from "react-router-dom";
import Navbar from './Navbar';
import axios from 'axios';


export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };


  const handleSubmit = (e) => {
    setErrors('')
    e.preventDefault();
  
    
  axios.post('http://localhost:8086/api/v1/user/login', formData)
      .then((response) => {
        console.log('Response:', response.data);
        //after we log in 
        localStorage.setItem('loggedIn', 'true')

       window.location.replace('/employees');

      })
      .catch((error) => {
        console.error('Error:', error);
        setErrors(error.response.data.message)

        
      });
      console.log('Form submitted:', formData);
    
  };

  return (
    <div>
    <Navbar></Navbar>
    <MDBContainer className="p-3 my-5 d-flex flex-column w-50">

    <h1>Welcome!</h1>
    <form onSubmit={handleSubmit}>


    <MDBInput   name="email" wrapperClass="mb-4" label="Email address" id="form1" type="email"onChange={handleInputChange} required/>
    <MDBInput name="password" wrapperClass="mb-4" label="Password" id="form2" type="password"  value={formData.password} onChange={handleInputChange} required />

      <MDBBtn type='submit' className="mb-4">Sign in</MDBBtn>
    </form>
      <div className="text-center">
        <p>Not a member? <Link to="/register">Register</Link></p>
      </div>
      <div><p className='error-message'>{errors}</p></div>


    </MDBContainer>
    </div>
  )
}
