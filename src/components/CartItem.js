import React from "react";
import "../css/CartItem.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useParams } from "react-router-dom";
function CartItem(props) {
  return (
    <div className="cart_item_container">
      <div className="cart_item">
        <div className="cart_item_left_section">
          <img src={props.img} className="cart_item_image" alt="cart-img"></img>
          <div className="item_info">
            <h5 className="item_name">{props.name || "Grilled Meat"}</h5>
            <h5 className="item_price">{props.price || "50.000 VND"}</h5>
          </div>
        </div>
        <div className="cart_item_right_section">
          <div className="item_quantity">
            <div className="minus">
              <i className="fa-solid fa-minus"></i>
            </div>
            <div className="quantity">
              <h5 className="quantity_content">{props.quantity || "1"}</h5>
            </div>

            <div className="plus">
              <i className="fa-solid fa-plus"></i>
            </div>
          </div>
          <div className="delete_button">
            <i className="fa-solid fa-trash"></i>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
