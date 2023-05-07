
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { FaUserPlus } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { addUserToGroup, createGroup, getGroup } from '../features/data/dataSlice';
import NF from '../components/NF.png'


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



  const getGroupStatus = (group_id) => {
    dispatch(getGroup(group_id))
      .unwrap()
      .then((data) => {
        setGroupMembers(data.user)
      })
  }

  const handleCreateGroup = (event) => {
    event.preventDefault()
    const groupData = { "group_name": nameChange, "user1": userId }
    dispatch(createGroup(groupData))
      .unwrap()
      .then((response) => {
        setGroupId(response.pk)
        setGetGroups(true)
      })

  }

  const handleInvite = (event) => {
    event.preventDefault()
    const addData = { "group_id": groupId, "user_email": newMember, "user_id": userId }
    dispatch(addUserToGroup(addData))
      .then(() => {
        setGetGroups(true)
        setNameChange('')
      })
  }

  console.log(groupMembers)


  useEffect(() => {
    if (user) {
      setUserId(user.id)
      if (user.group_id && !isGroupIdSet) {
        setGroupId(user.group_id)
        SetIsGroupIdSet(true)
        setGetGroups(true)
      }
    }

    
  }, [user, getGroups, user.group_id])

  useEffect(() => {
    if (getGroups && groupId) {
      setGetGroups(false)
      getGroupStatus(groupId)
    }
  }, [getGroups, groupId])

  return (
    <div>
      {groupId ?
        (
          <div>
            <div className='memberHeading'>Group members</div>
            <div className='tableWrapper'>
            <table>
              <tr>
                <th>Username</th>
                <th>Status</th>
              </tr>
              {groupMembers.map((member) => {
                return (<tr>
                  <td>{member.user}</td>
                  <td>{member.status}</td>
                </tr>
                )
              })}
            </table>
            </div>
            <form onSubmit={handleInvite}>
             
              
              <div className='inviteClass'>
              <div className='memberHeading'>Invite more member to the group</div>
                <div className="searchGroup">
                  <input
                    type="text"
                    className="searchTerm"
                    placeholder="example@gmail.com"
                    value={newMember}
                    onChange={(e) => setNewMember(e.target.value)}
                    required
                  />
                  <button type="submit" className="searchButton" disabled={groupMembers.length === 4}>
                    <FaUserPlus /> Invite
                  </button>
                </div>
              </div>
              <div className='inviteText'>You can have up to {4 - groupMembers.length} members within the group</div>
            </form>

          </div>)
        : (
          <div>
            <div className="no-group">
              <h1 className="invite-text memberHeading">No groups found</h1>
              <img src={NF} />
            </div>
            <form onSubmit={handleCreateGroup}>
              <div>
                <div className="searchGroup">
                  <input
                    type="text"
                    className="searchTerm"
                    placeholder="Group Name"
                    value={nameChange}
                    onChange={(e) => setNameChange(e.target.value)}
                    required
                  />
                  <button type="submit" className="searchButton">
                    <FaUserPlus /> Create Group
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