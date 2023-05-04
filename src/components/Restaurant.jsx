import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getResturantsData } from '../features/data/dataSlice';
import { useEffect, useState } from 'react';
import { FaMapMarkerAlt, FaShare, FaStar, FaRegStar } from 'react-icons/fa';
import '../index.css';
import Rating from './Rating';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

function Restaurant() {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const dispatch = useDispatch();
  const [restaurantsData, setRestaurantsData] = useState([]);
  const [positionMap, setPositionMap] = useState([]);
  const [ratings, setRatings] = useState(0);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      position => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      },
      error => {
        console.log(error);
        alert('Please enable location access for the app to work correctly');
      }
    );
  }, []);

  useEffect(() => {
    if (latitude && longitude) {
      dispatch(getResturantsData({ latitude: latitude, longitude: longitude }))
        .unwrap()
        .then(response => {
          setRestaurantsData(response.data);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }, [dispatch, latitude, longitude]);

  useEffect(() => {
    if (restaurantsData.length > 0) {
      const restaurantRatings = restaurantsData.map(restaurant => restaurant.rating);
      setRatings(restaurantRatings);
    }
  }, [restaurantsData]);

  const reviews = [    { author: 'John Smith', content: 'Great food and great service. Would highly recommend!' },    { author: 'Sarah Johnson', content: 'Food was okay but service was slow.' },    { author: 'Bob Thompson', content: 'Terrible experience. Food was cold and tasted old.' }  ];

  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="RestaurantsContainer">
      {restaurantsData.map((restaurant, index) => (
        <div className="restaurant" key={index}>
          {restaurantsData.length > 0 ? <h3 className="head">{restaurant.name}</h3> : ''}
          <div className="image-container">
            {restaurantsData.length > 0 ? <img className="img" src={restaurant.image} alt={restaurant.name} /> : ''}
          </div>
          <div className="rating-container">
          <Rating rating={restaurant.rating} />


            <div><p>Rating: {restaurant.rating}</p></div>
            <div className="map-link">
              <a href="#">
                <FaMapMarkerAlt />
              </a>
            </div>
            <div className="share-link">
              <a href="#">
                <FaShare />
              </a>
            </div>
          </div>
          <div className="reviews">
            <div className="reviews-header" onClick={toggleCollapse}>
              <div className="collapse-icon"><h4>{isCollapsed ? '+' : '-'} Reviews</h4></div>
            </div>
            {!isCollapsed && (
              <div className="reviews-body">
                {reviews.map((review, index) => (
                  <div key={index} className="review">
                    <div className="review-author">{review.author}</div>
                    <div className="review-content">{review.content}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
          {/* <div className="map-container">
  <button onClick={() => setMapVisible(!mapVisible)}>
    {mapVisible ? "Hide Map" : "Show Map"}
  </button>
  {mapVisible && <Map />}
</div> */}
  {/* {latitude && longitude  ? <MapContainer center={positionMap} zoom={13} scrollWheelZoom={false}>
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    <Marker position={positionMap}>
      <Popup>
        A pretty CSS3 popup. <br /> Easily customizable.
      </Popup>
    </Marker>
  </MapContainer>: ''} */}
  
        </div>
        
      ))}
    </div>
  );
}


export default Restaurant;
