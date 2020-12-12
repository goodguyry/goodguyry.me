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
