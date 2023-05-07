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
import { useNavigate, Link } from "react-router-dom";
import './Restaurant.css';


function Restaurant(props) {
  return (
    <div>
      {props.restaurantsData.length > 0 && (
        <div className="restaurantsContainer">
          {props.restaurantsData.map((restaurant, index) => (
            <div className="restaurant" key={index}>
              
              <Link
                target="_blank"
                rel="noreferrer"
                to={restaurant.resturant_url}
              >
                <div className="image-container">
                  {props.restaurantsData.length > 0 && (
                    <div
                      className="cardImg"
                      style={{backgroundImage: `url(${restaurant.resturant_image})`}}
                      // src={restaurant.resturant_image}
                      alt={restaurant.resturant_name}
                    ></div>
                  )}
                </div>
              </Link>
              {props.restaurantsData.length > 0 && (
                <h3 className="restaurantName">{restaurant.resturant_name}</h3>
              )}
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
                  <span key={index}>{category}&nbsp;&nbsp;</span> 
                  
                ))}
              </div>
                
                <div className="collapse-icon stars">
                  {props.isDelete ? 
                  (<button style={{margin: '0', color:"#D11A2A"}} onClick={() => props.handleSubmit(restaurant)}>
                   Delete
                </button>)
                  : (<button style={{margin: '0'}} onClick={() => props.handleSubmit(restaurant)}>
                    + Add to List
                  </button>)}
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
