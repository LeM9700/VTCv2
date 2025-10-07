import React from 'react';
import './ReservationCalendar.css';

const ReservationCalendar = ({ isOpen, onClose, reservations: incomingReservations }) => {
  // Future feature: const [selectedDate, setSelectedDate] = useState(new Date());
  const sample = [
    {
      id: 1,
      date: '2024-10-08',
      time: '09:00',
      pickup: 'Aéroport Charles de Gaulle',
      destination: 'Paris Centre',
      status: 'confirmé',
      driver: 'Jean Dupont',
      vehicle: 'Mercedes Classe E'
    },
    {
      id: 2,
      date: '2024-10-10',
      time: '14:30',
      pickup: 'Gare de Lyon',
      destination: 'La Défense',
      status: 'en cours',
      driver: 'Marie Martin',
      vehicle: 'BMW Série 5'
    },
    {
      id: 3,
      date: '2024-10-12',
      time: '18:00',
      pickup: 'Hôtel Plaza Athénée',
      destination: 'Aéroport Orly',
      status: 'à confirmer',
      driver: 'Pierre Leblanc',
      vehicle: 'Audi A6'
    }
  ];

  const reservations = incomingReservations && incomingReservations.length ? incomingReservations : sample;

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmé': return '#4ACD56';
      case 'en cours': return '#FF9500';
      case 'à confirmer': return '#FF3B30';
      default: return '#8E8E93';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'confirmé': return '✅';
      case 'en cours': return '🚗';
      case 'à confirmer': return '⏳';
      default: return '📅';
    }
  };

  if (!isOpen) return null;

  return (
    <div className="calendar-overlay">
      <div className="calendar-modal">
        <div className="calendar-header">
          <h2>Mes Réservations</h2>
          <button className="close-button" onClick={onClose}>✕</button>
        </div>
        
        <div className="calendar-content">
          <div className="reservations-list">
            {reservations.map((reservation) => (
              <div key={reservation.id} className="reservation-card">
                <div className="reservation-header">
                  <div className="reservation-date">
                    <span className="date">{new Date(reservation.date).toLocaleDateString('fr-FR')}</span>
                    <span className="time">{reservation.time}</span>
                  </div>
                  <div 
                    className="reservation-status"
                    style={{ backgroundColor: getStatusColor(reservation.status) }}
                  >
                    <span className="status-icon">{getStatusIcon(reservation.status)}</span>
                    <span className="status-text">{reservation.status}</span>
                  </div>
                </div>
                
                <div className="reservation-route">
                  <div className="route-point pickup">
                    <div className="route-icon">📍</div>
                    <div className="route-text">
                      <span className="route-label">Départ</span>
                      <span className="route-address">{reservation.pickup}</span>
                    </div>
                  </div>
                  
                  <div className="route-line"></div>
                  
                  <div className="route-point destination">
                    <div className="route-icon">🎯</div>
                    <div className="route-text">
                      <span className="route-label">Arrivée</span>
                      <span className="route-address">{reservation.destination}</span>
                    </div>
                  </div>
                </div>
                
                <div className="reservation-details">
                  <div className="detail-item">
                    <span className="detail-icon">👤</span>
                    <span className="detail-text">{reservation.driver}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-icon">🚙</span>
                    <span className="detail-text">{reservation.vehicle}</span>
                  </div>
                </div>
                
                <div className="reservation-actions">
                  <button className="action-btn secondary">Modifier</button>
                  <button className="action-btn primary">Contacter</button>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="calendar-footer">
          <button className="new-reservation-btn">
            ➕ Nouvelle réservation
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReservationCalendar;