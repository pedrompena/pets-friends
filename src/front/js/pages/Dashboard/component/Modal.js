import React from "react";

export const Modal = ({ children, handleOpen }) => {
  return (
    <div className="modal position-fixed w-100 h-100 bg-dark bg-opacity-50 d-flex align-items-center justify-content-center">
      <div className="box position-relative">
        <i
          className="position-absolute close-modal fa-solid fa-xmark p-2 close-button"
          onClick={handleOpen}
        ></i>
        {children}
      </div>
    </div>
  );
};
