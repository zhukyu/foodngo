import React, { useEffect, useRef, useState } from 'react'
import "../css/AddCart.scss";
import axiosInstance from '../utility/AxiosInstance';
import { useDispatch } from 'react-redux';
import { addToCart, fetchCartItems } from '../utility/action';
import { notification, Spin } from 'antd';
import Swal from 'sweetalert2'
import { LoadingOutlined } from '@ant-design/icons';

function AddCart(props) {
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [loading, setLoading] = useState(false);
    const minusRef = useRef(null)

    const dispatch = useDispatch();

    const antIcon = (
        <LoadingOutlined
            style={{
                fontSize: 40,
                color: "#FF003D",
            }}
            spin
        />
    );

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        const handleSuccess = (res) => {
            setLoading(false)
            console.log(res);
            if (res.status === 201) {
                dispatch(fetchCartItems());
                props.handleCancel();
                notification.open({
                    icon: <i className="fa-solid fa-check" style={{ color: "green" }}></i>,
                    message: 'Success!',
                    description:
                        'Added to Cart successfully!',
                    onClick: () => {
                        console.log('Notification Clicked!');
                    },
                });
            }
        }
        formData.append('productId', product?.id);
        formData.append('quantity', parseInt(quantity));
        setLoading(true)
        await axiosInstance.post('/cart', formData)
            .then((res) => {
                handleSuccess(res)
            })
            .catch(err => {
                setLoading(false)
                if (err.response.status === 400 && err.response.data.message === "Products of different restaurants") {
                    Swal.fire({
                        title: 'Adding product from another restaurant!',
                        text: "Do you want to add this product to your cart? This action will replace your current cart",
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Yes'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            setLoading(true)
                            axiosInstance.delete('/cart')
                                .then(res => {
                                    if (res.status === 200) {
                                        axiosInstance.post('/cart', formData)
                                            .then((res) => {
                                                handleSuccess(res)
                                            })
                                    }
                                })
                                .catch(error => {
                                    console.error('Error occurred:', error);
                                });
                        }
                    });

                }
            })
    }

    useEffect(() => {
        setProduct(props?.product);
    }, [props])

    const handleAdd = () => {
        setQuantity(quantity + 1);
    }

    const handleMinus = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    }

    const handleChange = (e) => {
        const value = Number(e.target.value);
        if (isNaN(value)) {
            setQuantity(1)
            return
        }
        console.log(value);
        setQuantity(value)
    }

    useEffect(() => {
        console.log(quantity);
        if (quantity < 1) {
            setQuantity(1);
        }
        if (isNaN(quantity)) {
            setQuantity(1);
        }
        if (quantity === 1) {
            minusRef?.current?.classList?.add('disabled');
        }
        else {
            minusRef?.current?.classList?.remove('disabled');
        }
    }, [quantity])

    return (
        <div className='add-cart'>
            <Spin spinning={loading} indicator={antIcon}>
                <form onSubmit={(e) => { handleSubmit(e) }}>
                    <div className="add-cart-detail">
                        <div className='add-cart-detail-title'>
                            <h4>{product?.name}</h4>
                        </div>
                        <div className='add-cart-detail-img'>
                            <img src={product?.img} alt='alt'></img>
                        </div>
                        <div className='add-cart-detail-description'>
                            <p>{product?.description}</p>
                        </div>
                    </div>
                    <div className="add-cart-control">
                        <div className="add-cart-control-quantity">
                            <div className="minus" onClick={handleMinus} ref={minusRef}>
                                <i className="fa-solid fa-minus"></i>
                            </div>
                            <div className="quantity">
                                <input className="quantity-input" value={quantity} onChange={(e) => handleChange(e)} />
                            </div>
                            <div className="plus" onClick={handleAdd}>
                                <i className="fa-solid fa-plus">
                                </i>
                            </div>
                        </div>
                        <div className='add-cart-control-price'>
                            <h5>{(product?.price * quantity).toLocaleString({ style: "currency", currency: "VND" })} VND</h5>
                        </div>
                        <div className='add-cart-control-add-btn'>
                            <button>Add to Cart</button>
                        </div>
                    </div>
                </form>
            </Spin>
        </div>
    )
}

export default AddCart