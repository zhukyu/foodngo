import React from "react";
import "../css/CartItem.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useParams } from "react-router-dom";
function CartItem(props) {
  return (
    <div className="cart_item_container">
      <div className="cart_item">
        <img src={props.img} className="cart_item_image"></img>
        <div className="item_info">
          <h4 className="item_name">{props.name || "Grilled Meat"}</h4>
          <h4 className="item_price">{props.price || "50.000 VND"}</h4>
        </div>
        <div className="item_quantity">
          <div className="minus">
            <i class="fa-solid fa-minus"></i>
          </div>
          <div className="quantity">
            <h4 className="quantity_content">{props.quantity || "1"}</h4>
          </div>

          <div className="plus">
            <i class="fa-solid fa-plus"></i>
          </div>
        </div>
        <i class="fa-solid fa-trash-can"></i>
      </div>
      <div className="underline">
        </div>
    </div>
  );
}

export default CartItem;
