import React, { useEffect, useRef, useState } from "react";
import "../css/UserAccount.scss";

import { Typography, TextField, Stepper, Step, StepLabel } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { styled } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Alert from "@mui/material/Alert";
import { Button, Input, Space, Table, Tag } from "antd";
import Highlighter from "react-highlight-words";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { SearchOutlined } from "@ant-design/icons";


//-------------------------------------------------------------------------------------------------------------------------------------------------------------------
const ProfileForm = () => {
  const [editable, setEditable] = useState(true);
  const [saveButton, setSaveButton] = useState(true);
  const [editButton, setEditButton] = useState(false);

  const handleEdit = () => {
    setEditable(false);
    setSaveButton(false);
    setEditButton(true);
  };

  const handleSave = () => {
    setEditable(true);
    setSaveButton(true);
    setEditButton(false);
  };
  const handleCancel = () => {
    setEditable(true);
    setSaveButton(true);
    setEditButton(false);
  };

  return (
    <>
      <button
        className={editButton ? "edit_button disabled" : "edit_button"}
        disabled={editButton}
        onClick={handleEdit}
      >
        Edit&ensp;<i class="fa-solid fa-pen-to-square"></i>
      </button>
      <div className="field one">
        <h4>Name</h4>
        {editable ? (
          <p>Name</p>
        ) : (
          <TextField
            id="phone-number"
            className="phone_number"
            label="Phone Number"
            variant="outlined"
            placeholder="Enter Your Phone Number"
            fullWidth
            margin="normal"
            color="error"
            style={{ width: "40%" }}
            inputProps={{
              style: { fontFamily: "Poppins, sans-serif", fontWeight: "500" },
            }}
            InputLabelProps={{
              style: { fontFamily: "Poppins, sans-serif", fontWeight: "500" },
            }}
          />
        )}
      </div>
      <div className="field two">
        <h4>Name</h4>
        {editable ? (
          <p>Name</p>
        ) : (
          <TextField
            id="phone-number"
            className="phone_number"
            label="Phone Number"
            variant="outlined"
            placeholder="Enter Your Phone Number"
            fullWidth
            margin="normal"
            color="error"
            style={{ width: "40%" }}
            inputProps={{
              style: { fontFamily: "Poppins, sans-serif", fontWeight: "500" },
            }}
            InputLabelProps={{
              style: { fontFamily: "Poppins, sans-serif", fontWeight: "500" },
            }}
          />
        )}
      </div>
      <div className="field three">
        <h4>Name</h4>
        {editable ? (
          <p>Name</p>
        ) : (
          <TextField
            id="phone-number"
            className="phone_number"
            label="Phone Number"
            variant="outlined"
            placeholder="Enter Your Phone Number"
            fullWidth
            margin="normal"
            color="error"
            style={{ width: "40%" }}
            inputProps={{
              style: { fontFamily: "Poppins, sans-serif", fontWeight: "500" },
            }}
            InputLabelProps={{
              style: { fontFamily: "Poppins, sans-serif", fontWeight: "500" },
            }}
          />
        )}
      </div>
      <div className="field four">
        <h4>Name</h4>
        {editable ? (
          <p>Name</p>
        ) : (
          <TextField
            id="phone-number"
            className="phone_number"
            label="Phone Number"
            variant="outlined"
            placeholder="Enter Your Phone Number"
            fullWidth
            margin="normal"
            color="error"
            style={{ width: "40%" }}
            inputProps={{
              style: { fontFamily: "Poppins, sans-serif", fontWeight: "500" },
            }}
            InputLabelProps={{
              style: { fontFamily: "Poppins, sans-serif", fontWeight: "500" },
            }}
          />
        )}
      </div>

      <div className="field five">
        <button
          className={saveButton ? "save_button disabled" : "save_button"}
          disabled={saveButton}
          onClick={handleSave}
        >
          Save&ensp;<i class="fa-solid fa-floppy-disk"></i>
        </button>
        <button
          className={saveButton ? "cancel_button disabled" : "cancel_button"}
          disabled={saveButton}
          onClick={handleCancel}
        >
          Cancel&ensp;<i class="fa-solid fa-ban"></i>
        </button>
      </div>
    </>
  );
};

//----------------------------------------------------------------------------------------------------------------------------------------------------------------
const CurrentForm = () => {
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
              backgroundColor:"#F61D58",
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
            style={{color:"#F61D58",}}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
            style={{color:"#F61D58",}}
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
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: (text) => <a>{text}</a>,
      ...getColumnSearchProps("id"),
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      ...getColumnSearchProps("date"),
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      ...getColumnSearchProps("price"),
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
            let color = tag.length > 5 ? "geekblue" : "green";
            if (tag === "loser") {
              color = "volcano";
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
  ];
  const data = [
    {
      key: "1",
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
      tags: ["nice", "developer"],
    },
    {
      key: "2",
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
      tags: ["loser"],
    },
    {
      key: "3",
      name: "Joe Black",
      age: 32,
      address: "Sydney No. 1 Lake Park",
      tags: ["cool", "teacher"],
    },
  ];
  return (
    <Table className="current_table" columns={columns} dataSource={data} />
  );
};


