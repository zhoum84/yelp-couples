import React, { useEffect, useState } from "react";
import Modal from 'react-modal';
import { createGroup, addUserToGroup } from "../features/data/dataSlice";
import { useDispatch } from "react-redux";
import { FaUserPlus } from "react-icons/fa";

export default function Invite() {
  const [inviteToggle, setInviteToggle] = useState(false);
  const [newMember, setNewMember] = useState('');
  const [nameChange, setNameChange] = useState('');
  const dispatch = useDispatch();
  const [group_id, setGroup_id] = useState();


  useEffect(()=>{
    if (user){
      setGroup_id(user.group_id)
    }
  })



  const handleMemberChange = (e) => { setNewMember(e.target.value); }
  const handleNameChange = (e) => { setNameChange(e.target.value); }
  const user = JSON.parse(localStorage.getItem("user"))
  const [userId, setUserId] = useState();
  const [username, setUsername] = useState();

  useEffect(()=>{
    if(user){
      setUserId(user.length? user[0].id :  user["user_id"]);
      setUsername(user.length? user[0].username :  user["username"]);
    }
  },[userId, username, user])
  const handleCreateGroup = (e) => {
    const newGroupData = {
      group_name: nameChange,
      user1: userId
    }
    dispatch(createGroup(newGroupData))
      .unwrap()
      .then(data => {
        console.log("create result", data)
        console.log("group_ids_data", [...group_id, { pk: data.pk, group_name: data.group_name }]);
        setGroup_id([...group_id, { pk: data.pk, group_name: data.group_name }]);
        setNameChange('');
      })
      .then(data => {
        // Update the local storage with the new group_id
        const updatedUser = {
          ...userLocalStorage,
          groups_id: [...userLocalStorage.groups_id, data.pk] // Add new group_id to the groups_id array
        };
        localStorage.setItem("user", JSON.stringify(updatedUser));
        // ...
      })

  }

  const sendInvite = (e) => {
    e.preventDefault();
    // check current members count?
    // check if new member is already in group?

    // if now full, send data with new member's email ==> post call
    const newMemberData = {
      user_email: newMember,
      // user_id: user.user,
      group_id: group_id[0].pk
    }
    dispatch(addUserToGroup(newMemberData))
      .unwrap()
      .then(data => {
        console.log("adduser res", data)
      })
    setNewMember('');
    setInviteToggle(true);
  };

  return (
    <div>
          {!group_id? (
            <>
              <form onSubmit={(e) => sendInvite(e)}>
                <h1 className="invite-text">Invite member to group:</h1>
                <h2 className="invite-text">You can have up to 4 members within the group</h2>
                <div>
                  <div className="search">
                    <input
                      type="text"
                      className="searchTerm"
                      placeholder="example@gmail.com"
                      value={newMember}
                      onChange={(e) => handleMemberChange(e)}
                      required
                    />
                    <button type="submit" className="searchButton">
                      <FaUserPlus />
                    </button>
                  </div>
                </div>
                <h1 className="invite-text">Current Group(s):</h1>
                {group_id.map((group, index) => {
                  return <>
                    <h2 className="invite-text" key={index}>{group.name}</h2>
                  </>
                })}
                {/* <h1 className="invite-text">current members:</h1>
                {currentMembers.map((member, index) => {
                  return <>
                    <h2 className="invite-text" key={index}>{member.name + " (" + member.status + ")"}</h2>
                  </>
                })} */}
              </form>

            </>
          ) : (
            <>
              {/* if not, present with an add group button ==> group name ==> get groupID as repsponse */}
              <div className="no-group">
                <h1 className="invite-text">No groups yet.</h1>
              </div>
              <form onSubmit={(e) => handleCreateGroup(e)}>
                <div>
                  <div className="searchGroup">
                    <input
                      type="text"
                      className="searchTerm"
                      placeholder="Create Group"
                      value={nameChange}
                        onChange={(e) => handleNameChange(e)}
                        required
                    />
                    <button type="submit" className="searchButton">
                      <FaUserPlus />
                    </button>
                  </div>
                </div>
              </form>
            </>
          )}
    </div>
  )
}