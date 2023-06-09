import React, { useEffect, useState } from "react";
import { FiSettings } from "react-icons/fi";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { NavbarDash, Footer, Sidebar, ThemeSettings } from "../components";
import { links } from '../data/dummy';
import {
    Ecommerce,
    Orders,
    Customers,
    Profile,
    Security

} from "./RestaurantDashboardPages";
import "../css/RestaurantDashboard.scss";
import { useStateContext } from "../contexts/ContextProvider";
import axiosInstance from "../utility/AxiosInstance";
import { useNavigate } from "react-router-dom";
import Products from "./RestaurantDashboardPages/Products";
import Categories from "./RestaurantDashboardPages/Categories";

const RestaurantDashboard = () => {
    const {
        setCurrentColor,
        setCurrentMode,
        currentMode,
        activeMenu,
        currentColor,
        themeSettings,
        setThemeSettings,
        activeItem,
    } = useStateContext();
    const [user, setUser] = useState(null);
    const navigate = useNavigate()

    useEffect(() => {
        const currentThemeColor = localStorage.getItem("colorMode");
        const currentThemeMode = localStorage.getItem("themeMode");
        if (currentThemeColor && currentThemeMode) {
            setCurrentColor(currentThemeColor);
            setCurrentMode(currentThemeMode);
        }
    }, []);

    // useEffect(() => {
    //   const fetchUserData = async () => {
    //     await axiosInstance.get('/user')
    //       .then(res => {
    //         console.log(res.data.user)
    //         setUser(res.data.user)
    //       })
    //       .catch(err => {
    //         console.log(err);
    //         setUser(null)
    //         navigate('/login')
    //       })
    //   }
    //   fetchUserData();
    // }, [])

    const getActiveItem = (index) => {
        switch (index) {
            case 1:
                return <Ecommerce />;
            case 2:
                return <Orders />;
            case 3:
                return <Products />;
            case 4:
                return <Categories />;
            // case 5:
            //     return <Customers />;
            case 5:
                return <Profile />;
            case 6:
                return <Security />;
            default:
                return <Ecommerce />;
        }
    };

    return (
        <div className={currentMode === "Dark" ? "RestaurantDashboard dark" : "RestaurantDashboard"}>
            <div className="flex relative dark:bg-main-dark-bg">
                {/* <div className="fixed right-4 bottom-4" style={{ zIndex: "1000" }}>
                    <TooltipComponent content="Settings" position="Top">
                        <button
                            type="button"
                            onClick={() => setThemeSettings(true)}
                            style={{ background: currentColor, borderRadius: "50%" }}
                            className="text-3xl text-white p-3 hover:drop-shadow-xl hover:bg-light-gray"
                        >
                            <FiSettings />
                        </button>
                    </TooltipComponent>
                </div> */}
                {activeMenu ? (
                    <div className="w-64 fixed sidebar dark:bg-secondary-dark-bg bg-white ">
                        <Sidebar links={links}/>
                    </div>
                ) : (
                    <div className="w-0 dark:bg-secondary-dark-bg">
                        <Sidebar links={links}/>
                    </div>
                )}
                <div
                    className={
                        activeMenu
                            ? "dark:bg-main-dark-bg  bg-main-bg min-h-screen md:ml-64 w-full  "
                            : "bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 "
                    }
                >
                    <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar_dash w-full ">
                        <NavbarDash />
                    </div>
                    <div>
                        {themeSettings && <ThemeSettings />}
                        {getActiveItem(activeItem)}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RestaurantDashboard;
