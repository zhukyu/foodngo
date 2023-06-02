import React, { useEffect } from 'react'
import "../css/ShoppingCart.scss";
import CartItem from "../components/CartItem";
import { useDispatch, useSelector } from 'react-redux';
import { fetchCartItems } from '../utility/action';
import { Link } from 'react-router-dom';
import { Empty } from 'antd';


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
      {cartItems.length === 0 ?
        <>
          <div className="cart_header">
            <p>Your shopping from</p>
            <Link to={`/restaurant/${cartItems?.restaurant?._id}`}>
              <h4>{cartItems?.restaurant?.name}</h4>
            </Link>
          </div>
          <div className="cart_detail">
            <div className="cart_detail_summary">
              <button className='checkout_button'><p>Checkout</p><p>{cartItems?.total?.toLocaleString({ style: "currency", currency: "VND" })} VND</p></button>
            </div>
          </div>
          <div className="cart_item_list">
            {cartItems?.result?.map((item, index) => (
              <CartItem id={item.pro._id} img={item.pro.media[0].url} name={item.pro.name} price={item.pro.price} quantity={item.item.quantity} key={index} />
            ))}
          </div>
        </> :
        <Empty
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '100px auto' }}
          image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
          imageStyle={{
            height: 100,

          }}
          description={
            <span style={{fontSize: '18px'}}>
              No item in your cart
            </span>
          }
        >
        </Empty>}
    </div>
  )
}

export default ShoppingCart