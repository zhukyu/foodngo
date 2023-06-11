import React, { useState, useRef, useEffect } from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Resize, Sort, ContextMenu, Filter, Page, ExcelExport, PdfExport, Edit, Inject } from '@syncfusion/ej2-react-grids';

import { ordersData, contextMenuItems, ordersGrid } from '../../data/dummy';
import { Header } from '../../components';
import { Button, Input, Space, Table, Tag, Modal, Pagination, Segmented, Tooltip, notification } from "antd";
import Highlighter from "react-highlight-words";
import { ResponsiveLine } from "@nivo/line";
import { ResponsivePie } from "@nivo/pie";
import { SearchOutlined } from "@ant-design/icons";
import { TextField } from "@mui/material";
import "../../css/Orders.scss";
import axiosInstance from '../../utility/AxiosInstance';
import UserOrderDetail from '../../components/UserOrderDetail';
import CancelOrder from '../../components/CancelOrder';

const OrderHistory = () => {

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
        await axiosInstance.get(`/orders/users?page=${currentPage}&status=${status}`)
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
    }, [currentPage, status])

    const handleCancelOrder = (record) => {
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
                    date: order.order.createdAt,
                    name: order.restaurant.name,
                    payment: order.order.paymentMethod,
                    total: order.order.total,
                    status: order.order.status,
                    address: order.order.address,
                    id: order.order._id,
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
        },
        {
            title: "Customer Name",
            dataIndex: "name",
            key: "name",
            render: (text) => <a>{text}</a>,
            ...getColumnSearchProps("name"),
        },
        {
            title: "Payment Type",
            dataIndex: "payment",
            key: "payment",
            ...getColumnSearchProps("payment"),
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
            }
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
        },
        {
            title: "Action",
            key: "action",
            render: (_, record) => (
                <Space size="middle">
                    {record.status === 'pending' ?
                        <Space size="middle">
                            <Tooltip title="Cancel">
                                <button
                                    className="delete_button_form"
                                    onClick={() => {
                                        handleCancelOrder(record);
                                    }}
                                >
                                    <i className="fa-solid fa-ban"></i>
                                </button>
                            </Tooltip>
                        </Space>
                    : 
                     ""}
                </Space>
            )
        },
    ];

    const handleChangeStatus = (value) => {
        switch (value) {
            case 'Pending':
                setStatus('pending');
                break;
            case 'Doing':
                setStatus('preparing')
                break;
            case 'All':
                setStatus('')
                break;
            case 'Delivering':
                setStatus('delivering')
                break;
            case 'Delivered':
                setStatus('delivered')
                break;
            default:
                setStatus('')
                break;
        }
    }

    return (
        <div className="orders_table_container" style={{paddingTop:"90px"}}>
            <div className='flex justify-between py-4'>
                <div className=''>
                    <h4 className="orders_table_title">Orders</h4>
                </div>
                <div className='flex py-2.5'>
                    <Segmented options={['Pending', 'Doing', 'Delivering', 'Delivered', 'All', ]} onChange={handleChangeStatus} />
                </div>
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
                width={'50%'}
            >
                <UserOrderDetail order={viewingData} />
            </Modal>
            <Modal
                style={{
                    top: 60,
                }}
                title="Cancel Order"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={null}
                destroyOnClose={true}
            >
                <CancelOrder handleOk={handleOk} orderId={data[seletedRecord?.key]?.id} />
            </Modal>
        </div>
    );
};
export default OrderHistory;
