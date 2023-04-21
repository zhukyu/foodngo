import React, { useEffect, useState } from "react";
import "../css/RestaurantDetail.scss";
import { useParams } from "react-router-dom";
import Little_Vietnam from "../image/Restaurants/Little_Vietnam.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FoodItem from "../components/FoodItem";

function RestaurantDetail() {
  return (
    <div className="restaurant_detail">
      <div className="hero_container">
        <div className="hero">
          <h4 className="shop_nav">
            <a className="home_nav">Home</a>
            <a className="shops_nav">Shops</a>Little Vietnam
          </h4>
          <div className="packet">
            <img
              src={Little_Vietnam}
              alt="little Vietnam"
              className="restaurant_avatar"
            />
            <div className="restaurant_info">
              <div className="shop_certification">
                <i class="bi bi-shop-window">&nbsp;</i> Shop
              </div>
              <h1 className="restaurant_name">Little Vietnam</h1>
              <h4 className="restaurant_description">
                Western Food, Main Course, Banh mi, Sauce...
              </h4>
              <div className="restaurant_basic_info">
                <h4 className="rating">
                  <i className="bi bi-star-fill">&nbsp;</i>4.7
                </h4>
                <h4 className="distance">
                  <i className="bi bi-geo-alt-fill">&nbsp;</i>2km
                </h4>
                <h4 className="working_hours">
                  <i className="bi bi-stopwatch-fill">&nbsp;</i>8:00 - 22:00
                </h4>
                <h4 className="working_days">
                  <i className="bi bi-calendar3">&nbsp;</i>Mon - Sat
                </h4>
              </div>
              <div className="phone_address">
                <h4 className="phone_number">
                  <i className="bi bi-telephone-fill">&nbsp;</i>
                  <p>Tel:&nbsp;</p>0851239943
                </h4>
                <h4 className="address">
                  <i className="fa-solid fa-map-location-dot">&nbsp;</i>
                  <p>Address:&nbsp;</p>210 Nguyen Tri Phuong, Thanh Khe, Da Nang
                </h4>
              </div>
              <div className="opening_certification">
                <i className="fa-solid fa-bullhorn">&nbsp;</i>Opening
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="menu_container">
        <div className="best_seller">
          <h4 className="title">Best Sellers</h4>
          <div className="items">
            <FoodItem popular={true} img = "https://www.foodandwine.com/thmb/0knDIITmWZwGLymVoH7-9EK-3ZI=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/chicken-pho-14-FT-RECIPE1222-b82ecb87d5fa4bf0af1b4468c807a560.jpg"/>
            <FoodItem popular={true} img = "https://navicdn.com/nakk/images_article//2017/09/06/bsJEBBaVAPgh9K9TOHqQiWEJgXmmoLAbSbV6mH6m.jpeg"/>
            <FoodItem popular={true} img = "https://vnatrip.com/files/images/Service/ch%E1%BA%A3-gio-b%E1%BA%AFp-chay.jpg"/>
            <FoodItem popular={true} img = "https://images.foody.vn/res/g100004/1000030980/prof/s640x400/file_50684d23-a9f2-4ed5-8c53-607-53f48838-210722105645.jpeg"/>
          </div>
        </div>
        <div className="special_items">
          <h4 className="title">Special Items</h4>
          <div className="items">
            <FoodItem img = "https://znews-photo.zingcdn.me/w960/Uploaded/tmuitg/2023_02_07/5_1_1.jpg"/>
            <FoodItem img = "https://dulichviet.com.vn/images/bandidau/banh-cuon-thanh-tri-mon-an-hap-dan-moi-du-khach-du-lich-ha-noi.jpg"/>
            <FoodItem img = "https://congthucnau.com/wp-content/uploads/2022/11/cach-lam-banh-bao-xa-xiu.jpeg"/>
            <FoodItem img = "https://pholyquocsu.vn/wp-content/uploads/2019/09/MyXaoBo.jpg"/>
          </div>
        </div>
        <div className="drinks">
          <h4 className="title">Drinks</h4>
          <div className="items">
            <FoodItem img = "https://magfood-amazy.com/wp-content/uploads/2017/12/ice-lemon-tea.jpg"/>
            <FoodItem img = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMybhn5vmoAd9Awt9pBwg2QkHz5EC0Q-Xu5WYN_bb_4LWjDL_3"/>
            <FoodItem img = "https://img.freepik.com/premium-photo/iced-coffee-mixes-peach-juice-syrup-lemon-tea-isolated-white-background-healthy-menu-coffee-shop_536380-67.jpg?w=2000"/>
            <FoodItem />
          </div>
        </div>
      </div>
    </div>
  );
}

export default RestaurantDetail;
