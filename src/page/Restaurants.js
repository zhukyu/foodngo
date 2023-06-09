import React, { useEffect, useState } from 'react'
import Category from '../components/Category/Category'
import '../css/Restaurants.scss'
import RestaurantItem from '../components/RestaurantItem';
import Navbar from '../components/Navbar';
import axiosInstance from '../utility/AxiosInstance';
import { useNavigate } from 'react-router-dom';


function Restaurants() {

    const [activeButtonIndex, setActiveButtonIndex] = useState(-1);
    const [restaurants, setRestaurants] = useState([]);
    const [pagination, setPagination] = useState({})

    const navigate = useNavigate()

    useEffect(() => {
        const address = localStorage.getItem('address');
        const coordinate = localStorage.getItem('coordinate');
        if (!address || !coordinate) {
            navigate('/');
        }
    }, [])


    useEffect(() => {
        const coordinateStr = localStorage.getItem('coordinate');
        const coordinate = JSON.parse(coordinateStr);
        console.log(coordinate);
        const fetchData = async () => {
            await axiosInstance.get(`/restaurant?longitude=${coordinate.lng}&latitude=${coordinate.lat}`)
                .then((res) => {
                    if (res.status === 200) {
                        console.log(res.data.restaurants);
                        setRestaurants(res.data.restaurants);
                        setPagination(res.data.pagination);
                    }
                })
        }

        fetchData();
    }, [])

    function handleClick(index) {
        if (index === activeButtonIndex) {
            // setActiveButtonIndex(-1);
            return;
        } else {
            setActiveButtonIndex(index);
        }
    }

    return (
        <div>
            <Navbar />
            <div className='Restaurants'>
                <Category />
                <div className='filter'>
                    <div className='filter-item'>
                        <button
                            className='filter-btn'
                            aria-pressed={activeButtonIndex === 0}
                            onClick={() => handleClick(0)} >Offers</button>
                    </div>
                    <div className='filter-item'>
                        <button
                            className='filter-btn'
                            aria-pressed={activeButtonIndex === 1}
                            onClick={() => handleClick(1)} >
                            <span className='filter-btn-text'>Over 4.5</span>
                            <i className="fa-solid fa-star"></i>
                            <div className='filter-btn-dropdown'>
                                <i className="fa-solid fa-chevron-down"></i>
                            </div>
                        </button>
                    </div>
                    <div className='filter-item'>
                        <button
                            className='filter-btn'
                            aria-pressed={activeButtonIndex === 2}
                            onClick={() => handleClick(2)} >Under 30 min</button>
                    </div>
                    <div className='filter-item'>
                        <button
                            className='filter-btn'
                            aria-pressed={activeButtonIndex === 3}
                            onClick={() => handleClick(3)} >
                            <span className='filter-btn-text'>Price</span>
                            <div className='filter-btn-dropdown'>
                                <i className="fa-solid fa-chevron-down"></i>
                            </div>
                        </button>
                    </div>
                </div>
                <div className='restaurants-section'>
                    <h5>{pagination ? pagination.totalResult : 0} Results</h5>
                    <div className='restaurants-list'>
                        {restaurants ? restaurants.map((restaurant, id) => (
                            <RestaurantItem
                                key={id}
                                img={restaurant.media[0].url}
                                id={restaurant.id}
                                name={restaurant.name}
                                description={restaurant.description}
                                rate={restaurant.rate}
                                distance={restaurant.dist.calculated}
                                deliveryTime='30 min'
                            />
                        )) : null}
                        {restaurants ? (restaurants.length === 2 ? <div style={{width: "calc(100% / 3 - 20px)"}}></div> : null) : null}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Restaurants