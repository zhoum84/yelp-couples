import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getResturantsData } from '../features/data/dataSlice'
import { useEffect } from 'react';

function Restaurant() {

  const dispatch = useDispatch();
  const restaurantsData = useSelector(state => state.data.resturantsData);

  useEffect(() => {
    dispatch(getResturantsData());
  }, [dispatch]); 

  useEffect(() => {
    console.log(restaurantsData);
  }, [restaurantsData]);
  
  
  return (
    <div>Restaurant</div>
  )
}

export default Restaurant