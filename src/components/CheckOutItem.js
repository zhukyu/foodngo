import React, { useEffect, useRef, useState } from "react";
import "../css/CartItem.scss";
function CheckOutItem(props) {
    const minusRef = useRef(null)
    const handleMinus = props.handleMinus
    const handlePlus = props.handlePlus
    const handleCheck = props.handleCheck

    const handleRemove = () => {

    }

    useEffect(() => {
        if (props.quantity === 1) {
            minusRef?.current?.classList?.add('disabled');
        }
        else {
            minusRef?.current?.classList?.remove('disabled');
        }
    }, [props.quantity])

    return (
        <div className="cart_item_container">
            <div className="cart_item">
                <div className="cart_item_left_section">
                    <input type="checkbox" className="checkbox" onChange={() => handleCheck(props.index)} checked={props.checked}/>
                    <img src={props.img} className="cart_item_image" alt="cart-img"></img>
                    <div className="item_info">
                        <h5 className="item_name">{props.name}</h5>
                        <h5 className="item_price">{(props.price * props.quantity).toLocaleString({ style: "currency", currency: "VND" })} VND</h5>
                    </div>
                </div>
                <div className="cart_item_right_section">
                    <div className="item_quantity">
                        <div className="minus" onClick={() => handleMinus(props.index)} ref={minusRef}>
                            <i className="fa-solid fa-minus"></i>
                        </div>
                        <div className="quantity">
                            <h5 className="quantity_content">{props.quantity}</h5>
                        </div>

                        <div className="plus" onClick={() => handlePlus(props.index)}>
                            <i className="fa-solid fa-plus"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CheckOutItem;
