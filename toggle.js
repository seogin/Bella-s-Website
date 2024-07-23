// Array of themes with specific background and text color values
const themes = [
  { background: '#f8f8ff', text: '#303030', source: "./1x/black.png" },  // Default theme (Ghost White and Charcoal)
  { background: '#4a4a4a', text: '#bdbdbd', source: "./1x/gray.png" },    // Gray theme (Yellow and Blue Violet)
  { background: '#fc58bd', text: 'rgb(0, 0, 255)', source: "./1x/blue.png" },  // Pink theme (Hot Pink and White)
  { background: 'rgb(0, 0, 255)', text: '#fc7703', source: "./1x/orange.png" },  // Blue theme (Deep Sky Blue and Dodger Blue)
  { background: '#017a4a', text: 'rgb(187, 247, 208)', source: "./1x/mint.png" }, // Green theme (Light Green and Dark Green)
  { background: '#8a2be2', text: '#fcd303', source: "./1x/yellow.png" }, // Violet theme (Blue Violet and Gainsboro)
  { background: '#fc7703', text: 'rgb(0, 0, 255)', source: "./1x/blue.png" }  // Orange theme (Yellow and Blue Violet)
];

// Function to update the background and text color based on the current theme
function updateBackground() {
  let currentThemeIndex = parseInt(localStorage.getItem('themeIndex')) || 0;
  let theme = themes[currentThemeIndex];
  document.body.style.backgroundColor = theme.background;
  document.body.style.color = theme.text;

  // Update the logo source
  const logoElements = document.getElementsByClassName('logo');
  for (let logoElement of logoElements) {
    logoElement.src = theme.source;
  }
}

// Function to change to the next theme
function change_background(event) {
  // Prevent background change if the clicked element is the "GET DIRECTIONS" button
  if (event.target.closest('a') && event.target.closest('a').classList.contains('ignore-background-change')) {
    return;
  }

  let currentThemeIndex = parseInt(localStorage.getItem('themeIndex')) || 0;
  currentThemeIndex = (currentThemeIndex + 1) % themes.length; // Cycle through themes
  localStorage.setItem('themeIndex', currentThemeIndex);
  updateBackground();
}

function reset_localstorage() {
  var hours = 1; // to clear the localStorage after 1 hour
  // (if someone want to clear after 8hrs simply change hours=8)
  var now = new Date().getTime();
  var setupTime = localStorage.getItem('setupTime');
  if (setupTime == null) {
    localStorage.setItem('setupTime', now)
  } else {
    if (now - setupTime > hours * 60 * 1000) {
      localStorage.clear();
      localStorage.setItem('setupTime', now);
    }
  }
}

// Ensure both functions are called when the page loads
document.addEventListener('DOMContentLoaded', function () {
  reset_localstorage();
  updateBackground();
});
