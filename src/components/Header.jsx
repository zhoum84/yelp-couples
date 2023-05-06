import { FaSignOutAlt, FaSignInAlt, FaSearch } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux'
import { logout } from "../features/auth/authSlice";
import { toast } from "react-toastify";

function Header() {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false)

  const [user, setUser] = useState();
    const handleLogout = () => {
        navigate('/');
    }

    useEffect(()=>{
      const username = JSON.parse(localStorage.getItem("user"));
      if(username){
      setUser(username.length? username[0].name : username.name);
      setIsUserLoggedIn(true)
    }})
  
    const onPress = () =>{
      dispatch(logout());
      setUser('')
      setIsUserLoggedIn(false)
      navigate('/');
      toast(`Logged out ${user}`, {
        type: "warning",
        autoClose: 1500,
        position: "top-center"
      });
    }
  return (
    <div className="header">
      <div style={{ textDecoration: 'none', color: 'black', fontSize:'20px' }}>Welcome!</div>
      <div className='header-wrapper'>
        <div className='title'><span style={{color:'red', marginLeft:'100px'}}>Restaurant </span> &nbsp;Finder <span style={{color:'red'}}>&hearts; </span></div>
        <div className="search">
        <input type="text" className="searchTerm" placeholder="What are you looking for?"/>
          <button type="submit" className="searchButton">
            <FaSearch />
          </button>
        </div>
      </div>
      <ul>
          {!isUserLoggedIn ?
          <li>
            <Link to='/login' style={{ textDecoration: 'none', color: 'black', fontSize:'20px' }}>
              <FaSignInAlt /> Login
            </Link>
          </li>
          : <li>
              <button className='btn hovPurp' onClick={onPress}> 
                <FaSignOutAlt /> Logout
              </button>
            </li>
           }
      </ul>
    </div>
  );
}

export default Header;
