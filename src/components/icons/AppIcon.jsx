import React from 'react';
import './AppIcon.css';

const AppIcon = ({ name, icon, color, onClick, isDock = false }) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <div 
      className={`app-icon ${isDock ? 'app-icon--dock' : ''} ios-pressable hardware-accelerated`}
      onClick={handleClick}
      style={{ '--app-color': color }}
    >
      <div className="app-icon-wrapper">
        <div className="app-icon-background">
          <span className="app-icon-symbol">{icon}</span>
        </div>
        {!isDock && <span className="app-name">{name}</span>}
      </div>
    </div>
  );
};

export default AppIcon;