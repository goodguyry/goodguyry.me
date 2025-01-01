const themes = [
  // Gradients
  {
    name: 'default',
    accent: '0, 132, 132',
    secondary: '92, 11, 170',
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
  // Solid colors.
  {
    name: 'black',
    accent: '0, 0, 0',
    secondary: '0, 0, 0',
  },
  {
    name: 'red',
    accent: '181, 0, 1',
    secondary: '181, 0, 1',
  },
  {
    name: 'green',
    accent: '32, 102, 0',
    secondary: '32, 102, 0',
  },
  {
    name: 'blue',
    accent: '0, 96, 116',
    secondary: '0, 96, 116',
  },
  {
    name: 'steel-blue',
    accent: '0, 85, 149',
    secondary: '0, 85, 149',
  },
  {
    name: 'teal',
    accent: '0, 132, 132',
    secondary: '0, 132, 132',
  },
  {
    name: 'purple',
    accent: '92, 11, 170',
    secondary: '92, 11, 170',
  },
];

/**
 * Get a theme object by name.
 *
 * @param  {string} name Theme name to retrieve.
 * @return {object}
 */
function getThemeByName(name) {
  // `undefined` will be caught by the condition in _includes/head.html.
  return themes.find((theme) => theme.name === name);
}

module.exports = {
  themes,
  getThemeByName,
};
