import React, { useState } from 'react';
import '../Styles/styles.css';
import { Link, useNavigate } from 'react-router-dom';

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const adminLogin = () => {
        let url = ('http://localhost:8000/Api/admin/login');
        let data = {
            email: email,
            password: password
        };
        let postOptions = {
            headers: { 'Content-Type': 'application/json' },
            method: 'POST',
            body: JSON.stringify(data)
        }
        fetch(url, postOptions)
            .then(Response => Response.json())
            .then(serRes => {
                if (serRes.message === "User not found. Signup Please") {
                    alert("User not found. Signup Please!");
                    navigate('/adminlogin');
                } else {
                    alert('Login Successfull....!');
                    console.log('serRes', serRes.message);
                    setEmail('');
                    setPassword('');
                    const user = { ...serRes };
                    delete user.message;
                    localStorage.setItem("user", JSON.stringify(user)); // localStorage to create storage
                    navigate('/employeelist');
                }
            })
            .catch(error => {
                console.error('Error during login:', error);
                alert('Login failed. Please try again.');
            });
    };


    return (
        <div className='container'>
            <div className='row'>
                <div className='col-lg-6'>
                    <div className='card'>
                        <div className='card-header text-center bg-danger' style={{ height: "70px" }}>
                            <i className="ti-lock text-white me-2 fs-5"></i>
                            <span className="menu-title text-white fs-5 fw-bolder">
                                Admin Login
                            </span>
                        </div>
                        <div className='card-body'>
                            <form class="row g-3 needs-validation" novalidate>
                                <div className="input-group mb-4">
                                    <span className="input-group-text" id="basic-addon1">
                                        <i className="ti-email"></i>
                                    </span>
                                    <input type="email" className="form-control" placeholder="email"
                                        aria-describedby="basic-addon1" required
                                        value={email}
                                        onChange={(e) => { setEmail(e.target.value) }} />
                                </div>
                                <div className="input-group mb-4">
                                    <span className="input-group-text" id="basic-addon1">
                                        <i className="ti-key"></i>
                                    </span>
                                    <input type="password" className="form-control" placeholder="password"
                                        aria-describedby="basic-addon1" required
                                        value={password}
                                        onChange={(e) => { setPassword(e.target.value) }} />
                                </div>

                                <div className='reg'>
                                    <button className='btn btn-danger w-100 fw-bolder' type="submit"
                                        onClick={adminLogin}>
                                        Submit
                                    </button>
                                </div>
                                <Link to='/adminregister'>Create Account?</Link>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminLogin;