import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getResturantsData } from '../features/data/dataSlice'
import { useEffect,useState } from 'react';
import { FaMapMarkerAlt, FaShare } from 'react-icons/fa';
import '../index.css'
import Rating from './Rating';

function Restaurant() {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const dispatch = useDispatch();
  const restaurantsData = useSelector(state => state.data.resturantsData);
  
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
  navigator.geolocation.getCurrentPosition((position) => {
    const { latitude, longitude } = position.coords;
    dispatch(getResturantsData({ data: { latitude, longitude } }))
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  });
}, [dispatch]);

  useEffect(() => {
    console.log(restaurantsData);
  }, [restaurantsData]);
  
  useEffect(() => {
    console.log(latitude, longitude);
  }, [latitude, longitude]);

  const reviews = [
    {
      author: "John Smith",
      content: "Great food and great service. Would highly recommend!"
    },
    {
      author: "Sarah Johnson",
      content: "Food was okay but service was slow."
    },
    {
      author: "Bob Thompson",
      content: "Terrible experience. Food was cold and tasted old."
    }
  ];

  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };
  

  const imageUrl = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYCo57E9jUcyxQKDtJgH4K_AqeL89k7DJtuQ&usqp=CAU'
  return (
    <div className="restaurant">

        <h3 className='head'>Italian Bistro</h3>

      <div className="image-container">
        <img className='img' src={imageUrl} alt='name' />
      </div>
      <div className="rating-container">
        <div className="stars"><Rating /></div>
      
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
      </div>

  );
}

export default Restaurant;
