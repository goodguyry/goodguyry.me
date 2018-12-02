// JS components
import fontsLoaded from '../src/js/fontsLoaded';
import createCookie from '../src/js/createCookie';
import domContentLoaded from '../src/js/domContentLoaded';

// CSS-only components
import '../src/scss/global';
import '../components/global-header';
import '../components/global-nav';
import '../components/global-footer';

// Create the 'return_visit' cookie
createCookie('return_visit', 'true');

// Listen for font loading.
domContentLoaded(fontsLoaded);
