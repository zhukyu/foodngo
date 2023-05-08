import React from 'react'
import "../css/Navbar.scss";
import { Link } from 'react-router-dom';
import logo from '../image/FoodnGo_logo.png'

function Navbar() {
    return (
        <div className='navbar'>
            <Link to='/restaurants'>
                <div className='logo'>
                    <img src={logo} alt='logo' className='logo' />
                </div>
            </Link>
            <div className='location'>
                <span className='location-text'>Hai Chau, Danang</span>
                <i className="fa-solid fa-chevron-down"></i>
            </div>
            <div className='nav-links'>
                <Link to='#'>Sign In</Link>
                <button className='login-btn'>Sign Up</button>
            </div>
        </div>
    )
}

export default Navbar