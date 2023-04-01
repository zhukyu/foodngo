import React, { useEffect } from 'react'
import '../css/Home.scss'
import banner from '../image/jennifer-schmidt-MRHyv-hHxgk-unsplash.jpg'
import logo from '../image/FoodnGo_logo.png'
import delivery_man from '../image/delivery_man.svg'
import store from '../image/store.svg'
import phone from '../image/iphone.svg'
import { Link } from 'react-router-dom'

function Home() {

    useEffect(() => {
        document.querySelector('.home-navbar').classList.add('scrolled');
        const handleScroll = event => {
            if (window.scrollY > 5) {
                document.querySelector('.home-navbar').classList.add('scrolled');
            }
            else {
                document.querySelector('.home-navbar').classList.remove('scrolled');
            }
        };

        handleScroll();

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    });

    return (
        <div className='Home'>
            <div className='home-navbar'>
                <div className='logo'>
                    <img src={logo} alt='logo' className='logo' />
                </div>
                <div className='nav-links'>
                    <Link to='#'>Sign In</Link>
                    <button className='login-btn'>Sign Up</button>
                </div>
            </div>
            <div className='banner'>
                <div className='left-section'>
                    <img src={banner} className='background' alt='banner' />
                </div>
                <div className='right-section'>
                    <h1>Get food delivery and more</h1>
                    <div className='search-bar'>
                        <i className="fa-solid fa-location-dot "></i>
                        <input type='text' placeholder='Enter delivery address' className='search-input' />
                        <Link to='#'>
                            <div className='search-btn' >
                                <i className="fa-solid fa-arrow-right"></i>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
            <div className='introduce-section-1'>
                <div className='introduce-item'>
                    <img src={delivery_man} alt='introduce-item' />
                    <h5>Become a Delivery Driver</h5>
                    <p>As a delivery driver, you'll make reliable money—working anytime, anywhere.</p>
                    <Link to='#'>
                        Start earning
                        <i className="fa-solid fa-arrow-right"></i>
                    </Link>
                </div>
                <div className='introduce-item'>
                    <img src={store} alt='introduce-item' />
                    <h5>Become a Partner</h5>
                    <p>Grow your business and reach new customers by partnering with us.</p>
                    <Link to='#'>
                        Sign up your store
                        <i className="fa-solid fa-arrow-right"></i>
                    </Link>
                </div>
                <div className='introduce-item'>
                    <img src={phone} alt='introduce-item' />
                    <h5>Get the App</h5>
                    <p>Experience the best your neighborhood has to offer, all in one app.</p>
                    <Link to='#'>
                        Get the app
                        <i className="fa-solid fa-arrow-right"></i>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Home