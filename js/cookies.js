(function(document) {

  // Expires one week from today
  var exdate=new Date();
  exdate.setDate(exdate.getDate() + 7);

  // Get the domain from the <base> href value
  var baseUrl = document.querySelector('base').href
                .replace(/\//g, '')
                .split(':')[1];

  // Check for no cookie value for 'return_visit'
  // Ensures the cookie value is only set once
  if (document.cookie.replace(/(?:(?:^|.*;\s*)return_visit\s*\=\s*([^;]*).*$)|^.*$/, '$1') !== 'true') {
    // Set the cookie value
    document.cookie='return_visit=true; expires=' + exdate.toUTCString() + '; path=/; domain=.' + baseUrl;
  }
})(document);
