import React, { useState } from 'react';
import './VTCLandChatbot.css';

const VTCLandChatbot = ({ isOpen, onClose, onOpenCalculator, onOpenCalendar, onExecuteReservation }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Bonjour ! Je suis votre assistant VTCLand. Comment puis-je vous aider aujourd'hui ?",
      sender: 'bot',
      timestamp: new Date().toLocaleTimeString()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const quickReplies = [
    "Je veux réserver un VTC",
    "Demander un devis",
    "Voir mes réservations",
    "Contacter le service client"
  ];

  const [showReservationForm, setShowReservationForm] = useState(false);
  const [reservationForm, setReservationForm] = useState({ pickup: '', destination: '', date: '', time: '', passengers: '1' });

  // Basic keyword-based FAQ intent matcher
  const faqIntents = [
    { id: 'price', keywords: ['prix', 'tarif', 'devis', 'combien'], reply: "Nos tarifs dépendent de la distance et du temps. Voulez-vous un devis rapide ?" },
    { id: 'cancellation', keywords: ['annulation', 'annuler', 'changer'], reply: "Pour annuler ou modifier une réservation, vous pouvez nous contacter via le chat ou le téléphone. Souhaitez-vous que je vous mette en relation ?" },
    { id: 'luggage', keywords: ['bagage', 'bagages', 'valise'], reply: "Vous pouvez prendre des bagages standards. Pour des bagages volumineux merci de préciser le nombre pour qu'on vous envoie un véhicule adapté." },
    { id: 'delay', keywords: ['retard', 'attente', 'retarder'], reply: "En cas de retard, contactez notre support via le chat ou par téléphone; nous ajusterons la course." },
    { id: 'billing', keywords: ['facture', 'paiement', 'paiements'], reply: "Nous acceptons cartes et espèces. Vous recevrez une facture par email après la course si vous le souhaitez." }
  ];

  const matchFAQ = (text) => {
    const normalized = (text || '').toLowerCase();
    for (const intent of faqIntents) {
      for (const kw of intent.keywords) {
        if (normalized.includes(kw)) return intent;
      }
    }
    return null;
  };

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      const newMessage = {
        id: messages.length + 1,
        text: inputMessage,
        sender: 'user',
        timestamp: new Date().toLocaleTimeString()
      };
      
      setMessages([...messages, newMessage]);
      setInputMessage('');
      
      // Check for FAQ intents and simulate response
      const intent = matchFAQ(newMessage.text);
      setTimeout(() => {
        let botText = "Merci pour votre message. Un agent va traiter votre demande sous peu.";
        if (intent) botText = intent.reply;

        const botResponse = {
          id: messages.length + 2,
          text: botText,
          sender: 'bot',
          timestamp: new Date().toLocaleTimeString()
        };
        setMessages(prev => [...prev, botResponse]);

        // If intent is price, add a suggestion action
        if (intent && intent.id === 'price') {
          setMessages(prev => [...prev, { id: prev.length+1, text: 'Souhaitez-vous ouvrir la calculatrice de devis ?', sender: 'bot', timestamp: new Date().toLocaleTimeString(), suggestion: 'calculator' }]);
        }
      }, 800);
    }
  };

  const handleQuickReply = (reply) => {
    const newMessage = {
      id: messages.length + 1,
      text: reply,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString()
    };
    
    setMessages([...messages, newMessage]);
    
    // Réponse automatique basée sur la sélection
    setTimeout(() => {
      let botText = "";
      switch(reply) {
        case "Je veux réserver un VTC":
          botText = "Parfait ! Voulez-vous remplir un formulaire de réservation rapide ?";
          setShowReservationForm(true);
          break;
        case "Demander un devis":
          botText = "Je peux vous ouvrir la calculatrice de devis — souhaitez-vous l'ouvrir ?";
          break;
        case "Voir mes réservations":
          botText = "Je vous redirige vers votre agenda.";
          if (onOpenCalendar) onOpenCalendar();
          break;
        default:
          botText = "Je vous mets en relation avec notre service client.";
      }
      
      const botResponse = {
        id: messages.length + 2,
        text: botText,
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString()
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  const handleOpenCalculator = () => {
    if (onOpenCalculator) onOpenCalculator();
  };

  const handleOpenCalendar = () => {
    if (onOpenCalendar) onOpenCalendar();
  };

  const handleSubmitReservation = () => {
    // Basic validation
    if (!reservationForm.pickup || !reservationForm.destination || !reservationForm.date) {
      setMessages(prev => [...prev, { id: prev.length+1, text: 'Merci de renseigner au minimum le départ, la destination et la date.', sender: 'bot', timestamp: new Date().toLocaleTimeString() }]);
      return;
    }

    const reservation = { ...reservationForm };
    // Optionally POST to a backend if VITE_RESERVATION_API is provided
    const apiEndpoint = import.meta.env.VITE_RESERVATION_API;
    if (apiEndpoint) {
      setMessages(prev => [...prev, { id: prev.length+1, text: 'Envoi de la réservation au serveur...', sender: 'bot', timestamp: new Date().toLocaleTimeString() }]);
      fetch(apiEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reservation)
      }).then(async res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const body = await res.json();
        setMessages(prev => [...prev, { id: prev.length+1, text: 'Réservation confirmée par le serveur.', sender: 'bot', timestamp: new Date().toLocaleTimeString() }]);
        setShowReservationForm(false);
        if (onExecuteReservation) onExecuteReservation(body || reservation);
      }).catch(err => {
        console.error('Reservation API error', err);
        setMessages(prev => [...prev, { id: prev.length+1, text: 'Erreur lors de l’envoi au serveur. La réservation est enregistrée localement.', sender: 'bot', timestamp: new Date().toLocaleTimeString() }]);
        setShowReservationForm(false);
        if (onExecuteReservation) onExecuteReservation(reservation);
      });
    } else {
      setMessages(prev => [...prev, { id: prev.length+1, text: `Réservation enregistrée : ${reservation.pickup} → ${reservation.destination} le ${reservation.date} à ${reservation.time || '—'}.`, sender: 'bot', timestamp: new Date().toLocaleTimeString() }]);
      setShowReservationForm(false);
      if (onExecuteReservation) onExecuteReservation(reservation);
    }
  };

  if (!isOpen) return null;

  const updateReservationField = (field, value) => {
    setReservationForm(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="vtcland-chatbot-overlay">
      <div className="vtcland-chatbot">
        <div className="chatbot-header">
          <div className="chatbot-header-info">
            <div className="chatbot-avatar">🚗</div>
            <div className="chatbot-title">
              <h3>VTCLand Assistant</h3>
              <span className="status-online">En ligne</span>
            </div>
          </div>
          <button className="close-button" onClick={onClose}>✕</button>
        </div>

        <div className="chatbot-messages">
          {messages.map((message) => (
            <div key={message.id} className={`message ${message.sender}`}>
              <div className="message-bubble">
                <p>{message.text}</p>
                {message.suggestion === 'calculator' && (
                  <div className="message-suggestion">
                    <button className="suggestion-btn" onClick={() => { if (onOpenCalculator) onOpenCalculator(); }}>{'Ouvrir la calculatrice'}</button>
                  </div>
                )}
                {message.suggestion === 'calendar' && (
                  <div className="message-suggestion">
                    <button className="suggestion-btn" onClick={() => { if (onOpenCalendar) onOpenCalendar(); }}>{"Voir l'agenda"}</button>
                  </div>
                )}
                <span className="message-time">{message.timestamp}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="quick-replies">
          {quickReplies.map((reply, index) => (
            <button key={index} className="quick-reply-btn" onClick={() => handleQuickReply(reply)}>
              {reply}
            </button>
          ))}

          <div className="chatbot-ctas">
            <button className="cta" onClick={handleOpenCalculator}>Ouvrir la calculatrice</button>
            <button className="cta" onClick={handleOpenCalendar}>Voir l'agenda</button>
          </div>
        </div>

        {showReservationForm && (
          <div className="reservation-form">
            <input placeholder="Point de départ" value={reservationForm.pickup} onChange={e => updateReservationField('pickup', e.target.value)} />
            <input placeholder="Destination" value={reservationForm.destination} onChange={e => updateReservationField('destination', e.target.value)} />
            <input type="date" value={reservationForm.date} onChange={e => updateReservationField('date', e.target.value)} />
            <input type="time" value={reservationForm.time} onChange={e => updateReservationField('time', e.target.value)} />
            <select value={reservationForm.passengers} onChange={e => updateReservationField('passengers', e.target.value)}>
              <option value="1">1 passager</option>
              <option value="2">2 passagers</option>
              <option value="3">3 passagers</option>
              <option value="4">4 passagers</option>
            </select>
            <div className="reservation-actions">
              <button className="cta primary" onClick={handleSubmitReservation}>Confirmer la réservation</button>
              <button className="cta" onClick={() => setShowReservationForm(false)}>Annuler</button>
            </div>
          </div>
        )}

        <div className="chatbot-input">
          <input
            type="text"
            placeholder="Tapez votre message..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          <button onClick={handleSendMessage} className="send-button">➤</button>
        </div>
      </div>
    </div>
  );
};

export default VTCLandChatbot;