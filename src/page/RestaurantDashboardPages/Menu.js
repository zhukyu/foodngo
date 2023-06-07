import React,{useState,useRef} from 'react';
import { Button, Input, Space, Table, Tag, Modal } from 'antd';
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";
import {TextField} from "@mui/material";
import "../../css/Menu.scss";


const Menu = () => {

  const [data, setData] = useState([
    {
      key: 1,
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
      tags: ["delivering"],
    },
    {
      key: 2,
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
      tags: ["ready"],
    },
    {
      key: 3,
      name: "Joe Black",
      age: 32,
      address: "Sydney No. 1 Lake Park",
      tags: ["canceled"],
    },
  ]); 
  const [len, setLen] = useState(data.length);
  let key_count = len + 1;
  const [isEditing, setIsEditing] = useState(false);
  const [editingData, setEditingData] = useState(null);
  const [addingData, setAddingData] = useState({key:key_count, name: null, age: null, adress: null, tags: null});
  const [isAdding, setIsAdding] = useState(false);
  const [viewingData, setViewingData] = useState(null);
  const [isViewed, setIsViewed] = useState(false);

  const handleMultDelete = () => {
    if(selectedRowKeys.length !== 0){
    Modal.confirm({
      title: "Are you sure you want to delete these items?",
      okText: "Yes",
      okType: "danger",
      onOk: () => {
        setData((pre) => {
          return pre.filter((item) => !selectedRowKeys.includes(item.key));
        });
      },
    });
    setSelectedRowKeys([]);
  };}
  const handleAdd = () => {
    setIsAdding(true);

    
  };

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

  const handleEdit = (record) => {
    setIsEditing(true);
    setEditingData({ ...record });
  };

  const resetAdding = (type) => {
    setIsAdding(false);
    if(type === "cancel"){
    setAddingData({key:key_count, name: null, age: null, address: null, tags: null});}
    else{
      setAddingData({key:++key_count, name: null, age: null, address: null, tags: null});
    }
  };
  const resetEditing = () => {
    setIsEditing(false);
    setEditingData(null);
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
      title: "Tags",
      key: "tags",
      dataIndex: "tags",
      ...getColumnSearchProps("tags"),
      render: (_, { tags }) => (
        <>
          {tags.map((tag) => {
            let color = "geekblue";
            if (tag === "canceled" || tag === "rejected") {
              color = "#F54E4E";
            }
            if (tag === "ready") {
              color = "#D95FDB"; 
            }
            if (tag === "pending") {
              color = "#3B7CDB";
            }
            if (tag === "delivering") {
              color = "#867CFF";
            }
            if (tag === "delivered") {
              color = "#3BDB9E";
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
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
          <button
            className="edit_button_form"
            onClick={() => {
              handleEdit(record);
            }}
          >
            <i className="fa-solid fa-pen-to-square"></i>
          </button>
          <button
            className="delete_button_form"
            onClick={() => {
              handleDelete(record);
            }}
          >
            <i className="fa-regular fa-trash-can"></i>
          </button>
        </Space>
      ),
    },
  ];
  
  return (
    <div className="menu_table_container">
      <div>
        <h4 className="menu_table_title">Menu</h4>
      </div>
      <button className="delete_button" onClick={handleMultDelete}>
        Delete&ensp;<i className="fa-solid fa-trash-can"></i>
      </button>
      <button className="add_button" onClick={handleAdd}>
      <i className="fa-solid fa-plus"></i>
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
        title="Edit menu item"
        open={isEditing}
        okText="Save"
        okType='danger'
        onCancel={() => {
          resetEditing();
        }}
        onOk={() => {
          setData((prev) => {
            return prev.map((item) => {
              if (item.key === editingData.key) {
                return editingData;
              } else {
                return item;
              }
            });
          });
          resetEditing();
        }}
        closable={false}
      >
        <TextField
          id="name"
          label="Name"
          variant="outlined"
          value={editingData?.name}
          fullWidth
          margin="normal"
          color="error"
          style={{ width: "100%" }}
          inputProps={{
            style: { fontFamily: "Poppins, sans-serif", fontWeight: "500" },
          }}
          InputLabelProps={{
            style: { fontFamily: "Poppins, sans-serif", fontWeight: "500" },
          }}
          onChange={(e) => {
            setEditingData((prev) => ({ ...prev, name: e.target.value }));
          }}
        />

        <TextField
          id="age"
          label="Age"
          variant="outlined"
          value={editingData?.age}
          fullWidth
          margin="normal"
          color="error"
          style={{ width: "100%" }}
          inputProps={{
            style: { fontFamily: "Poppins, sans-serif", fontWeight: "500" },
          }}
          InputLabelProps={{
            style: { fontFamily: "Poppins, sans-serif", fontWeight: "500" },
          }}
          onChange={(e) => {
            setEditingData((prev) => ({ ...prev, age: e.target.value }));
          }}
        />

        <TextField
          id="address"
          label="Address"
          variant="outlined"
          value={editingData?.address}
          fullWidth
          margin="normal"
          color="error"
          style={{ width: "100%" }}
          inputProps={{
            style: { fontFamily: "Poppins, sans-serif", fontWeight: "500" },
          }}
          InputLabelProps={{
            style: { fontFamily: "Poppins, sans-serif", fontWeight: "500" },
          }}
          onChange={(e) => {
            setEditingData((prev) => ({ ...prev, address: e.target.value }));
          }}
        />

        <TextField
          id="tags"
          label="Tags"
          variant="outlined"
          value={editingData?.tags}
          fullWidth
          margin="normal"
          color="error"
          style={{ width: "100%" }}
          inputProps={{
            style: { fontFamily: "Poppins, sans-serif", fontWeight: "500" },
          }}
          InputLabelProps={{
            style: { fontFamily: "Poppins, sans-serif", fontWeight: "500" },
          }}
          onChange={(e) => {
            setEditingData((prev) => ({ ...prev, tags: [e.target.value] }));
          }}
        />
      </Modal>
      <Modal
        title="Add menu item"
        open={isAdding}
        okText="Add"
        okType='danger'
        onCancel={() => {
         resetAdding("cancel");
        }}
        onOk={() => {
          setData((prev) => {
            return [...prev,addingData];
            
          });
          resetAdding("ok");
          setLen(len+1);
          console.log(data);
          console.log("len: " + len);
          
        }}
        destroyOnClose={true}
        closable={false}
        okButtonProps={{disabled: !addingData?.name && !addingData?.age && !addingData?.address && !addingData?.tags}}
        
      >
        <TextField
          id="name_add"
          label="Name"
          variant="outlined"
          value={addingData?.name}
          fullWidth
          margin="normal"
          color="error"
          style={{ width: "100%" }}
          inputProps={{
            style: { fontFamily: "Poppins, sans-serif", fontWeight: "500" },
          }}
          InputLabelProps={{
            style: { fontFamily: "Poppins, sans-serif", fontWeight: "500" },
          }}
          onChange={(e) => {
            setAddingData((prev) => ({...prev, name: e.target.value }));
          }}
        />

        <TextField
          id="age_add"
          label="Age"
          variant="outlined"
          value={addingData?.age}
          margin="normal"
          color="error"
          style={{ width: "100%" }}
          inputProps={{
            style: { fontFamily: "Poppins, sans-serif", fontWeight: "500" },
          }}
          InputLabelProps={{
            style: { fontFamily: "Poppins, sans-serif", fontWeight: "500" },
          }}
          onChange={(e) => {
            setAddingData((prev) => ({...prev, age: e.target.value }));
          }}
        />

        <TextField
          id="address_add"
          label="Address"
          variant="outlined"
          value={addingData?.address}
          fullWidth
          margin="normal"
          color="error"
          style={{ width: "100%" }}
          inputProps={{
            style: { fontFamily: "Poppins, sans-serif", fontWeight: "500" },
          }}
          InputLabelProps={{
            style: { fontFamily: "Poppins, sans-serif", fontWeight: "500" },
          }}
          onChange={(e) => {
            setAddingData((prev) => ({...prev, address: e.target.value }));
          }}
        />

        <TextField
          id="tags_add"
          label="Tags"
          variant="outlined"
          value={addingData?.tags}
          fullWidth
          margin="normal"
          color="error"
          style={{ width: "100%" }}
          inputProps={{
            style: { fontFamily: "Poppins, sans-serif", fontWeight: "500" },
          }}
          InputLabelProps={{
            style: { fontFamily: "Poppins, sans-serif", fontWeight: "500" },
          }}
          onChange={(e) => {
            setAddingData((prev) => ({...prev, tags: [e.target.value] }));
          }}
        />
      </Modal>
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
          value={viewingData?.tags}
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
export default Menu;
