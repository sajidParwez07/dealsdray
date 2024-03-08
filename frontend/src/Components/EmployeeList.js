import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const EmployeeList = () => {
  const [empdata, setEmpData] = useState([]);

  const getEmpData = () => {
    fetch('http://localhost:8000/Api/employee/get')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(empData => {
            console.log('empData', empData);
            setEmpData(empData);
        })
        .catch(error => {
            console.error('Error fetching employee data:', error.message);
        });
};


  useEffect(() => {
    getEmpData();
  }, [1]);


  const deletedEmp = (_id) => {
    let url = `http://localhost:8000/Api/employee/delete/${_id}`;
    let postOptions = {
        headers: { 'Content-Type': 'application/json' },
        method: 'DELETE'
    };

    fetch(url, postOptions)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(serRes => {
            alert("Employee Deleted Successfully!");
            getEmpData();
        })
        .catch(error => {
            console.error('Error deleting employee:', error.message);
            alert('Employee Deletion failed. Please try again.');
        });
};



  return (
    <div className='container'>
      <div className='row'>
        <div className='col-lg-12'>
          <div className='card' style={{ width: "1300px", marginLeft: "-200px" }}>
            <div className='card-header bg-danger text-white'>
              <div className='row'>
                <div className='col-lg-3'>
                  <Link to='/addnewemp' className='btn btn-primary'>
                    <i className='ti-plus me-2'></i>
                    Add New Employee
                  </Link>
                </div>
                <div className='col-lg-5'>
                  <h4 className='text-center'>Total No. of Employee : 10</h4>
                </div>
                <div className='col-lg-4'>
                  <div className="input-group mb-3">
                    <input type="text" className="form-control" placeholder="search employee" aria-label="Recipient's username" aria-describedby="basic-addon2" />
                    <span className="input-group-text" id="basic-addon2">
                      <i className='ti-search'></i>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className='card-body'>
              <table className='table text-center'>
                <thead>
                  <tr>
                    <th>S.No</th>
                    <th>Profile Pic</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Mob No.</th>
                    <th>Designation</th>
                    <th>Gender</th>
                    <th>Course</th>
                    <th>Created Date</th>
                    <th colSpan="2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    empdata.map((value, index) => {
                      return (
                        <tr key={index + 1}>
                          <td>{value._id}</td>
                          <td><img src={value.image}/></td>
                          <td>{value.username}</td>
                          <td>{value.email}</td>
                          <td>{value.mobileno}</td>
                          <td>{value.designation}</td>
                          <td>{value.gender}</td>
                          <td>{value.coursename}</td>
                          <td>{value.createdAt}</td>
                          <td>
                            <Link to={`/editemp/${value._id}`} className='btn btn-warning'>Edit</Link>
                          </td>
                          <td>
                            <button  className='btn btn-danger' onClick={deletedEmp.bind(this, value._id)}>Delete</button>
                          </td>
                        </tr>
                      )
                    })
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EmployeeList;