//--------------------------------------------------------------------------------------------------------------------------------------------------------------------
const HistoryForm = () => {
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
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
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
      title: "ID",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
      ...getColumnSearchProps("name"),
    },
    {
      title: "Date",
      dataIndex: "age",
      key: "age",
      ...getColumnSearchProps("age"),
    },
    {
      title: "Price",
      dataIndex: "address",
      key: "address",
      ...getColumnSearchProps("address"),
      sorter: (a, b) => a.address.length - b.address.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Status",
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
            if(tag === "done"){
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
  ];
  const data = [
    {
      key: "1",
      name: "#" + parseInt(Math.random() * 99999999),
      age: "22/4/2023",
      address: parseInt(Math.floor(Math.random() * 999999 / 10000) * 10000),
      tags: ["done"],
    },
    {
      key: "2",
      name: "#" + parseInt(Math.random() * 9999999),
      age: "15/3/2023",
      address: parseInt(Math.floor(Math.random() * 999999 / 10000) * 10000),
      tags: ["canceled"],
    },
    {
      key: "3",
      name: "#" + parseInt(Math.random() * 99999999),
      age: "9/3/2023",
      address: parseInt(Math.floor(Math.random() * 999999 / 10000) * 10000),
      tags: ["delivering"],
    },
  ];
  return (
    <Table className="history_table" columns={columns} dataSource={data} />
  );
};


//-------------------------------------------------------------------------------------------------------------------------------------------------------------------
const SecurityForm = () => {
  const [editable, setEditable] = useState(true);
  const [saveButton, setSaveButton] = useState(true);
  const [editButton, setEditButton] = useState(false);

  const handleEdit = () => {
    setEditable(false);
    setSaveButton(false);
    setEditButton(true);
  };

  const handleSave = () => {
    setEditable(true);
    setSaveButton(true);
    setEditButton(false);
  };
  const handleCancel = () => {
    setEditable(true);
    setSaveButton(true);
    setEditButton(false);
  };
  return (
    <>
      <button
        className={
          editButton
            ? "change_password_button disabled"
            : "change_password_button"
        }
        disabled={editButton}
        onClick={handleEdit}
      >
        Change Password&ensp;<i class="fa-solid fa-pen-to-square"></i>
      </button>
      <div className="field one">
        <h4>Name</h4>
        {editable ? (
          <p>Name</p>
        ) : (
          <TextField
            id="phone-number"
            className="phone_number"
            label="Phone Number"
            variant="outlined"
            placeholder="Enter Your Phone Number"
            fullWidth
            margin="normal"
            color="error"
            style={{ width: "40%" }}
            inputProps={{
              style: { fontFamily: "Poppins, sans-serif", fontWeight: "500" },
            }}
            InputLabelProps={{
              style: { fontFamily: "Poppins, sans-serif", fontWeight: "500" },
            }}
          />
        )}
      </div>
      <div className="field two">
        <h4>Name</h4>
        {editable ? (
          <p>Name</p>
        ) : (
          <TextField
            id="phone-number"
            className="phone_number"
            label="Phone Number"
            variant="outlined"
            placeholder="Enter Your Phone Number"
            fullWidth
            margin="normal"
            color="error"
            style={{ width: "40%" }}
            inputProps={{
              style: { fontFamily: "Poppins, sans-serif", fontWeight: "500" },
            }}
            InputLabelProps={{
              style: { fontFamily: "Poppins, sans-serif", fontWeight: "500" },
            }}
          />
        )}
      </div>
      <div className="field five">
        <button
          className={saveButton ? "save_button disabled" : "save_button"}
          disabled={saveButton}
          onClick={handleSave}
        >
          Save&ensp;<i class="fa-solid fa-floppy-disk"></i>
        </button>
        <button
          className={saveButton ? "cancel_button disabled" : "cancel_button"}
          disabled={saveButton}
          onClick={handleCancel}
        >
          Cancel&ensp;<i class="fa-solid fa-ban"></i>
        </button>
      </div>
    </>
  );
};


//-------------------------------------------------------------------------------------------------------------------------------------------------------------------
function getStepContent(item) {
  switch (item) {
    case 0:
      return <ProfileForm />;

    case 1:
      return <CurrentForm />;
    case 2:
      return <HistoryForm />;
    case 3:
      return <SecurityForm />;
    default:
      return "unknown step";
  }
}


//-------------------------------------------------------------------------------------------------------------------------------------------------------------------
function UserAccount() {
  const [activeItem, setActiveItem] = useState(0);
  const changeItem = (index) => {
    setActiveItem(index);
  };
  return (
    <div>
      <div className="account_container">
        <div className="account_left">
          <div className="account_avatar_div">
            <img
              src="https://m.media-amazon.com/images/I/91twdlBkt1L.png"
              alt="avatar"
              className="account_avatar"
            />
            <div className="email_id">
              <h4>lyvantanh@gmail.com</h4>
              <p>UserID:12345</p>
            </div>
          </div>
          <div className="menu_box">
            <div
              className={activeItem === 0 ? "menu_item active" : "menu_item"}
              onClick={() => changeItem(0)}
            >
              <i class="fa-solid fa-user"></i>
              <h4>Profile</h4>
            </div>
            <div
              className={activeItem === 1 ? "menu_item active" : "menu_item"}
              onClick={() => changeItem(1)}
            >
              <i class="fa-solid fa-receipt"></i>
              <h4>Current Orders</h4>
            </div>
            <div
              className={activeItem === 2 ? "menu_item active" : "menu_item"}
              onClick={() => changeItem(2)}
            >
              <i class="fa-solid fa-clock-rotate-left"></i>
              <h4>History</h4>
            </div>
            <div
              className={activeItem === 3 ? "menu_item active" : "menu_item"}
              onClick={() => changeItem(3)}
            >
              <i class="fa-solid fa-shield"></i>
              <h4>Security</h4>
            </div>
          </div>
        </div>
        <div className="account_right">{getStepContent(activeItem)}</div>
      </div>
    </div>
  );
}

export default UserAccount;
