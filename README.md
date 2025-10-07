# VTCLand - Interface iPhone pour Services VTC

Une interface web développée en React qui reproduit visuellement l'écran d'accueil d'un iPhone, spécialement conçue pour les services de chauffeur privé (VTC).

## 🚗 Fonctionnalités

### Icônes iOS-Style pour Services VTC
- **📞 Téléphone** - Appel direct au service
- **💬 Messages** - SMS pré-écrit pour réservation  
- **📱 WhatsApp Business** - Chat WhatsApp avec message pré-défini
- **✉️ Mail** - Email pré-écrit pour demandes
- **🚗 VTCLand** - Chatbot de réservation intégré
- **📅 Agenda** - Gestion des réservations
- **🔢 Calculatrice** - Devis rapides
- **🌐 Safari** - Accès au site WordPress
- **🔍 Google** - Page Google My Business pour avis

### Design & UX
- **Esthétique Apple authentique** avec animations fluides
- **Interface tactile optimisée** pour tous les appareils
- **Responsive design** adaptatif
- **Effets visuels iOS** (ombres, reflets, animations)
- **Dock interactif** avec applications favorites

## 🛠️ Technologies

- **React 18** avec Vite
- **CSS3** avec animations avancées
- **Design System iOS** fidèle
- **Responsive Design** mobile-first
- **Optimisations performance** (hardware acceleration)

## 📱 Compatibilité

- ✅ iPhone (toutes tailles)
- ✅ Android (responsive)
- ✅ iPad & tablettes
- ✅ Desktop (simulation iPhone)
- ✅ Support haute résolution (Retina)

## 🚀 Installation & Utilisation

### Prérequis
- Node.js 20.19+ ou 22.12+
- npm ou yarn

### Installation
```bash
# Cloner le projet
git clone [url-du-repo]
cd vtclandV2

# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev

# Construire pour la production
npm run build
```

### Accès à l'application
- **Développement**: http://localhost:5173/
- **Production**: Déployer le dossier `dist/`

## ⚙️ Configuration

### Personnalisation des services
Modifier les actions dans `src/components/HomeScreen.jsx` :

```javascript
// Exemple pour personnaliser le numéro de téléphone
action: () => window.open('tel:+33123456789')

// Exemple pour personnaliser le message WhatsApp
action: () => window.open('https://wa.me/33123456789?text=Votre message')
```

### Intégration des services VTC
1. **Chatbot VTCLand** : Connecter à votre API dans `VTCLandChatbot.jsx`
2. **Système de réservation** : Intégrer votre backend dans `ReservationCalendar.jsx`
3. **Calculateur de prix** : Connecter votre API de devis dans `QuoteCalculator.jsx`

## 🎨 Personnalisation du design

### Couleurs et thème
Les couleurs sont définies dans les fichiers CSS avec des variables CSS :
```css
--app-color: #FF9500; /* Couleur de l'icône */
```

### Icônes personnalisées
Remplacer les emojis par des icônes SVG dans `AppIcon.jsx` pour un rendu plus professionnel.

## 📂 Structure du projet

```
src/
├── components/
│   ├── icons/           # Composants d'icônes
│   ├── services/        # Services VTC (chatbot, agenda, etc.)
│   ├── HomeScreen.jsx   # Écran d'accueil principal
│   └── PhoneScreen.jsx  # Simulateur iPhone
├── styles/
│   ├── App.css         # Styles globaux
│   ├── iOS-effects.css # Effets visuels iOS
│   └── responsive.css  # Media queries responsive
└── App.jsx             # Composant racine
```

## 🔧 Scripts disponibles

- `npm run dev` - Serveur de développement
- `npm run build` - Construction production
- `npm run preview` - Aperçu de la build
- `npm run lint` - Vérification ESLint

## 🚀 Déploiement

### Build de production
```bash
npm run build
```

### Déploiement recommandé
- **Netlify** (auto-deploy depuis Git)
- **Vercel** (optimisé pour React)
- **GitHub Pages** (configuration dans Actions)

## 🤝 Contribution

1. Fork du projet
2. Créer une branche feature (`git checkout -b feature/AmazingFeature`)
3. Commit des changements (`git commit -m 'Add AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 📞 Support

Pour toute question ou support :
- 📧 Email : contact@vtcland.com
- 🌐 Site web : https://vtcland.com
- 💬 WhatsApp : +33123456789

---

**VTCLand Interface iPhone** - Révolutionnez l'expérience client de votre service VTC avec une interface moderne et intuitive ! 🚗✨

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
