import React, { useState } from 'react';
import AppIcon from './icons/AppIcon';
import VTCLandChatbot from './services/VTCLandChatbot';
import ReservationCalendar from './services/ReservationCalendar';
import QuoteCalculator from './services/QuoteCalculator';
import Toast from './ui/Toast';
import './HomeScreen.css';

const HomeScreen = () => {
  const [showChatbot, setShowChatbot] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [showCalculator, setShowCalculator] = useState(false);
  const [toast, setToast] = useState(null);
  const [reservations, setReservations] = useState([]);

  const apps = [
    {
      id: 'phone',
      name: 'Téléphone',
      icon: '📞',
      color: '#4ACD56',
      action: () => window.open('tel:+33783699229')
    },
    {
      id: 'messages',
      name: 'Messages',
      icon: '💬',
      color: '#4ACD56',
      action: () => window.open('sms:+33783699229?body=Bonjour, je souhaiterais réserver un VTC.')
    },
    {
      id: 'whatsapp',
      name: 'WhatsApp',
      icon: '📱',
      color: '#25D366',
      action: () => window.open('https://wa.me/33783699229?text=Bonjour, je souhaiterais réserver un VTC.')
    },
    {
      id: 'mail',
      name: 'Mail',
      icon: '✉️',
      color: '#007AFF',
      action: () => window.open('mailto:vtcland.contact@gmail.com?subject=Demande de réservation VTC&body=Bonjour, je souhaiterais réserver un VTC.')
    },
    {
      id: 'vtcland',
      name: 'VTCLand',
      icon: '🚗',
      color: '#FF9500',
      action: () => setShowChatbot(true)
    },
    {
      id: 'calendar',
      name: 'Agenda',
      icon: '📅',
      color: '#FF3B30',
      action: () => setShowCalendar(true)
    },
    {
      id: 'calculator',
      name: 'Calculatrice',
      icon: '🔢',
      color: '#48484A',
      action: () => setShowCalculator(true)
    },
    {
      id: 'safari',
      name: 'Safari',
      icon: '🌐',
      color: '#007AFF',
      action: () => {
        // Ouvrir le site WordPress
        console.log('Ouverture du site WordPress...');
        // TODO: Remplacer par l'URL du site WordPress
        window.open('https://gold-eagle-452961.hostingersite.com/', '_blank');
      }
    },
    {
      id: 'google',
      name: 'Google',
      icon: '🔍',
      color: '#EA4335',
      action: () => {
        // Ouvrir la page Google My Business pour laisser un avis
        console.log('Ouverture de Google My Business...');
        // TODO: Remplacer par l'URL de la page Google My Business
        window.open('https://www.google.com/search?sca_esv=579135331b5c96bb&rlz=1C1CHBD_enFR1039FR1039&sxsrf=AE3TifOB08cVT1F0LyZh0a9Mu5GrwMg_ug:1759824359690&si=AMgyJEtREmoPL4P1I5IDCfuA8gybfVI2d5Uj7QMwYCZHKDZ-E4Pu_-TRGmKOYxXnYwS17CvHHkjT72WKrzzZuTlnq4Og4tLo9k3K0OvOZarx2wQd4VdAAw9Ii4RdXQceH4veWLNxEEb1hZw2yp6kigqrA8iwJW-dQ-qCpo6rF2q6Z4oVabwCNXM%3D&q=VTCLAND+-+VTC+Montpellier+-+Chauffeurs+priv%C3%A9s+Avis&sa=X&ved=2ahUKEwjmgM7O0JGQAxVeUqQEHWjDLAMQ0bkNegQIPhAE&biw=1920&bih=911&dpr=1', '_blank');
      }
    }
  ];

  // Configuration de la grille iOS (N×M)
  const ROWS = 4;
  const COLS = 3;
  const TOTAL_CELLS = ROWS * COLS;
  
  // Générer les placeholders pour les cellules vides
  const gridItems = [...apps];
  while (gridItems.length < TOTAL_CELLS) {
    gridItems.push({ id: `placeholder-${gridItems.length}`, isPlaceholder: true });
  }

  return (
    <div className="home-screen" style={{'--rows': ROWS, '--cols': COLS}}>
      <div className="apps-container">
        <div className="apps-grid">
          {gridItems.slice(0, TOTAL_CELLS).map((app) => 
            app.isPlaceholder ? (
              <div key={app.id} className="apps-grid-placeholder" />
            ) : (
              <AppIcon
                key={app.id}
                name={app.name}
                icon={app.icon}
                color={app.color}
                onClick={app.action}
              />
            )
          )}
        </div>
      </div>
      
      <div className="dock">
        <div className="dock-apps">
          {/* Applications favorites dans le dock */}
          <AppIcon
            name="VTCLand"
            icon="🚗"
            color="#FF9500"
            onClick={() => setShowChatbot(true)}
            isDock={true}
          />
          <AppIcon
            name="Téléphone"
            icon="📞"
            color="#4ACD56"
            onClick={() => window.open('tel:+33123456789')}
            isDock={true}
          />
          <AppIcon
            name="Messages"
            icon="💬"
            color="#4ACD56"
            onClick={() => window.open('sms:+33123456789?body=Bonjour, je souhaiterais réserver un VTC.')}
            isDock={true}
          />
          <AppIcon
            name="Safari"
            icon="🌐"
            color="#007AFF"
            onClick={() => window.open('https://vtcland.com', '_blank')}
            isDock={true}
          />
        </div>
      </div>
      
      {/* Modales des services */}
      <VTCLandChatbot 
        isOpen={showChatbot} 
        onClose={() => setShowChatbot(false)} 
        onOpenCalculator={() => setShowCalculator(true)}
        onOpenCalendar={() => setShowCalendar(true)}
        onExecuteReservation={(reservation) => {
          console.log('Reservation exécutée:', reservation);
          setReservations(prev => [{ id: Date.now(), ...reservation }, ...prev]);
          setToast({ text: 'Réservation ajoutée', timeout: 3500 });
          setTimeout(() => setToast(null), 3500);
          setShowChatbot(false);
          setShowCalendar(true);
        }}
      />
      <ReservationCalendar 
        isOpen={showCalendar} 
        onClose={() => setShowCalendar(false)} 
        reservations={reservations}
      />
      <QuoteCalculator 
        isOpen={showCalculator} 
        onClose={() => setShowCalculator(false)} 
      />
    </div>
  );
};

export default HomeScreen;