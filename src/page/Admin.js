import React, { useEffect } from "react";
import { FiSettings } from "react-icons/fi";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { NavbarDash, Footer, Sidebar, ThemeSettings } from "../components";
import { admin_links } from '../data/dummy';
import {
  AdminDashboard,
  DeliveryDriverApproveList,
  UserList,
  AdminProfile,
  Security,
  RestaurantApproveList

} from "./AdminDashboardPages";
import "../css/RestaurantDashboard.scss";
import { useStateContext } from "../contexts/ContextProvider";

const Admin = () => {
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
      case 1:
        return <AdminDashboard />;
      case 2:
        return <RestaurantApproveList />;
      case 3:
        return <DeliveryDriverApproveList />;
      case 4:
        return <UserList />;
      case 5:
        return <AdminProfile />;
      case 6:
        return <Security />;
      default:
        return <AdminDashboard />;
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
            <Sidebar links={admin_links}/>
          </div>
        ) : (
          <div className="w-0 dark:bg-secondary-dark-bg">
            <Sidebar links={admin_links}/>
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

export default Admin;
