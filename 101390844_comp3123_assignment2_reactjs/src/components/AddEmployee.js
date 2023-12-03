import React, { useState, useEffect } from 'react'
import {
    MDBContainer,
    MDBBtn,
    MDBInput,
  }
  from 'mdb-react-ui-kit';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import { Link } from "react-router-dom";
import { MDBRadio } from 'mdb-react-ui-kit';
import MemberNavbar from './MemberNavbar';
import axios from 'axios';




export default function AddEmployee() {
  const [errors , setErrors] = useState({})
  const [formData , setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    gender: '',
    salary: '',
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  console.log(formData)

  const handleSubmit= (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.first_name.match(/[A-Za-z]{3,16}/)) {
      newErrors.first_name = 'Invalid name! (only letters, 3-16 characters)';
    }
    if (!formData.last_name.match(/[A-Za-z]{3,16}/)) {
      newErrors.last_name = 'Invalid last name! (only letters, 3-16 characters)';
    }
    if (!formData.gender.match(/[Male,Female,Other]/)) {
      newErrors.password = 'Gender is required';
    }
    
    setErrors(newErrors);

    
    if (Object.keys(newErrors).length === 0) {

      
        axios.post('http://localhost:8086/api/v1/emp/employees', formData)
        .then((response) => {
          console.log('Response:', response.data);
          window.location.replace('/employees');

        })
        .catch((error) => {
          console.error('Error:', error);
        });
     
    }

  }


  return (
    <div>
    <MemberNavbar></MemberNavbar>
    {localStorage.getItem('loggedIn') && (
    <MDBContainer className="p-3 my-5 d-flex flex-column w-50">

    <h1>Add Employee</h1>
    <form onSubmit={handleSubmit}>

 
      <MDBInput onChange={handleInputChange} value={formData.first_name} name='first_name' wrapperClass='mb-4' label='First Name' id='form1' type='text' required />
      {errors.first_name && <p className="error-message">{errors.first_name}</p>}

      <MDBInput onChange={handleInputChange} value={formData.last_name} name='last_name' wrapperClass='mb-4' label='Last Name' id='form1' type='text' required/>
      {errors.last_name && <p className="error-message">{errors.last_name}</p>}

      <MDBInput onChange={handleInputChange} value={formData.email} name='email' wrapperClass='mb-4' label='Email address' id='form1' type='email' required/>
      {errors.email && <p className="error-message">{errors.email}</p>}


      <>
      <p>Gender</p>
      <MDBRadio onChange={handleInputChange} name='gender' id='inlineRadio1' value='Male' label='Male' inline required/>
      <MDBRadio onChange={handleInputChange} name='gender' id='inlineRadio2' value='Female' label='Female' inline required/>
      <MDBRadio onChange={handleInputChange} name='gender' id='inlineRadio3' value='Other' label='Others'  inline required/>
      {errors.gender && <p className="error-message">{errors.gender}</p>}

    </>
      
      <MDBInput onChange={handleInputChange} value={formData.salary} name='salary' wrapperClass='mb-4' label='Salary' id='form2' type='number' required/>
      {errors.salary && <p className="error-message">{errors.password}</p>}

      <MDBBtn type='submit' className="mb-4">Add Employee</MDBBtn>

      </form>


    </MDBContainer>
    )}
    </div>
  )
}
