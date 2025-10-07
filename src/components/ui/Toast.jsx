import React from 'react';
import './Toast.css';

const Toast = ({ text = '' }) => {
  return (
    <div className="vtc-toast">
      <div className="vtc-toast-inner">{text}</div>
    </div>
  );
};

export default Toast;
