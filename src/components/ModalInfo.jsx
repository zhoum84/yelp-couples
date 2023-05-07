import React from 'react'
import { Button } from 'react-bootstrap';
import Modal from "react-modal";


const ModalInfo = (props) => {
    const { isModalOpenInfo, handleModalInfo} = props;

  return (
    <div>
        <Modal className='infoModal' isOpen = {isModalOpenInfo} onRequestClose={handleModalInfo}>
        <div className="modal-body">
            <h2>How to Get Suggestion</h2>
            <p>
                First, create group in 'Manage Group'. Invite friends through email to sign up. Each person creates a list by going 
            through the restaurant listings on the homepage and add their preffered restaurants. You can pick up to Five. Once everyone completes their lists, submit 
            them and get a suggestion for a restaurant for everyone to dine at under 'get suggestions'.
            </p>
            </div>
        </Modal>
    
    </div> 
  );
}
  
  

export default ModalInfo
