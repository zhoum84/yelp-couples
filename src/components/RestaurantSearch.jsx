import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

function RestaurantSearch({ props }) {
  const [searchTerm, setSearchTerm] = useState("");
  const searchParams = ["resturant_name", "resturant_categories"];

//   const results = restaurants.filter((restaurant) => {
//     for (const param of searchParams) {
//       if (restaurant[param].toLowerCase().includes(searchKeyword)) {
//         return true;
//       }
//     }
//     return false;
//   });
  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredRestaurants = props.restaurantsData.filter((props) => {
    const includesSearchTerm =
    props.restaurantsData.resturant_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    props.restaurantsData.resturant_categories.toLowerCase().includes(searchTerm.toLowerCase());
    return includesSearchTerm;
  });

  return (
    <div className="search">
      <input
        type="text"
        className="searchTerm"
        placeholder="What are you looking for?"
        value={searchTerm}
        onChange={handleInputChange}
      />
      <button type="submit" className="searchButton">
        <FaSearch />
      </button>
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
              {filteredRestaurants.map((restaurant, index) => (
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
