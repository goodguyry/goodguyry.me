const environment = process.env.ELEVENTY_ENV;
let domain = 'http://goodguyry.me';

switch (environment) {
  case 'local':
    domain = 'http://goodguyry.http';
    break;
  case 'dev':
    domain = 'http://dev.goodguyry.me';
    break;
}

module.exports = {
  title: 'Ryan Domingue is a UX Developer living in Seattle, Washington',
  description: 'Ryan Domingue bends markup and CSS to his will, and writes as much or as little JavaScript as needed.',
  blogroll: '/notes/',
  domain,
  username: 'goodguyry',
  themeColor: '#008583',
  env: {
    isLocal: ('local' === environment),
    isDev: ('dev' === environment),
    isDotMe: ('dotMe' === environment),
  },
  version: '1.0.0',
};
