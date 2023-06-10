import React, { useEffect, useStyles, useState, useRef } from "react";
import "../css/SignUpRestaurant.scss";
import "../css/SignUpShipper.scss";
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
    Spin,
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
import { LoadingOutlined } from '@ant-design/icons';

function SignUpShipper() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [image, setImage] = useState(null);
    const [addressInput, setAddressInput] = useState("");
    const [addressList, setAddressList] = useState([]);
    const [placeId, setPlaceId] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const address_antd = useRef(null);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        idNumber: "",
        gender: "",
        phone: "",
        location: {
            coordinates: [0, 0],
        },
        address: {},
    });
    const [errors, setErrors] = useState({
        name: "",
        email: "",
        password: "",
        idNumber: "",
        gender: "",
        phone: "",
        address: "",
    });
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
        setErrors({ ...errors, [name]: "" });
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        console.log(file);
        setImage(file);
    };

    const handleImageSubmit = async () => {
        if (!image) return null;
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
    }, [placeId]);

    const isFormValid = () => {
        return (
            formData.name.trim() !== "" &&
            formData.email.trim() !== "" &&
            formData.password.trim() !== "" &&
            confirmPassword.trim() !== "" &&
            formData.phone.trim() !== "" &&
            formData.idNumber.trim() !== "" &&
            formData.gender.trim() !== "" &&
            placeId.trim() !== "" &&
            isValidEmail(formData.email) &&
            validatePassword(formData.password) &&
            formData.password === confirmPassword
        );
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        if (!isFormValid()) {
            setErrors({
                name: formData.name.trim() === '' ? 'Please enter a name' : '',
                email: !isValidEmail(formData.email) ? 'Please enter a email' : '',
                password: !validatePassword(formData.password) ? 'Password length under 6 characters' : '',
                password_confirm: formData.password !== confirmPassword ? 'Confirm password not match' : '',
                phone: formData.phone.trim() === '' ? 'Please enter a phone' : '',
                idNumber: formData.idNumber.trim() === '' ? 'Please enter a idNumber' : '',
                gender: formData.gender.trim() === '' ? 'Please choose a gender' : '',
                address: formData.address.trim() === '' ? 'Please enter a address' : '',
                address: placeId.trim() === '' ? 'Please select a address' : '',
            })
            return
        }
        const imageUrl = await handleImageSubmit();
        let _formData = formData;
        if (imageUrl) {
            _formData = {
                ...formData,
                image: imageUrl,
            }
        }
        await axiosInstance.post('/auth/register/shipper', _formData)
            .then((res) => {
                if (res.status === 201) {
                    console.log(res.data);
                    Swal.fire({
                        icon: 'success',
                        title: 'Shipper registered successfully!',
                        confirmButtonColor: '#28A745',
                    }).then((result) => {
                        if (result.isConfirmed) {
                            navigate('/shipper');
                        }
                    })
                }
            })
        setLoading(false);
    };
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailRegex.test(email)) return true;
        else return false;
    }

    function validatePassword(password) {
        if (password.length >= 6) {
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
        const suggestion = addressList.find(
            (suggestion) => suggestion.description === value
        );
        setFormData((prevData) => ({
            ...prevData,
            address: suggestion,
        }));
        setPlaceId(suggestion.place_id);
        address_antd.current.value = suggestion.value;
    };

    useEffect(() => {
        console.log(formData);
    }, [formData])

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
        setSuggestions([]);

        if (addressInput.length === 0) {
            setSuggestions([]);
            setPlaceId("");
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
                            index: index,
                        }));
                        setAddressList(addressList);
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

    const onAddressInputChange = (value) => {
        console.log('comehere');
        setErrors({ ...errors, address: "" });
        setAddressInput(value);
    }

    const antIcon = (
        <LoadingOutlined
            style={{
                fontSize: 40,
                color: "#FF003D",
            }}
            spin
        />
    );

    return (
        <div
            className="SignUpRestaurant SignUpShipper"
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
                <Spin spinning={true} indicator={antIcon} >

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
                                />
                                {errors.email &&
                                    <p
                                        style={{
                                            color: "red",
                                            fontSize: "14px",
                                        }}
                                    >
                                        {errors.email}
                                    </p>}
                            </div>
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
                                </div>
                                {errors.password &&
                                    <p
                                        style={{
                                            color: "red",
                                            fontSize: "14px",
                                        }}
                                    >
                                        {errors.password}
                                    </p>}
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
                                </div>
                                {
                                    errors.password_confirm &&
                                    <p
                                        style={{
                                            color: "red",
                                            fontSize: "14px",
                                        }}
                                    >
                                        {errors.password_confirm}
                                    </p>
                                }
                            </div>
                        </div>
                        <div className="flex">
                            <div className="mb-6 flex-auto">
                                <label
                                    htmlFor="name"
                                    className="block text-gray-700 font-bold mb-2"
                                >
                                    Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                />
                                {errors.name &&
                                    <p
                                        style={{
                                            color: "red",
                                            fontSize: "14px",
                                        }}
                                    >
                                        {errors.name}
                                    </p>}
                            </div>
                        </div>
                        <div className="flex">
                            <div className="mb-6 flex-auto" id="gender-select">
                                <label
                                    htmlFor="gender"
                                    className="block text-gray-700 font-bold mb-2"
                                >
                                    Gender
                                </label>
                                <Select

                                    placeholder="Please select"
                                    onChange={(value) => { setFormData({ ...formData, gender: value }) }}
                                    options={[
                                        { value: 'Male', label: 'Male' },
                                        { value: 'Female', label: 'Female' },
                                        { value: 'Other', label: 'Other' }
                                    ]}
                                    listItemHeight={10}
                                    listHeight={250}
                                />
                                {errors.gender &&
                                    <p
                                        style={{
                                            color: "red",
                                            fontSize: "14px",
                                        }}
                                    >
                                        {errors.gender}
                                    </p>}
                            </div>
                        </div>
                        <div className="flex">
                            <div className="mb-6 flex-auto">
                                <label
                                    htmlFor="phone"
                                    className="block text-gray-700 font-bold mb-2"
                                >
                                    Phone
                                </label>
                                <input
                                    type="number"
                                    id="phone"
                                    name="phone"
                                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                />
                                {errors.phone &&
                                    <p
                                        style={{
                                            color: "red",
                                            fontSize: "14px",
                                        }}
                                    >
                                        {errors.phone}
                                    </p>}
                            </div>
                        </div>
                        <div className="flex">
                            <div className="mb-6 flex-auto">
                                <label
                                    htmlFor="idNumber"
                                    className="block text-gray-700 font-bold mb-2"
                                >
                                    ID Number
                                </label>
                                <input
                                    type="text"
                                    id="idNumber"
                                    name="idNumber"
                                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
                                    value={formData.idNumber}
                                    onChange={handleInputChange}
                                />
                                {errors.idNumber &&
                                    <p
                                        style={{
                                            color: "red",
                                            fontSize: "14px",
                                        }}
                                    >
                                        {errors.idNumber}
                                    </p>}
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
                                        onChange={onAddressInputChange}
                                        ref={address_antd}
                                    />
                                </Space>
                                {errors.address &&
                                    <p
                                        style={{
                                            color: "red",
                                            fontSize: "14px",
                                        }}
                                    >
                                        {errors.address}
                                    </p>}
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
                            />
                        </div>
                        <div>
                            <button type="submit">Sign Up</button>
                        </div>
                    </form>
                </Spin>
            </div>
            <Footer />
        </div >
    );
}

export default SignUpShipper;
