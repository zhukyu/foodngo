import React, { useEffect, useState } from 'react'
import "../css/OrderDetailShipper.scss";
import { Button, Spin, Table, Tag } from 'antd';
import axiosInstance from '../utility/AxiosInstance';
import { LoadingOutlined } from '@ant-design/icons';
import { DirectionsRenderer, DirectionsService, GoogleMap, useLoadScript } from '@react-google-maps/api';
import { GOOGLE_MAPS_API_KEY } from '../utility/constance';
import { useMemo } from 'react';
import { useCallback } from 'react';
import { useRef } from 'react';

function OrderDetailShipper({ id, currentLocation }) {

    const [data, setData] = useState(null)
    const [subtotal, setSubtotal] = useState(0)
    const [order, setOrder] = useState(null)
    const [directions, setDirections] = useState(null)
    const [destination, setDestination] = useState([])
    const [origin, setOrigin] = useState([])
    const [restaurantLocation, setRestaurantLocation] = useState([])
    const [userLocation, setUserLocation] = useState([])
    const [loading, setLoading] = useState(false)
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: GOOGLE_MAPS_API_KEY,
    })
    const [renderCount, setRenderCount] = useState(0)

    useEffect(() => {
        const fetchOrder = async () => {
            setLoading(true)
            await axiosInstance.get(`/orders/${id}/details`)
                .then(res => {
                    console.log(res.data);
                    setOrder(res.data.order)
                    setRestaurantLocation(res.data.order.restaurant.location.coordinates)
                    setUserLocation(res.data.order.location.coordinates)
                    setDestination(res.data.order.location.coordinates)
                    setOrigin(res.data.order.restaurant.location.coordinates)
                })
                .catch(err => {
                    console.log(err);
                })
            setLoading(false)
        }
        fetchOrder()
    }, [id])

    useEffect(() => {
        let orderItems = order?.orderItems
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

    const antIcon = (
        <LoadingOutlined
            style={{
                fontSize: 40,
                color: '#FF003D',
                position: 'fixed',
                top: '50%',
            }}
            spin
        />
    );

    const renderStatus = (status) => {
        let color = "#A4ABB6";
        if (status === "canceled" || status === "refused") {
            color = "#A4ABB6";
        }
        if (status === "ready") {
            color = "#D95FDB";
        }
        if (status === "preparing") {
            color = "#F54E4E";
        }
        if (status === "pending") {
            color = "#3B7CDB";
        }
        if (status === "delivering") {
            color = "#867CFF";
        }
        if (status === "delivered") {
            color = "#3BDB9E";
        }
        return (
            <Tag color={color} key={status}>
                {status?.toUpperCase()}
            </Tag>
        );
    }

    const directionsMemo = useMemo(() => directions, [directions]);

    const centerLocation = useMemo(() => {
        if (directions && directions.routes && directions.routes.length > 0) {
            const route = directions.routes[0];
            const bounds = new window.google.maps.LatLngBounds();

            route.legs.forEach((leg) => {
                leg.steps.forEach((step) => {
                    step.path.forEach((path) => {
                        bounds.extend(path);
                    });
                });
            });

            const center = bounds.getCenter();
            return { lat: center.lat(), lng: center.lng() };
        } else if (origin) {
            return { lat: origin[1], lng: origin[0] };
        } else if (destination) {
            return { lat: destination[1], lng: destination[0] };
        } else {
            return { lat: 0, lng: 0 };
        }
    }, [origin, destination, directions]);



    let count = useRef(0);
    const directionsCallback = useCallback(
        (res) => {
            if (res !== null && count.current < 1) {
                if (res.status === 'OK') {
                    count.current += 1;
                    setDirections(res);
                } else {
                    count.current = 0;
                    console.log('Error:', res.status);
                }
            }
        },
        [count.current]
    );


    useEffect(() => {
        console.log(renderCount);
    }, [renderCount])
    useEffect(() => {
        console.log(directions);
    }, [directions])
    useEffect(() => {
        console.log(destination);
    }, [destination])

    const renderMap = useMemo(() => {
        return (
            <GoogleMap
                mapContainerStyle={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    borderRadius: '10px',
                    border: '1px solid #C8C8C8'
                }}
                zoom={17}
                center={centerLocation}
            >
                {destination.length > 0 && origin.length > 0 && (
                    <DirectionsService
                        options={{
                            destination: {
                                lat: destination[1],
                                lng: destination[0]
                            },
                            origin: {
                                lat: origin?.[1],
                                lng: origin?.[0]
                            },
                            travelMode: 'DRIVING'
                        }}
                        callback={directionsCallback}
                    />
                )}
                {directions && directions.routes && directions.routes.length > 0 && (
                    <DirectionsRenderer
                        key={directions.request.origin.query + directions.request.destination.query}
                        directions={directionsMemo}
                        options={{ draggable: true }}
                        onDirectionsChanged={(e) => {
                            console.log(e);
                        }}
                    />
                )}
            </GoogleMap>)
    }, [destination, centerLocation])

    const onRestaurantAddressClick = () => {
        count.current = 0;
        setRenderCount(renderCount + 1)
        setOrigin(currentLocation);
        setDestination(restaurantLocation);
    }

    const onUserAddressClick = () => {
        count.current = 0;
        setRenderCount(renderCount + 1)
        setOrigin(currentLocation);
        setDestination(userLocation);
    }

    return (
        <Spin spinning={loading} indicator={antIcon}>
            <div className='OrderDetailShipper-wrapper'>
                {!loading && (
                    <div className='OrderDetailShipper'>
                        <div className="order-left-side">
                            <div className='order-map'>
                                {isLoaded && renderMap}
                            </div>
                            <div className='user-info'>
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
                                        <p>{order?.address}
                                            <Button
                                                className='text-violet-500'
                                                size={'small'}
                                                type="text"
                                                onClick={onUserAddressClick}
                                            >Show Route
                                            </Button>
                                        </p>
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
                                        <h6>Distance</h6>
                                    </div>
                                    <div className='order-info-content'>
                                        <p>{order?.distance >= 1000
                                            ? (order?.distance / 1000).toFixed(2) + " km"
                                            : order?.distance.toFixed(0) + " m"}</p>
                                    </div>
                                </div>
                                <div className="order-info-row">
                                    <div className='order-info-header'>
                                        <h6>Payment Method</h6>
                                    </div>
                                    <div className='order-info-content'>
                                        <p>{order?.paymentMethod}</p>
                                    </div>
                                </div>
                                <div className="order-info-row">
                                    <div className='order-info-header'>
                                        <h6>Status</h6>
                                    </div>
                                    <div className='order-info-content'>
                                        {renderStatus(order?.status)}
                                    </div>
                                </div>
                                <div className="order-info-row">
                                    <div className='order-info-header'>
                                        <h6>Note</h6>
                                    </div>
                                    <div className='order-info-content'>
                                        <p>{order?.note}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="order-right-side">
                            <div className="order-detail-table">
                                <div className="order-items">
                                    <Table
                                        columns={column}
                                        dataSource={data}
                                        pagination={false}
                                        scroll={{ y: 300 }}
                                    />
                                </div>
                            </div>
                            <div className='restaurant-info'>
                                <div className="order-info-row">
                                    <div className='order-info-header'>
                                        <h6>Restaurant Name</h6>
                                    </div>
                                    <div className='order-info-content'>
                                        <p>{order?.restaurant?.name}</p>
                                    </div>
                                </div>
                                <div className="order-info-row">
                                    <div className='order-info-header'>
                                        <h6>Address</h6>
                                    </div>
                                    <div className='order-info-content'>
                                        <p>{order?.restaurant?.address}</p>
                                        <Button
                                            className='text-violet-500'
                                            size={'small'}
                                            type="text"
                                            onClick={onRestaurantAddressClick}
                                        >Show Route
                                        </Button>
                                    </div>
                                </div>
                                <div className="order-info-row">
                                    <div className='order-info-header'>
                                        <h6>Phone Number</h6>
                                    </div>
                                    <div className='order-info-content'>
                                        <p>{order?.restaurant?.phone}</p>
                                    </div>
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
                                        <p>{order?.deliveryFee?.toLocaleString({ style: "currency", currency: "VND" })} VND</p>
                                    </div>
                                </div>
                                <div className="order-total-row">
                                    <div className='order-total-header'>
                                        <h6>Total</h6>
                                    </div>
                                    <div className='order-total-content'>
                                        <p>{order?.total?.toLocaleString({ style: "currency", currency: "VND" })} VND</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </Spin>
    )
}

export default OrderDetailShipper