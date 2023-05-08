import React, { useEffect, useState } from 'react'
import Category from '../components/Category/Category'
import '../css/Restaurants.scss'
import RestaurantItem from '../components/RestaurantItem';
import Navbar from '../components/Navbar';
import axiosInstance from '../utility/AxiosInstance';


function Restaurants() {

    const [activeButtonIndex, setActiveButtonIndex] = useState(-1);

    useEffect(() => {
        const coordinateStr = localStorage.getItem('coordinate');
        const coordinate = JSON.parse(coordinateStr);
        console.log(coordinate);
        const fetchData = async () => {
            await axiosInstance.get(`/restaurant?longitude=${coordinate.lng}&latitude=${coordinate.lat}`)
                .then((res) => console.log(res.data))
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
                    <h5>1024 Results</h5>
                    <div className='restaurants-list'>
                        <RestaurantItem />
                        <RestaurantItem />
                        <RestaurantItem />
                        <RestaurantItem />
                        <RestaurantItem />
                        <RestaurantItem />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Restaurants