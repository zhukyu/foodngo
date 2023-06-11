import React, { useEffect, useState } from 'react'
import "../css/OrderDetail.scss";
import { Table, Tag } from 'antd';
import axiosInstance from '../utility/AxiosInstance';
import { set } from 'react-hook-form';

function AccountDetail({ id, role }) {
   

    const [data, setData] = useState(null)
    const [subtotal, setSubtotal] = useState(0)
    const[img, setImg] = useState(null)
    const[email, setEmail] = useState(null)
    const [phone, setPhone] = useState(null)
    const [name, setName] = useState(null)
    const [address, setAddress] = useState(null)
    const [open, setOpen] = useState(null);
    const [close, setClose] = useState(null);
    const [cccd, setCccd] = useState(null);
    const [gender, setGender] = useState(null);
    const [description, setDescription] = useState(null);



    useEffect(() => {
        const fetchUserData = async () => {
            let link = "";
            switch (role) {
                case "Restaurant": link = "/dashboard/restaurant/"; break;
                case "Shipper": link = "/dashboard/shipper/"; break;
                case "User": link = "/dashboard/user/"; break;
            }
          await axiosInstance
            .get(`${link}${id}`)
            .then((res) => {
                console.log(res.data);
                console.log(id);
                console.log(role);
              switch (role) {
                case "Restaurant":
                  setData(res.data.restaurant);
                  setImg(res.data.restaurant.media[0].url);
                  setEmail(res.data.account.email);
                  setPhone(res.data.restaurant.phone);
                  setName(res.data.restaurant.name);
                    setAddress(res.data.restaurant.address);
                    setOpen(res.data.restaurant.openingHours.open);                        
                    setClose(res.data.restaurant.openingHours.close); 
                    setDescription(res.data.restaurant.description);                       
                  break;
                case "Shipper":
                  setData(res.data.shipper);
                  setImg(res.data.shipper.avatar);
                  setEmail(res.data.account.email);
                  setPhone(res.data.shipper.phone);
                  setName(res.data.shipper.name);
                  setCccd(res.data.shipper.idNumber);
                  setGender(res.data.shipper.gender)
                  break;
                case "User":
                    setData(res.data.user);
                    setImg(res.data.user.avatar);
                    setEmail(res.data.account.email);
                    setPhone(res.data.user.phone);
                    setName(res.data.user.name);
                    setGender(res.data.user.gender)
              }
            })
            .catch((err) => {
              console.log(err);
              localStorage.removeItem("access_token");
              setData(null);
            });
        };
    
        fetchUserData();
      }, []);

    

    


    return (
        <div className='OrderDetail'>
            <div className="order-info">
                <div className="order-info-row" style={{display:"flex", justifyContent:'center', alignItems:"center", paddingBottom:"25px"}}>
                    
                        <img src={img ? img : "" } alt="img" style={{width:"200px", height:'200px', objectFit:'cover'}}></img>
                
                    
                </div>
                <div className="order-info-row">
                    <div className='order-info-header'>
                        { role === "Restaurant" ? <h6>Restaurant Name</h6> : role==="Shipper" ? <h6>Shipper Name</h6> : <h6>User Name</h6> }
                    </div>
                    <div className='order-info-content'>
                        <p>{name ? name : ""}</p>
                    </div>
                </div>
                {role === "Restaurant" ? <div className="order-info-row">
                    <div className='order-info-header'>
                        <h6>Address</h6>
                    </div>
                    <div className='order-info-content'>
                        <p>{address ? address : ""}</p>
                    </div>
                </div> : ""}
                
                {role === "Shipper" ? <div className="order-info-row">
                    <div className='order-info-header'>
                        <h6>ID Number</h6>
                    </div>
                    <div className='order-info-content'>
                        <p>{cccd ? cccd : ""}</p>
                    </div>
                </div> : ""}
                <div className="order-info-row">
                    <div className='order-info-header'>
                        <h6>Email</h6>
                    </div>
                    <div className='order-info-content'>
                        <p>{email ? email : ""}</p>
                    </div>
                </div>
                <div className="order-info-row">
                    <div className='order-info-header'>
                        <h6>Phone Number</h6>
                    </div>
                    <div className='order-info-content'>
                        <p>{phone ? phone : ""}</p>
                    </div>
                </div>
                {role === "Restaurant" ? <div className="order-info-row">
                    <div className='order-info-header'>
                        <h6>Description</h6>
                    </div>
                    <div className='order-info-content'>
                        <p>{description ? description : ""}</p>
                    </div>
                </div> : ""}
                {role === "Restaurant" ? <div className="order-info-row">
                    <div className='order-info-header'>
                        <h6>Opening Hours</h6>
                    </div>
                    <div className='order-info-content'>
                        <p>{open && close ? `${open} - ${close}` : ""}</p>
                    </div>
                </div> : ""}
                {role !== "Restaurant" ? <div className="order-info-row">
                    <div className='order-info-header'>
                        <h6>Gender</h6>
                    </div>
                    <div className='order-info-content'>
                        <p>{gender ? gender : ""}</p>
                    </div>
                </div> : ""}
                
                
            </div>
        </div>
    )
}

export default AccountDetail