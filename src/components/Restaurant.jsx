import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  FaMapMarkerAlt,
  FaShare,
  FaStar,
  FaRegStar,
  FaRoad,
} from "react-icons/fa";
import "../index.css";
import Rating from "./Rating";
// import Map from './Map';
import { createListItem } from "../features/data/dataSlice";
import updateListItem from '../features/data/dataSlice'
import { getListItems } from '../features/data/dataSlice'
import { useNavigate, Link } from "react-router-dom";


function Restaurant(props) {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const dispatch = useDispatch();
  const storedData = JSON.parse(localStorage.getItem('user'));
  const user_id = storedData?.id;
  const group_id = storedData?.group_id;
  const [listItems, setListItems] = useState([]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      },
      (error) => {
        console.log(error);
        // alert('Please enable location access for the app to work correctly');
      }
    );
  }, []);
//get list for list ID
  useEffect(() => {
    dispatch(getListItems({ user_id, group_id }))
      .then(response => {
        setListItems(response.payload);
      })
      .then(console.log(listItems))
      .catch(error => {
        console.log(error);
      });
  }, [dispatch, user_id, group_id]);

//counter for items in list
  const list = "listItemCounter";
  let listItemCounter = JSON.parse(localStorage.getItem('list')) || { counter:0 };
//create initial list  
  const createList = (data) => {
    return dispatch(createListItem(data))
      .then(() => {
        listItemCounter.counter++;
        localStorage.setItem('list', JSON.stringify(listItemCounter)); // update localStorage item
        console.log("successfully created list");
      })
      .catch((error) => {
        console.log("list not successfully created");
      });
  }
 //update list 
  const updateList = (data, id) => {
    return dispatch(updateListItem({ id, data }))
      .then(() => {
        console.log(id,data);
      })
      .catch((error) => {
        console.log("list not successfully updated");
      });
  }
  console.log(listItemCounter)
  const handleSubmit = (restaurant) => {
    const data = {
      user_id: user_id,
      group_id: group_id,
      items: [{
        resturant_id: restaurant.resturant_id,
        resturant_name: restaurant.resturant_name,
        // resturant_image: restaurant.resturant_image,
        resturant_url: restaurant.resturant_url,
        resturant_categories: restaurant.resturant_categories.toString(),
        resturant_rating: restaurant.resturant_rating,
        // resturant_address: restaurant.resturant_address,
        resturant_distance: restaurant.resturant_distance,
        user_rating: 1,
      }]
    };
  // uses vounter to decide if to create or update
    if (listItemCounter.counter === 0) {
      
      createList(data);
    } else if (listItemCounter.counter < 5) {
      const id = listItems.id
      updateList(data, id);
    } else {
      alert('You can only have up to 5 items in myRestaurants list')
    }
  };
  


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
              <Link
                target="_blank"
                rel="noreferrer"
                to={restaurant.resturant_url}
              >
                <div className="image-container">
                  {props.restaurantsData.length > 0 ? (
                    <img
                      className="img"
                      src={restaurant.resturant_image}
                      alt={restaurant.resturant_name}
                    />
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
                <div className="">
                  <p>
                    {(restaurant.resturant_distance * 0.000621371).toFixed(2)}{" "}
                    miles
                  </p>
                </div>
                <div className="share-link">
                  <a href="#">
                    <FaShare />
                  </a>
                </div>
              </div>
              <div className="reviews-header" onClick={props.toggleCollapse}>
              <div className="center-text categories">
                {restaurant.resturant_categories.map((category, index) => (
                  <span key={index}>{category}</span>
                ))}
              </div>
                
                <div className="collapse-icon stars">
                  <h4 onClick={() => handleSubmit(restaurant)}>
                    + Add to List
                  </h4>
                </div>
                <Link
                  target="_blank"
                  rel="noreferrer"
                  to={restaurant.resturant_url}
                >
                  <button className="ans stars">Visit Website</button>
                </Link>
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
