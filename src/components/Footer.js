import React from 'react'
import '../css/Footer.scss';
import logo from '../image/FoodnGo_logo_white.png'

function Footer() {
    return (
        <div className='footer-wrapper'>
            <footer className="footer">
                <div className="footer__addr">
                    <div className='footer__logo'>
                        <img src={logo}></img>
                    </div>

                    <h2>Contact</h2>

                    <address>
                        Danang University of Science and Technology<br/>

                            <button className='footer__btn'>Email Us</button>
                    </address>
                </div>

                <ul className="footer__nav">
                    <li className="nav__item">
                        <h2 className="nav__title">Company</h2>

                        <ul className="nav__ul">
                            <li>
                                <a href="#">Introduction</a>
                            </li>

                            <li>
                                <a href="#">Help Center</a>
                            </li>

                            <li>
                                <a href="#">Recruit</a>
                            </li>
                        </ul>
                    </li>

                    <li className="nav__item nav__item--extra">
                        <h2 className="nav__title">Service</h2>

                        <ul className="nav__ul nav__ul--extra">
                            <li>
                                <a href="#">Restaurant Register</a>
                            </li>

                            <li>
                                <a href="#">Delivery Register</a>
                            </li>

                            <li>
                                <a href="#">Order Food</a>
                            </li>

                            <li>
                                <a href="#">Find Nearby Restaurants</a>
                            </li>
                        </ul>
                    </li>

                    <li className="nav__item">
                        <h2 className="nav__title">Legal</h2>

                        <ul className="nav__ul">
                            <li>
                                <a href="#">Privacy Policy</a>
                            </li>

                            <li>
                                <a href="#">Terms of Use</a>
                            </li>

                            <li>
                                <a href="#">Sitemap</a>
                            </li>
                        </ul>
                    </li>
                </ul>

                <div className="legal">
                    <p>&copy; 2023. All rights reserved.</p>

                    <div className="legal__links">
                        <span>Made with <span className="heart">♥</span> from FoodnGo</span>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default Footer
