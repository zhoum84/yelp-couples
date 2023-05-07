
import React from 'react';
import {useState, useEffect } from 'react';
import Restaurant from '../components/Restaurant';
import { useDispatch} from 'react-redux';
import { createListItem, getResturantsData } from '../features/data/dataSlice';
import Loader from '../components/Loader';
import { FaInfo, FaSearch } from 'react-icons/fa';
import MyRestaurant from '../components/MyResturants.jsx';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ModalInfo from '../components/ModalInfo';






const Home = (props) => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"))
  const [restaurantsData, setRestaurantsData] = useState([]);
  const [ratings, setRatings] = useState(0);
  const [showMap, setShowMap] = useState(false);
  const dispatch = useDispatch();
  const [isUserLocation, SetIsUserLocation] = useState(false)
  const [latitude, setLatitude] = useState('40.776676');
  const [longitude, setLongitude] = useState('-73.971321');
  const [getResturantDataResponse, SetGetResturantDataResponse] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isModalOpenInfo, setIsModalOpenInfo] = useState(false)
  const [resturantCount, setResturantCount] = useState(0)
  const [resturantList, SetResturantList] = useState([])
  const [isUserNotLoggedIn, setIsUserNotLoggedIn] = useState(false)
  const [isUserNotGrouppedIn, setIsUserNotGrouppedIn] = useState(false)
  const [isListCreated, setIsListCreated] = useState(false)
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState(restaurantsData);


  const handleModal = () =>{
    setIsModalOpen(!isModalOpen)
  }

  const handleModalInfo = () =>{
    setIsModalOpenInfo(!isModalOpenInfo)
  }

  
 

  useEffect(() => {
    if (!isUserLocation){
      navigator.geolocation.getCurrentPosition(
        position => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
          SetIsUserLocation(true)
          SetGetResturantDataResponse(true)
        },
        error => {
          console.log(error);
          alert('Please enable location access for the app to work correctly');
          setLatitude('40.776676')
          setLongitude('-73.971321')
        }
      );
    }
  }, [setLatitude, setLongitude, SetGetResturantDataResponse]);

  const getResturantData = () => {
    dispatch(getResturantsData({ latitude: latitude, longitude: longitude }))
        .unwrap()
        .then(response => {
          setRestaurantsData(response.data);
        })
        .catch(error => {
          console.log(error);
        });
  }


  useEffect(() => {
    if(!getResturantDataResponse && !isUserLocation){
      getResturantData()
      SetGetResturantDataResponse(true)
    }
  },[getResturantData, SetGetResturantDataResponse])

  useEffect(() => {
    if(isUserLocation && getResturantDataResponse){
    getResturantData()
    SetGetResturantDataResponse(false)
    }
  },[getResturantData, getResturantDataResponse, isUserLocation])




  useEffect(() => {
    const restaurantRatings = restaurantsData.map(restaurant => restaurant.rating);
    setRatings(restaurantRatings);
  }, [restaurantsData]);
  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleOpenMap = () => {
    setShowMap(true);
  };

  const handleCloseMap = () => {
    setShowMap(false);
  };

  const handleSubmit = (resturant) => {
      if(resturantList.length < 5){
        if(resturantList.includes(resturant)){
          alert("Restaurant already selected!");
        } else {
          SetResturantList([...resturantList, resturant])
        }
      } else {
        alert("Resturant limit reached, Please delete or submit")
      }
  }

  const handleDelete = (resturant) =>{
      const updatedRestaurants = resturantList.filter(
        (selectedRestaurant) => selectedRestaurant !== resturant
      );
      SetResturantList(updatedRestaurants);
  }

  const handleSubmitMyList = () => {
    let updatedRestaurants = resturantList.map((restaurant, index) => {
      return { ...restaurant, user_rating: index+1 };
    })
    // updatedRestaurants.resturant_categories = updatedRestaurants.resturant_categories.join(", ");
    updatedRestaurants = updatedRestaurants.map((r) => 
    {
      const menu = r.resturant_categories.join(", ")
      return { ...r, resturant_categories: menu };
  })


    if (user){
      if (user.group_id){
        const data = {"user_id":user.id,"group_id":user.group_id,"items":updatedRestaurants}
        dispatch(createListItem(data))
        .then(() =>{
          SetResturantList([])
          setIsListCreated(true)
          alert("List Created Successfully\n Go to suggestions")
        })
      }
      else{
        setIsUserNotGrouppedIn(true)
      }
    }
    else{
      setIsUserNotLoggedIn(true)
    }
  }

  useEffect(()=>{
    if(isUserNotLoggedIn){
      setIsUserNotLoggedIn(false)
      navigate("/login")
    }
  },[isUserNotLoggedIn])

  useEffect(()=>{
    if(isUserNotGrouppedIn){
      setIsUserNotGrouppedIn(false)
      navigate("/group")
    }
  },[isUserNotGrouppedIn])

  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);

    const filtered = restaurantsData.filter((item) => {
      const lowerCaseName = item.resturant_name.toLowerCase();
      const lowerCaseCategories = item.resturant_categories.map((category) =>
        category.toLowerCase()
      );
      return (
        lowerCaseName.includes(value) ||
        lowerCaseCategories.includes(value)
      );
    });

    setFilteredData(filtered);
  };


  return (
    <div>

        {!isListCreated && (
        <div>
          <button className="info-button" onClick={handleModalInfo}><FaInfo /></button>
          <ModalInfo isModalOpenInfo={isModalOpenInfo} handleModalInfo={handleModalInfo} />
          <button  className='suggestion-button' onClick={handleModal}>
          {resturantList.length}
          <MyRestaurant 
          isModalOpen = {isModalOpen} 
          handleModal = {handleModal} 
          resturantList = {resturantList} 
          handleDelete ={handleDelete} 
          handleSubmitMyList = {handleSubmitMyList}
          />
        </button>
        <button  className='suggestion-submit-button' onClick={handleSubmitMyList}>Submit</button>
        </div>
        )}
      {restaurantsData && 
      <Restaurant  
      toggleCollapse={toggleCollapse} 
      isCollapsed={isCollapsed} 
      showMap={showMap} 
      handleOpenMap={handleOpenMap} 
      handleCloseMap={handleCloseMap} 
      setRestaurantsData={setRestaurantsData}
      restaurantsData={searchTerm? filteredData : restaurantsData} 
      resturantList = {resturantList} 
      SetResturantList={SetResturantList} 
      isDelete = {false} 
      handleSubmit={handleSubmit}
      />}
    </div>

  )
}

export default Home