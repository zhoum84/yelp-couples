import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  FaUser,
  FaHome,
  FaArrowLeft,
  FaArrowRight,
  FaCocktail,
  FaHistory,
  FaStar,
  FaUserPlus,
  FaBell,
  FaPlusCircle,
  FaList,
} from "react-icons/fa";
import Invite from "./Invite";

function Sidebar() {
  const [toggle, setToggle] = useState();
  const [userId, setUserId] = useState();
  const [userName, setUserName] = useState();
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false)
  const [groupId, setGroupId] = useState()



  const navigate = useNavigate();

  useEffect(() => {
    const username = JSON.parse(localStorage.getItem("user"));
    if (username) {
      setUserId(username.id)
      setUserName(username.username)
      setGroupId(username.group_id)
      setIsUserLoggedIn(true)
    }
  });

  const handleClick = () => {
    setToggle(!toggle);
  };

  // i can't fully figure out the animations :(
  return (
    <div className={toggle ? "sidebar collapse" : "sidebar"}>
      <div className="logo-name-wrapper">
        {isUserLoggedIn && (<div className="logo-name">
          <FaUser className="logo-name__icon" />
          <span className="logo-name__name">{userName}</span>
        </div>)}
        <button className={"logo-name__button"} onClick={handleClick}>
          {toggle ? (
            <FaArrowRight className="logo-name__icon" />
          ) : (
            <FaArrowLeft className="logo-name__icon collapse" />
          )}
        </button>
      </div>
      <div className="message">

      <Link to="/" style={{ textDecoration: "none", color: "white" }}>

        <div className="message">
          <FaHome className="message-icon" />
          <span className="message-text">Home</span>
          <span className="tooltip">Home</span>
        </div>
      </Link>

      <ul className="features-list">
        <li className="features-item inbox active">
          <Link
<<<<<<< HEAD
            to={isUserLoggedIn? `/list/${username.user.id}/${username.user.group_id[0]}` : "/login "}
=======
            to={isUserLoggedIn? (console.log("user: ",userId))
              // `/list/${user.id}/${user.group_id}`)
              : "/login " }

              // : "/form"
>>>>>>> 3d86be08a9f3c26f585794d161f335774cad37ac

            className="features-item-link"
            style={{ textDecoration: "none", color: "white" }}
          >
            <FaCocktail className="features-item-icon" />
            <span className="features-item-text">My Restaurants</span>
            <span className="tooltip">My Restaurants</span>
          </Link>
        </li>
        {/* <li className="features-item">
          <FaHistory className="features-item-icon" />
          <span className="features-item-text">Previously Visited</span>
          <span className="tooltip">Previously Visited</span>
        </li>
        <li className="features-item">
          <FaStar className="features-item-icon" />
          <span className="features-item-text">Starred</span>
          <span className="tooltip">Starred</span>
        </li> */}
        <li className="features-item ">
          <Link to="/form" style={{ textDecoration: "none", color: "white" }}>
            <FaList className="features-item-icon" />
            <span className="features-item-text"> Find </span>

            <span className="tooltip">Get Recommendations</span>
          </Link>
        </li>
        <li className="features-item ">
          <FaUserPlus className="features-item-icon" />
          <Invite />
          <span className="tooltip">Manage Group</span>
        </li>
      </ul>
    </div>
    </div>
  );
}

export default Sidebar;
