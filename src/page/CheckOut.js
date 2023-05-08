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
          <h3>2.Shipping Detail</h3>
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3833.4851032053593!2d108.14196761536107!3d16.092187443095504!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31421991a401ca65%3A0xae18cd4b35f842b5!2sMIKAZUKI%20WATER%20PARK%20365!5e0!3m2!1scs!2s!4v1664208754573!5m2!1scs!2s" 
        ></iframe>

          <div className="delivery_time">
            <div className="delivery_time_header">
              <i class="fa-regular fa-clock">&emsp;</i>
              <h4>Delivery Time</h4>
            </div>
            <h4>25min (10km)</h4>
          </div>
          <div className="delivery_fee">
            <div className="delivery_fee_header">
              <i class="fa-solid fa-truck">&emsp;</i>
              <h4>Delivery Fee</h4>
            </div>
            <h4>36.000 VND</h4>
          </div>
          <div className="delivery_address">
            <div className="delivery_address_header">
              <i class="fa-solid fa-house-chimney">&emsp;</i>
              <h4>22 Le Van Hien, Ngu Hanh Son, Da Nang</h4>
            </div>
            <i class="fa-solid fa-right-long"></i>
          </div>
          <div className="delivery_phone">
            <div className="delivery_phone_header">
              <i class="fa-solid fa-phone">&emsp;</i>
              <h4>0935126212</h4>
            </div>
            <i class="fa-solid fa-right-long"></i>
          </div>
        </div>
        <div className="checkout_payment_method">
          <h3>3.Payment Method</h3>
          <div className="underline"></div>
          <div className="checkout_payment_method_content">
            <div className="payment_header">
              <div className="cash">
                <i class="fa-solid fa-money-bill-wave">&emsp;</i>
                <h4>Cash on Delivery</h4>
              </div>
              <div className="credit_card">
                <i class="fa-brands fa-cc-visa">&emsp;</i>
                <h4>Credit Card</h4>
              </div>
            </div>
            <div className="payment_check_box">
              <input type="radio" id="cash" name="payment" value="cash" />
              <input
                type="radio"
                id="credit_card"
                name="payment"
                value="credit_card"
              />
            </div>
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
        <div className="cart_item_list">
          <CartItem img="https://navicdn.com/nakk/images_article//2017/09/06/bsJEBBaVAPgh9K9TOHqQiWEJgXmmoLAbSbV6mH6m.jpeg" />
          <CartItem img="https://navicdn.com/nakk/images_article//2017/09/06/bsJEBBaVAPgh9K9TOHqQiWEJgXmmoLAbSbV6mH6m.jpeg" />
          <CartItem img="https://navicdn.com/nakk/images_article//2017/09/06/bsJEBBaVAPgh9K9TOHqQiWEJgXmmoLAbSbV6mH6m.jpeg" />
          <CartItem img="https://navicdn.com/nakk/images_article//2017/09/06/bsJEBBaVAPgh9K9TOHqQiWEJgXmmoLAbSbV6mH6m.jpeg" />
          <CartItem img="https://navicdn.com/nakk/images_article//2017/09/06/bsJEBBaVAPgh9K9TOHqQiWEJgXmmoLAbSbV6mH6m.jpeg" />
        </div>
      </div>
    </div>
  );
}

export default CheckOut;
