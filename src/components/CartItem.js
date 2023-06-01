import React, { useEffect, useState } from "react";
import "../css/CartItem.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useParams } from "react-router-dom";
import axiosInstance from "../utility/AxiosInstance";
import { useDispatch, useSelector } from 'react-redux';
import { fetchCartItems } from "../utility/action";
function CartItem(props) {
  const dispatch = useDispatch()
  const [quantity, setQuantity] = useState(props.quantity);

  const handlePlus = () => {
    setQuantity(quantity + 1);
  }

  const handleMinus = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  }

  const handleRemove = () => {
    axiosInstance.put('/cart/remove', {
      "productId": props.id,
    }).then(res => {
      dispatch(fetchCartItems());
    })
  }

  useEffect(() => {
    if (quantity < 1) {
      setQuantity(1);
    }
    if (isNaN(quantity)) {
      setQuantity(1);
    }
    if (quantity === 1) {
      document.getElementsByClassName('minus')[0].classList.add('disabled');
    }
    else {
      document.getElementsByClassName('minus')[0].classList.remove('disabled');
    }
  }, [quantity])

  useEffect(() => {
    const timer = setTimeout(() => {
      axiosInstance.put('/cart', {
        "productId": props.id,
        "quantity": quantity
      }).then(res => {
        console.log(res);
        dispatch(fetchCartItems());
      })
    }, 500)

    return () => clearTimeout(timer)
  }, [quantity])



  return (
    <div className="cart_item_container">
      <div className="cart_item">
        <div className="cart_item_left_section">
          <img src={props.img} className="cart_item_image" alt="cart-img"></img>
          <div className="item_info">
            <h5 className="item_name">{props.name}</h5>
            <h5 className="item_price">{(props.price * props.quantity).toLocaleString({ style: "currency", currency: "VND" })} VND</h5>
          </div>
        </div>
        <div className="cart_item_right_section">
          <div className="item_quantity">
            <div className="minus" onClick={handleMinus}>
              <i className="fa-solid fa-minus"></i>
            </div>
            <div className="quantity">
              <h5 className="quantity_content">{quantity}</h5>
            </div>

            <div className="plus" onClick={handlePlus}>
              <i className="fa-solid fa-plus"></i>
            </div>
          </div>
          <div className="delete_button" onClick={handleRemove}>
            <i className="fa-solid fa-trash"></i>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
