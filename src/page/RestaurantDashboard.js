import React, { useEffect, useRef, useState } from "react";
import "../css/RestaurantDashboard.scss";

import { Typography, TextField, Stepper, Step, StepLabel } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { styled } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Alert from "@mui/material/Alert";
import { Button, Input, Space, Table, Tag, Modal } from "antd";
import Highlighter from "react-highlight-words";
import { ResponsiveLine } from "@nivo/line";
import { ResponsivePie } from "@nivo/pie";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { SearchOutlined } from "@ant-design/icons";
import { set } from "react-hook-form";

const data = [
  {
    id: "japan",
    color: "hsl(141, 70%, 50%)",
    data: [
      {
        x: "plane",
        y: 271,
      },
      {
        x: "helicopter",
        y: 91,
      },
      {
        x: "boat",
        y: 46,
      },
      {
        x: "train",
        y: 66,
      },
      {
        x: "subway",
        y: 232,
      },
      {
        x: "bus",
        y: 10,
      },
      {
        x: "car",
        y: 160,
      },
      {
        x: "moto",
        y: 23,
      },
      {
        x: "bicycle",
        y: 170,
      },
      {
        x: "horse",
        y: 228,
      },
      {
        x: "skateboard",
        y: 239,
      },
      {
        x: "others",
        y: 244,
      },
    ],
  },
  {
    id: "france",
    color: "hsl(106, 70%, 50%)",
    data: [
      {
        x: "plane",
        y: 256,
      },
      {
        x: "helicopter",
        y: 236,
      },
      {
        x: "boat",
        y: 146,
      },
      {
        x: "train",
        y: 123,
      },
      {
        x: "subway",
        y: 294,
      },
      {
        x: "bus",
        y: 118,
      },
      {
        x: "car",
        y: 208,
      },
      {
        x: "moto",
        y: 211,
      },
      {
        x: "bicycle",
        y: 36,
      },
      {
        x: "horse",
        y: 186,
      },
      {
        x: "skateboard",
        y: 199,
      },
      {
        x: "others",
        y: 5,
      },
    ],
  },
  {
    id: "us",
    color: "hsl(197, 70%, 50%)",
    data: [
      {
        x: "plane",
        y: 50,
      },
      {
        x: "helicopter",
        y: 105,
      },
      {
        x: "boat",
        y: 92,
      },
      {
        x: "train",
        y: 269,
      },
      {
        x: "subway",
        y: 143,
      },
      {
        x: "bus",
        y: 43,
      },
      {
        x: "car",
        y: 282,
      },
      {
        x: "moto",
        y: 214,
      },
      {
        x: "bicycle",
        y: 163,
      },
      {
        x: "horse",
        y: 194,
      },
      {
        x: "skateboard",
        y: 24,
      },
      {
        x: "others",
        y: 87,
      },
    ],
  },
  {
    id: "germany",
    color: "hsl(256, 70%, 50%)",
    data: [
      {
        x: "plane",
        y: 63,
      },
      {
        x: "helicopter",
        y: 60,
      },
      {
        x: "boat",
        y: 220,
      },
      {
        x: "train",
        y: 27,
      },
      {
        x: "subway",
        y: 43,
      },
      {
        x: "bus",
        y: 32,
      },
      {
        x: "car",
        y: 99,
      },
      {
        x: "moto",
        y: 261,
      },
      {
        x: "bicycle",
        y: 270,
      },
      {
        x: "horse",
        y: 286,
      },
      {
        x: "skateboard",
        y: 261,
      },
      {
        x: "others",
        y: 240,
      },
    ],
  },
  {
    id: "norway",
    color: "hsl(32, 70%, 50%)",
    data: [
      {
        x: "plane",
        y: 121,
      },
      {
        x: "helicopter",
        y: 91,
      },
      {
        x: "boat",
        y: 87,
      },
      {
        x: "train",
        y: 162,
      },
      {
        x: "subway",
        y: 188,
      },
      {
        x: "bus",
        y: 211,
      },
      {
        x: "car",
        y: 133,
      },
      {
        x: "moto",
        y: 119,
      },
      {
        x: "bicycle",
        y: 93,
      },
      {
        x: "horse",
        y: 30,
      },
      {
        x: "skateboard",
        y: 43,
      },
      {
        x: "others",
        y: 122,
      },
    ],
  },
];

