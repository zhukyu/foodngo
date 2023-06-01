import React from 'react'
import '../css/RestaurantItem.scss'
import { Link } from 'react-router-dom'


function RestaurantItem(props) {
    return (
        <div className='restaurant-item'>
            <div className='restaurant-item-img'>
                <Link to={`/restaurant/${props.id}`}>
                    <img src={props.img}
                        alt='restaurant' />
                </Link>
            </div>
            <div className='restaurant-item-info'>
                <Link to={`/restaurant/${props.id}`} className='restaurant-name'>
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
                        <span>
                            {props.distance >= 1000
                                ? (props.distance / 1000).toFixed(2) + " km"
                                : props.distance.toFixed(0) + " m"}
                        </span>
                    </div>
                    <div className='delivery-time'>
                        <i className="fa-solid fa-clock"></i>
                        <span>{props.deliveryTime.toFixed(0) + " min"}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RestaurantItem