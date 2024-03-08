import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';


const EditEmp = () => {
    const [file, setFile] = useState('');
    const [username, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [mobileno, setMobileNo] = useState('');
    const [designation, setDesignation] = useState('');
    const [gender, setGender] = useState('');
    const [coursename, setCourseName] = useState('');
    const { id } = useParams();
    console.log('id*****', id);
    const navigate = useNavigate();


    function handleChange(e) {
        console.log(e.target.files);
        setFile(URL.createObjectURL(e.target.files[0]));
    }

    const getEmpById = () => {
        fetch(`http://localhost:8000/Api/employee/edit/${id}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(serRes => {
                console.log('serRes*****', serRes);
                setUserName(serRes.username);
                setEmail(serRes.email);
                setMobileNo(serRes.mobileno);
                setDesignation(serRes.designation);
                setGender(serRes.gender);
                setCourseName(serRes.coursename);
            })
            .catch(error => {
                console.error('Error fetching employee by ID:', error.message);
                // Handle the error, e.g., display an alert or update state accordingly
            });
    };
    


    useEffect(() => { 
        getEmpById();
    }, []);


    const updateEmp = () => {
        let url = (`http://localhost:8000/Api/employee/update/${id}`);
        let data = {
            image:file,
            username: username,
            email: email,
            mobileno: mobileno,
            designation: designation,
            gender: gender,
            coursename: coursename
        };
        let postOptions = {
            headers: { 'Content-Type': 'application/json' },
            method: 'PUT',
            body: JSON.stringify(data)
        }
        fetch(url, postOptions)
            .then(Response => Response.json())
            .then(serRes => {
                alert('Employee Updated Successfull....!');
                console.log('serRes', serRes);
                setUserName('');
                setEmail('');
                setMobileNo('');
                setDesignation('');
                setGender('');
                setCourseName('');
                navigate('/employeelist');
            })
            .catch(error => {
                console.error('Error during registration:', error);
                alert('Employee Updated failed. Please try again.');
            });
    };


    return (
        <div className='container'>
            <div className='row'>
                <div className='col-lg-12'>
                    <div className='card'>
                        <div className='card-header bg-danger text-center' style={{ height: "70px" }}>
                            <i className="ti-plus text-white me-2 fs-5"></i>
                            <span className="text-white fs-5 fw-bolder">
                                Update Employee Profile
                            </span>
                        </div>
                        <div className='card-body'>
                            <div className="item-thumbnail text-center mb-3">
                                {file ? (
                                    <img src={file} alt="Uploaded Image" className='profile-pic rounded-circle'
                                        width="100" height="100" />
                                ) : (
                                    <img
                                        src="images/faces/face4.jpg" className='profile-pic rounded-circle'
                                        alt="Placeholder Icon"
                                        width="100" height="100"
                                    />
                                )}
                                <br />
                                <input type='file' onChange={handleChange} required />
                            </div>
                            <form className="row g-3 needs-validation" novalidate>
                                <div className='row mt-3'>
                                    <div className='col-lg-6'>
                                        <div className="input-group mb-4">
                                            <span className="input-group-text" id="basic-addon1">
                                                <i className="ti-user"></i>
                                            </span>
                                            <input type="text" className="form-control" placeholder="username"
                                                id="validationCustom01" required
                                                value={username}
                                                onChange={(e) => { setUserName(e.target.value) }} />
                                            <div className="valid-feedback">
                                                Looks good!
                                            </div>
                                        </div>

                                    </div>
                                    <div className='col-lg-6'>
                                        <div className="input-group mb-4">
                                            <span className="input-group-text" id="basic-addon1">
                                                <i className="ti-email"></i>
                                            </span>
                                            <input type="email" className="form-control" placeholder="email"
                                                aria-describedby="basic-addon1" required
                                                value={email}
                                                onChange={(e) => { setEmail(e.target.value) }} />
                                        </div>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col-lg-6'>
                                        <div className="input-group mb-4">
                                            <span className="input-group-text" id="basic-addon1">
                                                <i className="ti-mobile"></i>
                                            </span>
                                            <input type="number" className="form-control" placeholder="mobile number"
                                                aria-describedby="basic-addon1" required
                                                value={mobileno}
                                                onChange={(e) => { setMobileNo(e.target.value) }} />
                                        </div>
                                    </div>
                                    <div className='col-lg-6'>
                                        <div className="input-group mb-2">
                                            <span className="input-group-text" id="basic-addon1">
                                                <i className="ti-medall"></i>
                                            </span>
                                            <input type="text" className="form-control" placeholder="Designation"
                                                aria-describedby="basic-addon1" required
                                                value={designation}
                                                onChange={(e) => { setDesignation(e.target.value) }} />
                                        </div>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col-lg-6'>
                                        <div className='mb-2'>
                                            <label for="validationServer04" className="form-label">Gender</label>
                                            <select className="form-select" id="validationServer04" required
                                                value={gender}
                                                onChange={(e) => { setGender(e.target.value) }}>
                                                <option>select one</option>
                                                <option>Male</option>
                                                <option>Female</option>
                                                <option>Other</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className='col-lg-6'>
                                        <div className='mb-4'>
                                            <label for="validationServer04" className="form-label">Course Name</label>
                                            <select className="form-select" id="validationServer04" required
                                                value={coursename}
                                                onChange={(e) => { setCourseName(e.target.value) }}>
                                                <option>select one</option>
                                                <option>BSC</option>
                                                <option>BCA</option>
                                                <option>B.TECH</option>
                                                <option>MCA</option>
                                                <option>M.TECH</option>
                                                <option>Ph.D</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <button className='btn btn-danger w-100 fw-bolder' type="submit"
                                        onClick={updateEmp}>
                                        Update
                                    </button>
                                </div>
                                <Link to='/employeelist'>cancel?</Link>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditEmp;