import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';


const SideBar = ({ isSidebarOpen }) => {
    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("user"));

    const Logout = () => {
        // localStorage.removeItem("user");
        localStorage.clear();
        navigate('/');
        navigate(window.location.reload(), { replace: true })
    }

    useEffect(() => {
        if (!user) {
            navigate('/');
        }
    }, []);

    const handleEmployeeListClick = () => {
        if (!user) {
            alert("Please login first.");
            navigate('/');
        } else {
            navigate('/employeelist');
        }
    };

    return (
        <div className={`container-fuild page-body-wrapper ${isSidebarOpen ? 'sidebar-open' : ''}`}>
            <nav className={`sidebar sidebar-offcanvas ${isSidebarOpen ? 'active' : ''}`} id="sidebar">
                <ul className="nav">
                    <li className="nav-item">
                        <a className="nav-link">
                            <Link to='/dashboard'>
                                <i className="ti-menu-alt menu-icon"></i>
                                <span className="menu-title">Dashboard</span>
                            </Link>
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" onClick={handleEmployeeListClick}>
                            <Link to='/employeelist'>
                                <i className="ti-user menu-icon"></i>
                                <span className="menu-title">Employee List</span>
                            </Link>
                        </a>
                    </li>
                    {
                        !user?.user.adminname && <li className="nav-item">
                            <a className="nav-link">
                                <Link to='/'>
                                    <i className="ti-lock menu-icon"></i>
                                    <span className="menu-title">Admin Login</span>
                                </Link>
                            </a>
                        </li>
                    }
                    {
                        !user?.user.adminname && <li className="nav-item">
                            <a className="nav-link">
                                <Link to='/adminregister'>
                                    <i className="ti-id-badge menu-icon"></i>
                                    <span className="menu-title">Admin Registration</span>
                                </Link>
                            </a>
                        </li>
                    }
                    {
                        user?.user.adminname && <li className="nav-item">
                            <a className="nav-link">
                                <Link>
                                    <i className="ti-power-off menu-icon"></i>
                                    <span className="menu-title" onClick={Logout}>LogOut</span>
                                </Link>
                            </a>
                        </li>
                    }

                </ul>
            </nav>
        </div>
    )
}

export default SideBar;