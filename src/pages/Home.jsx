
import React from 'react';
import {useState, useEffect } from 'react';
import Restaurant from '../components/Restaurant';
import { useDispatch} from 'react-redux';
import { getResturantsData } from '../features/data/dataSlice';
import Loader from '../components/Loader';



const Home = () => {


  const [restaurantsData, setRestaurantsData] = useState([]);
  const [ratings, setRatings] = useState(0);
  const [showMap, setShowMap] = useState(false);
  const dispatch = useDispatch();
  const [isUserLocation, SetIsUserLocation] = useState(false)
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  
  // const user = JSON.parse(localStorage.getItem("user"))
  // const [userId, setUserId] = useState();
  // const [username, setUsername] = useState();



  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      position => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
       
      },
      error => {
        console.log(error);
        alert('Please enable location access for the app to work correctly');
        setLatitude('40.776676')
        setLongitude('-73.971321')
      }
    );
  }, []);


  useEffect(() => {
    if (latitude && longitude !== '') {
      dispatch(getResturantsData({ latitude: latitude, longitude: longitude }))
        .unwrap()
        .then(response => {
          setRestaurantsData(response.data);
        })
        .catch(error => {
          console.log(error);
        });
        
    }
  }, [ latitude, longitude,setRestaurantsData, dispatch]);
  



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

  

  return (
    <div>
      {restaurantsData && <Restaurant  toggleCollapse={toggleCollapse} isCollapsed={isCollapsed} showMap={showMap} handleOpenMap={handleOpenMap} handleCloseMap={handleCloseMap} setRatings={setRatings} setRestaurantsData={setRestaurantsData}
      restaurantsData={restaurantsData}/>}
    </div>

  )
}

export default Home