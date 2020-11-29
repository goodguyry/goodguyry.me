const environment = process.env.ELEVENTY_ENV;
const isDev = ('development' === environment);

module.exports = {
  environment,
  title: 'Ryan Domingue is a UX Developer living in Seattle, Washington',
  description: 'Ryan Domingue bends markup and CSS to his will, and writes as much or as little JavaScript as needed.',
  blogroll: '/notes/',
  domain: `http://goodguyry.${isDev ? 'http' : 'me'}`,,
  username: 'goodguyry',
  themeColor: '#008583',
};
