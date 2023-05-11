import React from "react";
import "../css/FoodItem.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Badge, Card, Space } from "antd";

function FoodItem({ img, popular }) {
  return (
    <div className="item">
      <div className="item_info">
        <h4
          className="name"
          style={popular ? { marginTop: "4%" } : { marginTop: "4%" }}
        >
          Pho
        </h4>
        <h4 className="description">
          Our Pho is very delicious with high class beef
        </h4>
        <div className="price_rating">
          <h4 className="price">
            <i class="fa-solid fa-tags">&nbsp;</i>30.000 VND
          </h4>

          <h4 className="rating">
            <i class="fa-solid fa-heart">&nbsp;</i>100%(10)
          </h4>
        </div>
      </div>
      <div className="food_image">
      <img src={img} alt="alt"></img> 
      <button className="add_button">Add</button>
      </div>
      {popular && (
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
