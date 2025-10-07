# VTCv2 📱

Interface iOS authentique pour VTCLand - Application de réservation VTC avec expérience utilisateur native iPhone.

## 🚀 Live Demo

**🔗 Testez sur votre téléphone :** https://lem9700.github.io/VTCv2/

## ✨ Fonctionnalités

- **Interface iPhone complète** avec status bar dynamique (heure, batterie, réseau)
- **Grille d'applications N×M responsive** (4×3 portrait, 3×5 landscape)
- **Services VTC intégrés** : appel, SMS, WhatsApp, email direct
- **Chatbot de réservation** avec FAQ intelligente et API hooks
- **Calendrier de réservations** avec visualisation temps réel
- **Calculatrice de devis** interactive
- **Toast notifications** avec animations fluides
- **Détection d'appareil** (iPhone, Android, notch, Dynamic Island)
- **Animations d'orientation** fluides
- **Tests unitaires** complets

## 🛠 Technologies

- **React 19** + **Vite 7**
- **CSS Grid/Flexbox** avec variables CSS
- **Web APIs** : Battery, Network Information, Device Detection
- **Vitest + Testing Library** pour les tests
- **GitHub Pages** pour le déploiement

## 📱 Test sur téléphone

1. **Ouvrez sur votre téléphone :** https://lem9700.github.io/VTCv2/
2. **Ajoutez à l'écran d'accueil** (bouton Partager > Ajouter à l'écran d'accueil)
3. **Expérience native** : l'interface occupe tout l'écran comme une vraie app iPhone

## 🔧 Installation locale

```bash
# Cloner le repository
git clone https://github.com/LeM9700/VTCv2.git
cd VTCv2

# Installer les dépendances
npm install

# Lancer en développement
npm run dev
```

## 📦 Build & Deploy

```bash
# Build pour production
npm run build

# Déployer sur GitHub Pages
npm run deploy
```

## 🧪 Tests

```bash
# Lancer les tests
npm test

# Tests avec couverture
npm run test -- --coverage
```

## 📱 Compatibilité

- **iOS Safari** : iPhone SE, 12/13/14/15 (toutes tailles)
- **Android Chrome** : Samsung Galaxy, Google Pixel
- **Desktop** : Chrome, Firefox, Safari, Edge
- **PWA Ready** : Ajout à l'écran d'accueil supporté

## 🎨 Personnalisation

Variables CSS dans `:root` pour ajuster la grille :
- `--rows` : Nombre de lignes (défaut: 4)
- `--cols` : Nombre de colonnes (défaut: 3)
- `--gap` : Espacement entre icônes
- `--icon-size` : Taille des icônes

## 📄 Documentation

- [Guide grille iOS](iOS-Grid-Documentation.md)
- [Améliorations interface](INTERFACE-UPGRADES.md)
- [Instructions Copilot](.github/copilot-instructions.md)
