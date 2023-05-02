import React, { useEffect, useRef, useState } from "react";
import "../css/Home.scss";
import banner from "../image/jennifer-schmidt-MRHyv-hHxgk-unsplash.jpg";
import logo from "../image/FoodnGo_logo.png";
import delivery_man from "../image/delivery_man.svg";
import store from "../image/store.svg";
import phone from "../image/iphone.svg";
import order_now from "../image/pexels-nerfee-mirandilla-3186654.jpg";
import find_restaurants from "../image/pexels-jonathan-borba-2878739.jpg";
import { Link } from "react-router-dom";

const apiKey = "AIzaSyDqhnz_r_cysHggOWg9RzmFrHwhO9BOfCg";
const mapApiJs = "https://maps.googleapis.com/maps/api/js";
const geocodeJson = "https://maps.googleapis.com/maps/api/geocode/json";

// load google map api js

function loadAsyncScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    Object.assign(script, {
      type: "text/javascript",
      async: true,
      src,
    });
    script.addEventListener("load", () => resolve(script));
    document.head.appendChild(script);
  });
}

const extractAddress = (place) => {
  const address = {
    city: "",
    state: "",
    zip: "",
    country: "",
    plain() {
      const city = this.city ? this.city + ", " : "";
      const zip = this.zip ? this.zip + ", " : "";
      const state = this.state ? this.state + ", " : "";
      return city + zip + state + this.country;
    },
  };

  if (!Array.isArray(place?.address_components)) {
    return address;
  }

  place.address_components.forEach((component) => {
    const types = component.types;
    const value = component.long_name;

    if (types.includes("locality")) {
      address.city = value;
    }

    if (types.includes("administrative_area_level_2")) {
      address.state = value;
    }

    if (types.includes("postal_code")) {
      address.zip = value;
    }

    if (types.includes("country")) {
      address.country = value;
    }
  });
  return address;
};

function Home() {
  

  const inputRef = useRef(null);
  const [address, setAddress] = useState({});
  const initMapScript = () => {
    // if script already loaded
    if (window.google) {
      return Promise.resolve();
    }
    const src = `${mapApiJs}?key=${apiKey}&libraries=places&v=weekly`;
    return loadAsyncScript(src);
  };

  // do something on address change
  const onChangeAddress = (autocomplete) => {
    const place = autocomplete.getPlace();
    setAddress(extractAddress(place));
  };

  // init autocomplete
  const initAutocomplete = () => {
    if (!inputRef.current) return;

    const autocomplete = new window.google.maps.places.Autocomplete(
      inputRef.current
    );
    autocomplete.setFields(["address_component", "geometry"]);
    autocomplete.addListener("place_changed", () =>
      onChangeAddress(autocomplete)
    );
  };
  const reverseGeocode = ({ latitude: lat, longitude: lng }) => {
    const url = `${geocodeJson}?key=${apiKey}&latlng=${lat},${lng}`;
    inputRef.current.value = "Getting your location...";
    fetch(url)
      .then((response) => response.json())
      .then((location) => {
        const place = location.results[0];
        const _address = extractAddress(place);
        setAddress(_address);
        console.log(_address);
        inputRef.current.value = _address.plain();
      });
  };

  const findMyLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        reverseGeocode(position.coords);
      });
    }
  };

  // load map script after mounted
  useEffect(() => {
    initMapScript().then(() => initAutocomplete());
  }, []);

  const [orderNowVisible, setOrderNowVisible] = useState(false);
  const orderNowRef = useRef(null);

  const [findResVisible, setFindResVisible] = useState(false);
  const findRestaurantRef = useRef(null);

  const centerInput = () => {
    inputRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    inputRef.current.focus();
  };

  useEffect(() => {
    window.addEventListener("scroll", scrollHandler);
    return () => window.removeEventListener("scroll", scrollHandler);
  }, []);

  const scrollHandler = () => {
    if (orderNowRef.current) {
      if (
        window.pageYOffset + window.innerHeight >=
        orderNowRef.current.offsetTop
      ) {
        setOrderNowVisible(true);
      } else {
        setOrderNowVisible(false);
      }
    }
    if (findRestaurantRef.current) {
      if (
        window.pageYOffset + window.innerHeight >=
        findRestaurantRef.current.offsetTop
      ) {
        setFindResVisible(true);
      } else {
        setFindResVisible(false);
      }
    }
  };

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
  });

  return (
    <div className="Home">
      <div className="home-navbar">
        <Link to="/">
          <div className="logo">
            <img src={logo} alt="logo" className="logo" />
          </div>
        </Link>
        <div className="nav-links">
          <Link to="/login">Sign In</Link>
          <Link to="/signup"><button className="login-btn">Sign Up</button></Link>
        </div>
      </div>
      <div className="banner">
        <div className="left-section">
          <img src={banner} className="background" alt="banner" />
        </div>
        <div className="right-section">
          <h1>Get food delivery and more</h1>
          <div className="search-bar">
            <i className="fa-solid fa-location-dot "></i>
            <input
              ref={inputRef}
              type="text"
              placeholder="Enter delivery address"
              className="search-input"
              id="search-input"
            />
            <Link to="#">
              <div className="search-btn" onClick={findMyLocation}>
                <i className="fa-solid fa-arrow-right"></i>
              </div>
            </Link>
          </div>
        </div>
      </div>
      <div className="introduce-section-1">
        <div className="introduce-item">
          <img src={delivery_man} alt="introduce-item" />
          <h5>Become a Delivery Driver</h5>
          <p>
            As a delivery driver, you'll make reliable money—working anytime,
            anywhere.
          </p>
          <Link to="#">
            Start earning
            <i className="fa-solid fa-arrow-right"></i>
          </Link>
        </div>
        <div className="introduce-item">
          <img src={store} alt="introduce-item" />
          <h5>Become a Partner</h5>
          <p>
            Grow your business and reach new customers by partnering with us.
          </p>
          <Link to="#">
            Sign up your store
            <i className="fa-solid fa-arrow-right"></i>
          </Link>
        </div>
        <div className="introduce-item">
          <img src={phone} alt="introduce-item" />
          <h5>Get the App</h5>
          <p>
            Experience the best your neighborhood has to offer, all in one app.
          </p>
          <Link to="#">
            Get the app
            <i className="fa-solid fa-arrow-right"></i>
          </Link>
        </div>
      </div>
      <div className="introduce-section-2">
        <div className="left-section">
          <h4>Get food delivery and more</h4>
          <p>
            Don't settle for mediocre meals. With our food ordering website, you
            can enjoy restaurant-quality food without ever leaving your house.
            Order now and taste the difference!
          </p>
          <button className="order-now-btn" onClick={centerInput}>
            Order Now
          </button>
        </div>
        <div className="right-section" ref={orderNowRef}>
          <img
            src={order_now}
            alt="order_now"
            className={orderNowVisible ? "order-now visible" : "order-now"}
          />
        </div>
      </div>
      <div className="introduce-section-3">
        <div className="left-section" ref={findRestaurantRef}>
          <img
            src={find_restaurants}
            alt="find_restaurants"
            className={
              findResVisible ? "find-restaurants visible" : "find-restaurants"
            }
          />
        </div>
        <div className="right-section">
          <h4>Pickup or delivery from restaurants near you</h4>
          <p>
            Explore restaurants that deliver near you, or try yummy takeout
            fare. With a place for every taste, it’s easy to find food you
            crave, and order online or through the app. Find great meals fast
            with lots of local menus. Enjoy eating the convenient way with
            places that deliver to your door.
          </p>
          <button className="find-restaurant-btn" onClick={centerInput}>
            Find Restaurants
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
