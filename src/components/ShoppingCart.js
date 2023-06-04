import React, { useEffect } from 'react'
import "../css/ShoppingCart.scss";
import CartItem from "../components/CartItem";
import { useDispatch, useSelector } from 'react-redux';
import { fetchCartItems } from '../utility/action';
import { Link, useNavigate } from 'react-router-dom';
import { Empty } from 'antd';
import empty from '../image/empty.svg'

function ShoppingCart() {

	const cartItems = useSelector((state) => state.cartItems);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		dispatch(fetchCartItems());
	}, [dispatch]);

	useEffect(() => {
		console.log(cartItems?.result?.length);
	}, [cartItems])

	return (
		<div className='main_container'>
			{cartItems?.result?.length !== 0 ?
				<>
					<div className="cart_header">
						<p>Your shopping from</p>
						<Link to={`/restaurant/${cartItems?.restaurant?._id}`}>
							<h4>{cartItems?.restaurant?.name}</h4>
						</Link>
					</div>
					<div className="cart_detail">
						<div className="cart_detail_summary" onClick={() => navigate('/checkout')}>
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
					image={empty}
					imageStyle={{
						height: 100,

					}}
					description={
						<span style={{ fontSize: '18px' }}>
							No item in your cart
						</span>
					}
				>
				</Empty>}
		</div>
	)
}

export default ShoppingCart