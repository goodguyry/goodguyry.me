/* eslint-disable max-len */
const environment = process.env.ELEVENTY_ENV;
const isDev = ('development' === environment);

module.exports = {
  environment,
  title: 'Ryan Domingue is a UX Developer living in Seattle, Washington',
  description: 'Ryan Domingue works with HTML, CSS, and JavaScript, and spends his time learning and creating. Ryan loves coffee and cannot be trusted around cookies.',
  permalink: '/notes/:title.html',
  blogroll: '/notes/',
  url: `http://goodguyry.${isDev ? 'http' : 'me'}`,
};
