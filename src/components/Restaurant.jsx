import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getResturantsData } from '../features/data/dataSlice';
import { useEffect, useState } from 'react';
import { FaMapMarkerAlt, FaShare, FaStar, FaRegStar } from 'react-icons/fa';
import '../index.css';
import Rating from './Rating';
import Map from './Map';

function Restaurant(props) {





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
              <div className="image-container">
                {props.restaurantsData.length > 0 ? (
                  <img className="img" src={restaurant.resturant_image} alt={restaurant.resturant_name} />
                ) : (
                  ""
                )}
              </div>
              <div className="rating-container">
                <Rating rating={restaurant.resturant_rating} />
                <div className="map-link">
                  <a href="#"></a>
                </div>
                <div>
                    <p></p>
                  </div>
                <div className="share-link">
                  <a href="#">
                    <FaShare />
                  </a>
                </div>
              </div>
              <div className="reviews">
                <div className="reviews-header" onClick={props.toggleCollapse}>
                  <div className="collapse-icon">
                    <h4 onClick={props.handleCreateListItem}>{props.isCollapsed ? "+" : "-"} Add to List</h4>
                  </div>
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
