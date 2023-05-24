import React, { useEffect, useState } from 'react'
import "../css/Navbar.scss";
import { Link, useNavigate } from 'react-router-dom';
import logo from '../image/FoodnGo_logo.png'
import ProfileMenu from './ProfileMenu';
import { Drawer } from 'antd';
import ShoppingCart from './ShoppingCart';

function Navbar() {

    const navigate = useNavigate();
    const [address, setAddress] = useState({})
    const [mainAddress, setMainAddress] = useState('')
    const [accessToken, setAccessToken] = useState('')

    const [open, setOpen] = useState(false);
    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        const address = JSON.parse(localStorage.getItem('address'));
        if (!address) {
            navigate('/');
        }
        else {
            setAddress(address)
            setMainAddress(address.structured_formatting.main_text)
            setAccessToken(localStorage.getItem('accessToken'))
        }
    }, [])

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken')
        if (accessToken) {

        }
    }, [])

    return (
        <div className='navbar'>
            <Drawer title="Shopping Cart" placement="right" onClose={onClose} open={open} width={470}>
                <ShoppingCart/>
            </Drawer>
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
                <button className='cart-btn' onClick={showDrawer}>
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