import React, { useEffect, useState } from "react";
import Modal from 'react-modal';
import { createGroup, addUserToGroup } from "../features/data/dataSlice";
import { useDispatch } from "react-redux";
import { FaUserPlus } from "react-icons/fa";

export default function Invite() {
  const user = "randoUser"
  const userId = user.length ? user[0].id : user["id"];
  const user1 = "user1";
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
  const groupId = group.group_id;


  const [inviteToggle, setInviteToggle] = useState(false);
  const [newMember, setNewMember] = useState('');
  const [currentMembers, setCurrentMembers] = useState([]);
  const [hasGroup, setHasGroup] = useState(false);
  Modal.setAppElement('#root');
  const dispatch = useDispatch();

  const handleMemberChange = (e) => { setNewMember(e.target.value); }

  useEffect(() => {
    // check if groupID exists, one call and get groupID + #members
    const checkUser = {
      userId: userId
    }
    // TODO: change the method when the endpoint is ready
    dispatch(createGroup(checkUser))
      .unwrap()
      .then(data => {
        console.log(data);
        setHasGroup(data.group_id ? true : false);
      })
    setCurrentMembers(group.users);
    // setHasGroup(group.group_id ? true : false);
  }, [dispatch, userId])

  const handleCreateGroup = () => {
    // otherwise
    // for creating group with 1 user
    // what's returned: groupID, userID
    const createData = {
      userId: userId,
      user1: user1
    }
    dispatch(createGroup(createData))
      .unwrap()
      .then(data => {
        console.log(data);
      })
    setHasGroup(true);
    setCurrentMembers([user1]);
  }

  const sendInvite = (e) => {
    e.preventDefault();
    console.log(currentMembers);
    // check current members
    if (currentMembers.length > 3) {
      alert('You have reached the maximum number of members in a group');
      return;
    }
    // check if new member is already in group
    if (currentMembers.includes(newMember)) {
      alert('This member is already in your group');
      return;
    }

    // if now full, send data with new member's email ==> post call
    const newMemberData = {
      userId: userId,
      groupId: groupId,
      newUserEmail: newMember
    }
    dispatch(addUserToGroup(newMemberData))
      .unwrap()
      .then(data => {
        console.log(data)
      })

    const newMemberToList = {
      "name": "test",
      "status": "Group Creator"
    }
    setCurrentMembers([...currentMembers, {
      "name": newMember,
      "status": "invite sent"
    }]);
    setNewMember('');
    setInviteToggle(true);
  };

  return (
    <div>
      <span className="features-item-text" onClick={() => setInviteToggle(true)}>Manage Group</span>
      <>
        <Modal isOpen={inviteToggle} onRequestClose={() => setInviteToggle(false)}>
          {hasGroup ? (
            <>
              <form onSubmit={(e) => sendInvite(e)}>
                <h1>Invite member to group:</h1>
                <h2>You can have up to 4 members within the group</h2>
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
                <label>
                  <h1>current members:</h1>
                </label>
                {currentMembers.map((member, index) => {
                  return <>
                    <h2 key={index}>{member.name + " (" + member.status + ")"}</h2>
                  </>
                })}
              </form>
            </>
          ) : (
            <>
              {/* if not, present with an add group button ==> group name ==> get groupID as repsponse */}
              <div className="no-group">
                <h1>No groups yet.</h1>
                <button className="btn" onClick={handleCreateGroup}>Create Group</button>
              </div>
            </>
          )}
        </Modal>
      </>
    </div>
  )
}