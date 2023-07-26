import React, { useState } from 'react';
import Modal from 'react-modal';
import INVENTARIO from './INVENTARIO';
import RegistroProveedor from './registroproveedor';
import imagenis from "../src/imagen/3.0.png"
import act from "../src/imagen/2.0.png"





const MainPage = () => {
  const [showInventoryModal, setShowInventoryModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  const handleCardClick = (cardNumber) => {
    if (cardNumber === 1) {
      setShowInventoryModal(true);
    } else if (cardNumber === 2) {
      setShowRegisterModal(true);
    }
  };

  return (
    <div className="main-page">
      <h1 className="main-title">STUGAR JEANS</h1>
      <div className="card-container">
        <button
          className="card"
          onClick={() => handleCardClick(1)}
          style={{ backgroundColor: '#1FAB89' }}
        >
          <img src={imagenis} alt="Inventario" />
          <h2>INVENTARIO</h2>
          <button onClick={() => handleCardClick(1)}>ENTRAR</button>
        </button>
        <button
          className="card"
          onClick={() => handleCardClick(2)}
          style={{ backgroundColor: '#1FAB89' }}
        >
          <img src={act} alt="registropreoveedor" />
          <h2>PROVEEDOR</h2>
          <button onClick={() => handleCardClick(2)}>ENTRAR</button>
        </button>
      </div>

      <Modal
        isOpen={showInventoryModal}
        onRequestClose={() => setShowInventoryModal(false)}
        contentLabel="INVENTARIO"
      >
        <INVENTARIO />
      </Modal>

      <Modal
        isOpen={showRegisterModal}
        onRequestClose={() => setShowRegisterModal(false)}
        contentLabel="PROVEEDOR"
      >
        <RegistroProveedor />
      </Modal>
    </div>
  );
};

export default MainPage;
