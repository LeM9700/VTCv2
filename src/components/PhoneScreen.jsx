import React, { useEffect, useState } from 'react';
import HomeScreen from './HomeScreen';
import './PhoneScreen.css';
import { WifiIcon, BatteryIcon, ChargingIcon, SignalBars } from './icons/StatusIcons';
import { detectDevice, applyDeviceStyles, handleOrientationChange } from '../utils/deviceDetection';

const PhoneScreen = () => {
  const [timeString, setTimeString] = useState('');
  const [batteryLevel, setBatteryLevel] = useState(null); // 0..1
  const [charging, setCharging] = useState(false);
  const [networkStatus, setNetworkStatus] = useState({ online: true, type: 'wifi' });

  // Update time every minute
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      // Format like iOS (9:41)
      setTimeString(`${hours}:${minutes.toString().padStart(2, '0')}`);
    };

    updateTime();
    const timer = setInterval(updateTime, 60 * 1000);
    return () => clearInterval(timer);
  }, []);

  // Battery API (with fallbacks)
  useEffect(() => {
    let cleanup = null;
    const handleBattery = (bat) => {
      const update = () => {
        setBatteryLevel(bat.level);
        setCharging(bat.charging);
      };
      update();
      bat.addEventListener('levelchange', update);
      bat.addEventListener('chargingchange', update);
      return () => {
        bat.removeEventListener('levelchange', update);
        bat.removeEventListener('chargingchange', update);
      };
    };

    if (navigator.getBattery) {
      navigator.getBattery().then((bat) => {
        cleanup = handleBattery(bat);
      }).catch(() => {
        setBatteryLevel(null);
      });
    } else {
      // Fallback: attempt to read from prefixed API or leave null
      setBatteryLevel(null);
    }

    return () => {
      if (cleanup) cleanup();
    };
  }, []);

  // Network status
  useEffect(() => {
    const updateNetwork = () => {
      const online = navigator.onLine;
      // The Network Information API is experimental; check for navigator.connection
      const conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
      const type = conn && conn.effectiveType ? conn.effectiveType : (online ? 'wifi' : 'offline');
      setNetworkStatus({ online, type });
    };

    updateNetwork();
    window.addEventListener('online', updateNetwork);
    window.addEventListener('offline', updateNetwork);
    if (navigator.connection) {
      navigator.connection.addEventListener('change', updateNetwork);
    }
    return () => {
      window.removeEventListener('online', updateNetwork);
      window.removeEventListener('offline', updateNetwork);
      if (navigator.connection) {
        navigator.connection.removeEventListener('change', updateNetwork);
      }
    };
  }, []);

  // detect iOS (for Safari fallbacks)
  const isIOS = typeof navigator !== 'undefined' && /iP(hone|od|ad)|Macintosh/.test(navigator.userAgent) && !!navigator.maxTouchPoints;

  // Device detection and setup
  useEffect(() => {
    const device = detectDevice();
    applyDeviceStyles(device);
    
    const cleanup = handleOrientationChange();
    return cleanup;
  }, []);

  // Helper to render signal bars based on connection type
  const renderSignalBars = () => {
    const bars = [false, false, false, false];
    if (!networkStatus.online) return bars;
    // Map common effectiveType values to number of bars
    const t = (navigator.connection && navigator.connection.effectiveType) || networkStatus.type;
    if (t.includes('2g')) {
      bars[0] = true;
    } else if (t.includes('3g')) {
      bars[0] = bars[1] = true;
    } else if (t.includes('4g') || t === 'wifi' || t === 'ethernet') {
      bars[0] = bars[1] = bars[2] = bars[3] = true;
    } else {
      // default: show 3 bars
      bars[0] = bars[1] = bars[2] = true;
    }
    return bars;
  };

  const bars = renderSignalBars();

  return (
    <div className="phone-frame">
      <div className="phone-screen">
        <div className="status-bar">
          <div className="status-left">
            <span className="time">{timeString}</span>
          </div>
          <div className="status-right">
            <div className="battery-container">
              <div className={`signal-svg`} aria-hidden>
                {/* prefer SVG signal for consistent cross-browser rendering */}
                <SignalBars level={bars.filter(Boolean).length} />
              </div>
              <div
                className="network-text"
                title={networkStatus.online ? `Réseau: ${networkStatus.type}` : 'Hors-ligne'}
              >
                {networkStatus.online
                  ? (networkStatus.type ? networkStatus.type.toUpperCase() : (isIOS ? '—' : 'UNKNOWN'))
                  : 'OFF'}
              </div>
                <div className={`battery-icon ${isIOS ? 'ios-fallback' : ''}`} aria-hidden>
                  <BatteryIcon level={batteryLevel} charging={charging} />
                </div>
                <div
                  className={`battery-text ${isIOS && batteryLevel === null ? 'ios-fallback' : ''}`}
                  title={batteryLevel === null && isIOS ? 'Niveau batterie indisponible sur Safari iOS' : (batteryLevel === null ? 'Niveau batterie indisponible' : `${Math.round(batteryLevel*100)}%`) }
                >
                  {batteryLevel === null ? '--' : Math.round(batteryLevel * 100) + '%'}
                  {charging && <span className="charging-icon"><ChargingIcon /></span>}
                </div>
            </div>
          </div>
        </div>
        
        <HomeScreen />
        
        <div className="home-indicator"></div>
      </div>
    </div>
  );
};

export default PhoneScreen;