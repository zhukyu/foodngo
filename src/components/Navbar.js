import React, { useEffect, useState } from "react";
import "../css/Navbar.scss";
import { Link, useNavigate } from "react-router-dom";
import logo from "../image/FoodnGo_logo.png";
import ProfileMenu from "./ProfileMenu";
import { Badge, Drawer, Modal, Popconfirm, AutoComplete, Input } from "antd";
import ShoppingCart from "./ShoppingCart";
import { useDispatch, useSelector } from "react-redux";
import { fetchCartItems } from "../utility/action";
import axiosInstance from "../utility/AxiosInstance";
import LocationUpdate from "./LocationUpdate";

function Navbar() {
  const [restaurantInput, setRestaurantInput] = useState("");
  const [placeId, setPlaceId] = useState("");
  const [restaurantSuggestions, setRestaurantSuggestions] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [address, setAddress] = useState({});
  const [mainAddress, setMainAddress] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [user, setUser] = useState(null);
  const [coordinate, setCoordinate] = useState(null);

  const cartItems = useSelector((state) => state.cartItems);
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    if (!localStorage.getItem("access_token")) {
      navigate("/login");
      return;
    }
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  useEffect(() => { }, [cartItems]);

  const reload = () => {
    navigate(0);
  };

  useEffect(() => {
    const address = JSON.parse(localStorage.getItem("address"));
    if (!address) {
      navigate("/");
    } else {
      setAddress(address);
      console.log(address);
      setMainAddress(address?.structured_formatting?.main_text);
      setAccessToken(localStorage.getItem("access_token"));
    }
  }, []);

  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");
    if (accessToken) {
    }
  }, []);

  useEffect(() => {
    dispatch(fetchCartItems());
  }, []);

  useEffect(() => {
    const storeCoordinate = JSON.parse(localStorage.getItem("coordinate"));
    if (storeCoordinate) {
      setCoordinate(storeCoordinate);
    }
  }, []);


  useEffect(() => {
    const fetchUserData = async () => {
      await axiosInstance
        .get("/user")
        .then((res) => {
          setUser(res.data.user);
        })
        .catch((err) => {
          console.log(err);
          localStorage.removeItem("access_token");
          setUser(null);
        });
    };

    fetchUserData();
  }, []);


  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onRestaurantSelect = (value, instance) => {

    console.log("restaurantSuggestions : " + restaurantSuggestions);
    const restaurantMatch = restaurantSuggestions.map(
      (suggestion) => { if (suggestion.value === instance.value) return instance.id }
    );

    if (restaurantMatch.length === 0) return;
    let restaurantId = restaurantMatch.filter((item) => item !== undefined);
    setPlaceId(restaurantId);
    navigate(`/restaurant/${restaurantId}`, { replace: true });

    //console.log("restaurantMatch : " +  restaurantMatch[0]);




  };




  useEffect(() => {
    setPlaceId("");
    setRestaurantSuggestions([]);

    if (restaurantInput.length === 0) {
      setRestaurantSuggestions([]);
    }

    const fetchSuggestions = async () => {
      await axiosInstance
        .get(`/user/restaurants?name=${restaurantInput}&longitude=${coordinate[0]}&latitude=${coordinate[1]}`)
        .then((res) => {
          if (res.status === 200) {
            const restaurantList = res.data.restaurants;

            const suggestions = restaurantList.map((suggestion, index) => ({
              value: suggestion.name,
              id: suggestion._id,
            }));
            console.log(suggestions);
            setRestaurantSuggestions(suggestions);
          }
        });
    };

    const timer = setTimeout(() => {
      if (restaurantInput.length > 0) {
        fetchSuggestions();
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [restaurantInput]);

  const handleSearch = (value) => {

  }

  return (
    <div className="navbar">
      <Modal
        title="Update Location"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <LocationUpdate handleSuccess={reload} />
      </Modal>
      <Drawer
        title="Shopping Cart"
        placement="right"
        onClose={onClose}
        open={open}
        width={470}
      >
        <ShoppingCart />
      </Drawer>
      <Link to="/restaurants">
        <div className="logo">
          <img src={logo} alt="logo" className="logo" />
        </div>
      </Link>
      <div className="location" onClick={showModal}>
        <span className="location-text">{mainAddress}</span>
        <i className="fa-solid fa-chevron-down"></i>
      </div>

      <div className="search-bar">
        <AutoComplete
          className="search-input"
          id="search-input"
          options={restaurantSuggestions}
          onSelect={onRestaurantSelect}
          onSearch={(value) => handleSearch(value)}
          onChange={(value) => { setRestaurantInput(value) }}
        >
          <Input.Search size="large" placeholder="input here" enterButton />
        </AutoComplete>
      </div>
      <Badge count={cartItems?.result?.length} offset={[-3, 20]}>
        <div className="cart">
          <button className="cart-btn" onClick={showDrawer}>
            <i className="fa-solid fa-shopping-cart"></i>
          </button>
        </div>
      </Badge>
      {accessToken ? (
        <ProfileMenu user={user} />
      ) : (
        <div className="nav-links">
          <Link to="/login">Sign In</Link>
          <Link to="/signup">
            <button className="login-btn">Sign Up</button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default Navbar;
