import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getResturantsData } from '../features/data/dataSlice';
import { useEffect, useState } from 'react';
import { FaMapMarkerAlt, FaShare, FaStar, FaRegStar, FaRoad } from 'react-icons/fa';
import '../index.css';
import Rating from './Rating';
// import Map from './Map';
import { createListItem } from '../features/data/dataSlice';
import { useNavigate, Link } from "react-router-dom";


function Restaurant(props) {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const dispatch = useDispatch();
  const user_id = '1'
  const group_id = 'deb59915-4efb-492f-994c-04fc378ab5f3'
  
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      position => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      },
      error => {
        console.log(error);
        // alert('Please enable location access for the app to work correctly');
      }
    );
  }, []);

  const handleSubmit = (restaurant) => {
    const data = {
      user_id: user_id,
      group_id: group_id,
      items: [{
        resturant_id: restaurant.resturant_id,
        resturant_name: restaurant.resturant_name,
        resturant_image: restaurant.resturant_image,
        resturant_url: restaurant.resturant_url,
        resturant_categories: restaurant.resturant_categories.toString(),
        resturant_rating: restaurant.resturant_rating,
        resturant_address: restaurant.resturant_address,
        resturant_distance: restaurant.resturant_distance,
        user_rating: 1,

        


      }]
    };
    
    dispatch(createListItem(data))
      .then(() => {
        console.log('successfully added item to list')
      })
      .catch((error) => {
        console.log('you suck')
      });
  };

  console.log(props.restaurantsData)





  return (
    <div>
      {props.restaurantsData.length > 0 && (
        <div className="restaurantsContainer">
          
          {props.restaurantsData.map((restaurant, index) => (
        
            <div className="restaurant" key={index}>
              {props.restaurantsData.length > 0 ? (
                <h3 className="head">{restaurant.resturant_name}</h3>
              ) : (
                ""
              )}
              <Link target ='_blank' rel="noreferrer"to={restaurant.resturant_url}>
              <div className="image-container">
                {props.restaurantsData.length > 0 ? (
                  <img className="img" src={restaurant.resturant_image} alt={restaurant.resturant_name} />
                ) : (
                  ""
                )}
              </div>
              </Link>
              <div className="rating-container">
                <Rating rating={restaurant.resturant_rating} />
                <div className="map-link">
                  <a href="#"></a>
                </div>
                <div className=''>
                    <p>{(restaurant.resturant_distance * 0.000621371).toFixed(2)} miles</p>
                  </div>
                <div className="share-link">
                  <a href="#">
                    <FaShare />
                  </a>
                </div>

              </div>
              <div className="reviews-header" onClick={props.toggleCollapse}>
              <div>
                {restaurant.resturant_categories[1]}
              </div>

  <div className="collapse-icon">
    <h4 onClick={() => handleSubmit(restaurant)}> 
      + Add to List
    </h4>
  </div>
</div>
            </div>
          ))}
          {props.restaurantsData.length > 0 && (
            <>
              {props.restaurantsData.map((restaurant, index) => (
                <div key={index} className="restaurant-rating">
                  {restaurant.rating}
                </div>
                
              ))}
            </>
            
          )}
         
        </div>
        
      )}
      
    </div>
    
  );
}  


export default Restaurant;
