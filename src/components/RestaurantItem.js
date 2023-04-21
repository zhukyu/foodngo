import React from 'react'
import '../css/Category/RestaurantItem.scss'
import { Link } from 'react-router-dom'


function RestaurantItem() {
    return (
        <div className='restaurant-item'>
            <Link to='#'>
                <img src='https://cdn.nguyenkimmall.com/images/companies/_1/tin-tuc/kinh-nghiem-meo-hay/n%E1%BA%A5u%20%C4%83n/untitled-design-5.jpg.jpg'
                    alt='restaurant' />
            </Link>
            <div className='restaurant-item-info'>
                <Link to='#' className='restaurant-name'>
                    <h4>Restaurant Name</h4>
                </Link>
                <div className='description'>
                    <p>This implementation ensures that only one button can be pressed at a time, as clicking on a different button will un-press the previously pressed button.</p>
                </div>
                <div className='other-info'>
                    <div className='rating'>
                        <i className="fa-solid fa-star"></i>
                        <span>4.5</span>
                    </div>
                    <div className='distance'>
                        <i className="fa-solid fa-map-marker-alt"></i>
                        <span>1.5 km</span>
                    </div>
                    <div className='delivery-time'>
                        <i className="fa-solid fa-clock"></i>
                        <span>30 min</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RestaurantItem