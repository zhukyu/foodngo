import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';

import '../css/ProfileMenu.scss'
import axiosInstance from '../utility/AxiosInstance';


function useOutsideAlerter(ref, setDropdown) {
    useEffect(() => {
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                var item = document.querySelector('.dropdown');
                setDropdown(false);
                item.classList.remove('is-active');
            }
        }
        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref, setDropdown]);
}

function ProfileMenu({user}) {
    
    const navigate = useNavigate();
    const [dropdown, setDropdown] = useState(false);
    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef, setDropdown);
    const dropDownHandle = () => {
        var item = document.querySelector('.dropdown');
        setDropdown(!dropdown);
        if (!dropdown) {
            item.classList.add('is-active');
        }
        else {
            item.classList.remove('is-active');
        }
    }

    

    const onLogOut = (e) => {
        e.preventDefault();
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('username');
        localStorage.removeItem('email');
        navigate(0);
        // axiosInstance.post('/auth/logout').then(res =>{
        //     if(res.status === 200)
        //     {
        //         localStorage.removeItem('accessToken');
        //         localStorage.removeItem('userName');
        //         navigate(0);
        //     }
        // });
    }
const handleProfile = (e) => {
        navigate('/account/user');

}
    return (
        <div className="wrap-profile-menu" ref={wrapperRef}>
            <div className="avatar" onClick={dropDownHandle}>
                <img src={user ? user.avatar : "https://static.wikia.nocookie.net/gensin-impact/images/8/88/Hu_Tao_Card.png/revision/latest?cb=20220725204937"} alt="avatar" />
            </div>
            <ul className="dropdown">
                <li className="dropdown-item" onClick={handleProfile}>Profile</li>
                <li role="separator" className="divider"></li>
                <li className="dropdown-item" onClick={onLogOut}>Log Out</li>
            </ul>
        </div>
    )
}



export default ProfileMenu;

