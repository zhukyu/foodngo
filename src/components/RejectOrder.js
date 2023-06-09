import React from 'react';
import '../css/AddProduct.scss';
import { useEffect, useState } from 'react';
import { Input, Select, Spin, Upload, message, notification } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import axiosInstance from '../utility/AxiosInstance';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import Swal from 'sweetalert2';

function RejectOrder(props) {
    const [loading, setLoading] = useState(false);
    const [reason, setReason] = useState({
        reason: '',
    });
    const [errors, setErrors] = useState({
        reason: '',
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
        setReason({ ...reason, [name]: value });
        setErrors({ ...errors, [name]: '' });
    };

    const isFormValid = () => {
        return (
            reason.reason.trim() !== ''
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isFormValid()) {
            setErrors({
                name: reason.reason.trim() === '' ? 'Please enter a reason' : '',
            });
            return;
        }

        setLoading(true);

        try {
            const res = await axiosInstance.patch(`/orders/${props?.orderId}?status=refused`, reason);
            if (res.status === 200) {
                props.handleOk();
                notification.open({
                    icon: <i className="fa-solid fa-check" style={{ color: 'green' }}></i>,
                    message: 'Success!',
                    description: 'Order refused successfully!',
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
                            <h6>Reason</h6>
                        </label>
                        <div className="flex-auto">
                            <TextArea
                                type="text"
                                name="reason"
                                id="reason"
                                placeholder="Reason"
                                value={reason.reason}
                                onChange={handleInputChange}
                                maxLength={100}
                                style={{
                                    resize: 'none',
                                }}
                            />
                            {errors.name && <span className="error-message">{errors.name}</span>}
                        </div>
                    </div>
                    <div className="flex form-group mb-4 justify-end">
                        <button className="flex flex-end">Refuse</button>
                    </div>
                </form>
            </Spin>
        </div>
    );
}

export default RejectOrder;
