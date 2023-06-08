import React from 'react';
import '../css/AddProduct.scss';
import { useEffect, useState } from 'react';
import { Input, Select, Spin, Upload, message, notification } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import axiosInstance from '../utility/AxiosInstance';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import Swal from 'sweetalert2';

function AddCategory(props) {
    const [loading, setLoading] = useState(false);
    const [category, setCategory] = useState({
        name: '',
    });
    const [errors, setErrors] = useState({
        name: '',
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

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCategory({ ...category, [name]: value });
        setErrors({ ...errors, [name]: '' });
    };

    const isFormValid = () => {
        return (
            category.name.trim() !== ''
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isFormValid()) {
            setErrors({
                name: category.name.trim() === '' ? 'Please enter a name' : '',
            });
            return;
        }

        setLoading(true);

        try {
            const res = await axiosInstance.post('/category/restaurants', category);
            if (res.status === 201) {
                props.handleOk();
                notification.open({
                    icon: <i className="fa-solid fa-check" style={{ color: 'green' }}></i>,
                    message: 'Success!',
                    description: 'Category created successfully!',
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
                                value={category.name}
                                onChange={handleInputChange}
                            />
                            {errors.name && <span className="error-message">{errors.name}</span>}
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

export default AddCategory;
