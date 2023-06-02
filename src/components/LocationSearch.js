import React, { useEffect, useRef, useState } from 'react'
import "../css/LocationSearch.scss";
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../utility/AxiosInstance';
import { notification } from 'antd';

function LocationSearch() {

    const searchBarRef = useRef(null);
    const inputRef = useRef(null);

    const [input, setInput] = useState('');
    const [coordinates, setCoordinates] = useState(null);

    const [loading, setLoading] = useState(false);
    const [suggestions, setSuggestions] = useState([]);
    const [placeId, setPlaceId] = useState('');
    const [address, setAddress] = useState(null);

    const navigate = useNavigate()

    const handleSearch = () => {
        // localStorage.setItem('coordinate', JSON.stringify(coordinates));
        // localStorage.setItem('address', JSON.stringify(address));

        // select a suggestion
        if (coordinates && address) {
            navigate('/restaurants')
        }
        // not select any suggestion
        else if (suggestions.length > 0) {
            handleAddress(suggestions[0])
        }
        // not select any suggestion and no suggestion
        else {
            console.log('no suggestion');
            notification.open({
                icon: <i className="fa-solid fa-exclamation-circle" style={{ color: "red" }}></i>,
                message: 'Error',
                description:
                    'No address found!',
                onClick: () => {
                    console.log('Notification Clicked!');
                },
            });
        }
    }
    const handleAddress = (suggestion) => {
        inputRef.current.value = suggestion.description;
        console.log(suggestion);
        setPlaceId(suggestion.place_id);
        setAddress(suggestion);
        setSuggestions([]);
    }

    useEffect(() => {
        if (address) {
            localStorage.setItem('address', JSON.stringify(address));
        }
        else {
            localStorage.removeItem('address');
        }
    }, [address])

    useEffect(() => {
        if (coordinates) {
            localStorage.setItem('coordinate', JSON.stringify(coordinates));
        }
        else {
            localStorage.removeItem('coordinate');
        }
    }, [coordinates])

    useEffect(() => {
        const fetchCoordinates = async () => {
            await axiosInstance.get(`/map/geocode?placeId=${placeId}`)
                .then((res) => {
                    if (res.status === 200) {
                        const location = res.data.geoCode.results[0].geometry.location;
                        console.log(location);
                        const coordinate = [location.lng, location.lat];
                        // localStorage.setItem('coordinate', JSON.stringify(coordinate));
                        setCoordinates(coordinate);
                    }
                })
        }
        if (placeId !== '') {
            fetchCoordinates();
        }
    }, [placeId])

    useEffect(() => {
        if (searchBarRef) {
            if (suggestions && suggestions.length > 0) {
                searchBarRef.current.classList.add('active')
            }
            else {
                searchBarRef.current.classList.remove('active')
            }
        }
    }, [suggestions])

    useEffect(() => {

        setCoordinates(null);
        setPlaceId('');
        setAddress(null);

        if (input.length === 0) {
            setSuggestions([]);
        }

        const fetchSuggestions = async () => {
            await axiosInstance.get(`/map/search?address=${input}`)
                .then((res) => {
                    if (res.status === 200) {
                        setSuggestions(res.data.predictions.predictions);
                        setLoading(false);
                    }
                })
        };

        const timer = setTimeout(() => {
            if (input.length > 0) {
                setLoading(true);
                searchBarRef.current.classList.add('active')
                fetchSuggestions();
            }
        }, 500)

        return () => clearTimeout(timer)
    }, [input]);


    return (
        <div className='search-bar-skeleton'>
            <div className='search-bar-wrapper' ref={searchBarRef}>
                <div className='search-bar' >
                    <i className="fa-solid fa-location-dot "></i>
                    <input
                        ref={inputRef}
                        placeholder='Enter delivery address'
                        className='search-input'
                        id='search-input'
                        onChange={(e) => setInput(e.target.value)}
                    />
                    <div className='search-btn' onClick={() => handleSearch()}>
                        <i className="fa-solid fa-arrow-right"></i>
                    </div>
                </div>
                <div className='search-autocomplete'>
                    {loading ? <div className='autocomplete-item'>Loading...</div> : null}
                    {suggestions.map((suggestion, index) => {
                        return (
                            <div className='autocomplete-item' key={index} onClick={() => handleAddress(suggestion)}>
                                {suggestion.description}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    )
}

export default LocationSearch