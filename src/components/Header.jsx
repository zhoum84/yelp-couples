import { FaSignOutAlt, FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Header() {

    const navigate = useNavigate();

    const handleLogout = () => {
        navigate('/');
    }
  return (
    <div className="header">
      <div>Placeholder text</div>
      <div className='header-wrapper'>
        <div className='title'>Yelp For Couples</div>
        <div className="search">
        <input type="text" className="searchTerm" placeholder="What are you looking for?"/>
          <button type="submit" className="searchButton">
            <FaSearch />
          </button>
        </div>
      </div>
      <ul>
        <li>
          <button className="btn" onClick={handleLogout}>
            <FaSignOutAlt /> Logout
          </button>
        </li>
      </ul>
    </div>
  );
}

export default Header;
