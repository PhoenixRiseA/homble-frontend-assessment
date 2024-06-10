import React, { useState } from "react";
import './Alert.css';
const DismissibleAlert = ({ type, message }) => {
  const [visible, setVisible] = useState(true);

  if (!visible) {
    return null;
  }

  return (
    <div className="alert-wrapper">
      <div
        className={`alert alert-${type} alert-dismissible fade show fit-content `}
        role="alert"
      >
        {message}
        <button
          type="button"
          className="btn-close"
          aria-label="Close"
          onClick={() => setVisible(false)}
        ></button>
      </div>
    </div>
  );
};

export default DismissibleAlert;
