import React, { useEffect } from "react";
import { FiSettings } from "react-icons/fi";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import {  Footer, Sidebar, ThemeSettings } from "../components";
import Navbar from "../components/Navbar";
import { user_links } from '../data/dummy';
import {
  Profile,
  Security,
  OrderHistory,
  CurrentOrder

} from "./UserAccountPages";
import "../css/UserAccount.scss";
import { useStateContext } from "../contexts/ContextProvider";

const UserAccount = () => {
  const {
    currentMode,
    activeMenu,
    currentColor,
    themeSettings,
    setThemeSettings,
    activeItem,
    setActiveItem,
  } = useStateContext();

 

  const getActiveItem = (index) => {
    switch (index) {
      case 1:
        return <OrderHistory />;
      case 2:
        return <Profile />;
      case 3:
        return <Security />;
      default:
        return <OrderHistory />;
    }
  };

  return (
    <div className={"user_account_div"}>
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
            <Sidebar links={user_links} />
          </div>
        ) : (
          <div className="w-0 dark:bg-secondary-dark-bg">
            <Sidebar links={user_links} />
          </div>
        )}
        <div
          className={
            activeMenu
              ? "dark:bg-main-dark-bg  bg-main-bg min-h-screen md:ml-72 w-full  "
              : "bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 "
          }
        >
          <div className="user_nav">
            <Navbar />
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

export default UserAccount;