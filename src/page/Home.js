import React, { useEffect, useRef, useState } from 'react'
import '../css/Home.scss'
import banner from '../image/jennifer-schmidt-MRHyv-hHxgk-unsplash.jpg'
import logo from '../image/FoodnGo_logo.png'
import delivery_man from '../image/delivery_man.svg'
import store from '../image/store.svg'
import phone from '../image/iphone.svg'
import order_now from '../image/pexels-nerfee-mirandilla-3186654.jpg'
import find_restaurants from '../image/pexels-jonathan-borba-2878739.jpg'
import { Link, useNavigate } from 'react-router-dom'
import axiosInstance from '../utility/AxiosInstance'
import { notification } from 'antd'

function Home() {

  const inputRef = useRef(null);
  const searchBarRef = useRef(null);

  const [orderNowVisible, setOrderNowVisible] = useState(false);
  const orderNowRef = useRef(null);

  const [findResVisible, setFindResVisible] = useState(false);
  const findRestaurantRef = useRef(null);

  const [input, setInput] = useState('');
  const [coordinates, setCoordinates] = useState(null);

  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [placeId, setPlaceId] = useState('');
  const [address, setAddress] = useState(null);

  const navigate = useNavigate()

  const centerInput = () => {
    inputRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    inputRef.current.focus();
  }

  useEffect(() => {
    window.addEventListener('scroll', scrollHandler);
    return () => window.removeEventListener('scroll', scrollHandler);
  }, []);

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

  const scrollHandler = () => {

    if (orderNowRef.current) {
      if (window.pageYOffset + window.innerHeight >= orderNowRef.current.offsetTop) {
        setOrderNowVisible(true);
      }
      else {
        setOrderNowVisible(false);
      }
    }
    if (findRestaurantRef.current) {
      if (window.pageYOffset + window.innerHeight >= findRestaurantRef.current.offsetTop) {
        setFindResVisible(true);
      }
      else {
        setFindResVisible(false);
      }
    }
  }

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


  useEffect(() => {
    document.querySelector(".home-navbar").classList.add("scrolled");
    const handleScroll = (event) => {
      if (window.scrollY > 5) {
        document.querySelector(".home-navbar").classList.add("scrolled");
      } else {
        document.querySelector(".home-navbar").classList.remove("scrolled");
      }
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleAddress = (suggestion) => {
    inputRef.current.value = suggestion.description;
    setPlaceId(suggestion.place_id);
    setAddress(suggestion);
    setSuggestions([]);
  }

  useEffect(() => {
    if(address) {
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

  const fetchCoordinates = async () => {
    await axiosInstance.get(`/map/geocode?placeId=${placeId}`)
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data.geoCode.results[0].geometry.location);
          localStorage.setItem('coordinate', JSON.stringify(res.data.geoCode.results[0].geometry.location));
          setCoordinates(res.data.geoCode.results[0].geometry.location);
        }
      })
  }

  useEffect(() => {
    if (placeId != '') {
      fetchCoordinates();
    }
  }, [placeId])

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

  return (
    <div className='Home'>
      <div className='home-navbar'>
        <Link to='/'>
          <div className='logo'>
            <img src={logo} alt='logo' className='logo' />
          </div>
        </Link>
        <div className='nav-links'>
          <Link to='login'>Sign In</Link>
          <Link to='signup'><button className='login-btn'>Sign Up</button></Link>
        </div>
      </div>
      <div className='banner'>
        <div className='left-section'>
          <img src={banner} className='background' alt='banner' />
        </div>
        <div className='right-section'>
          <h1>Get food delivery and more</h1>
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
                {suggestions.map((suggestion) => {
                  return (
                    <div className='autocomplete-item' key={suggestion.placeId} onClick={() => handleAddress(suggestion)}>
                      {suggestion.description}
                    </div>
                  );
                })}
              </div>
            </div>
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
      <div className='introduce-section-2'>
        <div className='left-section'>
          <h4>Get food delivery and more</h4>
          <p>Don't settle for mediocre meals. With our food ordering website, you can enjoy restaurant-quality
            food without ever leaving your house. Order now and taste the difference!
          </p>
          <button className='order-now-btn' onClick={centerInput}>Order Now</button>
        </div>
        <div className='right-section' ref={orderNowRef}>
          <img src={order_now} alt='order_now' className={orderNowVisible ? 'order-now visible' : 'order-now'} />
        </div>
      </div>
      <div className='introduce-section-3'>
        <div className='left-section' ref={findRestaurantRef}>
          <img src={find_restaurants} alt='find_restaurants' className={findResVisible ? 'find-restaurants visible' : 'find-restaurants'} />
        </div>
        <div className='right-section'>
          <h4>Pickup or delivery from restaurants near you</h4>
          <p>Explore restaurants that deliver near you, or try yummy takeout fare. With a place for every taste,
            it’s easy to find food you crave, and order online or through the  app. Find great meals fast with lots of local menus.
            Enjoy eating the convenient way with places that deliver to your door.
          </p>
          <button className='find-restaurant-btn' onClick={centerInput}>Find Restaurants</button>
        </div>
      </div>
    </div>
  );
}

export default Home;
