import React, { useState, useRef, useEffect } from 'react';
import { Header } from '../../components';
import { Button, Input, Space, Table, Tag, Modal, notification, Tooltip } from "antd";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";
import "../../css/Products.scss";
import axiosInstance from '../../utility/AxiosInstance';
import AddProduct from '../../components/AddProduct';
import UpdateProduct from '../../components/UpdateProducts';

const Products = () => {

    const [viewingData, setViewingData] = useState(null);
    const [isViewed, setIsViewed] = useState(false);
    const [products, setProducts] = useState(null);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [seletedRecord, setSelectedRecord] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);

    const fetchProducts = async () => {
        setLoading(true);
        await axiosInstance.get(`/product?page=${currentPage}&limit=5`)
            .then(res => {
                console.log(res.data)
                setProducts(res.data.products)
                setTotalResults(res.data.pagination.totalProducts)
            })
            .catch(err => {
                console.log(err);
                setProducts(null)
            })
        setLoading(false);
    }

    useEffect(() => {
        fetchProducts();
    }, [currentPage])

    const handleEdit = (record) => {
        setSelectedRecord(record);
        setIsUpdateModalOpen(true);
    }

    const handleDelete = (record) => {
        const deleteProduct = async () => {
            await axiosInstance.delete(`/product/${data[record?.key]?.id}`)
                .then(res => {
                    console.log(res);
                    fetchProducts();
                    notification.open({
                        icon: <i className="fa-solid fa-check" style={{ color: 'green' }}></i>,
                        message: 'Success!',
                        description: 'Product deleted successfully!',
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
            title: "Are you sure you want to delete this product?",
            okText: "Yes",
            okType: "danger",
            okButtonProps: {
                type: "primary",
            },
            cancelButtonProps: {
                type: "text",
            },
            onOk: () => {
                deleteProduct();
            },
        });
    }

    const handleView = (record) => {
        setIsViewed(true);
        setViewingData(record);
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
        if (products) {
            const temp = [];
            console.log(products);
            products.forEach((product, index) => {
                temp.push({
                    key: index,
                    index: index + 1,
                    name: product.name,
                    description: product.description,
                    price: product.price,
                    category: product.category.name,
                    image: product.media[0].url,
                    id: product._id,
                });
            });
            setData(temp);
        }
    }, [products])

    useEffect(() => {
        console.log(data);
    }, [data])

    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        fetchProducts();
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const showUpdateModal = () => {
        setIsUpdateModalOpen(true);
    }
    const handleUpdateOk = () => {
        fetchProducts();
        setIsUpdateModalOpen(false);
    }
    const handleUpdateCancel = () => {
        setIsUpdateModalOpen(false);
    }

    const columns = [
        {
            title: "No.",
            dataIndex: "index",
            key: "index",
            ...getColumnSearchProps("index"),
            width: "5%",
        },
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
            ...getColumnSearchProps("name"),
            width: "20%",
        },
        {
            title: "Description",
            dataIndex: "description",
            key: "description",
            ...getColumnSearchProps("description"),
            width: "30%",
        },
        {
            title: "Price",
            dataIndex: "price",
            key: "price",
            ...getColumnSearchProps("price"),
            render: (text) => {
                return (
                    `${text?.toLocaleString({ style: "currency", currency: "VND" })} VND`
                )
            },
            width: "10%",
        },
        {
            title: "Category",
            dataIndex: "category",
            key: "category",
            ...getColumnSearchProps("category"),
            width: "15%",
        },
        {
            title: "Image",
            dataIndex: "image",
            key: "image",
            ...getColumnSearchProps("image"),
            render: (image) => {
                return (
                    <img src={image} alt="product_image" className="item-img" />
                )
            },
            width: "10%",
        },
        {
            title: "Action",
            key: "action",
            render: (_, record) => (
                <Space size="middle">
                    <Tooltip title="Edit">
                        <button
                            className="edit_button_form"
                            onClick={() => {
                                handleEdit(record);
                            }}
                        >
                            <i className="fa-solid fa-pen-to-square"></i>
                        </button>
                    </Tooltip>
                    <Tooltip title="Delete">
                        <button
                            className="delete_button_form"
                            onClick={() => {
                                handleDelete(record);
                            }}
                        >
                            <i className="fa-regular fa-trash-can"></i>
                        </button>
                    </Tooltip>
                </Space>
            ),
            width: "10%",
        },
    ];

    return (
        <div className="orders_table_container">
            <div className='flex justify-between py-4'>
                <div className=''>
                    <h4 className="orders_table_title">Products</h4>
                </div>
                <div className='flex py-1.5'>
                    <button className="add-btn py-0.5" onClick={showModal}>
                        <i className="fa-regular fa-plus mr-1"></i>
                        Product
                    </button>
                </div>
            </div>

            <Table
                className="orders_table"
                loading={loading}
                columns={columns}
                dataSource={data}
                pagination={{ pageSize: 5, total: totalResults, onChange: (page) => { setCurrentPage(page) } }}
                onRow={(record) => {
                    return {
                        onDoubleClick: () => {
                            handleView(products[record.key]);
                        }
                    }
                }}
            />
            <Modal
                style={{
                    top: 60,
                }}
                title="Add Product"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={null}
                destroyOnClose={true}
            >
                <AddProduct handleOk={handleOk} />
            </Modal>
            <Modal
                style={{
                    top: 60,
                }}
                title="Update Product"
                open={isUpdateModalOpen}
                onOk={handleUpdateOk}
                onCancel={handleUpdateCancel}
                footer={null}
                destroyOnClose={true}
            >
                <UpdateProduct handleOk={handleUpdateOk} productId={data[seletedRecord?.key]?.id} />
            </Modal>
        </div>
    );
};
export default Products;
