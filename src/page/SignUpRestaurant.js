import React, { useEffect, useStyles, useState, useRef } from "react";
import "../css/SignUpRestaurant.scss";
import {
  AutoComplete,
  Button,
  Cascader,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  Space,
  Switch,
  TreeSelect,
} from "antd";
import background from "../image/signup_restaurant.png";
import { Link, useNavigate } from "react-router-dom";
import logo from "../image/FoodnGo_logo.png";
import Footer from "../components/Footer";
import LocationUpdate from "../components/LocationUpdate";
import axiosInstance from "../utility/AxiosInstance";
import Swal from "sweetalert2";
import { set } from "lodash";

function SignUpRestaurant() {
  const [validPassword, setValidPassword] = useState(null);
  const [validConfirmPassword, setValidConfirmPassword] = useState(null);
  const [validEmail, setValidEmail] = useState(null);
  const [validPhone, setValidPhone] = useState(null);
  const [validName, setValidName] = useState(null);
  const [validAddress, setValidAddress] = useState(null);
  const [validCategory, setValidCategory] = useState(null);
  const [validDescription, setValidDescription] = useState(null);
  const [validOpen, setValidOpen] = useState(null);
  const [validClose, setValidClose] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [image, setImage] = useState(null);
  const [addressInput, setAddressInput] = useState("");
  const [placeId, setPlaceId] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectionCategory, setSelectionCategory] = useState([]);
  const [confirmPassword, setConfirmPassword] = useState("");
  let prevAddress = null;
  let currentAddress = "";
  let prevPlaceId = null;
  let currentPlaceId = "";
 let flag = null;

 const address_antd = useRef(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    media: [
      {
        type: "imgae",
        url: "",
      },
    ],
    phone: "",
    openingHours: {
      open: "",
      close: "",
    },
    description: "",
    location: {
      type: "Point",
      coordinates: [0, 0],
    },
    address: "",
    categories: [],
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      axiosInstance.get("/category/default").then((res) => {
        if (res.status === 200) {
          const categories = res.data.categories;
          const selectionCategory = categories.map((category) => ({
            label: category.name,
            value: category._id,
          }));
          setSelectionCategory(selectionCategory);
        }
      });
    };
    fetchCategories();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleTimeChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      openingHours: {
        ...prevData.openingHours,
        [name]: value,
      },
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    console.log(file);
    setImage(file);
  };

  const handleImageSubmit = async () => {
    let imageUrl = undefined;
    const _formData = new FormData();
    _formData.append("image", image);
    await axiosInstance
      .post("/upload", _formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        if (res.status === 200) {
          imageUrl = res.data.url;
        }
      });
    return imageUrl;
  };

  useEffect(() => {
    console.log("placeId: " + placeId);
  },[placeId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let valid1 = null;
    let valid2 = null;
    let valid3 = null;
    let valid4 = null;
    let valid5 = null;
    let valid6 = null;
    if (!isValidEmail(formData.email)) {
      setValidEmail(false);
      valid1 = false;
    } else {
      setValidEmail(true);
      valid1 = true;
    }
    if (!validatePassword(formData.password)) {
      setValidPassword(false);
      valid2 = false;
    } else {
      setValidPassword(true);
      valid2 = true;
    }
    if (formData.password !== confirmPassword) {
      setValidConfirmPassword(false);
      valid3 = false;
    } else {
      setValidConfirmPassword(true);
      valid3 = true;
    }
    if (flag === false) {
      setValidAddress(false);
      valid4 = false;
    } else {
      setValidAddress(true);
      valid4 = true;
    }
    if (formData.openingHours.open >= formData.openingHours.close) {
      setValidOpen(false);
      valid5 = false;
      setValidClose(false);
      valid5 = false;
    } else {
      setValidOpen(true);
      valid5 = true;
      setValidClose(true);
      valid6 = true;
    }
    console.log("validEmail: " + validEmail);
    console.log("validPassword: " + validPassword);
    console.log("validConfirmPassword: " + validConfirmPassword);
    console.log("validAddress: " + validAddress);
    console.log("validOpen: " + validOpen);
    console.log("validClose: " + validClose);

    if (
      valid1 === false ||
      valid2 === false ||
      valid3 === false ||
      valid4 === false ||
      valid5 === false ||
      valid6 === false
    ) {
      console.log("invalid");
      return;
    }
    // const imageUrl = await handleImageSubmit();
    // const _formData = {
    //     ...formData,
    //     media: [
    //         {
    //             type: 'image',
    //             url: imageUrl,
    //         }],
    // }
    // await axiosInstance.post('/auth/register/restaurant', _formData)
    //     .then((res) => {
    //         if (res.status === 201) {
    //             console.log(res.data);
    //             Swal.fire({
    //                 icon: 'success',
    //                 title: 'Register Restaurant successfully!',
    //                 confirmButtonColor: '#28A745',
    //             }).then((result) => {
    //                 if (result.isConfirmed) {
    //                     navigate('/restaurant');
    //                 }
    //             })
    //         }
    //     })
  };
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(email)) return true;
    else return false;
  }

  function validatePassword(password) {
    if (password.length === 6) {
      return true; // Password is valid
    } else {
      return false; // Password is not valid
    }
  }

  const handleChange = (value) => {
    setFormData((prevData) => ({
      ...prevData,
      categories: value,
    }));
  };

  const onLocationSelect = (value) => {
    
    const suggestion = suggestions.find(
      (suggestion) => suggestion.value === value
    );
    setFormData((prevData) => ({
      ...prevData,
      address: suggestion.value,
    }));
    if(suggestion.id !== prevPlaceId) {
    setPlaceId(suggestion.id);
    prevPlaceId = suggestion.id;
    currentPlaceId = suggestion.id
    prevAddress = suggestion.value;
    currentAddress = suggestion.value;
  }
    address_antd.current.blur();
  };

  useEffect(() => {
    const fetchCoordinates = async () => {
      await axiosInstance.get(`/map/geocode?placeId=${placeId}`).then((res) => {
        if (res.status === 200) {
          const location = res.data.geoCode.results[0].geometry.location;
          console.log(location);
          const coordinate = [location.lng, location.lat];
          setFormData((prevData) => ({
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

            const suggestions = addressList.map((suggestion, index) => ({
              value: suggestion.description,
              id: suggestion.place_id,
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
    <div
      className="SignUpRestaurant"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="header_signup">
        <Link to={"/"}>
          <h4>
            <i className="fa-solid fa-arrow-left">&nbsp;</i>Back
          </h4>
        </Link>
        <div className="header_signup_logo">
          <Link to="/restaurants">
            <img src={logo} className="logo_img" alt="logo" />
          </Link>
        </div>
      </div>
      <div className="form">
        <form
          className="w-full bg-white rounded-lg shadow-md p-6"
          onSubmit={handleSubmit}
        >
          <div className="text-center">
            <h2 className="text-5xl mb-6 form-title">Signup</h2>
          </div>

          <div className="flex">
            <div className="mb-6 flex-auto">
              <label
                htmlFor="email"
                className="block text-gray-700 font-bold mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            {validEmail !== false ? null : (
              <p
                style={{
                  position: "absolute",
                  color: "red",
                  right: "64.75%",
                  top: "24.35%",
                  fontSize: "14px",
                }}
              >
                Invalid Email
              </p>
            )}
          </div>
          <div className="flex gap-2.5">
            <div className="mb-6 flex-auto">
              <label
                htmlFor="password"
                className="block text-gray-700 font-bold mb-2"
              >
                Password
              </label>
              <div className="flex gap-2.5 relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 pr-7 focus:outline-none focus:ring focus:ring-blue-200"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
                <div
                  className="cursor-pointer absolute right-2 flex justify-center items-center top-1/2 transform -translate-y-1/2"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <i className="fa-solid fa-eye-slash"></i>
                  ) : (
                    <i className="fa-solid fa-eye"></i>
                  )}
                </div>
                {validPassword !== false ? null : (
                  <p
                    style={{
                      position: "absolute",
                      color: "red",
                      left: "18%",
                      top: "100%",
                      fontSize: "14px",
                    }}
                  >
                    Passowrd must be 6 characters long
                  </p>
                )}
              </div>
            </div>
            <div className="mb-6 flex-auto">
              <label
                htmlFor="password"
                className="block text-gray-700 font-bold mb-2"
              >
                Confirm Password
              </label>
              <div className="flex gap-2.5 relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="password_confirm"
                  name="password_confirm"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 pr-7 focus:outline-none focus:ring focus:ring-blue-200"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                <div
                  className="cursor-pointer absolute right-2 flex justify-center items-center top-1/2 transform -translate-y-1/2"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <i className="fa-solid fa-eye-slash"></i>
                  ) : (
                    <i className="fa-solid fa-eye"></i>
                  )}
                </div>
                {validConfirmPassword !== false ? null : (
                  <p
                    style={{
                      position: "absolute",
                      color: "red",
                      right: "18%",
                      top: "100%",
                      fontSize: "14px",
                    }}
                  >
                    Confirm Passowrd Doesn't Match Password
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className="flex">
            <div className="mb-6 flex-auto">
              <label
                htmlFor="name"
                className="block text-gray-700 font-bold mb-2"
              >
                Restaurant Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <div className="flex">
            <div className="mb-6 flex-auto">
              <label
                htmlFor="description"
                className="block text-gray-700 font-bold mb-2"
              >
                Description
              </label>
              <textarea
                maxLength={200}
                type="text"
                id="description"
                name="description"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
                value={formData.description}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <div className="flex">
            <div className="mb-6 flex-auto">
              <label
                htmlFor="address"
                className="block text-gray-700 font-bold mb-2"
              >
                Address
              </label>
              <Space
                style={{
                  width: "100%",
                }}
                direction="vertical"
              >
                <AutoComplete
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
                  options={suggestions}
                  onSelect={onLocationSelect}
                  onChange={(value) => {setAddressInput(value); currentAddress = value;}}
                  onBlur={() => {if(currentAddress !== prevAddress && (currentPlaceId === prevPlaceId || prevPlaceId === null))flag = false; }}
                  ref={address_antd}
                />
              </Space>
            </div>
            {validAddress !== false ? null : (
              <p
                style={{
                  position: "absolute",
                  color: "red",
                  right: "64.5%",
                  top: "67.85%",
                  fontSize: "14px",
                }}
              >
                Invalid Address
              </p>
            )}
          </div>
          <div className="flex">
            <div className="mb-6 flex-auto">
              <label
                htmlFor="name"
                className="block text-gray-700 font-bold mb-2"
              >
                Phone Number
              </label>
              <input
                type="number"
                id="phone"
                name="phone"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
                value={formData.phone}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <div className="flex gap-2.5">
            <div className="mb-6 flex-auto">
              <label
                htmlFor="open"
                className="block text-gray-700 font-bold mb-2"
              >
                Open Hour
              </label>
              <input
                type="time"
                id="open"
                name="open"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
                value={formData.openingHours.open}
                onChange={handleTimeChange}
                required
              />
            </div>
            {validClose !== false ? null : (
              <p
                style={{
                  position: "absolute",
                  color: "red",
                  right: "64.5%",
                  top: "88.25%",
                  fontSize: "14px",
                }}
              >
                Invalid Open Hour
              </p>
            )}
            <div className="mb-6 flex-auto ">
              <label
                htmlFor="close"
                className="block text-gray-700 font-bold mb-2"
              >
                Close Hour
              </label>
              <input
                type="time"
                id="close"
                name="close"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
                value={formData.openingHours.close}
                onChange={handleTimeChange}
                required
              />
            </div>
            {validClose !== false ? null : (
              <p
                style={{
                  position: "absolute",
                  color: "red",
                  right: "40.5%",
                  top: "88.25%",
                  fontSize: "14px",
                }}
              >
                Invalid Close Hour
              </p>
            )}
          </div>
          <div className="flex gap-2.5">
            <div className="mb-6 flex-auto">
              <label
                htmlFor="password"
                className="block text-gray-700 font-bold mb-2"
              >
                Category
              </label>
              <Space
                style={{
                  width: "100%",
                }}
                direction="vertical"
              >
                <Select
                  mode="multiple"
                  allowClear
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
                  placeholder="Please select"
                  onChange={handleChange}
                  options={selectionCategory}
                  listItemHeight={10}
                  listHeight={250}
                />
              </Space>
            </div>
          </div>
          <div className="mb-6">
            <label
              htmlFor="file_input"
              className="block text-gray-700 font-bold mb-2"
            >
              Image
            </label>
            <input
              className="relative m-0 block w-full min-w-0 flex-auto cursor-pointer rounded-md border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] font-normal leading-[2.15] text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:cursor-pointer file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary"
              id="file_input"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              required
            />
          </div>
          <div>
            <button type="submit">Sign Up</button>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
}

export default SignUpRestaurant;
