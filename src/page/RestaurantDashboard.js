import React, { useEffect } from "react";
import { FiSettings } from "react-icons/fi";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { NavbarDash, Footer, Sidebar, ThemeSettings } from "../components";
import {
  Ecommerce,
  Orders,
  Menu,
  Customers,
  Profile,
  Security

} from "./RestaurantDashboardPages";
import "../css/RestaurantDashboard.scss";
import { useStateContext } from "../contexts/ContextProvider";

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
      case "ecommerce":
        return <Ecommerce />;
      case "orders":
        return <Orders />;
      case "menu":
        return <Menu />;
      case "customers":
        return <Customers />;
      case "profile":
        return <Profile />;
      case "security":
        return <Security />;
      default:
        return <Ecommerce />;
    }
  };

  return (
    <div className={currentMode === "Dark" ? "dark" : ""}>
      <div className="flex relative dark:bg-main-dark-bg">
        <div className="fixed right-4 bottom-4" style={{ zIndex: "1000" }}>
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
        </div>
        {activeMenu ? (
          <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white ">
            <Sidebar />
          </div>
        ) : (
          <div className="w-0 dark:bg-secondary-dark-bg">
            <Sidebar />
          </div>
        )}
        <div
          className={
            activeMenu
              ? "dark:bg-main-dark-bg  bg-main-bg min-h-screen md:ml-72 w-full  "
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
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default RestaurantDashboard;
