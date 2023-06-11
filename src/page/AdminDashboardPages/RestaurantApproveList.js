import React, { useState, useRef, useEffect } from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Resize, Sort, ContextMenu, Filter, Page, ExcelExport, PdfExport, Edit, Inject } from '@syncfusion/ej2-react-grids';

import { Button, Input, Space, Table, Tag, Modal, Pagination, Segmented, Tooltip, notification } from "antd";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";
import "../../css/Orders.scss";
import axiosInstance from '../../utility/AxiosInstance';
import RejectOrder from '../../components/RejectOrder';
import OrderDetailShipper from '../../components/OrderDetailShipper';
import AccountDetail from '../../components/AccountDetail';

const RestaurantApproveList = ({ coordinate }) => {
  const [viewingData, setViewingData] = useState(null);
  const [isViewed, setIsViewed] = useState(false);
  const [restaurants, setRestaurants] = useState(null);
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalRestaurants, setTotalRestaurants] = useState(0);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('pending');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [seletedRecord, setSelectedRecord] = useState(null);

  const fetchRestaurants = async () => {
    setLoading(true)
    await axiosInstance.get(`/dashboard/restaurant?status=${status}&page=${currentPage}&limit=6}`)
      .then(res => {
        console.log(res.data);
        setTotalPages(res.data.pagination.totalPage)
        setRestaurants(res.data.restaurants)
        setTotalRestaurants(res.data.pagination.totalResult)
      })
      .catch(err => {
        console.log(err);
        setRestaurants(null)
      })
    setLoading(false)
  }

  useEffect(() => {

    fetchRestaurants();
  }, [currentPage, coordinate, status])

  const handleReject = (record) => {
    setSelectedRecord(record);
    setIsModalOpen(true);
  };
  const handleOk = () => {
    fetchRestaurants();
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleApprove = (record) => {
    const approve = async () => {
      await axiosInstance.put(`/dashboard/restaurant/${data[record?.key]?.id}`)
        .then(res => {
          console.log(res);
          fetchRestaurants();
          notification.open({
            icon: <i className="fa-solid fa-check" style={{ color: 'green' }}></i>,
            message: 'Success!',
            description: 'Restaurant approved successfully!',
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
      title: "Are you sure you want to approve this restaurant?",
      okText: "Yes",
      okType: "danger",
      okButtonProps: {
        type: "primary",
      },
      cancelButtonProps: {
        type: "text",
      },
      onOk: () => {
        approve();
      },
    });
  };

  const handleDelete = (record) => {
    const refuse = async () => {
      await axiosInstance.put(`/dashboard/banned/${data[record?.key]?.id}?role=restaurant`)
        .then(res => {
          console.log(res);
          fetchRestaurants();
          notification.open({
            icon: <i className="fa-solid fa-check" style={{ color: 'green' }}></i>,
            message: 'Success!',
            description: 'Restaurant deleted successfully!',
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
      title: "Are you sure you want to delete this restaurant?",
      okText: "Yes",
      okType: "danger",
      okButtonProps: {
        type: "primary",
      },
      cancelButtonProps: {
        type: "text",
      },
      onOk: () => {
        refuse();
      },
    });
  };

  const handleUnban = (record) => {

  }

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
    if (restaurants) {
      const temp = [];
      restaurants.forEach((item, index) => {
        temp.push({
          key: index,
          index: index,
          id: item.restaurant._id,
          name: item.restaurant.name,
          email: item.account.email,
          phone: item.restaurant.phone,
          createdAt: item.account.createdAt,
          status: item.account.status,
        });
      });
      setData(temp);
    }
  }, [restaurants])

  useEffect(() => {
    console.log(data);
  }, [data])

  const columns = [
    {
      title: "No.",
      dataIndex: "index",
      key: "index",
      render: (_, __, index) => index + 1,
      width: '5%',
    },
    {
      title: "Restaurant Name",
      dataIndex: "name",
      key: "name",
      ...getColumnSearchProps("name"),
      width: '20%',
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      ...getColumnSearchProps("email"),
      width: '20%',
    },
    {
      title: "Phone Number",
      dataIndex: "phone",
      key: "phone",
      ...getColumnSearchProps("phone"),
      width: '15%',
    },
    {
      title: "Created at",
      dataIndex: "createdAt",
      key: "createdAt",
      ...getColumnSearchProps("createdAt"),
      render: (obj) => {
        const date = new Date(obj);
        const options = { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: false };
        const formattedDateTime = date.toLocaleString('en-GB', options);
        return formattedDateTime
      },
      width: '12%',
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
        if (status === "preparing") {
          color = "#F54E4E";
        }
        if (status === "pending") {
          color = "#3B7CDB";
        }
        if (status === "delivering") {
          color = "#867CFF";
        }
        if (status === "active") {
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
          {record.status === 'pending' ?
            <Space size="middle">
              <Tooltip title="Approve">
                <button
                  className="edit_button_form"
                  onClick={() => {
                    handleApprove(record);
                  }}
                >
                  <i className="fa-solid fa-check"></i>
                </button>
              </Tooltip>
              <Tooltip title="Delete">
                <button
                  className="delete_button_form"
                  onClick={() => {
                    handleDelete(record);
                  }}
                >
                  <i className="fa-solid fa-ban"></i>
                </button>
              </Tooltip>
            </Space>
            : <></>}
          {record.status === 'active' ?
            <Space size="middle">
              {status === '' ? (<div style={{ width: '44px' }}></div>) : <></>}
              <Tooltip title="Delete">
                <button
                  className="delete_button_form"
                  onClick={() => {
                    handleDelete(record);
                  }}
                >
                  <i className="fa-solid fa-ban"></i>
                </button>
              </Tooltip>
            </Space>
            : <></>}
          {record.status === 'deleted' ?
            <Space size="middle">
              <Tooltip title="Approve">
                <button
                  className="edit_button_form"
                  onClick={() => {
                    handleUnban(record);
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

  const handleChangeStatus = (value) => {
    switch (value) {
      case 'Pending':
        setStatus('pending');
        break;
      case 'Active':
        setStatus('active')
        break;
      case 'Deleted':
        setStatus('deleted')
        break;
      case 'All':
        setStatus('')
        break;
      default:
        setStatus('')
        break;
    }
  }

  return (
    <div className="orders_table_container">
      <div className='flex justify-between py-4'>
        <div className=''>
          <h4 className="orders_table_title">Orders</h4>
        </div>
        <div className='flex py-2.5'>
          <Segmented options={['Pending', 'Active', 'Deleted', 'All']} onChange={handleChangeStatus} />
        </div>
      </div>
      <Table
        className="orders_table"
        loading={loading}
        columns={columns}
        dataSource={data}
        pagination={{ current: currentPage, pageSize: 6, total: totalRestaurants, onChange: (page) => setCurrentPage(page) }}
        onRow={(record) => {
          return {
            onDoubleClick: () => {
              handleView(restaurants[record.key]);
            }
          }
        }}
      />
      <Modal
        title="Restaurant Details"
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
        <AccountDetail id={viewingData?.restaurant._id} currentLocation={coordinate} role={"Restaurant"} />
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
export default RestaurantApproveList;