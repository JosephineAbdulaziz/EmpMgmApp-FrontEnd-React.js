import React, { useState, useEffect , Dimensions} from 'react';
import axios from 'axios';
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import MemberNavbar from './MemberNavbar';
import { MDBBtn } from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom';


export default function EmployeeList() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    axios
      .get(
        'http://localhost:8086/api/v1/emp/employees'
      )
      .then((res) => {
        console.log(res.data);
        const employeeRes = res.data;
        setEmployees(employeeRes);
      
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []); 
 console.log(employees)





  return (
    <div>
    
    <MemberNavbar></MemberNavbar>
    {localStorage.getItem('loggedIn') && (
    <MDBTable>
      <MDBTableHead>
        <tr>
          <th scope='col'>First Name</th>
          <th scope='col'>Last Name</th>
          <th scope='col'>Email</th>
          <th scope='col'></th>

        </tr>
      </MDBTableHead>

      <MDBTableBody>
        {employees.map((item, index) => (
          <tr key={index}>
            <th scope='row'>{item.first_name}</th>
            <td>{item.last_name}</td>
            <td>{item.email}</td>
            <td>
              <Link to={`/employees/view/${item._id}`}  className="ripple ripple-surface ripple-surface-light btn btn-primary me-1">
                View
              </Link>
              <Link to={`/employees/update/${item._id}`}  className="ripple ripple-surface ripple-surface-light btn btn-secondary me-1">
                Update
              </Link> 
              <Link to={`/employees/delete/${item._id}`}   className="ripple ripple-surface ripple-surface-light btn btn-danger me-1">
                Delete
              </Link>
            </td>
          </tr>
        ))}
      </MDBTableBody>
      



      



    </MDBTable> 
    ) }
    </div>
    
  );
}