import React, { useState, useEffect } from 'react'
import {
    MDBContainer,
    MDBBtn,
    MDBInput,
  }
  from 'mdb-react-ui-kit';
  import 'mdb-react-ui-kit/dist/css/mdb.min.css';
  import { Link, useParams } from "react-router-dom";
import { MDBRadio } from 'mdb-react-ui-kit';
import MemberNavbar from './MemberNavbar';
import axios from 'axios';



export default function UpdateEmployee() {
  const [errors , setErrors] = useState({})
  const [employeeDetails, setEmployeeDetails] = useState(
    {
      first_name: '',
      last_name: '',
      email: '',
      gender: '',
      salary: '',
    }
  );
  
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(
        `http://localhost:8086/api/v1/emp/employees/${id}`
      )
      .then((res) => {
        console.log(res.data);
        const employeeRes = res.data;
        setEmployeeDetails(employeeRes);
      
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []); 


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEmployeeDetails({
      ...employeeDetails,
      [name]: value,
    });
  };

  const handleSubmit= (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!employeeDetails.first_name.match(/[A-Za-z]{3,16}/)) {
      newErrors.first_name = 'Invalid name! (only letters, 3-16 characters)';
    }
    if (!employeeDetails.last_name.match(/[A-Za-z]{3,16}/)) {
      newErrors.last_name = 'Invalid last name! (only letters, 3-16 characters)';
    }
  
    
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      axios.put(`http://localhost:8086/api/v1/emp/employees/${id}`, employeeDetails)
        .then((response) => {
          console.log('Response:', response.data);
          window.location.replace('/employees');

        })
        .catch((error) => {
          console.error('Error:', error);
        });
     
      

      console.log('Form submitted:', employeeDetails);
    }

  }
  return (
    <div>
    <MemberNavbar></MemberNavbar>
    <MDBContainer className="p-3 my-5 d-flex flex-column w-50">

    <h1>Update Employee</h1>

    <form onSubmit={handleSubmit}>

 
<MDBInput onChange={handleInputChange} value={employeeDetails.first_name} name='first_name' wrapperClass='mb-4'  id='form1' type='text' required />
{errors.first_name && <p className="error-message">{errors.first_name}</p>}

<MDBInput onChange={handleInputChange} value={employeeDetails.last_name} name='last_name' wrapperClass='mb-4'  id='form1' type='text' required/>
{errors.last_name && <p className="error-message">{errors.last_name}</p>}

<MDBInput onChange={handleInputChange} value={employeeDetails.email}  name='email' wrapperClass='mb-4'  id='form1' type='email' required/>
{errors.email && <p className="error-message">{errors.email}</p>}


<>
<p>Gender</p>

{employeeDetails.gender === 'Male' ? (
  <>
    <MDBRadio
      onChange={handleInputChange}
      name='gender'
      id='inlineRadio1'
      value='Male'
      label='Male'
      inline
      checked
    />
    <MDBRadio
      onChange={handleInputChange}
      name='gender'
      id='inlineRadio2'
      value='Female'
      label='Female'
      inline
    />
    <MDBRadio
      onChange={handleInputChange}
      name='gender'
      id='inlineRadio3'
      value='Other'
      label='Others'
      inline
    />
  </>
) : null}
{employeeDetails.gender === 'Other' ? (
  <>
    <MDBRadio
      onChange={handleInputChange}
      name='gender'
      id='inlineRadio1'
      value='Male'
      label='Male'
      inline
      
    />
    <MDBRadio
      onChange={handleInputChange}
      name='gender'
      id='inlineRadio2'
      value='Female'
      label='Female'
      inline
    />
    <MDBRadio
      onChange={handleInputChange}
      name='gender'
      id='inlineRadio3'
      value='Other'
      label='Others'
      inline
      checked
    />
  </>
) : null}
{employeeDetails.gender === 'Female' ? (
  <>
    <MDBRadio
      onChange={handleInputChange}
      name='gender'
      id='inlineRadio1'
      value='Male'
      label='Male'
      inline
    />
    <MDBRadio
      onChange={handleInputChange}
      name='gender'
      id='inlineRadio2'
      value='Female'
      label='Female'
      inline
      checked

    />
    <MDBRadio
      onChange={handleInputChange}
      name='gender'
      id='inlineRadio3'
      value='Other'
      label='Others'
      inline
    />
  </>
) : null}


</>

<MDBInput onChange={handleInputChange} value={employeeDetails.salary} name='salary' wrapperClass='mb-4' label={employeeDetails.salary} id='form2' type='number' required/>
{errors.salary && <p className="error-message">{errors.salary}</p>}

<MDBBtn type='submit' className="mb-4">Update Employee</MDBBtn>

</form>
    </MDBContainer>
    </div>
  )
}
