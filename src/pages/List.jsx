import {React, useState, useEffect, useParams} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getListItems } from '../features/data/dataSlice'
import { updateListItem } from '../features/data/dataSlice';
import { deleteListItem } from '../features/data/dataSlice';
import { getSuggestions } from '../features/data/dataSlice';


function List() {
    const dispatch = useDispatch();
    const [listItems, setListItems] = useState([]);
    // const { user_id, group_id } = useParams();
    const [ranking, setRanking] = useState(0);
    

    const storedData = JSON.parse(localStorage.getItem('user'));
    const user_id = storedData.id;
    const group_id = storedData.group_id;
    // const listItemCounter = JSON.parse(localStorage.getItem('list')) || { counter:0 };


    useEffect(() => {
        dispatch(getListItems({ user_id, group_id }))
          .then(response => {
            setListItems(response.payload);
          })
          .catch(error => {
            console.log(error);
          });
      }, [dispatch, user_id, group_id]);
  
    
      console.log("list items:",listItems)

      const handleRankingChange = (event, item) => {
        setRanking(event.target.value);
        dispatch(updateListItem({ resturant_id: item.id, ranking: event.target.value }));
      };

    const handleDeleteClick = (itemId) => {
        dispatch(deleteListItem(itemId));
        setListItems(listItems.filter(item => item.id !== itemId));
        // listItemCounter.counter--;
      }

      const handleSuggestionClick = () => {
        const usersList = listItems; // Example list of user IDs
        const groupId = group_id // Example group ID
        dispatch(getSuggestions({ usersList, groupId }));
      }
  

  return (
    <div className='listContainer'>
        {listItems.length >0 ?listItems.map(item => (
  <div key={item.resturant_id}>
    <p>Restaurant ID: {item.resturant_id}</p>
    <p>Restaurant Categories: {item.resturant_categories}</p>
    <p>Distance: {(item.resturant_distance * 69.172).toFixed(2)} miles</p>
    <p>Restaurant URL: {item.resturant_url}</p>
    <p>Restaurant Rating: {item.resturant_rating}</p>
    <p>User Rating: {item.user_rating}</p>
    <form>
        <label>Ranking:</label>
        <input type="number" min="1" max="5" value={ranking} onChange={handleRankingChange} />
      </form>
      <button onClick={() => handleDeleteClick(item.id)}>Delete</button>
  </div>
)):''}

    <button onClick={handleSuggestionClick}>Get Suggestions</button>
    </div>
  )
}

export default List