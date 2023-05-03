import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaHome, FaArrowLeft, FaArrowRight, FaCocktail, FaHistory, FaStar, FaUserPlus, FaBell, FaPlusCircle } from "react-icons/fa";

function Sidebar() {


    const [toggle, setToggle] =useState();

    const navigate = useNavigate();

    const linkClick = (link) =>{
        navigate(`./${link}`);
    }
    
    const handleClick = () =>{
        setToggle(!toggle);
    };

    // i can't fully figure out the animations :(
    return (
    <div className={toggle ? "sidebar collapse" : 'sidebar'}>
      <div className="logo-name-wrapper">
        <div className="logo-name">
            <FaUser className="logo-name__icon"/>
          <span className="logo-name__name">Your Name</span>
        </div>
        <button className={'logo-name__button'} onClick={handleClick}>
          {toggle ? <FaArrowRight
            className="logo-name__icon"
          />:<FaArrowLeft
            className="logo-name__icon collapse"
          />}
        </button>
      </div>
      <div className="message">
        <FaHome className="message-icon"/>
        <span className="message-text">Home</span>
        <span className="tooltip">Home</span>
      </div>
      <ul className="features-list">
        <li className="features-item inbox active">
          <FaCocktail className="features-item-icon"/>
          <span className="features-item-text">My Restaurants</span>
          <span className="tooltip">Inbox</span>
        </li>
        <li className="features-item">
          <FaHistory className="features-item-icon"/>
          <span className="features-item-text">Previously Visited</span>
          <span className="tooltip">Previously Visited</span>

        </li>
        <li className="features-item">
          <FaStar className="features-item-icon"/>
          <span className="features-item-text">Starred</span>
          <span className="tooltip">Starred</span>
        </li>
        <li className="features-item ">
          <FaUserPlus className="features-item-icon"/>
          <span className="features-item-text">Invite Partner</span>
          <span className="tooltip">Sent</span>
        </li>
        <li className="features-item">
          <FaBell className="features-item-icon"/>
          <span className="notification-wrapper has-message"> </span>
          <span className="features-item-text">Notifications</span>
          <span className="inbox-number">99</span>
          <span className="tooltip">99 Notifications</span>
        </li>
       
      </ul>
      <ul className="chat-list">
        <div className="chat-header">Filler </div>
      </ul>
    </div>
  );
}

export default Sidebar;
