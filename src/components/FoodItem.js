import React from "react";
import "../css/FoodItem.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Badge, Card, Space } from "antd";

function FoodItem(props) {
  return (
    <div className="item">
      <div className="item_info">
        <h4
          className="name"
          style={props?.popular ? { marginTop: "4%" } : { marginTop: "4%" }}
        >
          {props?.name}
        </h4>
        <h4 className="description">
          {props?.description}
        </h4>
        <div className="price_rating">
          <h4 className="price">
            <i className="fa-solid fa-tags">&nbsp;</i>
            {props?.price.toLocaleString({style:"currency", currency:"VND"})} VND
          </h4>

          <h4 className="rating">
            <i className="fa-solid fa-heart">&nbsp;</i>100%(10)
          </h4>
        </div>
      </div>
      <div className="food_image">
        <img src={props?.img} alt="alt"></img>
        <button className="add_button">Add</button>
      </div>
      {props?.popular && (
        <Badge.Ribbon
          text="#1 Most liked"
          color="red"
          placement="end"
          style={{
            position: "absolute",
            right: "200%",
            fontFamily: "Poppins, sans-serif",
            zIndex: "4",
            height: "27px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "14px",
          }}
        ></Badge.Ribbon>
      )}
    </div>
  );
}

export default FoodItem;
