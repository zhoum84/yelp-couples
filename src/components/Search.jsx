import { useDispatch, useSelector } from 'react-redux';
import { searchRestaurants } from '../features/data/dataSlice';

function Search(props) {
  const dispatch = useDispatch();
  

  const handleSubmit = (e) => {
    e.preventDefault();
    const keyword = e.target.keyword.value;
    const category = e.target.category.value;
    const distance = e.target.distance.value;
    dispatch(searchRestaurants({ keyword, category, distance }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="category" placeholder="Category" />
      <input type="text" name="distance" placeholder="Distance" />
      <button type="submit">Search</button>
      {props.restaurantsData.map((restaurant) => (
        <div key={restaurant.resturant_id}>
          <h2>{restaurant.resturant_name}</h2>
          <p>{restaurant.resturant_address}</p>
        </div>
      ))}
    </form>
  );
}

export default Search;