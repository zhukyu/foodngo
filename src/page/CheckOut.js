import React, { useEffect, useRef, useState } from "react";
import "../css/CheckOut.scss";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import logo from "../image/FoodnGo_logo.png";
import { Empty, Modal, Spin } from "antd";
import CheckOutItem from "../components/CheckOutItem";
import axiosInstance from "../utility/AxiosInstance";
import empty from '../image/empty.svg'
import { LoadingOutlined } from "@ant-design/icons";
import LocationUpdate from "../components/LocationUpdate";
import { GoogleMap, MarkerF, useLoadScript } from '@react-google-maps/api';
import { GOOGLE_MAPS_API_KEY } from "../utility/constance";
import Swal from "sweetalert2";
import CreditCard from "../components/CreditCard.js";

function CheckOut() {
	const [selectedPayment, setSelectedPayment] = useState('');
	const [user, setUser] = useState(null);
	const [coordinate, setCoordinate] = useState(null);
	const [address, setAddress] = useState(null);
	const [delivery, setDelivery] = useState(null);
	const [restaurant, setRestaurant] = useState(null);
	const [checkOutItems, setCheckOutItems] = useState([]);
	const [total, setTotal] = useState(0);
	const [note, setNote] = useState('');
	const [loading, setLoading] = useState(false);
	const [openLocation, setOpenLocation] = useState(false);
	const [openNote, setOpenNote] = useState(false);
	const [openCard, setOpenCard] = useState(false);
	const [isButtonDisabled, setIsButtonDisabled] = useState(false);
	const [isValidCard, setIsValidCard] = useState(false);
	const mapRef = useRef(null);
	const navigate = useNavigate();
	const email = JSON.parse(localStorage.getItem('email'));
	const { isLoaded, loadError } = useLoadScript({
		googleMapsApiKey: GOOGLE_MAPS_API_KEY,
	})

	useEffect(() => {
		window.scrollTo(0, 0)
	}, [])

	useEffect(() => {
		const fetchUserData = async () => {
			await axiosInstance.get('/user')
				.then(res => {
					console.log(res.data.user)
					setUser(res.data.user)
				})
				.catch(err => {
					console.log(err);
					setUser(null)
					navigate('/restaurants')
				})
		}
		fetchUserData();
	}, [])

	useEffect(() => {
		console.log(coordinate);
	}, [coordinate])

	useEffect(() => {
		const coordinateStr = localStorage.getItem('coordinate');
		const coordinate = JSON.parse(coordinateStr);
		const addressStr = localStorage.getItem('address');
		const address = JSON.parse(addressStr);
		if (!address || !coordinate) {
			navigate('/');
			return
		}
		setCoordinate(coordinate);
		setAddress(address);
		const fetchCheckOutItems = async () => {
			setLoading(true);
			await axiosInstance.get(`/checkout?longitude=${coordinate[0]}&latitude=${coordinate[1]}}`)
				.then((res) => {
					if (res.status === 200) {
						console.log(res.data);
						setDelivery(res.data.delivery);
						setRestaurant(res.data.restaurant);
						const checkOutItemsTmp = [...res.data.result];
						checkOutItemsTmp.forEach(item => {
							item.checked = true;
						})

						setCheckOutItems(checkOutItemsTmp);
					}
				})
				.catch(err => {
					console.log(err);
				})
			setLoading(false);
		}

		fetchCheckOutItems();
	}, [])

	useEffect(() => {
		const cartList = checkOutItems.filter(item => item.checked);
		if (selectedPayment === '' || cartList.length === 0) {
			setIsButtonDisabled(true);
		}
		else {
			setIsButtonDisabled(false);
		}
	}, [selectedPayment, checkOutItems])

	useEffect(() => {
		console.log(checkOutItems);
		let totalTmp = 0
		checkOutItems?.forEach(item => {
			if (item.checked) {
				totalTmp = totalTmp + item.pro.price * item.quantity
			}
		})
		setTotal(totalTmp);
	}, [checkOutItems])

	const handleMinus = (index) => {
		console.log(checkOutItems[index].quantity);
		if (checkOutItems[index].quantity === 1) {
			return
		}
		const newCheckOutItems = [...checkOutItems];
		newCheckOutItems[index].quantity -= 1;
		setCheckOutItems(newCheckOutItems);
	}

	const handlePlus = (index) => {
		const newCheckOutItems = [...checkOutItems];
		newCheckOutItems[index].quantity += 1;
		setCheckOutItems(newCheckOutItems);
	}

	const handleCheck = (index) => {
		const newCheckOutItems = [...checkOutItems];
		newCheckOutItems[index].checked = !newCheckOutItems[index].checked;
		setCheckOutItems(newCheckOutItems);
	}

	const handleDivClick = (value) => {
		if (value === 'card') {
			setOpenCard(true);
		}
		setSelectedPayment(value);
	};

	useEffect(() => {
		console.log(isValidCard);
		if (!isValidCard) {
			setSelectedPayment('')
		}
	}, [isValidCard])

	useEffect(() => {
		console.log(selectedPayment);
	}, [selectedPayment])

	const handleSubmit = async () => {
		setLoading(true);
		const cartList = checkOutItems.filter(item => item.checked);
		const items = cartList.map(item => {
			return {
				product: item.pro._id,
				quantity: item.quantity
			}
		})
		const order = {
			address: address.description,
			paymentMethod: selectedPayment,
			restaurantId: restaurant._id,
			items: items,
			location: {
				coordinates: coordinate
			},
			note: note,
		}
		await axiosInstance.post('/user/order', order)
			.then(res => {
				if (res.status === 200) {
					Swal.fire({
						icon: 'success',
						title: 'Order created successfully!',
						confirmButtonColor: '#28A745',
					}).then((result) => {
						if (result.isConfirmed) {
							navigate('/restaurants');
						}
					})
				}
			})
			.catch(err => {
				console.log(err);
				if (err.response.status === 403) {
					Swal.fire({
						icon: 'error',
						title: err.response.data.message,
						confirmButtonColor: '#28A745',
					}).then((result) => {
						if (result.isConfirmed) {
							navigate('/restaurants');
						}
					})
				}
			})
		setLoading(false);
	}

	const antIcon = (
		<LoadingOutlined
			style={{
				fontSize: 40,
				color: "#FF003D",
				position: 'fixed',
				top: '50%',
			}}
			spin
		/>
	);

	const handleCancelLocation = () => {
		setOpenLocation(false);
	}

	const handleCancelNote = () => {
		setOpenNote(false);
	}

	const handleCancelCard = () => {
		setSelectedPayment('')
		setOpenCard(false);
	}

	const handleSuccessCard = () => {
		setOpenCard(false);
	}

	const updateAddress = () => {
		const address = JSON.parse(localStorage.getItem('address'));
		const coordinate = JSON.parse(localStorage.getItem('coordinate'));
		setAddress(address);
		setCoordinate(coordinate);
		const fetchDelivery = async () => {
			setLoading(true);
			await axiosInstance.get(`/map/distance?longitude=${coordinate[0]}&latitude=${coordinate[1]}}`)
				.then((res) => {
					if (res.status === 200) {
						console.log(res.data);
						setDelivery(res.data.delivery);
					}
				})
				.catch(err => {
					console.log(err);
				})
			setAddress(address);
			setLoading(false);
		}

		fetchDelivery();
		setOpenLocation(false);
	}

	const renderMap = () => {
		const location = {
			lat: coordinate?.[1],
			lng: coordinate?.[0]
		}
		return <GoogleMap
			mapContainerStyle={{
				width: '100%',
				height: '100%',
				borderRadius: '10px',
				border: '1px solid #C8C8C8'
			}}
			center={location}
			zoom={17}

		>
			<MarkerF
				position={location}
			/>
		</GoogleMap>
	}

	const handleCreditCard = (value) => {
		setIsValidCard(value);
	}

	return (
		<div className="CheckOut">
			<Spin spinning={loading} indicator={antIcon} >
				<Modal
					style={{
						top: 150,
					}}
					open={openLocation}
					onCancel={handleCancelLocation}
					title={"Update Location"}
					footer={null}
				>
					<LocationUpdate handleSuccess={updateAddress} />
				</Modal>
				<Modal
					style={{
						top: 150,
					}}
					open={openNote}
					onCancel={handleCancelNote}
					title={"Add Note"}
					footer={null}
				>
					<textarea className="note_input" placeholder="Note" value={note} onChange={(e) => setNote(e.target.value)} />
				</Modal>
				<Modal
					style={{
						top: 80,
					}}
					open={openCard}
					onCancel={handleCancelCard}
					title={"Add Card"}
					footer={null}
				>
					<CreditCard setIsValidCard={handleCreditCard} handleSuccessCard={handleSuccessCard} />
				</Modal>
				<div className="header_checkout">
					<Link to={`/restaurant/${restaurant?._id}`}>
						<h4>
							<i className="fa-solid fa-arrow-left">&nbsp;</i>Back
						</h4>
					</Link>
					<div className="header_checkout_logo">
						<Link to="/restaurants">
							<img src={logo} className="logo_img" alt="logo" />
						</Link>
					</div>
				</div>
				<div className="checkout_container">
					<div className="checkout_left">
						<div className="checkout_left_content">
							<div className="checkout_account_detail">
								<h3>1. Account Detail</h3>
								<h4>{email}</h4>
							</div>
							<div className="checkout_detail">
								<h3>2. Shipping Detail</h3>
								<div className="checkout_map" ref={mapRef}>
									{coordinate && isLoaded ?
										renderMap()
										: <></>}
								</div>
								<div className="detail_item">
									<div className="detail_item_header">
										<i className="fa-solid fa-clock">&emsp;</i>
										<h4>Delivery Time</h4>
									</div>
									<h4>{`${delivery?.deliveryTime?.toFixed(0)} min (${delivery?.distance >= 1000
										? (delivery?.distance / 1000)?.toFixed(2) + " km"
										: delivery?.distance?.toFixed(0) + " m"})`}</h4>
								</div>
								<div className="detail_item">
									<div className="detail_item_header">
										<i className="fa-solid fa-truck">&emsp;</i>
										<h4>Delivery Fee</h4>
									</div>
									<h4>{delivery?.deliveryFee?.toLocaleString({ style: "currency", currency: "VND" })} VND</h4>
								</div>
								<div className="detail_item">
									<div className="detail_item_header">
										<i className="fa-solid fa-phone">&emsp;</i>
										<h4>Phone Number</h4>
									</div>
									<h4>{user?.phone}</h4>
								</div>
								<div className="detail_item update_input" onClick={() => setOpenLocation(true)}>
									<div className="detail_item_header">
										<i className="fa-solid fa-house-chimney">&emsp;</i>
										<h4>{address?.description}</h4>
									</div>
									<i className="fa-solid fa-angle-right"></i>
								</div>
								<div className="detail_item update_input" onClick={() => setOpenNote(true)}>
									<div className="detail_item_header">
										<i className="fa-solid fa-note-sticky">&emsp;</i>
										<h4>{note !== '' ? note : 'Note'}</h4>
									</div>
									<i className="fa-solid fa-angle-right"></i>
								</div>
							</div>
							<div className="checkout_detail">
								<h3>3. Payment Method</h3>
								<div className="detail_item payment_method" onClick={() => handleDivClick('cash')}>
									<label htmlFor="cash" className="detail_item_header">
										<i className="fa-solid fa-money-bill-wave">&emsp;</i>
										<h4>Cash on Delivery</h4>
									</label>
									<input type="radio" id="cash" name="payment" value="cash" checked={selectedPayment === 'cash'} />
								</div>

								<div className="detail_item payment_method" onClick={() => handleDivClick('card')}>
									<label htmlFor="credit_card" className="detail_item_header">
										<i className="fa-brands fa-cc-visa">&emsp;</i>
										<h4>Credit Card</h4>
									</label>
									<input type="radio" id="credit_card" name="payment" value="card" checked={selectedPayment === 'card'} />
								</div>
							</div>
							<button onClick={handleSubmit} disabled={isButtonDisabled} className={isButtonDisabled ? 'disabled' : ''}>
								<p>Place order</p>
								<p>{(total + delivery?.deliveryFee).toLocaleString({ style: "currency", currency: "VND" })} VND</p>
							</button>
						</div>
					</div>
					<div className="checkout_right">
						<div className='main_container'>
							{checkOutItems?.length !== 0 ?
								<>
									<div className="cart_header">
										<p>Your shopping from</p>
										<Link to={`/restaurant/${restaurant?._id}`}>
											<h4>{restaurant?.name}</h4>
										</Link>
									</div>
									<div className="cart_detail">
										<div className="cart_detail_total">
											<h5><i className="fa-solid fa-cart-shopping"></i>Total</h5>
											<h5>{total?.toLocaleString({ style: "currency", currency: "VND" })} VND</h5>
										</div>
									</div>
									<div className="cart_item_list">
										{checkOutItems?.map((item, index) => (
											<CheckOutItem
												id={item.pro._id}
												img={item.pro.media[0].url}
												name={item.pro.name}
												price={item.pro.price}
												quantity={item.quantity}
												key={index}
												index={index}
												checked={item.checked}
												handleMinus={handleMinus}
												handlePlus={handlePlus}
												handleCheck={handleCheck}
											/>
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
					</div>
				</div>
				<Footer />
			</Spin>
		</div>
	);
}

export default CheckOut;
