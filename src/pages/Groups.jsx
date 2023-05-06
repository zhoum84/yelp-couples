
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { FaUserPlus } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { addUserToGroup, createGroup, getGroup } from '../features/data/dataSlice';



const Group = () => {
    const dispatch = useDispatch()
    const user = JSON.parse(localStorage.getItem("user"))
    const [userId, setUserId] = useState()
    const [groupMembers, setGroupMembers] = useState([])
    const [groupId, setGroupId] = useState()
    const [newMember, setNewMember] = useState("");
    const [getGroups, setGetGroups] = useState(false)
    const [nameChange, setNameChange] = useState('');
    const [isGroupIdSet, SetIsGroupIdSet] = useState(false)



    const getGroupStatus = (group_id) =>{
        dispatch(getGroup(group_id))
        .unwrap()
        .then ((data)=>{
          console.log("dataji : ", data)
          setGroupMembers(data.user)
        })
    }

    const handleCreateGroup = (event) => {
      event.preventDefault()
      const groupData = {"group_name": nameChange, "user1": userId}
      dispatch(createGroup(groupData))
      .unwrap()
      .then((response)=>{
        setGroupId(response.pk)
        // setGetGroups(true)
      })

    }

    const handleInvite = (event) => {
      event.preventDefault()
      const addData = {"group_id":groupId, "user_email":newMember, "user_id":userId}
      dispatch(addUserToGroup(addData))
      .then(()=>{
        setGetGroups(true)
        setNameChange('')
      })
    }

    console.log(groupMembers)


  useEffect(()=>{
      if(user){
          setUserId(user.id)
      }

      if (user.group_id && !isGroupIdSet){
        // setGroupId(user.group_id)
        SetIsGroupIdSet(true)
        setGetGroups(true)
      }
  },[user, getGroups, user.group_id])

  useEffect(()=>{
    if(getGroups && groupId){
      setGetGroups(false)
      getGroupStatus(groupId)
    }
  },[getGroups, groupId])

  return (
    <div>
        {groupId?
        (
        <div>
          <form onSubmit={handleInvite}>
                <h1>Invite member to group:</h1>
                <h2>You can have up to {4 - groupMembers.length} members within the group</h2>
              <div>
                  <div className="searchGroup">
                    <input
                      type="text"
                      className="searchTerm"
                      placeholder="example@gmail.com"
                      value={newMember}
                      onChange={(e) => setNewMember(e.target.value)}
                      required
                    />
                    <button type="submit" className="searchButton">
                      <FaUserPlus />
                    </button>
                  </div>
                </div>
            </form>
            {groupMembers.map((member)=>{
              return (<div>
                      <h4>{member.user}</h4>
                      <h4>{member.status}</h4>
                    </div>
                    )
                  })}
        </div>)
        :(
          <div>
             <div className="no-group">
                <h1 className="invite-text">No groups yet.</h1>
              </div>
              <form onSubmit={handleCreateGroup}>
                <div>
                  <div className="searchGroup">
                    <input
                      type="text"
                      className="searchTerm"
                      placeholder="Create Group"
                      value={nameChange}
                        onChange={(e) => setNameChange(e.target.value)}
                        required
                    />
                    <button type="submit" className="searchButton">
                      <FaUserPlus />
                    </button>
                  </div>
                </div>
              </form>
          </div>
        )} 
    </div>

  )
}

export default Group