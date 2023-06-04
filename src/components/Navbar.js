import React, { useEffect, useState } from 'react'
import "../css/Navbar.scss";
import { Link, useNavigate } from 'react-router-dom';
import logo from '../image/FoodnGo_logo.png'
import ProfileMenu from './ProfileMenu';
import { Badge, Drawer, Modal, Popconfirm } from 'antd';
import ShoppingCart from './ShoppingCart';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCartItems } from '../utility/action';
import axiosInstance from '../utility/AxiosInstance';
import LocationUpdate from './LocationUpdate';

function Navbar() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [address, setAddress] = useState({})
    const [mainAddress, setMainAddress] = useState('')
    const [accessToken, setAccessToken] = useState('')
    const [user, setUser] = useState(null)

    const cartItems = useSelector((state) => state.cartItems);

    const [open, setOpen] = useState(false);
    const showDrawer = () => {
        if (!localStorage.getItem('access_token')) {
            navigate('/login');
            return;
        }
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };

    useEffect(() => {

    }, [cartItems])

    const reload = () => {
        navigate(0)
    }

    useEffect(() => {
        const address = JSON.parse(localStorage.getItem('address'));
        if (!address) {
            navigate('/');
        }
        else {
            setAddress(address)
            setMainAddress(address.structured_formatting.main_text)
            setAccessToken(localStorage.getItem('access_token'))
        }
    }, [])

    useEffect(() => {
        const accessToken = localStorage.getItem('access_token')
        if (accessToken) {

        }
    }, [])

    useEffect(() => {
        dispatch(fetchCartItems());
    }, [])

    useEffect(() => {
        const fetchUserData = async () => {
            await axiosInstance.get('/user')
                .then(res => {
                    setUser(res.data.user)
                })
                .catch(err => {
                    console.log(err);
                    localStorage.removeItem('access_token')
                    setUser(null)
                })
        }

        fetchUserData()
    }, [])

    const confirm = (e) => {

    }

    const cancel = (e) => {

    }

    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <div className='navbar'>
            <Modal title="Update Location" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null}>
                <LocationUpdate handleSuccess={reload}/>
            </Modal>
            <Drawer title="Shopping Cart" placement="right" onClose={onClose} open={open} width={470}>
                <ShoppingCart />
            </Drawer>
            <Link to='/restaurants'>
                <div className='logo'>
                    <img src={logo} alt='logo' className='logo' />
                </div>
            </Link>
            <div className='location' onClick={showModal}>
                <span className='location-text'>{mainAddress}</span>
                <i className="fa-solid fa-chevron-down"></i>
            </div>

            <div className='search-bar' >
                <i className="fa-solid fa-search"></i>
                <input
                    placeholder='Search stores, dishes...'
                    className='search-input'
                    id='search-input'
                />
            </div>
            <Badge count={cartItems?.result?.length} offset={[-3, 20]}>
                <div className='cart'>
                    <button className='cart-btn' onClick={showDrawer}>
                        <i className="fa-solid fa-shopping-cart"></i>
                    </button>
                </div>
            </Badge>
            {accessToken ? <ProfileMenu user={user} />
                : <div className='nav-links'>
                    <Link to='/login'>Sign In</Link>
                    <Link to='/signup'><button className='login-btn'>Sign Up</button></Link>
                </div>}

        </div>
    )
}

export default Navbar