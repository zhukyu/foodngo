import React from "react";
import "../css/FoodItem.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


function FoodItem({img , popular}) {
  return (
    <div className="item">
      <div className="item_info">
        <h4 className="name">Pho</h4>
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
        {popular && <h4 className="popular">#1 Most Liked</h4>}
      </div>
      <img src={img} alt="alt"></img>
      <div className="add_button">
        <button>Add</button>
      </div>
    </div>
  );
}

export default FoodItem;