const pie_data = [
  {
    id: "php",
    label: "php",
    value: 270,
    color: "hsl(270, 70%, 50%)",
  },
  {
    id: "javascript",
    label: "javascript",
    value: 380,
    color: "hsl(191, 70%, 50%)",
  },
  {
    id: "ruby",
    label: "ruby",
    value: 165,
    color: "hsl(214, 70%, 50%)",
  },
  {
    id: "css",
    label: "css",
    value: 448,
    color: "hsl(34, 70%, 50%)",
  },
  {
    id: "lisp",
    label: "lisp",
    value: 483,
    color: "hsl(315, 70%, 50%)",
  },
];

const DashBoard = ({ data, pie_data }) => {
  // install (please try to align the version of installed @nivo packages)
  // yarn add @nivo/line

  // make sure parent container have a defined height when using
  // responsive component, otherwise height will be 0 and
  // no chart will be rendered.
  // website examples showcase many properties,
  // you'll often use just a few of them.
  return (
    <div className="chart_container">
      <div className="chart_1">
        <ResponsiveLine
          data={data}
          margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
          xScale={{ type: "point" }}
          yScale={{
            type: "linear",
            min: "auto",
            max: "auto",
            stacked: true,
            reverse: false,
          }}
          yFormat=" >-.2f"
          axisTop={null}
          axisRight={null}
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "transportation",
            legendOffset: 36,
            legendPosition: "middle",
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "count",
            legendOffset: -40,
            legendPosition: "middle",
          }}
          pointSize={10}
          pointColor={{ theme: "background" }}
          pointBorderWidth={2}
          pointBorderColor={{ from: "serieColor" }}
          pointLabelYOffset={-12}
          useMesh={true}
          legends={[
            {
              anchor: "bottom-right",
              direction: "column",
              justify: false,
              translateX: 100,
              translateY: 0,
              itemsSpacing: 0,
              itemDirection: "left-to-right",
              itemWidth: 80,
              itemHeight: 20,
              itemOpacity: 0.75,
              symbolSize: 12,
              symbolShape: "circle",
              symbolBorderColor: "rgba(0, 0, 0, .5)",
              effects: [
                {
                  on: "hover",
                  style: {
                    itemBackground: "rgba(0, 0, 0, .03)",
                    itemOpacity: 1,
                  },
                },
              ],
            },
          ]}
        />
      </div>
      <div className="chart_2">
        <ResponsivePie
          data={pie_data}
          margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
          innerRadius={0.5}
          padAngle={0.7}
          cornerRadius={3}
          activeOuterRadiusOffset={8}
          borderWidth={1}
          borderColor={{
            from: "color",
            modifiers: [["darker", 0.2]],
          }}
          arcLinkLabelsSkipAngle={10}
          arcLinkLabelsTextColor="#333333"
          arcLinkLabelsThickness={2}
          arcLinkLabelsColor={{ from: "color" }}
          arcLabelsSkipAngle={10}
          arcLabelsTextColor={{
            from: "color",
            modifiers: [["darker", 2]],
          }}
          defs={[
            {
              id: "dots",
              type: "patternDots",
              background: "inherit",
              color: "rgba(255, 255, 255, 0.3)",
              size: 4,
              padding: 1,
              stagger: true,
            },
            {
              id: "lines",
              type: "patternLines",
              background: "inherit",
              color: "rgba(255, 255, 255, 0.3)",
              rotation: -45,
              lineWidth: 6,
              spacing: 10,
            },
          ]}
          fill={[
            {
              match: {
                id: "ruby",
              },
              id: "dots",
            },
            {
              match: {
                id: "c",
              },
              id: "dots",
            },
            {
              match: {
                id: "go",
              },
              id: "dots",
            },
            {
              match: {
                id: "python",
              },
              id: "dots",
            },
            {
              match: {
                id: "scala",
              },
              id: "lines",
            },
            {
              match: {
                id: "lisp",
              },
              id: "lines",
            },
            {
              match: {
                id: "elixir",
              },
              id: "lines",
            },
            {
              match: {
                id: "javascript",
              },
              id: "lines",
            },
          ]}
          legends={[
            {
              anchor: "bottom",
              direction: "row",
              justify: false,
              translateX: 0,
              translateY: 56,
              itemsSpacing: 0,
              itemWidth: 100,
              itemHeight: 18,
              itemTextColor: "#999",
              itemDirection: "left-to-right",
              itemOpacity: 1,
              symbolSize: 18,
              symbolShape: "circle",
              effects: [
                {
                  on: "hover",
                  style: {
                    itemTextColor: "#000",
                  },
                },
              ],
            },
          ]}
        />
      </div>
    </div>
  );
};

