import React, { useState, useEffect } from 'react';
import '../styles/Usercreated.css';

const Usercreated = ({ onClose, message }) => {
  const [isModalOpen, setIsModalOpen] = useState(true);

  useEffect(() => {
    document.body.style.overflow = isModalOpen ? 'hidden' : 'auto';

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isModalOpen]);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    onClose();
  };

  return (
    <>
      {isModalOpen && (
        <div className="modal-overlay active">
          <div className="modal-content">
            <h1>{message}</h1>
            <button onClick={handleCloseModal}>Aceptar</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Usercreated;
