import React, { useEffect } from 'react'
import "../css/Navbar.scss";
import { Link } from 'react-router-dom';
import logo from '../image/FoodnGo_logo.png'
import ProfileMenu from './ProfileMenu';

function Navbar() {

    const address = JSON.parse(localStorage.getItem('address'))
    const mainAddress = address.structured_formatting.main_text
    const accessToken = localStorage.getItem('accessToken')

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken')
        if (accessToken) {

        }
    }, [])

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
            {accessToken ? <ProfileMenu />
                : <div className='nav-links'>
                    <Link to='/login'>Sign In</Link>
                    <Link to='/signup'><button className='login-btn'>Sign Up</button></Link>
                </div>}

        </div>
    )
}

export default Navbar