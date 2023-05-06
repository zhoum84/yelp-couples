import React, { useState } from "react";
import {FaStar, FaStarHalfAlt, } from 'react-icons/fa';


function Rating({ rating }) {
    const filledStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    return (
      <div className="stars">
        {rating && [...Array(filledStars)].map((_, index) => (
          <FaStar key={index} color="#ffc107" size={20}/>
        ))}
        {hasHalfStar && <FaStarHalfAlt color="#ffc107" size={20}/>}
        {rating && [...Array(5 - filledStars - (hasHalfStar ? 1 : 0))].map((_, index) => (
          <FaStar key={index + filledStars} color="#c4c4c4" size={20}/>
        ))}
      </div>
    );
  }
export default Rating