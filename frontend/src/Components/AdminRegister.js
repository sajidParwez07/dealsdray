import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const AdminRegister = () => {
    const [adminname, setAdminName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmpassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    const [adminnameError, setAdminNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmpasswordError, setConfirmPasswordError] = useState('');

    const adminSignUp = () => {
        let formstatus = true;

        // Reset errors
        setAdminNameError('');
        setEmailError('');
        setPasswordError('');
        setConfirmPasswordError('');

        // Validate adminname
        if (adminname.trim() === '') {
            setAdminNameError('Please enter your username');
            formstatus = false;
        }

        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.trim())) {
            setEmailError('Please enter a valid email address');
            formstatus = false;
        }

        // Validate password
        if (password.trim() === '') {
            setPasswordError('Please enter your password');
            formstatus = false;
        }

        // Validate confirmpassword
        if (confirmpassword.trim() === '') {
            setConfirmPasswordError('Please confirm your password');
            formstatus = false;
        } else if (confirmpassword.trim() !== password.trim()) {
            setConfirmPasswordError('Passwords do not match');
            formstatus = false;
        }

        if (formstatus) {
            // Proceed with registration
            let url = 'http://localhost:8000/Api/admin/signup';
            let data = {
                adminname: adminname.trim(),
                email: email.trim(),
                password: password.trim(),
                confirmpassword: confirmpassword.trim()
            };

            let postOptions = {
                headers: { 'Content-Type': 'application/json' },
                method: 'POST',
                body: JSON.stringify(data)
            };

            fetch(url, postOptions)
                .then(Response => Response.json())
                .then(serRes => {
                    alert('Registration Successful!');
                    console.log('serRes', serRes);
                    setAdminName('');
                    setEmail('');
                    setPassword('');
                    setConfirmPassword('');
                    navigate('/');
                })
                .catch(error => {
                    console.error('Error during registration:', error);
                    alert('Registration failed. Please try again.');
                });
        } else {
            // Display an alert for validation errors
            alert('Please correct the validation errors');
        }
    };

    // const adminSignUp = () => {

    //     let url = ('http://localhost:8000/Api/admin/signup');
    //     let data = {
    //         adminname: adminname,
    //         email: email,
    //         password: password,
    //         confirmpassword: confirmpassword
    //     };
    //     let postOptions = {
    //         headers: { 'Content-Type': 'application/json' },
    //         method: 'POST',
    //         body: JSON.stringify(data)
    //     }
    //     fetch(url, postOptions)
    //         .then(Response => Response.json())
    //         .then(serRes => {
    //             alert('Registrations Successfull....!');
    //             console.log('serRes', serRes);
    //             setAdminName('');
    //             setEmail('');
    //             setPassword('');
    //             setConfirmPassword('');
    //             navigate('/adminlogin');
    //         })
    //         .catch(error => {
    //             console.error('Error during registration:', error);
    //             alert('Registration failed. Please try again.');
    //         });
    // };



    return (
        <div className='container'>
            <div className='row'>
                <div className='col-lg-6'>
                    <div className='card'>
                        <div className='card-header text-center bg-danger' style={{ height: "70px" }}>
                            <i className="ti-id-badge text-white me-2 fs-5"></i>
                            <span className="menu-title text-white fs-5 fw-bolder">
                                Admin Registration
                            </span>
                        </div>
                        <div className='card-body'>
                            <form className="row g-3 needs-validation">
                                <div className="input-group mb-4">
                                    <span className="input-group-text" id="basic-addon1">
                                        <i className="ti-user"></i>
                                    </span>
                                    <input type="text" className="form-control" placeholder="username"
                                        id="validationCustom01" 
                                        value={adminname}
                                        onChange={(e) => { setAdminName(e.target.value) }} />
                                        <p className='text-danger'>{adminnameError}</p>
                                </div>
                                <div className="input-group mb-4">
                                    <span className="input-group-text" id="basic-addon1">
                                        <i className="ti-email"></i>
                                    </span>
                                    <input type="email" className="form-control" placeholder="email"
                                        aria-describedby="basic-addon1" 
                                        value={email}
                                        onChange={(e) => { setEmail(e.target.value) }} />
                                </div>
                                <div className="input-group mb-4">
                                    <span className="input-group-text" id="basic-addon1">
                                        <i className="ti-key"></i>
                                    </span>
                                    <input type="password" className="form-control" placeholder="password"
                                        aria-describedby="basic-addon1" 
                                        value={password}
                                        onChange={(e) => { setPassword(e.target.value) }} />
                                </div>
                                <div className="input-group mb-4">
                                    <span className="input-group-text" id="basic-addon1">
                                        <i className="ti-key"></i>
                                    </span>
                                    <input type="password" className="form-control" placeholder="confirm password"
                                        aria-describedby="basic-addon1" 
                                        value={confirmpassword}
                                        onChange={(e) => { setConfirmPassword(e.target.value) }} />
                                </div>
                                <div className="form-check mb-4 ms-3">
                                    <input className="form-check-input fs-4" type="checkbox" value="" id="invalidCheck" required />
                                    <label className="form-check-label" for="invalidCheck">
                                        I Agree with Terms & Conditions*
                                    </label>
                                </div>
                                <div className=''>
                                    <button className='btn btn-danger w-100 fw-bolder' type="submit"
                                    onClick={adminSignUp}>
                                        Submit
                                    </button>
                                </div>
                                <Link to='/'>Login?</Link>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default AdminRegister