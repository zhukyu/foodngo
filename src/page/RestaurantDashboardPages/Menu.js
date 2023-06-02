import React,{useState,useRef} from 'react';
import { Button, Input, Space, Table, Tag, Modal } from "antd";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";
import {TextField} from "@mui/material";
import "../../css/Menu.scss";

const Menu = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [editingData, setEditingData] = useState(null);
  const [deleteData, setDeleteData] = useState(null);
  const [isAdding, setIsAdding] = useState(false);

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
    const newRow = {
      key: parseInt(Math.random() * 1000),
      name: "Jim Green",
      age: parseInt(Math.random() * 1000),
      address: "London No. 1 Lake Park",
      tags: ["done"],
    };
    setData((pre) => {
      return [...pre, newRow];
    });
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

  const resetEditing = () => {
    setIsEditing(false);
    setEditingData(null);
  };
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
            if (tag === "canceled") {
              color = "volcano";
            }
            if (tag === "done") {
              color = "green";
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
      tags: ["done"],
    },
    {
      key: 3,
      name: "Joe Black",
      age: 32,
      address: "Sydney No. 1 Lake Park",
      tags: ["canceled"],
    },
  ]);
  return (
    <div className="menu_table_container">
      <div>
        <h4 className="menu_table_title">Menu</h4>
      </div>
      <button className="delete_button" onClick={handleMultDelete}>
        Delete&ensp;<i class="fa-solid fa-trash-can"></i>
      </button>
      <button className="add_button" onClick={handleAdd}>
      <i class="fa-solid fa-plus"></i>
      </button>
      <Table
        className="menu_table"
        rowSelection={rowSelection}
        columns={columns}
        dataSource={data}
        pagination={{ pageSize: 8 }}
      />
      <Modal
        title="Edit menu item"
        visible={isEditing}
        okText="Save"
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
    </div>
  );
};
export default Menu;
