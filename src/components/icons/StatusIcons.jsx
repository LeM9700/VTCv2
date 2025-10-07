import React from 'react';

// Pixel-perfect wifi icon (simplified)
export const WifiIcon = ({ className = '' }) => (
  <svg className={className} width="18" height="12" viewBox="0 0 18 12" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
    <path d="M1.5 4.2C6 0.5 12 0.5 16.5 4.2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    <path d="M4.2 6.7C6.6 4.3 11.4 4.3 13.8 6.7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    <path d="M7.8 9.6C9 8.4 9.6 8.4 10.8 9.6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
  </svg>
);

// Battery icon with fill rect; accepts 'level' prop (0..1)
export const BatteryIcon = ({ className = '', level = null, charging = false }) => {
  // level null => unknown (show outline only)
  const pct = level === null ? 0 : Math.max(0, Math.min(1, level));
  const fillWidth = Math.round(pct * 14); // inner width (max 14)
  const fillColor = pct > 0.2 ? '#FFFFFF' : '#FF3B30';
  return (
    <svg className={className} width="22" height="12" viewBox="0 0 22 12" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <rect x="0.8" y="2" width="16" height="8" rx="2" stroke="currentColor" strokeWidth="1.2" fill="none" />
      <rect x="17.5" y="4" width="1.8" height="4" rx="0.6" stroke="currentColor" strokeWidth="1" fill="none" />
      {/* inner fill */}
      {level !== null && (
        <rect x={1.6} y={3} width={fillWidth} height={6} rx="1" fill={fillColor} style={{ transition: 'width 400ms ease, fill 300ms ease' }} />
      )}
      {charging && (
        <path d="M9 2.5L7 6h2v3L11 6H9z" fill="#FFD60A" />
      )}
    </svg>
  );
};

export const ChargingIcon = ({ className = '' }) => (
  <svg className={className} width="12" height="16" viewBox="0 0 12 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
    <path d="M6.5 0L2.5 8h3v8L9.5 8h-3L6.5 0z" fill="currentColor" />
  </svg>
);

export const SignalBars = ({ level = 4, className = '' }) => {
  const heights = [3,6,9,12];
  return (
    <svg className={className} width="18" height="12" viewBox="0 0 18 12" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      {heights.map((h, i) => (
        <rect key={i} x={i*4} y={12 - h} width="3" height={h} rx="0.6" fill="currentColor" opacity={i < level ? 1 : 0.25} />
      ))}
    </svg>
  );
};

export default WifiIcon;
