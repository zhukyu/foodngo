import React from "react";
import "../css/ItemView.scss";


function ItemView(props) {
  

  





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
      </div>
    </div>
  );
}

export default ItemView;
