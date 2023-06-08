import React from 'react';
import '../css/AddProduct.scss';
import { useEffect, useState } from 'react';
import { Input, Select, Spin, Upload, message, notification } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import axiosInstance from '../utility/AxiosInstance';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import Swal from 'sweetalert2';

function AddProduct(props) {
    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState(null);
    const [categoryOptions, setCategoryOptions] = useState([]);
    const [product, setProduct] = useState({
        name: '',
        description: '',
        price: '',
        category: '',
    });
    const [imgLoading, setImgLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState();
    const [errors, setErrors] = useState({
        name: '',
        description: '',
        price: '',
        category: '',
        image: '',
    });

    const antIcon = (
        <LoadingOutlined
            style={{
                fontSize: 40,
                color: '#FF003D',
            }}
            spin
        />
    );

    const getBase64 = (img, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    };

    const beforeUpload = (file) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Image must be smaller than 2MB!');
        }
        return isJpgOrPng && isLt2M;
    };

    useEffect(() => {
        const fetchCategories = async () => {
            setLoading(true);
            try {
                const res = await axiosInstance.get('/category/restaurants');
                if (res.status === 200) {
                    const categories = res.data.categories;
                    const categoryOptions = categories.map((category) => ({
                        label: category.name,
                        value: category._id,
                    }));
                    setCategoryOptions(categoryOptions);
                }
            } catch (err) {
                console.log(err);
            }
            setLoading(false);
        };
        fetchCategories();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
        setErrors({ ...errors, [name]: '' });
    };

    const handleChange = (e) => {
        setProduct({ ...product, category: e });
        setErrors({ ...errors, category: '' });
    };

    const handleFileChange = (info) => {
        getBase64(info.file.originFileObj, (url) => {
            setImgLoading(false);
            setImageUrl(url);
        });
        setImage(info.file.originFileObj);
        setErrors({ ...errors, image: '' });
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
            onSuccess('ok');
        }, 0);
    };

    const handleImageSubmit = async () => {
        let imageUrl = undefined;
        const formData = new FormData();
        formData.append('image', image);
        try {
            const res = await axiosInstance.post('/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
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
            product.name.trim() !== '' &&
            product.description.trim() !== '' &&
            product.price.trim() !== '' &&
            product.category.trim() !== '' &&
            image !== null
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isFormValid()) {
            setErrors({
                name: product.name.trim() === '' ? 'Please enter a name' : '',
                description: product.description.trim() === '' ? 'Please enter a description' : '',
                price: product.price.trim() === '' ? 'Please enter a price' : '',
                category: product.category.trim() === '' ? 'Please select a category' : '',
                image: image === null ? 'Please upload an image' : '',
            });
            return;
        }

        setLoading(true);
        const imageUrl = await handleImageSubmit();
        const formData = {
            ...product,
            media: [
                {
                    type: 'image',
                    url: imageUrl,
                },
            ],
        };

        try {
            const res = await axiosInstance.post('/product', formData);
            if (res.status === 200) {
                props.handleOk();
                notification.open({
                    icon: <i className="fa-solid fa-check" style={{ color: 'green' }}></i>,
                    message: 'Success!',
                    description: 'Product created successfully!',
                    onClick: () => {
                        console.log('Notification Clicked!');
                    },
                });
            }
        } catch (err) {
            console.log(err);
            if (err.response && err.response.status === 400) {
                Swal.fire({
                    title: 'Error!',
                    text: err.response.data.message,
                    icon: 'error',
                    confirmButtonText: 'OK',
                });
            }
        }
        setLoading(false);
    };

    return (
        <div className="AddProduct">
            <Spin spinning={loading} indicator={antIcon}>
                <form onSubmit={handleSubmit}>
                    <div className={`flex form-group mb-4 ${errors.name && 'has-error'}`}>
                        <label htmlFor="name" className="w-20 leading-loose">
                            <h6>Name</h6>
                        </label>
                        <div className="flex-auto">
                            <Input
                                type="text"
                                name="name"
                                id="name"
                                placeholder="Name"
                                value={product.name}
                                onChange={handleInputChange}
                            />
                            {errors.name && <span className="error-message">{errors.name}</span>}
                        </div>
                    </div>
                    <div className={`flex form-group mb-4 ${errors.description && 'has-error'}`}>
                        <label htmlFor="description" className="w-20 leading-loose ">
                            <h6>Description</h6>
                        </label>
                        <div className='flex-auto'>
                            <TextArea
                                type="text"
                                name="description"
                                id="description"
                                placeholder="Description"
                                value={product.description}
                                onChange={handleInputChange}
                                maxLength={100}
                                style={{
                                    resize: 'none',
                                }}
                            />
                            {errors.description && <span className="error-message">{errors.description}</span>}
                        </div>
                    </div>
                    <div className={`flex form-group mb-4 ${errors.price && 'has-error'}`}>
                        <label htmlFor="price" className="w-20 leading-loose">
                            <h6>Price</h6>
                        </label>
                        <div className='flex-auto'>
                            <Input
                                type="number"
                                name="price"
                                id="price"
                                placeholder="Price"
                                value={product.price}
                                onChange={handleInputChange}
                                onKeyDown={(evt) => ['e', 'E', '+', '-'].includes(evt.key) && evt.preventDefault()}
                            />
                            {errors.price && <span className="error-message">{errors.price}</span>}
                        </div>
                    </div>
                    <div className={`flex form-group mb-4 ${errors.category && 'has-error'}`}>
                        <label htmlFor="category" className="w-20 leading-loose">
                            <h6>Category</h6>
                        </label>
                        <div className='flex-auto'>
                            <Select
                                id="category"
                                name="category"
                                placeholder="Please select"
                                onChange={handleChange}
                                options={categoryOptions}
                                listItemHeight={10}
                                listHeight={250}
                                style={{
                                    width: '100%',
                                }}
                            ></Select>
                            {errors.category && <span className="error-message">{errors.category}</span>}
                        </div>
                    </div>
                    <div className={`flex form-group mb-4 ${errors.image && 'has-error'}`}>
                        <label htmlFor="image" className="w-20 leading-loose">
                            <h6>Image</h6>
                        </label>
                        <div className='flex-auto'>
                            <Upload
                                name="image"
                                listType="picture-card"
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
                                            width: '100%',
                                        }}
                                    />
                                ) : (
                                    uploadButton
                                )}
                            </Upload>
                            {errors.image && <span className="error-message">{errors.image}</span>}
                        </div>
                    </div>
                    <div className="flex form-group mb-4 justify-end">
                        <button className="flex flex-end">Add</button>
                    </div>
                </form>
            </Spin>
        </div>
    );
}

export default AddProduct;
