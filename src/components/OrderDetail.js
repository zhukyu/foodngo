import React, { useEffect, useState } from 'react'
import "../css/OrderDetail.scss";
import { Table } from 'antd';

function OrderDetail({ order }) {
    console.log(order);

    const [data, setData] = useState(null)
    const [subtotal, setSubtotal] = useState(0)

    useEffect(() => {
        let orderItems = order?.order?.orderItems
        let subtotal = 0
        let data = []
        orderItems?.forEach(item => {
            data.push({
                item: {
                    name: item?.product?.name,
                    image: item?.product?.media[0].url,
                },
                quantity: item?.quantity,
                price: item?.product?.price,
                total: item?.product?.price * item?.quantity,
            })
            subtotal = subtotal + item?.product?.price * item?.quantity
        })
        console.log(data);
        setSubtotal(subtotal)
        setData(data)
    }, [order])

    const column = [
        {
            title: 'Items summary',
            dataIndex: 'item',
            width: '40%',
            key: 'item',
            render: (item) => (
                <div className="order-detail-item">
                    <img src={item?.image} alt="item-img" />
                    <h6>{item?.name}</h6>
                </div>
            )
        },
        {
            title: 'QTY',
            dataIndex: 'quantity',
            width: '10%',
            key: 'quantity',
            align: 'center',
        },
        {
            title: 'Price',
            dataIndex: 'price',
            width: '25%',
            align: 'right',
            key: 'price',
            render: (price) => (
                <p>{price?.toLocaleString({ style: "currency", currency: "VND" })} VND</p>
            )
        },
        {
            title: 'Total',
            dataIndex: 'total',
            width: '25%',
            align: 'right',
            key: 'total',
            render: (total) => (
                <p>{total?.toLocaleString({ style: "currency", currency: "VND" })} VND</p>
            )
        },
    ]

    return (
        <div className='OrderDetail'>
            <div className="order-info">
                <div className="order-info-row">
                    <div className='order-info-header'>
                        <h6>Customer Name</h6>
                    </div>
                    <div className='order-info-content'>
                        <p>{order?.user?.name}</p>
                    </div>
                </div>
                <div className="order-info-row">
                    <div className='order-info-header'>
                        <h6>Address</h6>
                    </div>
                    <div className='order-info-content'>
                        <p>{order?.order?.address}</p>
                    </div>
                </div>
                <div className="order-info-row">
                    <div className='order-info-header'>
                        <h6>Phone Number</h6>
                    </div>
                    <div className='order-info-content'>
                        <p>{order?.user?.phone}</p>
                    </div>
                </div>
                <div className="order-info-row">
                    <div className='order-info-header'>
                        <h6>Status</h6>
                    </div>
                    <div className='order-info-content'>
                        <p>{order?.order?.status}</p>
                    </div>
                </div>
                <div className="order-info-row">
                    <div className='order-info-header'>
                        <h6>Note</h6>
                    </div>
                    <div className='order-info-content'>
                        <p>{order?.order?.note}</p>
                    </div>
                </div>
            </div>
            <div className="order-detail">
                <div className="order-items">
                    <Table
                        columns={column}
                        dataSource={data}
                        pagination={false}
                        scroll={{ y: 300 }}
                    />
                </div>
            </div>
            <div className="order-total">
                <div className="order-total-row">
                    <div className='order-total-header'>
                        <h6>Subtotal</h6>
                    </div>
                    <div className='order-info-content'>
                        <p>{subtotal.toLocaleString({ style: "currency", currency: "VND" })} VND</p>
                    </div>
                </div>
                <div className="order-total-row">
                    <div className='order-total-header'>
                        <h6>Delivery Fee</h6>
                    </div>
                    <div className='order-info-content'>
                        <p>{order?.order?.deliveryFee?.toLocaleString({ style: "currency", currency: "VND" })} VND</p>
                    </div>
                </div>
                <div className="order-total-row">
                    <div className='order-total-header'>
                        <h6>Total</h6>
                    </div>
                    <div className='order-total-content'>
                        <p>{order?.order?.total?.toLocaleString({ style: "currency", currency: "VND" })} VND</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderDetail