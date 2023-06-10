import React, { useEffect } from "react";
import { FiSettings } from "react-icons/fi";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { NavbarDash, Footer, Sidebar, ThemeSettings } from "../components";
import { delivery_links } from '../data/dummy';
import {
    Orders,
    Profile,
    Security,
    DeliveryDashboard,
    DeliveredOrders,
    CurrentOrder

} from "./DeliveryDriverPages";
import "../css/RestaurantDashboard.scss";
import "../css/DeliveryDriver.scss";
import { useStateContext } from "../contexts/ContextProvider";
import { useState } from "react";

const DeliveryDriver = () => {
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
    const [coordinate, setCoordinate] = useState(null);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setCoordinate([longitude, latitude]);
                },
                (error) => {
                    console.error('Error getting location:', error);
                }
            );
        } else {
            console.error('Geolocation is not supported by this browser.');
        }
    }, []);

    useEffect(() => {
        console.log(coordinate);
    }, [coordinate])

    useEffect(() => {
        const currentThemeColor = localStorage.getItem("colorMode");
        const currentThemeMode = localStorage.getItem("themeMode");
        if (currentThemeColor && currentThemeMode) {
            setCurrentColor(currentThemeColor);
            setCurrentMode(currentThemeMode);
        }
    }, []);

    const getActiveItem = (index) => {
        switch (index) {
            case 1:
                return <DeliveryDashboard />;
            case 2:
                return <Orders coordinate={coordinate}/>;
            case 3:
                return <CurrentOrder coordinate={coordinate}/>;
            case 4:
                return <DeliveredOrders coordinate={coordinate}/>;
            case 5: 
                return <Profile />;
            case 6:
                return <Security />;
            default:
                return <DeliveryDashboard />;
        }
    };

    return (
        <div className={currentMode === "Dark" ? "DeliveryDriver dark" : "DeliveryDriver"}>
            <div className="flex relative dark:bg-main-dark-bg">
                {activeMenu ? (
                    <div className="w-64 fixed sidebar dark:bg-secondary-dark-bg bg-white ">
                        <Sidebar links={delivery_links} />
                    </div>
                ) : (
                    <div className="w-0 dark:bg-secondary-dark-bg">
                        <Sidebar links={delivery_links} />
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

export default DeliveryDriver