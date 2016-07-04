(function(document) {

  /**
   * createCookie
   * Creates a cookie, given a name and value
   * @param {String} name The cookie's name
   * @param {String} value The cookie's value
   */
  var createCookie = function(name, value) {

    // The pattern to check for an existing cookie name/value pair
    var pattern = new RegExp("(?:(?:^|.*;\s*)" + name + "\s*\=\s*([^;]*).*$)|^.*$");

    // Check for no cookie value for 'return_visit'
    // Ensures the cookie value is only set once
    if (document.cookie.replace(pattern, '$1') !== value) {
      // Set the cookie value
      document.cookie=name + '=' + value + '; expires=' + exdate.toUTCString() + '; path=/; domain=.' + baseUrl;
    }

  }

  // Expires one week from today
  var exdate=new Date();
  exdate.setDate(exdate.getDate() + 7);

  // Get the domain from the <base> href value
  var baseUrl = document.querySelector('base').href
                .replace(/\//g, '')
                .split(':')[1];

  createCookie('return_visit', 'true');

  if ( ! (window.document.documentElement.className.indexOf('fonts-loaded') > -1) ) {

    // Instantiate FontFaceObservers
    var serif = new window.FontFaceObserver('Merriweather', { weight: 200 }),
        serifBold = new window.FontFaceObserver('Merriweather', { weight: 700 }),
        sans = new window.FontFaceObserver('Lato', { weight: 700 });

    // Expires one week from today
    var exdate=new Date();
    exdate.setDate(exdate.getDate() + 7);

    // Get the domain from the <base> href value
    var baseUrl = document.querySelector('base').href
                  .replace(/\//g, '')
                  .split(':')[1];

      // When loaded, add a 'fonts-loaded' class to <html>
      window.Promise.all([
          serif.load(null, 5000),
          serifBold.load(null, 5000),
          sans.load(null, 5000)
        ]).then(function() {
          window.document.documentElement.className+=' fonts-loaded';
          createCookie('fonts_loaded', 'true');
        });
  }

})(document);
