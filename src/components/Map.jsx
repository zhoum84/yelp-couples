import {React, useState} from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Map = ({latitude, longitude, handleClose  }) => {
    // const { latitude, longitude, handleClose } = props;
    const [isOpen, setIsOpen] = useState(true);
  
    const handleCloseModal = () => {
      setIsOpen(false);
      handleClose();
    };
  
    return (
      <div className={`modal ${isOpen ? 'is-active' : ''}`}>
        <div className="modal-background"></div>
        <div className="modal-content">
          <MapContainer center={[latitude, longitude]} zoom={13} scrollWheelZoom={true} style={{ height: '400px' }}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[latitude, longitude]}>
              <Popup>
                This is the location of the restaurant.
              </Popup>
            </Marker>
          </MapContainer>
        </div>
        <button className="modal-close is-large" aria-label="close" onClick={handleCloseModal}></button>
      </div>
    );
  }


  export default Map;
