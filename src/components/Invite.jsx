import React, { useState } from "react";
import Modal from 'react-modal';
import { createGroup, addUserToGroup } from "../features/data/dataSlice";
import { useDispatch } from "react-redux";
import { FaUserPlus } from "react-icons/fa";

export default function Invite() {
  const user = "randoUser"
  const userId = user.length ? user[0].id : user["id"];
  const groupId = 1;
  const group = ({
    "group_id": "6c295814-6ee5-40f0-b40a-368ba36160cb",
    "users": [
      {
        "name": "test",
        "status": "Group Creator"
      },
      {
        "name": "test6",
        "status": "Group Member"
      },
      {
        "name": "xyz@abc.com",
        "status": "invite sent"
      }
    ]
  })

  const [partnerInviteToggle, setPartnerInviteToggle] = useState(false);
  const [newMember, setNewMember] = useState('');
  const [nameChange, setNameChange] = useState('');
  Modal.setAppElement('#root');

  const handleMemberChange = (e) => {
    setNewMember(e.target.value);
  }

  const handleNameChange = (e) => {
    setNameChange(e.target.value);
  }

  const dispatch = useDispatch();
  const sendInvite = (e) => {
    e.preventDefault();
    // check if groupID exists, one call and get groupID + #members

    // otherwise
    // for creating group with 1 user
    const createData = {
      userId: userId,
      user1: "user1",
    }
    dispatch(createGroup(createData))
      .unwrap()
      .then(data => {
        // what's returned: groupID, userID
        console.log(data)
      })


    // if now full, send data with new member's email ==> post call
    setNewMember('');
    const data = {
      userId: userId,
      groupId: groupId,
      newUserEmail: newMember
    }
    dispatch(addUserToGroup(data))
      .unwrap()
      .then(data => { console.log(data) })

    setPartnerInviteToggle(true);
  };

  const updateGroupName = (e) => {
    e.preventDefault();
    setNameChange('');
    // post new group name
  }

  return (
    <div>
      <span className="features-item-text" onClick={() => setPartnerInviteToggle(true)}>Manage Group</span>
      <>
        <Modal isOpen={partnerInviteToggle} onRequestClose={() => setPartnerInviteToggle(false)}>
          <form onSubmit={(e) => updateGroupName(e)}>
            {/* check in backend if user has a group, need API to check */}
            {/* if not, present with an add group button ==> group name ==> get groupID as repsponse */}
            <label>
              <h1>Group Name:</h1>
            </label>
            <div>
              <div className="search">
                <input
                  type="text"
                  className="searchTerm"
                  placeholder="Update your group name"
                  value={nameChange}
                  onChange={(e) => handleNameChange(e)}
                />
                <button type="submit" className="searchButton">
                  <FaUserPlus />
                </button>
              </div>
            </div>
          </form>

          <form onSubmit={(e) => sendInvite(e)}>
            <label>
              <h1>Invite member to group:</h1>
            </label>
            <div>
              <div className="search">
                <input
                  type="text"
                  className="searchTerm"
                  placeholder="example@gmail.com"
                  value={newMember}
                  onChange={(e) => handleMemberChange(e)}
                />
                <button type="submit" className="searchButton">
                  <FaUserPlus />
                </button>
              </div>
            </div>
            <h2>
              current members:
            </h2>
            {/* {group.users.map((member, index) => {
              return (
                <h2 key={index}>
                  {member}
                </h2>
              )
            })} */}
          </form>
        </Modal>
      </>
    </div>
  )
}