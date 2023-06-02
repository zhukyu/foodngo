import React, { useState } from "react";
import "../css/FoodItem.scss";
import { Badge, Modal } from "antd";
import AddCart from "./AddCart";
import { useNavigate } from "react-router";

function FoodItem(props) {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate()
  const showModal = () => {
    if(!localStorage.getItem('access_token')) {
      navigate('/login');
      return;
    }
    setOpen(true);
  };

  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpen(false);
    }, 3000);
  };
  const handleCancel = () => {
    setOpen(false);
  };

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
            {props?.price.toLocaleString({ style: "currency", currency: "VND" })} VND
          </h4>

          {/* <h4 className="rating">
            <i className="fa-solid fa-heart">&nbsp;</i>100%(10)
          </h4> */}
        </div>
      </div>
      <div className="food_image">
        <img src={props?.img} alt="alt"></img>
        <button className="add_button" onClick={showModal}>Add</button>
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
      <Modal
        style={{
          top: 60,
        }}
        open={open}
        onOk={handleOk}
        onCancel={handleCancel}
        title={"Add to Cart"}
        footer={null}
      >
        <AddCart handleCancel={handleCancel} product={props} />
      </Modal>
    </div>
  );
}

export default FoodItem;
