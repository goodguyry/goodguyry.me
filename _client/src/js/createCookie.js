/**
 * createCookie
 * Creates a cookie, given a name and value
 *
 * @param {String} name The cookie's name
 * @param {String} value The cookie's value
 */
export default function createCookie(name, value) {
  // Get the domain from the <base> href value
  const baseUrl = document.querySelector('base').href
    .replace(/\//g, '')
    .split(':')[1];

  // The pattern to check for an existing cookie name/value pair
  const pattern = new RegExp(`(?:(?:^|.*;\\s*)${name}\\s*\\=\\s*([^;]*).*$)|^.*$`);

  // Expires one week from today
  const exdate = new Date();
  exdate.setDate(exdate.getDate() + 7);

  // Check for no cookie value for 'return_visit'
  // Ensures the cookie value is only set once
  if (value !== document.cookie.replace(pattern, '$1')) {
    // Set the cookie value
    document.cookie = (
      `${name}=${value}; expires=${exdate.toUTCString()}; path=/; domain=.${baseUrl}`
    );
  }
}
