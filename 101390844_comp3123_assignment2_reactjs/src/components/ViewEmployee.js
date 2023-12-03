
import React, { useState, useEffect , Dimensions} from 'react';
import axios from 'axios';
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBBtn,
  MDBContainer
} from 'mdb-react-ui-kit';
import { Link ,useParams} from "react-router-dom";


export default function ViewEmployee() {
  
  const { id } = useParams();
  const [employeeDetails, setEmployeeDetails] = useState([]);

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
 console.log(employeeDetails)




  return (
    <MDBContainer className="p-3 my-5 d-flex flex-column w-50">

    <MDBCard>
      <MDBCardBody>
        <MDBCardTitle> <b>{employeeDetails.first_name} {employeeDetails.last_name}  </b></MDBCardTitle>
        <br/>
        <MDBCardText>
          Email: <b>{employeeDetails.email} </b>
        </MDBCardText>
        <br/>
        <MDBCardText>
          Gender: <b>{employeeDetails.gender} </b>
        </MDBCardText>
        <br/>
        <MDBCardText>
          Salary: <b>{employeeDetails.salary} </b>
        </MDBCardText>
        <br/>
        <Link to="/employees" class="ripple ripple-surface ripple-surface-light btn btn-primary me-1" >
        Back
      </Link>      </MDBCardBody>
    </MDBCard>
    </MDBContainer>

  );
}