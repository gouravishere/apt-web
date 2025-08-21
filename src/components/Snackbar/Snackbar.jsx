import React, { useState, useEffect } from 'react';

// Snackbar Component
const Snackbar = ({ message, type, onClose, duration = 5000 }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
        if (onClose) onClose(); // Trigger the callback when the snackbar closes
      }, duration);

      return () => clearTimeout(timer); // Cleanup timeout on component unmount
    }
  }, [message, duration, onClose]);

  return (
    visible && (
      <div
        className={`snackbar ${type === 'error' ? 'bg-red-600' : 'bg-green-600'} text-white p-3 rounded-md fixed bottom-5 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-300`}
      >
       <div className="flex justify-between items-center">
          <span className="flex-1">{message}</span>  {/* Use flex-1 to make message take available space */} 
          <span onClick={onClose} className="ml-3 text-white cursor-pointer" >✕</span>
        </div>
      </div>
    )
  );
};

export default Snackbar;
