import React from 'react';
import {useState } from 'react';
import Restaurant from '../components/Restaurant';

const Home = () => {


  const [restaurantsData, setRestaurantsData] = useState([]);
  const [ratings, setRatings] = useState(0);
  const [showMap, setShowMap] = useState(false);

  const handleOpenMap = () => {
    setShowMap(true);
  };

  const handleCloseMap = () => {
    setShowMap(false);
  };
  return (
    <div>
      <Restaurant showMap={showMap} handleOpenMap={handleOpenMap} handleCloseMap={handleCloseMap} setRatings={setRatings} setRestaurantsData={setRestaurantsData}
      restaurantsData={restaurantsData}/>
    </div>
  )
}

export default Home