import React from "react";
import Modal from "react-modal";
import Restaurant from "./Restaurant";

Modal.setAppElement("#root");

function MyRestaurant(props) {
    const { isModalOpen, handleModal, resturantList, handleDelete, handleSubmitMyList} = props;

  return (
    <div>
        <Modal isOpen = {isModalOpen} onRequestClose={handleModal}>
            <Restaurant 
            restaurantsData={resturantList} 
            isDelete = {true} 
            handleSubmit ={handleDelete} />
            <button 
            type="submit" 
            className="ans myList stars" 
            onSubmit={(e) => {
                e.preventDefault()
                handleSubmitMyList()
                }}>
                Submit
            </button>
        </Modal>
    
    </div> 
  );
}

export default MyRestaurant;