const InfoForm = () => {
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
        Edit&ensp;<i className="fa-solid fa-pen-to-square"></i>
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
          Save&ensp;<i className="fa-solid fa-floppy-disk"></i>
        </button>
        <button
          className={saveButton ? "cancel_button disabled" : "cancel_button"}
          disabled={saveButton}
          onClick={handleCancel}
        >
          Cancel&ensp;<i className="fa-solid fa-ban"></i>
        </button>
      </div>
    </>
  );
};
const MenuForm = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [editingData, setEditingData] = useState(null);
  const [deleteData, setDeleteData] = useState(null);

  const handleMultDelete = () => {};
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
const OrdersForm = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [editingData, setEditingData] = useState(null);
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
    <div className="orders_table_container">
      <Table
        className="orders_table"
        rowSelection={rowSelection}
        columns={columns}
        dataSource={data}
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
        Change Password&ensp;<i className="fa-solid fa-pen-to-square"></i>
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
          Save&ensp;<i className="fa-solid fa-floppy-disk"></i>
        </button>
        <button
          className={saveButton ? "cancel_button disabled" : "cancel_button"}
          disabled={saveButton}
          onClick={handleCancel}
        >
          Cancel&ensp;<i className="fa-solid fa-ban"></i>
        </button>
      </div>
    </>
  );
};

function getStepContent(item) {
  switch (item) {
    case 0:
      return <DashBoard data={data} pie_data={pie_data} />;
    case 1:
      return <InfoForm />;

    case 2:
      return <MenuForm />;
    case 3:
      return <OrdersForm />;
    case 4:
      return <SecurityForm />;
    default:
      return "unknown step";
  }
}

function RestaurantDashboard() {
  const [activeItem, setActiveItem] = useState(0);
  const changeItem = (index) => {
    setActiveItem(index);
  };
  return (
    <div>
      <div className="account_container">
        <div className="account_left">
          <div className="menu_box">
            <div
              className={activeItem === 0 ? "menu_item active" : "menu_item"}
              onClick={() => changeItem(0)}
            >
              <i className="fa-solid fa-chart-simple"></i>
              <h4>Statistics</h4>
            </div>
            <div
              className={activeItem === 1 ? "menu_item active" : "menu_item"}
              onClick={() => changeItem(1)}
            >
              <i className="fa-solid fa-circle-info"></i>
              <h4>Restaurant Info</h4>
            </div>
            <div
              className={activeItem === 2 ? "menu_item active" : "menu_item"}
              onClick={() => changeItem(2)}
            >
              <i className="fa-solid fa-utensils"></i>
              <h4>Menu</h4>
            </div>
            <div
              className={activeItem === 3 ? "menu_item active" : "menu_item"}
              onClick={() => changeItem(3)}
            >
              <i className="fa-solid fa-receipt"></i>
              <h4>Orders</h4>
            </div>
            <div
              className={activeItem === 4 ? "menu_item active" : "menu_item"}
              onClick={() => changeItem(4)}
            >
              <i className="fa-solid fa-shield"></i>
              <h4>Security</h4>
            </div>
          </div>
        </div>
        <div className="account_right">{getStepContent(activeItem)}</div>
      </div>
    </div>
  );
}

export default RestaurantDashboard;
