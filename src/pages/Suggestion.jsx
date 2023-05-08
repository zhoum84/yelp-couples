import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import {useState, useEffect, useParams} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getListItems, getSuggestions } from '../features/data/dataSlice'
import { getGroup } from '../features/data/dataSlice';

function Suggestion() {
    const user = JSON.parse(localStorage.getItem('user'));
    const [userGroupId, setUserGroupId] = useState()
    const [groupData, setGroupData] = useState();
    const [getList, setGetList] =useState([])
    const [userHasList, setUserhasList] = useState(true);
    const [suggestion, getSuggestion] = useState()
    const [canSuggest,setCanSuggest] =useState(false)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(()=>{
      if(user){
        if(user.group_id){
          setUserGroupId(user.group_id)
        } else {
          navigate("/group")
        }
      }
    },[user])

    useEffect(()=>{
      if(userGroupId){
        dispatch(getGroup(userGroupId))
        .unwrap()
        .then((response) => {
          setGroupData(response)
      })
      }
    },[dispatch,userGroupId])

    useEffect(()=>{
      if(groupData){
        groupData.user.map((user)=>{
          if(user.user_id!==0){
            dispatch(getListItems({user_id:user.user_id, group_id: userGroupId}))
            .unwrap()
            .then((response)=>{
              setUserhasList(userHasList && response.length > 0)
              if (response.length === 0){
                const resp = `${user.user} does not have a list`
                setGetList([...getList, resp])
              } else {
                const resp = ` Please make a list`
                setGetList([...getList, resp])
              }
            })
          } else {
            const resp = `${user.user} is not registered`
            setGetList([...getList, resp])
            setUserhasList(userHasList && false)
          }
        })
      }
    },[dispatch,groupData])

    useEffect(()=>{
      if(userHasList && groupData){
        const users_list = groupData.user.map((user) => user.user_id)
        const data = {"usersList":users_list, "groupId": userGroupId}
        dispatch(getSuggestions(data))
        .unwrap()
        .then((response) => {
          getSuggestion(response.data)
          setCanSuggest(true)
        })
        setUserhasList(false)
      }
    },[dispatch, userHasList, groupData])
   
    return (
      <div>
        {canSuggest ? (
            <div class="circles-container">
            <div class="circle">
              <h2 class="title">Favourite Cuisine</h2>
              <p class="answer"><strong>{suggestion.favourite_cusine}</strong></p>
            </div>
            <div class="circle">
              <h2 class="title">Favourite Restaurant</h2>
              <p class="answer"><strong>{suggestion.favourite_resturant}</strong></p>
            </div>
            <div class="circle">
              <h2 class="title">Best Rated</h2>
              <p class="answer"><strong>{suggestion.best_rated}</strong></p>
            </div>
          </div>
        ):(
            <div>
            <div className='memberHeading'>Group members</div>
            <div className='tableWrapper'>
            <table>
              <tr>
                <th>Status</th>
              </tr>
              {getList.map((member) => {
                return (<tr>
                  <td>{member}</td>
                </tr>
                )
              })}
            </table>
            </div>
            </div>
        )}

      </div>
    )
}


export default Suggestion