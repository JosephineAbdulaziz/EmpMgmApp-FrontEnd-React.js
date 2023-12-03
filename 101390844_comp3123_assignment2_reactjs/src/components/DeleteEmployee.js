
import React , {useEffect,useState}from 'react';
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBContainer
} from 'mdb-react-ui-kit';
import { Link , useParams} from "react-router-dom";
import axios from 'axios';


export default function DeleteEmployee() {
  const {id} = useParams();
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


  const handleClick = (e) => {
    e.preventDefault();
    axios
    .delete(
      `http://localhost:8086/api/v1/emp/employees/${id}`
    )
    .then((res) => {
      console.log(res.data);
      window.location.replace('/employees');
    
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
    });

  }


  return (
    <MDBContainer className="p-3 my-5 d-flex flex-column w-50">
    <h1>Are you sure you want to delete this employee?</h1>

    <MDBCard>
      <MDBCardBody>
        <MDBCardTitle> <b>{employeeDetails.first_name} {employeeDetails.last_name}</b></MDBCardTitle>
        <br/>
    
        <Link to="/employees" className="ripple ripple-surface ripple-surface-light btn btn-primary me-1" >
        Back
      </Link>     
      <Link to="/employees"  onClick={handleClick} className="ripple ripple-surface ripple-surface-light btn btn-danger me-1" >
        Delete
      </Link>       
      
      </MDBCardBody>
    </MDBCard>
    </MDBContainer>

  );
}