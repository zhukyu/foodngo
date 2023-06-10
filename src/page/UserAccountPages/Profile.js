import React, { useEffect, useState, useRef } from "react";
import { TextField } from "@mui/material";
import axiosInstance, { AxiosInstance } from "../../utility/AxiosInstance";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { connect, useDispatch } from "react-redux";
import { getAvatar, updateAvatar } from "../../utility/action";
import moment from "moment";
import {
  Input,
  Select,
  Spin,
  Upload,
  message,
  notification,
  Modal,
  AutoComplete,
} from "antd";
import "../../css/UserProfile.scss";
import { data } from "../../data/dummy";
import DatePicker from "react-datepicker";

const Profile = ({getUser}) => {
  const dateFormat = "YYYY-MM-DD";
  let prevAddress = null;
  let currentAddress = "";
  let prevPlaceId = null;
  let currentPlaceId = "";
  let flag = null;
  const address_antd = useRef(null);
  const [editable, setEditable] = useState(true);
  const [saveButton, setSaveButton] = useState(true);
  const [editButton, setEditButton] = useState(false);
  const [addressMap, setAddressMap] = useState([]);
  const [userData, setUserData] = useState({});
  const [updated, setUpdated] = useState(false);
  const [updateData, setUpdateData] = useState({
    name: "",
    dob: null,
    address: {},
    phone: "",
    gender: "",
    avatar: "",
    location: {
      type: "Point",
      coordinates: [0, 0],
    },
  });
  const [addressInput, setAddressInput] = useState("");
  const [placeId, setPlaceId] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [imgLoading, setImgLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();
  const [errors, setErrors] = useState({
    name: "",
    dob: "",
    address: "",
    phone: "",
    gender: "",
    avatar: "",
  });

  const antIcon = (
    <LoadingOutlined
      style={{
        fontSize: 40,
        color: "#FF003D",
      }}
      spin
    />
  );

  const handleEdit = () => {
    setEditable(false);
    setSaveButton(false);
    setEditButton(true);
  };

  const handleSave = async (e) => {
    if (!isFormValid()) {
      setErrors({
        name: updateData.name.trim() === "" ? "Please enter a name" : "",
        dob: updateData.dob === "" ? "Please enter a dob" : "",
        address: updateData.address === "" ? "Please enter a address" : "",
        gender: updateData.gender.trim() === "" ? "Please select a gender" : "",
        phone: updateData.phone.trim() === "" ? "Please enter a phone number" : "",
        image: image === null ? "Please upload an image" : "",
      });
      return;
    }

    setLoading(true);
    const imageUrl = await handleImageSubmit();
    const formData = {
      ...updateData,
      avatar: imageUrl,
    };

    try {
      const res = await axiosInstance.put("/user", formData);
      if (res.status === 200) {
        notification.open({
          icon: (
            <i className="fa-solid fa-check" style={{ color: "green" }}></i>
          ),
          message: "Success!",
          description: "User info updated successfully!",
          onClick: () => {
            console.log("Notification Clicked!");
          },
        });
        window.location.reload();
      }
      // console.log("formData name: " + formData.name);
      // console.log("formData dob: " + formData.dob);
      // console.log(formData.address);
      // console.log("formData phone: " + formData.phone);
      // console.log("formData gender: "+ formData.gender);
      // console.log("formData avatar: "+ formData.avatar);
      // console.log(formData.location);
    } catch (err) {
      console.log(err);
      if (err.response && err.response.status === 400) {
        Swal.fire({
          title: "Error!",
          text: err.response.data.message,
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    }
    setLoading(false);
    setEditable(true);
    setSaveButton(true);
    setEditButton(false);
    fetchUserData();
  };
  const handleCancel = () => {
    setEditable(true);
    setSaveButton(true);
    setEditButton(false);
    setUpdateData({ ...userData });
  };

  function formatDate(dateString) {
    const formattedDate = moment(dateString).format("YYYY-MM-DD");
    return formattedDate;
  }

  function formatDateV2(dateString) {
    const formattedDate = moment(dateString).toISOString();
    return formattedDate;
  }

  const fetchUserData = async () => {
    await axiosInstance
      .get("/user")
      .then((res) => {
        console.log(res.data.user);
        setUserData({
          ...res.data.user,
          dob: moment(formatDate(res.data.user.dob), dateFormat),
        });
        setUpdateData({
          ...res.data.user,
          dob: moment(formatDate(res.data.user.dob), dateFormat),
        });
      })
      .catch((err) => {
        console.log(err);
        setUserData(null);
        setUpdateData(null);
      });
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  };

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must be smaller than 2MB!");
    }
    return isJpgOrPng && isLt2M;
  };

  const handleFileChange = (info) => {
    getBase64(info.file.originFileObj, (url) => {
      setImgLoading(false);
      setImageUrl(url);
    });
    setImage(info.file.originFileObj);
    setErrors({ ...errors, avatar: "" });
  };

  const uploadButton = (
    <div>
      {imgLoading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );

  const dummyRequest = ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  };

  const handleImageSubmit = async () => {
    let imageUrl = undefined;
    const formData = new FormData();
    formData.append("image", image);
    try {
      const res = await axiosInstance.post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (res.status === 200) {
        imageUrl = res.data.url;
      }
    } catch (err) {
      console.log(err);
    }
    return imageUrl;
  };

  const isFormValid = () => {
    return (
      updateData.name.trim() !== "" &&
      updateData.dob !== "" &&
      updateData.gender.trim() !== "" &&
      updateData.address !== "" &&
      updateData.phone.trim() !== "" &&
      image !== null
    );
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdateData({ ...updateData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const onLocationSelect = (value) => {
    const suggestion = addressMap.find(
      (suggestion) => suggestion.description === value
    );
    setUpdateData((prevData) => ({
      ...prevData,
      address: suggestion,
    }));
    console.log(suggestion);
    if (suggestion.place_id !== prevPlaceId) {
      setPlaceId(suggestion.place_id);
      prevPlaceId = suggestion.place_id;
      currentPlaceId = suggestion.place_id;
      prevAddress = suggestion.description;
      currentAddress = suggestion.description;
    }
  };

  useEffect(() => {
    const fetchCoordinates = async () => {
      await axiosInstance.get(`/map/geocode?placeId=${placeId}`).then((res) => {
        if (res.status === 200) {
          const location = res.data.geoCode.results[0].geometry.location;
          console.log(location);
          const coordinate = [location.lng, location.lat];
          setUpdateData((prevData) => ({
            ...prevData,
            location: {
              type: "Point",
              coordinates: coordinate,
            },
          }));
        }
      });
    };
    if (placeId !== "") {
      fetchCoordinates();
    }
  }, [placeId]);

  useEffect(() => {
    setPlaceId("");
    setSuggestions([]);

    if (addressInput.length === 0) {
      setSuggestions([]);
    }

    const fetchSuggestions = async () => {
      await axiosInstance
        .get(`/map/search?address=${addressInput}`)
        .then((res) => {
          if (res.status === 200) {
            const addressList = res.data.predictions.predictions;
            setAddressMap(addressList);
            const suggestions = addressList.map((suggestion, index) => ({
              value: suggestion.description,
              id: suggestion.place_id,
              index: index,
            }));
            console.log(suggestions);
            setSuggestions(suggestions);
          }
        });
    };

    const timer = setTimeout(() => {
      if (addressInput.length > 0) {
        fetchSuggestions();
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [addressInput]);

  return (
    <Spin spinning={loading} indicator={antIcon}>
      <div className="user_profile_container">
        <div className="paper">
          <button
            className={editButton ? "edit_button disabled" : "edit_button"}
            disabled={editButton}
            onClick={handleEdit}
          >
            Edit&ensp;<i class="fa-solid fa-pen-to-square"></i>
          </button>
          <div className="one">
            {editable ? (
              <img
                src={userData?.avatar}
                alt="avatar"
                style={{
                  border: "1px solid black",
                  borderRadius: "50%",
                  width: "150px",
                  height: "150px",
                  marginLeft: "1.5%",
                }}
              ></img>
            ) : (
              <div className="upload_div">
                <Upload
                  name="image"
                  listType="picture-circle"
                  className="avatar-uploader"
                  showUploadList={false}
                  beforeUpload={beforeUpload}
                  onChange={handleFileChange}
                  customRequest={dummyRequest}
                >
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt="image"
                      style={{
                        width: "100%",
                      }}
                    />
                  ) : (
                    uploadButton
                  )}
                </Upload>
                {errors.image && (
                  <span className="error-message">{errors.image}</span>
                )}
              </div>
            )}
            <h4>Avatar</h4>
          </div>
          <div className="field two">
            <h4>Name</h4>
            {editable ? (
              <p>{userData.name}</p>
            ) : (
              <>
                <Input
                  size="large"
                  className="user_input"
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Name"
                  value={updateData.name}
                  onChange={handleInputChange}
                />

                {errors.name && (
                  <span className="error-message">{errors.name}</span>
                )}
              </>
            )}
          </div>
          <div className="field three">
            <h4>Date Of Birth</h4>
            {editable ? (
              <p>{moment(userData.dob).format("YYYY-MM-DD")}</p>
            ) : (
              <>
                <DatePicker
                  selected={new Date(updateData.dob)}
                  onChange={(date) => {
                    console.log(formatDateV2(date));
                    setUpdateData({ ...updateData, dob: formatDateV2(date) });
                    setErrors({ ...errors, dob: "" });
                  }}
                  className="user_dob"
                />
                {errors.date_of_birth && (
                  <span className="error-message">{errors.date_of_birth}</span>
                )}
              </>
            )}
          </div>
          <div className="field four">
            <h4>Gender</h4>
            {editable ? (
              <p>{userData.gender}</p>
            ) : (
              <>
                <Select
                  id="gender"
                  name="gender"
                  size="large"
                  value={updateData.gender}
                  style={{
                    width: 120,
                  }}
                  options={[
                    {
                      value: "male",
                      label: "male",
                    },
                    {
                      value: "female",
                      label: "female",
                    },
                  ]}
                  onChange={(e) => {
                    setUpdateData({ ...updateData, gender: e });
                    setErrors({ ...errors, gender: "" });
                  }}
                />
                {errors.gender && (
                  <span className="error-message">{errors.gender}</span>
                )}
              </>
            )}
          </div>
          <div className="field five">
            <h4>Address</h4>
            {editable ? (
              <p>{userData?.address?.description}</p>
            ) : (
              <>
                <AutoComplete
                  className="user_input"
                  options={suggestions}
                  onSelect={onLocationSelect}
                  onChange={(value) => {
                    setAddressInput(value);
                    currentAddress = value;
                  }}
                  onBlur={() => {
                    if (
                      currentAddress !== prevAddress &&
                      (currentPlaceId === prevPlaceId || prevPlaceId === null)
                    )
                      flag = false;
                  }}
                  ref={address_antd}
                  size="large"
                />
                {errors.address && (
                  <span className="error-message">{errors.address}</span>
                )}
              </>
            )}
          </div>
          <div className="field seven">
            <h4>Phone</h4>
            {editable ? (
              <p>{userData.phone}</p>
            ) : (
              <>
                <Input
                  id="phone"
                  name="phone"
                  placeholder="Phone"
                  size="large"
                  className="user_input"
                  type="number"
                  value={updateData.phone}
                  onChange={(e) => {
                    setUpdateData({ ...updateData, phone: e.target.value });
                  }}
                />
                {errors.phone && (
                  <span className="error-message">{errors.phone}</span>
                )}
              </>
            )}
          </div>

          <div className="field six">
            <button
              className={saveButton ? "save_button disabled" : "save_button"}
              disabled={saveButton}
              onClick={handleSave}
            >
              Save&ensp;<i className="fa-solid fa-floppy-disk"></i>
            </button>
            <button
              className={
                saveButton ? "cancel_button disabled" : "cancel_button"
              }
              disabled={saveButton}
              onClick={handleCancel}
            >
              Cancel&ensp;<i className="fa-solid fa-ban"></i>
            </button>
          </div>
        </div>
      </div>
    </Spin>
  );
};



export default Profile;
