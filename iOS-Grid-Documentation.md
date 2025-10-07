# Documentation Grille iOS N×M

## Configuration
Ajustez les variables CSS dans `:root` pour modifier la grille :
- `--rows` : Nombre de lignes (N)
- `--cols` : Nombre de colonnes (M)  
- `--gap` : Espacement entre icônes
- `--icon-size` : Taille des icônes

## Test en DevTools
1. Ouvrir DevTools → Device Simulation
2. Tester iPhone SE (375×667), iPhone 14 (390×844), iPad
3. Changer orientation portrait/landscape
4. Vérifier focus clavier (Tab/Shift+Tab)
5. Redimensionner la fenêtre pour tester le responsive

## Exemple HTML

```html
<div class="phone-screen">
  <div class="status-bar">
    <span class="time">9:41</span>
    <div class="battery">100%</div>
  </div>
  
  <div class="home-screen" style="--rows: 4; --cols: 3;">
    <div class="apps-container">
      <div class="apps-grid">
        <!-- 4×3 = 12 cellules -->
        <div class="app-icon">App 1</div>
        <div class="app-icon">App 2</div>
        <div class="app-icon">App 3</div>
        <div class="apps-grid-placeholder"></div>
        <!-- ... autres cellules + placeholders ... -->
      </div>
    </div>
    
    <div class="dock">
      <div class="dock-apps">
        <div class="app-icon">Dock 1</div>
        <div class="app-icon">Dock 2</div>
      </div>
    </div>
  </div>
</div>
```

## Exemple React (N=4, M=3)

```jsx
const iOSHomeScreen = ({ rows = 4, cols = 3, apps = [] }) => {
  const TOTAL_CELLS = rows * cols;
  const gridItems = [...apps];
  
  // Remplir avec placeholders
  while (gridItems.length < TOTAL_CELLS) {
    gridItems.push({ id: `placeholder-${gridItems.length}`, isPlaceholder: true });
  }
  
  return (
    <div className="home-screen" style={{'--rows': rows, '--cols': cols}}>
      <div className="apps-container">
        <div className="apps-grid">
          {gridItems.slice(0, TOTAL_CELLS).map((app) => 
            app.isPlaceholder ? (
              <div key={app.id} className="apps-grid-placeholder" />
            ) : (
              <AppIcon key={app.id} {...app} />
            )
          )}
        </div>
      </div>
    </div>
  );
};
```

La grille occupe exactement tout l'espace disponible entre status bar et dock, avec N lignes × M colonnes réparties uniformément.