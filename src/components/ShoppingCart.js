import React, { useEffect } from 'react'
import "../css/ShoppingCart.scss";
import CartItem from "../components/CartItem";
import { useDispatch, useSelector } from 'react-redux';
import { fetchCartItems } from '../utility/action';


function ShoppingCart() {

  const cartItems = useSelector((state) => state.cartItems);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCartItems());
  }, [dispatch]);

  useEffect(() => {
    console.log(cartItems);
  }, [cartItems])

  return (
    <div className='main_container'>
      <div className="cart_header">
        <p>Your shopping from</p>
        <h4>FoodnGo</h4>
      </div>
      <div className="cart_detail">
        <div className="cart_detail_summary">
          <button className='checkout_button'><p>Checkout</p><p>{cartItems.total.toLocaleString({ style: "currency", currency: "VND" })} VND</p></button>
        </div>
      </div>
      <div className="cart_item_list">
        {cartItems?.result?.map((item, index) => (
          <CartItem img={item.pro.media[0].url} name={item.pro.name} price={item.pro.price} quantity={item.item.quantity} key={index} />
        ))}
      </div>
    </div>
  )
}

export default ShoppingCart