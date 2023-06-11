import { useEffect, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { FiShoppingCart } from "react-icons/fi";
import { BsChatLeft } from "react-icons/bs";
import { RiNotification3Line } from "react-icons/ri";
import { MdKeyboardArrowDown } from "react-icons/md";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import axiosInstance from "../utility/AxiosInstance";

import avatar from "../data/avatar.jpg";
import { Cart, Chat, Notification, UserProfile } from ".";
import { useStateContext } from "../contexts/ContextProvider";
import { useNavigate } from "react-router";

const NavButton = ({ title, customFunc, icon, color, dotColor }) => (
  <TooltipComponent content={title} position="BottomCenter">
    <button
      type="button"
      onClick={() => customFunc()}
      style={{ color }}
      className="relative text-xl rounded-full p-3 hover:bg-light-gray"
    >
      <span
        style={{ background: dotColor }}
        className="absolute inline-flex rounded-full h-2 w-2 right-2 top-2"
      />
      {icon}
    </button>
  </TooltipComponent>
);

const NavbarDash = ({ role }) => {
  const {
    currentColor,
    activeMenu,
    setActiveMenu,
    handleClick,
    isClicked,
    setScreenSize,
    screenSize,
  } = useStateContext();
  const [user, setUser] = useState(null);
  const [data, setData] = useState(null);
  const [account, setAccount] = useState(null);
  const [img, setImg] = useState(null);
  const [email, setEmail] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    let link = "";
    switch (role) {
      case "Restaurant":
        link = "/restaurant-dashboard/infor";
        break;
      case "Admin":
        link = "/admin-dashboard/infor";
        break;
      case "Shipper":
        link = "/shipper";
        break;
    }
    const fetchUserData = async () => {
      await axiosInstance
        .get(link)
        .then((res) => {
          switch (role) {
            case "Restaurant":
              setData(res.data.restaurant);
              setImg(res.data.restaurant.media[0].url);
              setEmail(res.data.account.email);
              break;
            case "Admin":
              setData(res.data.admin);
              setAccount(res.data.account);
              break;
            case "Shipper":
              setData(res.data.shipper);
              setImg(res.data.shipper.avatar);
              setEmail(res.data.shipper.email);
              break;
          }

          console.log(res.data);
          console.log(res.data.avatar);
        })
        .catch((err) => {
          console.log(err);
          if (err.response.status === 403) {
            switch (role) {
              case "Restaurant":
                switch (err.response.data.role) {
                  case "user":
                    navigate("/restaurants");
                    break;
                  case "shipper":
                    navigate("/shipper");
                    break;
                  case "admin":
                    navigate("/admin");
                    break;
                  default:
                    break;
                }
                break;

              case "Shipper":
                switch (err.response.data.role) {
                  case "user":
                    navigate("/restaurants");
                    break;
                  case "restaurant":
                    navigate("/restaurant");
                    break;
                  case "admin":
                    navigate("/admin");
                    break;
                  default:
                    break;
                }
                break;

              case "Admin":
                switch (err.response.data.role) {
                  case "user":
                    navigate("/restaurants");
                    break;
                  case "shipper":
                    navigate("/shipper");
                    break;
                  case "admin":
                    navigate("/admin");
                    break;
                  default:
                    break;
                }
                break;

              default:
                break;
            }
          }

          

          setUser(null);
        });
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (screenSize <= 900) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);

  const handleActiveMenu = () => setActiveMenu(!activeMenu);

  return (
    <div className="flex justify-between p-2 md:ml-6 md:mr-6 relative">
      <NavButton
        title="Menu"
        customFunc={handleActiveMenu}
        color={currentColor}
        icon={<AiOutlineMenu />}
      />
      <div className="flex">
        {/* <NavButton title="Chat" dotColor="#03C9D7" customFunc={() => handleClick('chat')} color={currentColor} icon={<BsChatLeft />} />
        <NavButton title="Notification" dotColor="rgb(254, 201, 15)" customFunc={() => handleClick('notification')} color={currentColor} icon={<RiNotification3Line />} /> */}
        <TooltipComponent content="Profile" position="BottomCenter">
          <div
            className="flex items-center gap-2 cursor-pointer p-1 hover:bg-light-gray rounded-lg"
            onClick={() => handleClick("userProfile")}
          >
            <p>
              <span className="text-gray-400 font-bold ml-1 text-14">
                {data?.name}
              </span>
            </p>
            <img
              className="rounded-full w-8 h-8"
              src={img ? img : "https://1.bp.blogspot.com/-vjmlU4JGiO8/X0Pf4DP53KI/AAAAAAACz6U/GpEJBAPXJj0AvygxrJRhKk6gPhZe_RnGQCLcBGAsYHQ/s960/66087382_912810825722849_502581898858463232_n.jpg"}
              alt="user-profile"
            />
            <MdKeyboardArrowDown className="text-gray-400 text-14" />
          </div>
        </TooltipComponent>
        {/* {isClicked.chat && (<Chat />)}
        {isClicked.notification && (<Notification />)} */}
        {isClicked.userProfile && (
          <UserProfile data={data} img={img} email={email} role={role} />
        )}
      </div>
    </div>
  );
};

export default NavbarDash;
