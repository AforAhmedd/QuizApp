import React from "react";
import "./Styling/modal.css";
const Modal = ({ title, isOpen, onClose, body }) => {
  if (!isOpen) return null; // Don't render if the modal isn't open

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>{title}</h2>
          <button className="close-button" onClick={onClose}>
            ×
          </button>
        </div>
        <div className="modal-body">{body}</div>
      </div>
    </div>
  );
};

export default Modal;
