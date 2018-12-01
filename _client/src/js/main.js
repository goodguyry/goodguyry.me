// Get the domain from the <base> href value
const baseUrl = document.querySelector('base').href
  .replace(/\//g, '')
  .split(':')[1];

// Expires one week from today
const exdate = new Date();
exdate.setDate(exdate.getDate() + 7);

/**
 * createCookie
 * Creates a cookie, given a name and value
 *
 * @param {String} name The cookie's name
 * @param {String} value The cookie's value
 */
function createCookie(name, value) {
  // The pattern to check for an existing cookie name/value pair
  const pattern = new RegExp(`(?:(?:^|.*;\\s*)${name}\\s*\\=\\s*([^;]*).*$)|^.*$`);

  // Check for no cookie value for 'return_visit'
  // Ensures the cookie value is only set once
  if (value !== document.cookie.replace(pattern, '$1')) {
    // Set the cookie value
    document.cookie = (
      `${name}=${value}; expires=${exdate.toUTCString()}; path=/; domain=.${baseUrl}`
    );
  }
}

// Create the 'return_visit' cookie
createCookie('return_visit', 'true');

// Check for the 'fonts-loaded' class first
if (window.document.documentElement.classList.contains('fonts-loaded')) {
  // Instantiate FontFaceObservers
  const serif = new window.FontFaceObserver('Merriweather', { weight: 200 });
  const serifBold = new window.FontFaceObserver('Merriweather', { weight: 700 });
  const sans = new window.FontFaceObserver('Lato', { weight: 700 });

  // When loaded, add a 'fonts-loaded' class to <html>
  window.Promise.all([
    serif.load(null, 5000),
    serifBold.load(null, 5000),
    sans.load(null, 5000),
  ]).then(() => {
    window.document.documentElement.classList.add('fonts-loaded');
    // Create the 'fonts_loaded' cookie
    createCookie('fonts_loaded', 'true');
  });
}
