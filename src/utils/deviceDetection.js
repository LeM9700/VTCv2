// Détection avancée des modèles de téléphones
export const detectDevice = () => {
  const userAgent = navigator.userAgent;
  const screen = window.screen;
  const devicePixelRatio = window.devicePixelRatio || 1;
  
  // Dimensions d'écran avec device pixel ratio
  const physicalWidth = screen.width * devicePixelRatio;
  const physicalHeight = screen.height * devicePixelRatio;
  
  const device = {
    type: 'unknown',
    model: 'generic',
    hasNotch: false,
    hasDynamicIsland: false,
    isIOS: /iPhone|iPad|iPod|Macintosh/.test(userAgent),
    isAndroid: /Android/.test(userAgent),
    pixelRatio: devicePixelRatio,
    safeAreaTop: 0,
    safeAreaBottom: 0
  };

  // iPhone 15 Pro / 14 Pro - Dynamic Island
  if ((physicalWidth === 1179 && physicalHeight === 2556) || 
      (physicalWidth === 1290 && physicalHeight === 2796)) {
    device.type = 'iphone';
    device.model = 'iphone-15-pro';
    device.hasDynamicIsland = true;
    device.safeAreaTop = 54;
    device.safeAreaBottom = 34;
  }
  
  // iPhone 15 / 14 / 13 / 12 - Notch (1170x2532)
  else if (physicalWidth === 1170 && physicalHeight === 2532) {
    device.type = 'iphone';
    device.model = 'iphone-standard';
    device.hasNotch = true;
    device.safeAreaTop = 47;
    device.safeAreaBottom = 34;
  }
  
  // iPhone SE 3rd gen
  else if (physicalWidth === 750 && physicalHeight === 1334) {
    device.type = 'iphone';
    device.model = 'iphone-se';
    device.safeAreaTop = 20;
    device.safeAreaBottom = 0;
  }
  
  // Samsung Galaxy S24/S23
  else if (physicalWidth >= 1080 && physicalHeight >= 2340 && device.isAndroid) {
    device.type = 'android';
    device.model = 'samsung-galaxy-s24';
    device.safeAreaTop = 32;
    device.safeAreaBottom = 20;
  }
  
  // Google Pixel 8/7
  else if (physicalWidth >= 1080 && physicalHeight >= 2400 && device.isAndroid && userAgent.includes('Pixel')) {
    device.type = 'android';
    device.model = 'google-pixel';
    device.safeAreaTop = 28;
    device.safeAreaBottom = 16;
  }
  
  // Generic large phone
  else if (physicalWidth >= 1080 && physicalHeight >= 1920) {
    device.type = device.isIOS ? 'iphone' : 'android';
    device.model = 'large-phone';
    device.safeAreaTop = device.isIOS ? 44 : 24;
    device.safeAreaBottom = device.isIOS ? 34 : 16;
  }
  
  // Generic small phone
  else {
    device.type = device.isIOS ? 'iphone' : 'android';
    device.model = 'small-phone';
    device.safeAreaTop = device.isIOS ? 20 : 24;
    device.safeAreaBottom = device.isIOS ? 0 : 16;
  }

  return device;
};

// Applique les styles CSS custom properties basés sur le device
export const applyDeviceStyles = (device) => {
  const root = document.documentElement;
  
  root.style.setProperty('--safe-area-top', `${device.safeAreaTop}px`);
  root.style.setProperty('--safe-area-bottom', `${device.safeAreaBottom}px`);
  root.style.setProperty('--device-pixel-ratio', device.pixelRatio);
  
  // Classes CSS pour cibler des modèles spécifiques
  document.body.className = `device-${device.type} model-${device.model}`;
  
  if (device.hasNotch) document.body.classList.add('has-notch');
  if (device.hasDynamicIsland) document.body.classList.add('has-dynamic-island');
};

// Gestion des changements d'orientation avec animation
export const handleOrientationChange = () => {
  const handleChange = () => {
    document.body.classList.add('orientation-changing');
    
    // Retirer la classe après l'animation
    setTimeout(() => {
      document.body.classList.remove('orientation-changing');
    }, 500);
    
    // Re-appliquer les styles de device après le changement
    const device = detectDevice();
    applyDeviceStyles(device);
  };
  
  // Écouter les changements d'orientation
  window.addEventListener('orientationchange', handleChange);
  window.addEventListener('resize', handleChange);
  
  return () => {
    window.removeEventListener('orientationchange', handleChange);
    window.removeEventListener('resize', handleChange);
  };
};