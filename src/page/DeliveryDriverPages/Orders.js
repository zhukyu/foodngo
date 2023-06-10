import React, { useState, useRef, useEffect } from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Resize, Sort, ContextMenu, Filter, Page, ExcelExport, PdfExport, Edit, Inject } from '@syncfusion/ej2-react-grids';

import { Button, Input, Space, Table, Tag, Modal, Pagination, Segmented, Tooltip, notification } from "antd";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";
import "../../css/Orders.scss";
import axiosInstance from '../../utility/AxiosInstance';
import RejectOrder from '../../components/RejectOrder';
import OrderDetailShipper from '../../components/OrderDetailShipper';

const Orders = ({ coordinate }) => {
    const [viewingData, setViewingData] = useState(null);
    const [isViewed, setIsViewed] = useState(false);
    const [orders, setOrders] = useState(null);
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalOrders, setTotalOrders] = useState(0);
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState('pending');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [seletedRecord, setSelectedRecord] = useState(null);

    const fetchOrders = async () => {
        setLoading(true)
        await axiosInstance.get(`/orders/find?longitude=${coordinate[0]}&latitude=${coordinate[1]}&page=${currentPage}`)
            .then(res => {
                console.log(res.data);
                setTotalPages(res.data.pagination.totalPage)
                setOrders(res.data.orders)
                setTotalOrders(res.data.pagination.totalResult)
            })
            .catch(err => {
                console.log(err);
                setOrders(null)
            })
        setLoading(false)
    }

    useEffect(() => {

        fetchOrders();
    }, [currentPage, coordinate])

    const handleReject = (record) => {
        setSelectedRecord(record);
        setIsModalOpen(true);
    };
    const handleOk = () => {
        fetchOrders();
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleSign = (record) => {
        const signOder = async () => {
            await axiosInstance.post(`/orders/${data[record?.key]?.id}/shipper`)
                .then(res => {
                    console.log(res);
                    fetchOrders();
                    notification.open({
                        icon: <i className="fa-solid fa-check" style={{ color: 'green' }}></i>,
                        message: 'Success!',
                        description: 'Order signed successfully!',
                        onClick: () => {
                            console.log('Notification Clicked!');
                        },
                    });
                })
                .catch(err => {
                    console.log(err);
                })
        }
        Modal.confirm({
            title: "Are you sure you want to sign to this order?",
            okText: "Yes",
            okType: "danger",
            okButtonProps: {
                type: "primary",
            },
            cancelButtonProps: {
                type: "text",
            },
            onOk: () => {
                signOder();
            },
        });
    };

    const handleAccept = (record) => {
        const acceptOrder = async () => {
            await axiosInstance.patch(`/orders/${data[record?.key]?.id}/restaurant?status=preparing`)
                .then(res => {
                    console.log(res);
                    fetchOrders();
                    notification.open({
                        icon: <i className="fa-solid fa-check" style={{ color: 'green' }}></i>,
                        message: 'Success!',
                        description: 'Order accepted successfully!',
                        onClick: () => {
                            console.log('Notification Clicked!');
                        },
                    });
                })
                .catch(err => {
                    console.log(err);
                })
        }
        Modal.confirm({
            title: "Are you sure you want to accept this order?",
            okText: "Yes",
            okType: "danger",
            okButtonProps: {
                type: "primary",
            },
            cancelButtonProps: {
                type: "text",
            },
            onOk: () => {
                acceptOrder();
            },
        });
    };

    const handleView = (record) => {
        setIsViewed(true);
        setViewingData(record);
    }

    const resetViewing = () => {
        setIsViewed(false);
        setViewingData(null);
    }

    const [searchText, setSearchText] = useState("");
    const [searchedColumn, setSearchedColumn] = useState("");
    const searchInput = useRef(null);
    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };
    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText("");
    };
    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({
            setSelectedKeys,
            selectedKeys,
            confirm,
            clearFilters,
            close,
        }) => (
            <div
                style={{
                    padding: 8,
                }}
                onKeyDown={(e) => e.stopPropagation()}
            >
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) =>
                        setSelectedKeys(e.target.value ? [e.target.value] : [])
                    }
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{
                        marginBottom: 8,
                        display: "block",
                    }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{
                            width: 90,
                            backgroundColor: "#F61D58",
                        }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({
                                closeDropdown: false,
                            });
                            setSearchText(selectedKeys[0]);
                            setSearchedColumn(dataIndex);
                        }}
                        style={{
                            color: "#F61D58",
                        }}
                    >
                        Filter
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            close();
                        }}
                        style={{
                            color: "#F61D58",
                        }}
                    >
                        close
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined
                style={{
                    color: filtered ? "#1890ff" : undefined,
                }}
            />
        ),
        onFilter: (value, record) =>
            record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{
                        backgroundColor: "#ffc069",
                        padding: 0,
                    }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ""}
                />
            ) : (
                text
            ),
    });

    useEffect(() => {
        if (orders) {
            const temp = [];
            orders.forEach((order, index) => {
                temp.push({
                    key: index,
                    date: order.createdAt,
                    name: order.restaurant.name,
                    distance: order.distance,
                    deliveryFee: order.deliveryFee,
                    total: order.total,
                    status: order.status,
                    address: order.address,
                    id: order._id,
                });
            });
            setData(temp);
        }
    }, [orders])

    useEffect(() => {
        console.log(data);
    }, [data])

    const columns = [
        {
            title: "Date",
            dataIndex: "date",
            key: "date",
            ...getColumnSearchProps("date"),
            render: (obj) => {
                const date = new Date(obj);
                const options = { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: false };
                const formattedDateTime = date.toLocaleString('en-GB', options);
                return formattedDateTime
            },
            width: '12%',
        },
        {
            title: "Restaurant Name",
            dataIndex: "name",
            key: "name",
            ...getColumnSearchProps("name"),
            width: '20%',
        },
        {
            title: "Distance",
            dataIndex: "distance",
            key: "distance",
            ...getColumnSearchProps("distance"),
            render: (text) => {
                return (
                    `${(text / 1000).toFixed(2)} km`
                )
            },
            width: '10%',
        },
        {
            title: "Delivery Fee",
            dataIndex: "deliveryFee",
            key: "deliveryFee",
            ...getColumnSearchProps("deliveryFee"),
            render: (text) => {
                return (
                    `${text.toLocaleString({ style: "currency", currency: "VND" })} VND`
                )
            },
            width: '10%',
        },
        {
            title: "Total",
            dataIndex: "total",
            key: "total",
            ...getColumnSearchProps("total"),
            render: (text) => {
                return (
                    `${text.toLocaleString({ style: "currency", currency: "VND" })} VND`
                )
            },
            width: '10%',
        },
        {
            title: "Status",
            key: "status",
            dataIndex: "status",
            // sortDirections: ["descend", "ascend"],
            // sorter: (a, b) => a.address.length - b.address.length,
            ...getColumnSearchProps("status"),
            render: (_, { status }) => {
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
            },
            width: '5%',
        },
        {
            title: "Action",
            key: "action",
            render: (_, record) => (
                <Space size="middle">
                    { record.status === 'preparing' || record.status === 'ready' ?
                        <Space size="middle">
                            <Tooltip title="Sign">
                                <button
                                    className="edit_button_form"
                                    onClick={() => {
                                        handleSign(record);
                                    }}
                                >
                                    <i className="fa-solid fa-check"></i>
                                </button>
                            </Tooltip>
                        </Space>
                        : <></>}
                </Space >
            ),
            width: '10%',
        },
    ];

    return (
        <div className="orders_table_container">
            <div className='flex justify-between py-4'>
                <h4 className="orders_table_title" style={{ margin: "10px 0" }}>Nearby Orders</h4>
            </div>
            <Table
                className="orders_table"
                loading={loading}
                columns={columns}
                dataSource={data}
                pagination={{ current: currentPage, pageSize: 10, total: totalOrders, onChange: (page) => setCurrentPage(page) }}
                onRow={(record) => {
                    return {
                        onDoubleClick: () => {
                            handleView(orders[record.key]);
                        }
                    }
                }}
            />
            <Modal
                title="Order Details"
                style={{
                    top: 30,
                }}
                open={isViewed}
                onCancel={() => {
                    resetViewing();
                }}
                destroyOnClose={true}
                footer={null}
                width={'90%'}
            >
                <OrderDetailShipper id={viewingData?._id} currentLocation={coordinate} />
            </Modal>
            <Modal
                style={{
                    top: 50,
                }}
                title="Refuse Order"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={null}
                destroyOnClose={true}
            >
                <RejectOrder handleOk={handleOk} orderId={data[seletedRecord?.key]?.id} />
            </Modal>
        </div>
    );
};
export default Orders;