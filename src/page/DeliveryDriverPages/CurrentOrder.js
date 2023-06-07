import React from 'react'
import "../../css/CurrentOrder.scss";
import {ItemView} from '../../components'

function CurrentOrder() {
  return (
    <div className="current_container">
      <div className='page_title'>
        <h4 className="menu_table_title">Current Order</h4>
      </div>
      <div className="current_shipping_detail">
          <h3>1.Shipping Detail</h3>
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3833.4851032053593!2d108.14196761536107!3d16.092187443095504!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31421991a401ca65%3A0xae18cd4b35f842b5!2sMIKAZUKI%20WATER%20PARK%20365!5e0!3m2!1scs!2s!4v1664208754573!5m2!1scs!2s"
          ></iframe>
        <div className="delivery_details">
        <div className="delivery_customer">
            <div className="delivery_customer_header">
            <i className="fa-solid fa-address-card">&emsp;</i>
              <h4>Customer</h4>
            </div>
            <h4>Ly Van Tanh</h4>
          </div>

          <div className="delivery_time">
            <div className="delivery_time_header">
              <i className="fa-regular fa-clock">&emsp;</i>
              <h4>Delivery Time</h4>
            </div>
            <h4>25min (10km)</h4>
          </div>
          <div className="delivery_fee">
            <div className="delivery_fee_header">
              <i className="fa-solid fa-truck">&emsp;</i>
              <h4>Delivery Fee</h4>
            </div>
            <h4>36.000 VND</h4>
          </div>
          <div className="delivery_address">
            <div className="delivery_address_header">
              <i className="fa-solid fa-house-chimney">&emsp;</i>
              <h4>22 Le Van Hien, Ngu Hanh Son, Da Nang</h4>
            </div>
            <i className="fa-solid fa-right-long"></i>
          </div>
          <div className="delivery_phone">
            <div className="delivery_phone_header">
              <i className="fa-solid fa-phone">&emsp;</i>
              <h4>0935126212</h4>
            </div>
            <i className="fa-solid fa-right-long"></i>
          </div>
          </div>
        </div>


        <div className="current_order_detail_container">
        <div className="current_order_detail">
          <h3>2.Order Detail</h3>
        </div>
        <div className="cart_detail">
          <div className="cart_detail_header">
              <h3>Order from</h3>
              <h1>Little Vietnam</h1>
          </div>
          <div className="cart_detail_payment">
            <h2  style={{ fontWeight: "600", fontSize: "16px"}}>Payment method</h2>
            <h2 style={{ fontWeight: "500", fontSize: "16px", marginRight:"2%"}}>Cash on delivery</h2>
          </div>
          <div className="cart_detail_summary">
            <h2>Order Summary + Delivery Fee</h2>
            <h2 style={{backgroundColor:"#F61D58", color:"#f5f5f7", borderRadius:'15px', width:"200px", height:"40px", display:"flex", justifyContent:"center", alignItems:"center"}}>Total: 200.000 VND</h2>
          </div>
          
        </div>
        <div className="cart_item_list">
          <ItemView img="https://navicdn.com/nakk/images_article//2017/09/06/bsJEBBaVAPgh9K9TOHqQiWEJgXmmoLAbSbV6mH6m.jpeg" />
          <ItemView img="https://navicdn.com/nakk/images_article//2017/09/06/bsJEBBaVAPgh9K9TOHqQiWEJgXmmoLAbSbV6mH6m.jpeg" />
          <ItemView img="https://navicdn.com/nakk/images_article//2017/09/06/bsJEBBaVAPgh9K9TOHqQiWEJgXmmoLAbSbV6mH6m.jpeg" />
          <ItemView img="https://navicdn.com/nakk/images_article//2017/09/06/bsJEBBaVAPgh9K9TOHqQiWEJgXmmoLAbSbV6mH6m.jpeg" />
          <ItemView img="https://navicdn.com/nakk/images_article//2017/09/06/bsJEBBaVAPgh9K9TOHqQiWEJgXmmoLAbSbV6mH6m.jpeg" />
        </div>
        </div>
        
        
        
      
      
    </div>
  );
}

export default CurrentOrder;