import React from 'react';
import '../css/AddProduct.scss';
import { useEffect, useState } from 'react';
import { Input, Select, Spin, Upload, message, notification } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import axiosInstance from '../utility/AxiosInstance';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import Swal from 'sweetalert2';

function UpdateCategory(props) {
    const [loading, setLoading] = useState(false);
    const [category, setCategory] = useState({
        name: '',
    });
    const [errors, setErrors] = useState({
        name: '',
    });
    const handleOk = props.handleOk;

    const antIcon = (
        <LoadingOutlined
            style={{
                fontSize: 40,
                color: '#FF003D',
            }}
            spin
        />
    );

    useEffect(() => {
        const fetchCategory = async () => {
            setLoading(true);
            try {
                const res = await axiosInstance.get(`/category/${props?.categoryId}/restaurants`);
                if (res.status === 200) {
                    const category = res.data.category;
                    setCategory({
                        name: category.name,
                    });
                }
            } catch (err) {
                console.log(err);
            }
            setLoading(false);
        };
        fetchCategory();
    }, [])

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
            const res = await axiosInstance.put(`/category/${props?.categoryId}/restaurants`, category);
            if (res.status === 200) {
                props.handleOk();
                notification.open({
                    icon: <i className="fa-solid fa-check" style={{ color: 'green' }}></i>,
                    message: 'Success!',
                    description: 'Category updated successfully!',
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
                        <button className="flex flex-end">Update</button>
                    </div>
                </form>
            </Spin>
        </div>
    );
}

export default UpdateCategory;
