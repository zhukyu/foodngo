import React from 'react'
import "../css/ShoppingCart.scss";
import CartItem from "../components/CartItem";

function ShoppingCart() {
  return (
    <div className='main_container'>
        <i class="fa-solid fa-circle-xmark close_button"></i>
        <div className="cart_detail">
          <div className="cart_detail_header">
            <div className="cart_detail_text">
              <h3>Your cart from</h3>
              <h1>Little Vietnam</h1>
            </div>
            <i class="fa-solid fa-cart-shopping"></i>
            <h2>(5 items)</h2>
          </div>
          <div className="cart_detail_summary">
            <button className='checkout_button'><p>Checkout</p><p>320.000VND</p></button>
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
  )
}

export default ShoppingCart