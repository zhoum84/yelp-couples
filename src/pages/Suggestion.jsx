import React from 'react'
import { Navigate } from 'react-router-dom';
import {useState, useEffect, useParams} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getListItems } from '../features/data/dataSlice'
import { getGroup } from '../features/data/dataSlice';

function Suggestion() {
    const storedData = JSON.parse(localStorage.getItem('user'));
    const user_id = storedData?.id;
    const group_id = storedData?.group_id;
    const [groupData, setGroupData] = useState();
    const [listItems, setListItems] = useState([]);
    const [user1,setUser1] = useState({})
    const [user2,setUser2] = useState({})
    const [user3,setUser3] = useState({})
    const [user4,setUser4] = useState({})
    const [canSuggest,setCanSuggest] =useState(false)
    const [hasData,setHasData] = useState(false)
    const list = listItems.list
    const dispatch = useDispatch();
    useEffect(() => {
        if (!group_id) {
          Navigate('/group');
        } else if (group_id) {
          dispatch(getGroup(group_id)).unwrap().then((data) => {
            setGroupData(data);
          });
        }
      }, [dispatch, group_id]);
      
      useEffect(() => {
        if (groupData) {
          Promise.all(
            groupData.user.map((user) =>
            dispatch(getListItems({ user_id: user.user_id, group_id }))
              .unwrap()
              .then((data) => {
                const listId = data[0].id;
                console.log('list', data);
                return {
                  userId: user.user_id,
                  list: listId,
                };
              })
          )
          ).then((userLists) => {
            // userLists is an array of objects {userId, list}
            const updatedGroupData = {
              ...groupData,
              users: groupData.user.map((user) => {
                const userList = userLists.find((ul) => ul.userId === user.user_id);
                return {
                  ...user,
                  hasList: !!userList?.list,
                };
              }),
            };
            if(!hasData){
                setGroupData(updatedGroupData)
                console.log(groupData)
                const allHasList = groupData.users.every(item => item.hasOwnProperty('hasList') && item.hasList);
                setCanSuggest(allHasList)
                setHasData(true)
                
                
            }
            
            

          });
        }
      }, [dispatch,hasData, groupData]);
      console.log('can suggest',canSuggest)
      useEffect(()=>{
        if(canSuggest){
            const users_list = groupData.users.map((u) => u.user_id);
            dispatch()
            console.log('user list:', users_list)
            setCanSuggest(true)

        }
      },[canSuggest])

return (
    <div>
      <h2>Suggestions</h2>
      {groupData && groupData.user.map(user => {
        return (
          <div key={user.user}>
            <h3>{user.user}</h3>
            {user.hasList ? (
              <p>{user.user} has a list!</p>
            ) : (
              <p>{user.user} does not have a list.</p>
            )}
          </div>
        );
      })}
    </div>
  );
}


export default Suggestion