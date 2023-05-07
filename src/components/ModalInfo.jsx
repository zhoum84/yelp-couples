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
            Want to get restaurant suggestions?

<h2>Creating a group &#40;Necessary for Recommendations&#41;</h2>

<p>1. Register/Login</p>
<p>2. Create a group in manage groups </p>
<p>3. Invite  your friends or don't &#40;If you wish to dine alone!&#41;</p>

<br></br>

<h3>Invite Friends &#40;If you wish to&#41;:</h3>
<p>1. After creating groups, In manage groups, Invite up to 4 friends</p>
<p>2. Let friends register, and each create a list of restaurants</p>

<br></br>
<h3>Create list of restaurants:</h3>

<h4><strong>Groups are mandatory for this, if only one person is in a group</strong></h4>
<p>1. Come to the homepage &#40;or click restaurant finder on the top-left&#41;</p>
<p>2. Choose upto 5 restaurants by pressing 'Add to list'</p>
<p>3. View the List in the bottom right &#40;in a number bubble&#41;</p>
<p>4. Press submit on the bottom left </p>

<h3>Get Suggestion:</h3>
<p>1. Create a Group</p>
<p>2. Add friends &#40;or not&#41;</p>
<p>3. Create a list</p>
<p>4. Go to get suggestions</p>
<h3>VOILA! It's Here</h3>
            </div>
        </Modal>

    </div> 
  );
}



export default ModalInfo