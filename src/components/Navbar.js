import React from 'react'
import "../css/Navbar.scss";
import { Link } from 'react-router-dom';
import logo from '../image/FoodnGo_logo.png'

function Navbar() {

    const address = JSON.parse(localStorage.getItem('address'))
    const mainAddress = address.structured_formatting.main_text

    return (
        <div className='navbar'>
            <Link to='/restaurants'>
                <div className='logo'>
                    <img src={logo} alt='logo' className='logo' />
                </div>
            </Link>
            <div className='location'>
                <span className='location-text'>{mainAddress}</span>
                <i className="fa-solid fa-chevron-down"></i>
            </div>
            <div className='search-bar' >
                <i className="fa-solid fa-search"></i>
                <input
                    placeholder='Search stores, dishes...'
                    className='search-input'
                    id='search-input'   
                />
            </div>
            <div className='cart'>
                <button className='cart-btn'>
                    <i className="fa-solid fa-shopping-cart"></i>
                </button>
            </div>
            <div className='nav-links'>
                <Link to='/login'>Sign In</Link>
                <Link to='/signup'><button className='login-btn'>Sign Up</button></Link>
            </div>
        </div>
    )
}

export default Navbar