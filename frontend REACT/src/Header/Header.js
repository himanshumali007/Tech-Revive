import React, { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import './Header.css';
import Sidebar from '../Vendor/Sidebar';
function Header() {

    const navigate = useNavigate();

    const clearLocalStorage = () => {
        localStorage.clear(); 
    };

    const getUserTypeFromStorage = () => {
        const userData = JSON.parse(localStorage.getItem('user'));
        return userData ? userData.type : null;
    };
    const userType = getUserTypeFromStorage();

    const renderCustomerHeader = () => {
        return (
            <div className="nav-right">
                <ul>
                
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/customer/categories">Categories</NavLink>
                    </li>

                    <li className="nav-item">
                        <NavLink className="nav-link" to="/customer/my-account">My Account</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/customer/my-orders">My Orders</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/customer/cart">Cart</NavLink>
                    </li>
                    
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/" onClick={clearLocalStorage}>Log Out</NavLink>
                    </li>
                </ul>
            </div>
        );
    };

    const renderVendorHeader = () => {
        return (
            <><div className="nav-right">
                {/* <ul>
                    <li class="nav-item">
                        <NavLink className="nav-link" to="/" onClick={clearLocalStorage}>Log Out</NavLink>
                    </li>

                </ul> */}
            </div></>
        );
    };


    const renderDefaultHeader = () => {
        return (
            <div className="nav-right">
                <ul>
                    <li class="nav-item">
                        <NavLink className="nav-link" to="/" onClick={clearLocalStorage}>Home</NavLink>
                    </li>
                    <li class="nav-item">
                        <NavLink className="nav-link" to="/about">About</NavLink>
                    </li>
                    <li class="nav-item">
                    <NavLink className="nav-link" to="/contact">ContactUs</NavLink>
                    </li>
                    <li class="nav-item">
                    <NavLink className="nav-link" to="/signin" onClick={() => navigate('/signin')}>LogIn</NavLink>
                    </li>
                    <li class="nav-item">
                    <NavLink className="nav-link" to="/register" onClick={() => navigate('/register')}>Register</NavLink>
                    </li>
                </ul>
            </div>
        );
    };

    return (
        <header>
            <nav>
                <div className="nav-left">
                    <a className="company-name">Tech Revive</a>
                </div>
                {userType === 'customer' ? renderCustomerHeader() : null}
                {userType === 'vendor' ? renderVendorHeader() : null}
                {userType !== 'customer' && userType !== 'vendor' ? renderDefaultHeader() : null}
            </nav>
        </header>
    );
}

export default Header;




