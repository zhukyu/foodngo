import React from 'react'
import '../css/Category/RestaurantItem.scss'
import { Link } from 'react-router-dom'


function RestaurantItem(props) {
    return (
        <div className='restaurant-item'>
            <Link to='#'>
                <img src={props.img}
                    alt='restaurant' />
            </Link>
            <div className='restaurant-item-info'>
                <Link to='#' className='restaurant-name'>
                    <h4>{props.name}</h4>
                </Link>
                <div className='description'>
                    <p>{props.description}</p>
                </div>
                <div className='other-info'>
                    <div className='rating'>
                        <i className="fa-solid fa-star"></i>
                        <span>{props.rate}</span>
                    </div>
                    <div className='distance'>
                        <i className="fa-solid fa-map-marker-alt"></i>
                        <span>{(props.distance / 1000).toFixed(2) + " km"}</span>
                    </div>
                    <div className='delivery-time'>
                        <i className="fa-solid fa-clock"></i>
                        <span>{props.deliveryTime}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RestaurantItem