import React from 'react'
import { FaSignOutAlt, FaSignInAlt, FaSearch } from "react-icons/fa";
import './Navbar.css';

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
import Header from './Header';

const Navbar = () => {
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

    return (
        <div className='navbarWrapper'>
            <div className='headerLogo'>
                <div className='logoSub1'>
                    <Link to="/" style={{ textDecoration: "none", color: "#FFB200" }}>
                        <div style={{ color: '#0081C9', fontFamily: 'Copperplate, "Copperplate Gothic Light", fantasy', fontSize: '18px' }}>
                            Restaurant
                        </div>
                        <div style={{ fontFamily: 'Copperplate, "Copperplate Gothic Light', letterSpacing: '4px', fontSize: '16px', fontWeight: 'bolder' }}>
                            Finder
                        </div>
                    </Link>
                </div>
                {/* <span style={{color:'red'}}>
                &hearts; 
            </span> */}
            </div>
            

            <div className='navItems'>

                {/* <div className="features-item">
                    <Link
                        to={isUserLoggedIn?
                            groupId?
                            `/list/${userId}/${groupId}`
                            : "/form"
                            : "/login " 
                          }
                        // className="features-item-link"
                        style={{ textDecoration: "none", color: "#36454F", display: 'flex', alignItems: 'center' }}
                    >
                        <FaCocktail className="features-item-icon" />
                        <span className="features-item-text">My Restaurants</span>
                        {/* <span className="tooltip">My Restaurants</span> */}
                    {/* </Link> */}
                {/* </div> */}
                 
                <div className="features-item ">
                    <Link to={isUserLoggedIn? "/suggestion" : "/login"} style={{ textDecoration: "none", color: "#36454F", display: 'flex', alignItems: 'center' }}>
                        <FaList className="features-item-icon" />
                        <span className="features-item-text"> Get Suggestions </span>
                        {/* <span className="tooltip">Get Recommendations</span> */}

                    </Link>
                </div>
                <div className="features-item " style={{ textDecoration: "none", color: "#36454F", display: 'flex', alignItems: 'center'}}>
                    <Link to={isUserLoggedIn? "/group" : "/login"} style={{ textDecoration: "none", color: "#36454F", display: 'flex', alignItems: 'center' }}>
                        <FaUserPlus className="features-item-icon" />
                        <span className="features-item-text" >Manage Group</span>
                    </Link>
                </div>
                <Header/>
            </div>
        </div>
    )
}

export default Navbar