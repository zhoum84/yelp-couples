import React, { useEffect, useState } from "react";
import Modal from 'react-modal';
import { createGroup, addUserToGroup, getGroup } from "../features/data/dataSlice";
import { useDispatch } from "react-redux";
import { FaUserPlus } from "react-icons/fa";

export default function Invite(props) {
  const [inviteToggle, setInviteToggle] = useState(false);
  const [newMember, setNewMember] = useState('');
  const [groupNameChange, setGroupNameChange] = useState('');

  const [groupObj, setGroupObj] = useState({});
  const [user, setUser] = useState("");
  const [currMembers, setCurrMembers] = useState([]);
  Modal.setAppElement('#root');
  const dispatch = useDispatch();


  useEffect(() => {
    if (props.user !== '') {
      setUser(props.user);
    } else {
      setUser("1");
    }
  }, []);

  const handleMemberChange = (e) => { setNewMember(e.target.value); }
  const handlegroupNameChange = (e) => { setGroupNameChange(e.target.value); }

  const handleCreateGroup = (e) => {
    e.preventDefault();
    const newGroupData = {
      group_name: groupNameChange,
      user1: user
    }
    dispatch(createGroup(newGroupData))
      .unwrap()
      .then(data => {
        console.log("groupObj", { pk: data.pk, group_name: data.group_name });
        setGroupObj({ pk: data.pk, group_name: data.group_name });
        setGroupNameChange('');
      })
  }

  const sendInvite = (e) => {
    e.preventDefault();
    // check current members count?
    // check if new member is already in group?

    // if now full, send data with new member's email ==> post call
    console.log("email to send", newMember)
    console.log("id to send", user)
    console.log("group id to send", groupObj.pk)
    const newMemberData = {
      user_email: newMember,
      user_id: user,
      group_id: groupObj.pk
    }
    dispatch(addUserToGroup(newMemberData))
      .unwrap()
      .then(data => {
        console.log("adduser res", data)
      })
    dispatch(getGroup(groupObj.pk))
      .unwrap()
      .then(data => {
        console.log("getGroup: ", data.user)
        setCurrMembers(data.user);
      })
    setNewMember('');
    setInviteToggle(true);
  };

  return (
    <div>
      <span className="features-item-text" onClick={() => setInviteToggle(true)}>Manage Group</span>
      <>
        <Modal isOpen={inviteToggle} onRequestClose={() => setInviteToggle(false)}>
          {groupObj.pk ? (
            <>
              <form onSubmit={(e) => sendInvite(e)}>
                <h1 className="invite-text">Invite member to group:</h1>
                {/* <h2 className="invite-text">You can have up to 4 members within the group</h2> */}
                <div>
                  <div className="search">
                    <input
                      type="email"
                      className="searchTerm"
                      placeholder="example@gmail.com"
                      pattern=".+@+.+\.com"
                      value={newMember}
                      onChange={(e) => handleMemberChange(e)}
                      required
                    />
                    <button type="submit" className="searchButton">
                      <FaUserPlus />
                    </button>
                  </div>
                </div>
                <h1 className="invite-text">Current Group: {groupObj.group_name}</h1>
                <h1 className="invite-text">current members:</h1>
                {[currMembers.map((member, index) => {
                  return (
                    <h2 className="invite-text" key={index}>{member.user}</h2>
                  )
                })]}
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
                  <div className="search">
                    <input
                      type="text"
                      className="searchTerm"
                      placeholder="Create Group"
                      value={groupNameChange}
                      onChange={(e) => handlegroupNameChange(e)}
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
        </Modal>
      </>
    </div>
  )
}