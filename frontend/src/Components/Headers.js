import React, { useEffect, useState } from 'react';
import '../Styles/styles.css';
import { Link } from 'react-router-dom';

const user = JSON.parse(localStorage.getItem("user"));

const Headers = ({ handleToggleSidebar }) => {
    const[username, setUserName] = useState('');

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user && user.user) {
            setUserName(`welcome : ${user.user.adminname}`);
        }
    }, []);
    console.log('name', username)
    
    return (
        <div>
            <nav className="navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row">
                <div className="text-center navbar-brand-wrapper d-flex align-items-center justify-content-center">
                    <a className="navbar-brand brand-logo me-5" href="index.html"><img src="images/logo.jpg" className="me-2" alt="logo" /></a>
                    <a class="navbar-brand brand-logo-mini" href="index.html"><img src="images/logo.jpg" alt="logo" /></a>
                </div>
                <div className="navbar-menu-wrapper d-flex align-items-center justify-content-end">
                    <button className="navbar-toggler navbar-toggler align-self-center" type="button" data-toggle="minimize"
                        onClick={handleToggleSidebar}
                    >
                        <span className="ti-view-list"></span>
                    </button>
                    <ul className="navbar-nav mr-lg-2">
                        <li className="nav-item nav-search d-none d-lg-block">
                            <div className="input-group">
                                <div className="input-group-prepend hover-cursor" id="navbar-search-icon">
                                    <span className="input-group-text me-3" id="search">
                                        <i className="ti-search"></i>
                                    </span>
                                </div>
                                <input type="text" className="form-control" id="navbar-search-input" placeholder="Search now" aria-label="search" aria-describedby="search" />
                            </div>
                        </li>
                    </ul>
                    <ul className="navbar-nav navbar-nav-right">
                        <li className="nav-item nav-profile dropdown">
                            <span className='text-danger fs-5 fw-bolder mt-1'>{username}</span>
                            <a className="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown" id="profileDropdown">
                                <img src="images/faces/face1.jpg" alt="profile" />
                            </a>
                            <div className="dropdown-menu dropdown-menu-right navbar-dropdown" aria-labelledby="profileDropdown">

                                {
                                    user?.user.adminname && <Link>
                                        <a className="dropdown-item">
                                            <i className="ti-pencil-alt text-primary"></i>
                                            Edit
                                        </a>
                                    </Link>
                                }
                                {
                                    user?.user.adminname && <a className="dropdown-item">
                                        <i className="ti-power-off text-primary"></i>
                                        Logout
                                    </a>
                                }

                            </div>
                        </li>
                    </ul>
                    <button className="navbar-toggler navbar-toggler-right d-lg-none align-self-center" type="button" data-toggle="offcanvas"
                        onClick={handleToggleSidebar}
                    >
                        <span className="ti-view-list"></span>
                    </button>
                </div>
            </nav>
        </div>
    )
}

export default Headers;