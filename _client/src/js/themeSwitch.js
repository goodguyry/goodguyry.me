const root = document.documentElement;
const themes = [
  {
    name: 'default',
    accent: '0, 132, 132',
    secondary: '92, 11, 170',
  },
  {
    name: 'sounders',
    accent: '32, 102, 0',
    secondary: '0, 85, 149',
  },
  {
    name: 'poop',
    accent: '116, 73, 0',
    secondary: '0, 0, 0',
  },
  {
    name: 'red-to-brown',
    accent: '181, 0, 1',
    secondary: '120, 78, 0',
  },
  {
    name: 'merica',
    accent: '181, 0, 1',
    secondary: '0, 96, 116',
  },
];

// Set the default.
let theme = themes[0];

// Get the saved theme, if any.
const sessionTheme = sessionStorage.getItem('theme');

// Get the theme if there isn't a saved theme.
if (! sessionTheme) {
  const random = Math.floor(Math.random() * themes.length);
  theme = themes[random];
} else {
  theme = JSON.parse(sessionTheme);
}

const { accent, secondary } = theme;

// Set the theme.
requestAnimationFrame(() => {
  root.style.setProperty('--rgb-accent', `${accent}`);
  root.style.setProperty('--rgb-secondary', `${secondary}`);

  // Save the theme.
  sessionStorage.setItem('theme', JSON.stringify(theme));
});
