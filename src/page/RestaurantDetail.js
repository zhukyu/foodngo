import React, { useEffect, useRef, useState } from "react";
import "../css/RestaurantDetail.scss";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FoodItem from "../components/FoodItem";
import Navbar from "../components/Navbar";
import axiosInstance from "../utility/AxiosInstance";
import { ConfigProvider, Tabs } from "antd";
import Footer from "../components/Footer";

function RestaurantDetail() {

  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null)
  const [menus, setMenus] = useState(null)
  const [menuNames, setMenuNames] = useState(null)

  const menuRef = useRef([])

  const navigate = useNavigate();

  useEffect(() => {
    const address = localStorage.getItem('address');
    const coordinate = localStorage.getItem('coordinate');
    if (!address || !coordinate) {
      navigate('/');
    }
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      const coordinate = JSON.parse(localStorage.getItem('coordinate'))
      await axiosInstance.get(`/restaurant/${id}?longitude=${coordinate[0]}&latitude=${coordinate[1]}`)
        .then((res) => {
          console.log(res.data.restaurant);
          setRestaurant(res.data.restaurant);
          setMenus(res.data.restaurant.result);
        })
        .catch((err) => {
          if (err.response.status === 404) {
            navigate('/notfound404');
          }
        })
    }

    fetchData();
  }, [])

  useEffect(() => {
    if (!menus) return;
    const menuNames = menus?.map((menu, index) => {
      return {
        key: `${index}`,
        label: menu.category.name,
      }
    })
    setMenuNames(menuNames);
  }, [menus])

  const onChange = (key) => {
    menuRef?.current[key]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <div className="restaurant_detail">
      <Navbar />
      <div className="hero_container">
        <div className="hero">
          <h4 className="shop_nav">
            <a className="home_nav">Home</a>
            <a className="shops_nav">Restaurants</a>{restaurant?.name}
          </h4>
          <div className="packet">
            <div className="restaurant_avatar_wrapper">
              <img
                src={restaurant?.media[0].url}
                alt="restaurant img"
                className="restaurant_avatar"
              />
            </div>
            <div className="restaurant_info">
              <div className="shop_certification">
                <i className="bi bi-shop-window">&nbsp;</i> Restaurant
              </div>
              <h1 className="restaurant_name">{restaurant?.name}</h1>
              <h4 className="restaurant_description">
                {restaurant?.description}
              </h4>
              <div className="restaurant_basic_info">
                <h4 className="rating">
                  <i className="bi bi-star-fill">&nbsp;</i>{restaurant?.rate}
                </h4>
                <h4 className="distance">
                  <i className="bi bi-geo-alt-fill">&nbsp;</i>2km
                </h4>
                <h4 className="working_hours">
                  <i className="bi bi-stopwatch-fill">&nbsp;</i>{`${restaurant?.openingHours.open} - ${restaurant?.openingHours.close}`}
                </h4>
                <h4 className="working_days">
                  <i className="bi bi-calendar3">&nbsp;</i>Mon - Sat
                </h4>
              </div>
              <div className="phone_address">
                <div className="phone_number">
                  <i className="bi bi-telephone-fill">&nbsp;</i>
                  <h5>Phone:&nbsp;</h5>{restaurant?.phone}
                </div>
                <div className="address">
                  <i className="fa-solid fa-map-location-dot">&nbsp;</i>
                  <h5>Address:&nbsp;</h5>
                  {restaurant?.address}
                </div>
              </div>
              {restaurant?.status === "open" ?
                <div className="opening_certification">
                  <i className="fa-solid fa-bullhorn">&nbsp;</i>Opening
                </div>
                :
                <div className="closed_certification">
                  <i className="fa-solid fa-shop-lock">&nbsp;</i>Closed
                </div>
              }
            </div>
          </div>
        </div>
      </div>
      <div className="product_category_wrapper">
        <div className="product_category">
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: '#ff003d',
                fontSize: '18px',
                colorText: '#A8A8A8',
                margin: '0',
              }
            }}
          >
            <Tabs defaultActiveKey="1" items={menuNames} onChange={onChange} children={null} />
          </ConfigProvider>
        </div>
      </div>
      <div className="menu_container">
        {/* <div className="best_seller">
          <h4 className="title">Best Sellers</h4>
          <div className="items">
            <FoodItem popular={true} img="https://www.foodandwine.com/thmb/0knDIITmWZwGLymVoH7-9EK-3ZI=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/chicken-pho-14-FT-RECIPE1222-b82ecb87d5fa4bf0af1b4468c807a560.jpg" />
            <FoodItem popular={true} img="https://navicdn.com/nakk/images_article//2017/09/06/bsJEBBaVAPgh9K9TOHqQiWEJgXmmoLAbSbV6mH6m.jpeg" />
            <FoodItem popular={true} img="https://vnatrip.com/files/images/Service/ch%E1%BA%A3-gio-b%E1%BA%AFp-chay.jpg" />
            <FoodItem popular={true} img="https://images.foody.vn/res/g100004/1000030980/prof/s640x400/file_50684d23-a9f2-4ed5-8c53-607-53f48838-210722105645.jpeg" />
          </div>
        </div> */}
        {menus?.map((menu, index) => (
          <div className="menu_section" key={index} ref={e => menuRef.current[index] = e}>
            <h4 className="title">{menu.category.name}</h4>
            <div className="items">
              {menu?.category?.product?.map((product, index) => (
                <FoodItem
                  img={product.media[0].url}  
                  key={index}
                  name={product.name}
                  price={product.price}
                  description={product.description}
                  id={product._id}
                />
              ))}
            </div>
          </div>
        ))}

        {/* <div className="drinks">
          <h4 className="title">Drinks</h4>
          <div className="items">
            <FoodItem img="https://magfood-amazy.com/wp-content/uploads/2017/12/ice-lemon-tea.jpg" />
            <FoodItem img="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMybhn5vmoAd9Awt9pBwg2QkHz5EC0Q-Xu5WYN_bb_4LWjDL_3" />
            <FoodItem img="https://img.freepik.com/premium-photo/iced-coffee-mixes-peach-juice-syrup-lemon-tea-isolated-white-background-healthy-menu-coffee-shop_536380-67.jpg?w=2000" />
            <FoodItem img="https://img.freepik.com/premium-photo/iced-coffee-mixes-peach-juice-syrup-lemon-tea-isolated-white-background-healthy-menu-coffee-shop_536380-67.jpg?w=2000" />
          </div>
        </div> */}
      </div>
      <Footer />
    </div>
  );
}

export default RestaurantDetail;
