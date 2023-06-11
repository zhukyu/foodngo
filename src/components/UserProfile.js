import React from "react";
import { MdOutlineCancel } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { Button } from ".";
import { userProfileData } from "../data/dummy";
import { useStateContext } from "../contexts/ContextProvider";
import avatar from "../data/avatar.jpg";

const UserProfile = ({ data, img, email, role }) => {
  const { currentColor, setIsClicked } = useStateContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsClicked(false);
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("username");
    localStorage.removeItem("email");

    navigate("/login");
  };
  return (
    <div
      className="nav-item absolute right-1 top-16 bg-white dark:bg-[#42464D] p-8 rounded-lg w-96"
      style={{
        boxShadow:
          "rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em, rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em, rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset",
        zIndex: 1000,
      }}
    >
      <div className="flex justify-between items-center">
        <p className="font-semibold text-lg dark:text-gray-200">Profile</p>
        <Button
          icon={<MdOutlineCancel />}
          color="rgb(153, 171, 180)"
          bgHoverColor="light-gray"
          size="2xl"
          borderRadius="50%"
        />
      </div>
      <div className="flex gap-5 items-center mt-6 border-color border-b-1 pb-6">
        <img
          className="rounded-full h-24 w-24"
          src={img ? img : "https://1.bp.blogspot.com/-vjmlU4JGiO8/X0Pf4DP53KI/AAAAAAACz6U/GpEJBAPXJj0AvygxrJRhKk6gPhZe_RnGQCLcBGAsYHQ/s960/66087382_912810825722849_502581898858463232_n.jpg"}
          alt="user-profile"
        />
        <div>
          <p className="font-semibold text-xl dark:text-gray-200">
            {" "}
            {data?.name}{" "}
          </p>
          <p className="text-gray-500 text-sm dark:text-gray-400">
            {" "}
            {role === "Restaurant" ? "Restaurant Admin" : role ==="Shipper" ? "Shipper" : "Admin"}{" "}
          </p>
          <p className="text-gray-500 text-sm font-semibold dark:text-gray-400">
            {" "}
            {email?email:""}{" "}
          </p>
        </div>
      </div>

      <div className="mt-5">
        <button
          style={{ width: "100%", height:"45px", fontSize:"16px", fontWeight:"bold", color:"white" }}
          onClick={handleLogout}
        >Logout</button>
      </div>
    </div>
  );
};

export default UserProfile;
