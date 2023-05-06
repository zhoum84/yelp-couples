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
  const [user, setUser] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    const username = JSON.parse(localStorage.getItem("user"));
    if (username) {
      setUser(username.length ? username[0].name : username.name);
    }
  });
  const user_id = "1";
  const group_id = "6c295814-6ee5-40f0-b40a-368ba36160cb";

  const handleClick = () => {
    setToggle(!toggle);
  };

  // i can't fully figure out the animations :(
  return (
    <div className={toggle ? "sidebar collapse" : "sidebar"}>
      <div className="logo-name-wrapper">
        <div className="logo-name">
          <FaUser className="logo-name__icon" />
          <span className="logo-name__name">{user}</span>
        </div>
        <button className={"logo-name__button"} onClick={handleClick}>
          {toggle ? (
            <FaArrowRight className="logo-name__icon" />
          ) : (
            <FaArrowLeft className="logo-name__icon collapse" />
          )}
        </button>
      </div>

      <Link to="/home" style={{ textDecoration: "none", color: "white" }}>
        <div className="message">
          <FaHome className="message-icon" />
          <span className="message-text">Home</span>
          <span className="tooltip">Home</span>
        </div>
      </Link>

      <ul className="features-list">
        <li className="features-item inbox active">
          <Link
            to={`/list/${user_id}/${group_id}`}
            className="features-item-link"
            style={{ textDecoration: "none", color: "white" }}
          >
            <FaCocktail className="features-item-icon" />
            <span className="features-item-text">My Restaurants</span>
            <span className="tooltip">My Restaurants</span>
          </Link>
        </li>
        <li className="features-item">
          <FaHistory className="features-item-icon" />
          <span className="features-item-text">Previously Visited</span>
          <span className="tooltip">Previously Visited</span>
        </li>
        <li className="features-item">
          <FaStar className="features-item-icon" />
          <span className="features-item-text">Starred</span>
          <span className="tooltip">Starred</span>
        </li>
        <li className="features-item ">
          <Link to="/form" style={{ textDecoration: "none", color: "white" }}>
            <FaList className="features-item-icon" />
            <span className="features-item-text">Get Recommendations</span>
            <span className="tooltip">Get Recommendations</span>
          </Link>
        </li>
        <li className="features-item ">
          <FaUserPlus className="features-item-icon" />
          <Invite />
          <span className="tooltip">Invite Partner</span>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
