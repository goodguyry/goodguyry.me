/**
 * Adds an account tag
 * {% account 'twitter' %}
 * -> 'https://twitter.com/godguyry'
 *
 * @param  {string} site The site for which the account URL should be retrieved.
 * @return {string}
 */
module.exports = function(site) {
  const urls = {
    github: 'https://github.com',
    twitter: 'https://twitter.com',
    codepen: 'https://codepen.io',
  };

  const { [site]: baseUrl } = urls;

  if (undefined !== baseUrl) {
    return `${baseUrl}/goodguyry/`;
  }

  return '';
};
