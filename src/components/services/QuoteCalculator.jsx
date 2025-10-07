import React, { useState } from 'react';
import './QuoteCalculator.css';

const QuoteCalculator = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    pickup: '',
    destination: '',
    date: '',
    time: '',
    passengers: '1',
    vehicleType: 'standard',
    options: []
  });
  
  const [quote, setQuote] = useState(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const vehicleTypes = [
    { id: 'standard', name: 'Véhicule Standard', price: 1.5, icon: '🚗' },
    { id: 'premium', name: 'Véhicule Premium', price: 2, icon: '🚙' },
    { id: 'luxury', name: 'Véhicule de Luxe', price: 3, icon: '🏎️' },
    { id: 'van', name: 'Van (6-8 places)', price: 3.5, icon: '🚐' }
  ];

  const optionalServices = [
    { id: 'wait', name: 'Attente (par tranche de 15min)', price: 8, icon: '⏱️' },
    { id: 'luggage', name: 'Bagages supplémentaires', price: 5, icon: '🧳' },
    { id: 'child_seat', name: 'Siège enfant', price: 10, icon: '👶' },
    { id: 'wifi', name: 'WiFi à bord', price: 0, icon: '📶' },
    { id: 'water', name: 'Bouteilles d\'eau', price: 0, icon: '💧' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleOptionToggle = (optionId) => {
    setFormData(prev => ({
      ...prev,
      options: prev.options.includes(optionId)
        ? prev.options.filter(id => id !== optionId)
        : [...prev.options, optionId]
    }));
  };

  const calculateQuote = async () => {
    if (!formData.pickup || !formData.destination) {
      alert('Veuillez renseigner les adresses de départ et d\'arrivée');
      return;
    }

    setIsCalculating(true);
    
    // Simulation du calcul (remplacer par API réelle)
    setTimeout(() => {
      const baseDistance = Math.random() * 50 + 5; // 5-55 km
      const baseFare = 15; // Prise en charge
      const kmRate = vehicleTypes.find(v => v.id === formData.vehicleType).price;
      const distancePrice = baseDistance * kmRate;
      
      const optionsPrice = formData.options.reduce((total, optionId) => {
        const option = optionalServices.find(o => o.id === optionId);
        return total + (option ? option.price : 0);
      }, 0);
      
      const totalPrice = baseFare + distancePrice + optionsPrice;
      
      setQuote({
        distance: Math.round(baseDistance * 10) / 10,
        duration: Math.round(baseDistance * 1.5), // minutes approximatives
        baseFare,
        distancePrice: Math.round(distancePrice * 100) / 100,
        optionsPrice,
        totalPrice: Math.round(totalPrice * 100) / 100,
        vehicleType: vehicleTypes.find(v => v.id === formData.vehicleType)
      });
      
      setIsCalculating(false);
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="calculator-overlay">
      <div className="calculator-modal">
        <div className="calculator-header">
          <h2>Calculateur de Devis</h2>
          <button className="close-button" onClick={onClose}>✕</button>
        </div>
        
        <div className="calculator-content">
          <div className="form-section">
            <h3>Trajet</h3>
            <div className="form-group">
              <label>Adresse de départ</label>
              <input
                type="text"
                placeholder="Entrez l'adresse de départ"
                value={formData.pickup}
                onChange={(e) => handleInputChange('pickup', e.target.value)}
              />
            </div>
            
            <div className="form-group">
              <label>Destination</label>
              <input
                type="text"
                placeholder="Entrez la destination"
                value={formData.destination}
                onChange={(e) => handleInputChange('destination', e.target.value)}
              />
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label>Date</label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => handleInputChange('date', e.target.value)}
                />
              </div>
              
              <div className="form-group">
                <label>Heure</label>
                <input
                  type="time"
                  value={formData.time}
                  onChange={(e) => handleInputChange('time', e.target.value)}
                />
              </div>
            </div>
            
            <div className="form-group">
              <label>Nombre de passagers</label>
              <select
                value={formData.passengers}
                onChange={(e) => handleInputChange('passengers', e.target.value)}
              >
                {[1,2,3,4,5,6,7,8].map(num => (
                  <option key={num} value={num}>{num} passager{num > 1 ? 's' : ''}</option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="form-section">
            <h3>Type de véhicule</h3>
            <div className="vehicle-types">
              {vehicleTypes.map(vehicle => (
                <div
                  key={vehicle.id}
                  className={`vehicle-option ${formData.vehicleType === vehicle.id ? 'selected' : ''}`}
                  onClick={() => handleInputChange('vehicleType', vehicle.id)}
                >
                  <span className="vehicle-icon">{vehicle.icon}</span>
                  <div className="vehicle-info">
                    <span className="vehicle-name">{vehicle.name}</span>
                    <span className="vehicle-rate">{vehicle.price}€/km</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="form-section">
            <h3>Services optionnels</h3>
            <div className="optional-services">
              {optionalServices.map(service => (
                <div
                  key={service.id}
                  className={`service-option ${formData.options.includes(service.id) ? 'selected' : ''}`}
                  onClick={() => handleOptionToggle(service.id)}
                >
                  <span className="service-icon">{service.icon}</span>
                  <div className="service-info">
                    <span className="service-name">{service.name}</span>
                    <span className="service-price">
                      {service.price === 0 ? 'Gratuit' : `+${service.price}€`}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {quote && (
            <div className="quote-result">
              <h3>Devis estimé</h3>
              <div className="quote-details">
                <div className="quote-info">
                  <span className="info-icon">📍</span>
                  <span>Distance: {quote.distance} km</span>
                </div>
                <div className="quote-info">
                  <span className="info-icon">⏱️</span>
                  <span>Durée: ~{quote.duration} min</span>
                </div>
                <div className="quote-info">
                  <span className="info-icon">{quote.vehicleType.icon}</span>
                  <span>{quote.vehicleType.name}</span>
                </div>
              </div>
              
              <div className="price-breakdown">
                <div className="price-line">
                  <span>Prise en charge</span>
                  <span>{quote.baseFare}€</span>
                </div>
                <div className="price-line">
                  <span>Distance ({quote.distance} km)</span>
                  <span>{quote.distancePrice}€</span>
                </div>
                {quote.optionsPrice > 0 && (
                  <div className="price-line">
                    <span>Options</span>
                    <span>{quote.optionsPrice}€</span>
                  </div>
                )}
                <div className="price-line total">
                  <span>Total estimé</span>
                  <span>{quote.totalPrice}€</span>
                </div>
              </div>
            </div>
          )}
        </div>
        
        <div className="calculator-footer">
          <button
            className="calculate-btn"
            onClick={calculateQuote}
            disabled={isCalculating}
          >
            {isCalculating ? 'Calcul en cours...' : '💰 Calculer le devis'}
          </button>
          
          {quote && (
            <button className="reserve-btn">
              📞 Réserver ce trajet
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuoteCalculator;