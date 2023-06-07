import React,{useState,useRef} from 'react';
import { Button, Input, Space, Table, Tag, Modal } from 'antd';
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";
import {TextField} from "@mui/material";
import "../../css/Orders.scss";



const UserList = () => {

  const [data, setData] = useState([
    {
      key: 1,
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
      status: ["normal"],
    },
    {
      key: 2,
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
      status: ["normal"],
    },
    {
      key: 3,
      name: "Joe Black",
      age: 32,
      address: "Sydney No. 1 Lake Park",
      status: ["banned"],
    },
  ]); 

  
  const [viewingData, setViewingData] = useState(null);
  const [isViewed, setIsViewed] = useState(false);

  const handleMultDelete = () => {
    if(selectedRowKeys.length !== 0){
      Modal.confirm({
        title: "Are you sure you want to delete these items?",
        okText: "Yes",
        okType: "danger",
        onOk: () => {
        const newData = data.filter((row) => !(selectedRowKeys.includes(row.key) && (row.status[0] === "banned")));
        setData(newData);
        setSelectedRowKeys([]);
    }});
  };}
  

  const handleDelete = (record) => {
    Modal.confirm({
      title: "Are you sure you want to delete this item?",
      okText: "Yes",
      okType: "danger",
      onOk: () => {
        setData((pre) => {
          return pre.filter((item) => item.key !== record.key);
        });
      },
    });
  };
  const handleReject = (record) => {
    Modal.confirm({
      title: "Are you sure you want to BAN this user ?",
      okText: "Yes",
      okType: "danger",
      onOk: () => {
        setData((prev) => {
          return prev.map((item) => {
            if (item.key === record.key) {
              return {...item, status: ["banned"]};
            } else {
              return item;
            }
          });
        });
      },
    });
  };

  const handleAccept = (record) => {
    setData((prev) => {
      return prev.map((item) => {
        if (item.key === record.key) {
          return {...item, status: ["normal"]};
        } else {
          return item;
        }
      });
    });
  };

 

  const handleView = (record) => {
    setIsViewed(true);
    setViewingData(record);
  }

  const resetViewing = () =>{
    setIsViewed(false);
    setViewingData(null);
  }
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const onSelectChange = (newSelectedRowKeys) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_INVERT,
      Table.SELECTION_NONE,
      {
        key: "odd",
        text: "Select Odd Row",
        onSelect: (changeableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changeableRowKeys.filter((_, index) => {
            if (index % 2 !== 0) {
              return false;
            }
            return true;
          });
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
      {
        key: "even",
        text: "Select Even Row",
        onSelect: (changeableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changeableRowKeys.filter((_, index) => {
            if (index % 2 !== 0) {
              return true;
            }
            return false;
          });
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
    ],
  };
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
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
      ...getColumnSearchProps("name"),
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
      ...getColumnSearchProps("age"),
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      ...getColumnSearchProps("address"),
      sorter: (a, b) => a.address.length - b.address.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      ...getColumnSearchProps("status"),
      render: (_, { status }) => (
        <>
          {status.map((state) => {
            let color = "geekblue";
            if (state === "banned" || state === "rejected") {
              color = "#F54E4E";
            }
            if (state === "ready") {
              color = "#D95FDB"; 
            }
            if (state === "pending") {
              color = "#3B7CDB";
            }
            if (state === "delivering") {
              color = "#867CFF";
            }
            if (state === "normal") {
              color = "#3BDB9E";
            }
            return (
              <Tag color={color} key={state}>
                {state.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          
          { record.status[0] !== "banned" ? "" :
          <button
            className="edit_button_form"
            onClick={() => {
              handleAccept(record);
            }}
          >
            <i className="fa-solid fa-rotate-left"></i>
          </button>}
          { record.status[0] === "banned"  ? "" :
          <button
            className="delete_button_form"
            onClick={() => {
              handleReject(record);
            }}
          >
            <i className="fa-solid fa-ban"></i>
          </button>}
        </Space>
      ),
    },
  ];
  
  return (
    <div className="menu_table_container">
      <div>
        <h4 className="menu_table_title">Users List</h4>
      </div>
      <button className="delete_button" onClick={handleMultDelete}>
        Delete&ensp;<i class="fa-solid fa-trash-can"></i>
      </button>
      <Table
        className="menu_table"
        rowSelection={rowSelection}
        columns={columns}
        dataSource={data}
        pagination={{ pageSize: 8 }}
        onRow={(record) => {
        return {
            onDoubleClick: () => {
                handleView(record);
            }
        }}}
      />
      
      
      <Modal
        title="Menu Item Details"
        open={isViewed}
        onCancel={() => {
          resetViewing();
        }}
        destroyOnClose={true}
        footer={null}
        
      >
        <TextField
          id="name"
          label="Name"
          variant="outlined"
          value={viewingData?.name}
          fullWidth
          margin="normal"
          color="error"
          style={{ width: "100%" }}
          inputProps={{
            style: { fontFamily: "Poppins, sans-serif", fontWeight: "500" },
            readOnly: true,
          }}
          InputLabelProps={{
            style: { fontFamily: "Poppins, sans-serif", fontWeight: "500" },
          }}
          
        />

        <TextField
          id="age"
          label="Age"
          variant="outlined"
          value={viewingData?.age}
          fullWidth
          margin="normal"
          color="error"
          style={{ width: "100%" }}
          inputProps={{
            style: { fontFamily: "Poppins, sans-serif", fontWeight: "500" },
            readOnly: true,
          }}
          InputLabelProps={{
            style: { fontFamily: "Poppins, sans-serif", fontWeight: "500" },
          }}
          
        />

        <TextField
          id="address"
          label="Address"
          variant="outlined"
          value={viewingData?.address}
          fullWidth
          margin="normal"
          color="error"
          style={{ width: "100%" }}
          inputProps={{
            style: { fontFamily: "Poppins, sans-serif", fontWeight: "500" },
            readOnly: true,
          }}
          InputLabelProps={{
            style: { fontFamily: "Poppins, sans-serif", fontWeight: "500" },
          }}
          
        />

        <TextField
          id="tags"
          label="Tags"
          variant="outlined"
          value={viewingData?.status}
          fullWidth
          margin="normal"
          color="error"
          style={{ width: "100%" }}
          inputProps={{
            style: { fontFamily: "Poppins, sans-serif", fontWeight: "500" },
            readOnly: true,
          }}
          InputLabelProps={{
            style: { fontFamily: "Poppins, sans-serif", fontWeight: "500" },
          }}
          
        />
      </Modal>
    </div>
  );
};
export default UserList;
