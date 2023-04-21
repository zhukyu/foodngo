import React, { useEffect, useState } from "react";
import "../css/CheckOut.scss";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CartItem from "../components/CartItem";
function CheckOut() {
  return (
    <div className="checkout_container">
      <div className="checkout_left">
        <div className="checkout_account_detail">
          <h3>1.Account Detail</h3>
          <h4>lyvantanh@gmail.com</h4>
        </div>
        <div className="checkout_shipping_detail">
          <h3>2.Delivery Address</h3>
          <frame></frame>
          <div className="delivery_time">
            <div className="delivery_time_header">
              <i class="fa-regular fa-clock"></i>
              <h4>Delivery Time</h4>
            </div>
            <h4>25min</h4>
          </div>
          <div className="delivery_fee">
            <div className="delivery_fee_header">
              <i class="fa-solid fa-truck"></i>
              <h4>Delivery Fee</h4>
            </div>
            <h4>36.000vnd</h4>
          </div>
          <div className="delivery_address">
            <div className="delivery_address_header">
              <i class="fa-solid fa-house-chimney"></i>
              <h4>22 Le Van Hien, Ngu Hanh Son, Da Nang</h4>
            </div>
            <i class="fa-solid fa-right-long"></i>
          </div>
          <div className="delivery_phone">
            <div className="delivery_phone_header">
              <i class="fa-solid fa-phone"></i>
              <h4>0935126212</h4>
            </div>
            <i class="fa-solid fa-right-long"></i>
          </div>
        </div>
        <div className="checkout_payment_method">
          <div className="payment_header">
            <div className="cash">
              <i class="fa-solid fa-money-bill-wave"></i>
              <h4>Cash on Delivery</h4>
            </div>
            <div className="credit_card">
              <i class="fa-brands fa-cc-visa"></i>
              <h4>Credit Card</h4>
            </div>
          </div>
          <div className="payment_check_box">
            <input type="radio" id="cash" name="cash" value="cash" />
            <input
              type="radio"
              id="credit_card"
              name="credit_card"
              value="credit_card"
            />
          </div>
        </div>
        <button>Place order &emsp;&emsp;250.000&nbsp;VND</button>
      </div>
      <div className="checkout_right">
        <div className="cart_detail">
          <div className="cart_detail_header">
            <div className="cart_detail_text">
              <h3>Your cart from</h3>
              <h1>Little Vietnam</h1>
            </div>
            <i class="fa-solid fa-cart-shopping"></i>
          </div>
          <div className="cart_detail_summary">
            <h2>Order Summary (5 items)</h2>
          </div>
        </div>
        <div className="cart_item"></div>
      </div>
    </div>
  );
}

export default CheckOut;
