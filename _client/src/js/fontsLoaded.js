import FontFaceObserver from 'fontfaceobserver';
import createCookie from './createCookie';

/**
 * Listen as fonts are loaded.
 */
export default function fontsLoaded() {
  // Check for the 'fonts-loaded' class first
  if (window.document.documentElement.classList.contains('fonts-loaded')) {
    // Instantiate FontFaceObservers
    const serif = new FontFaceObserver('Merriweather', { weight: 200 });
    const serifBold = new FontFaceObserver('Merriweather', { weight: 700 });
    const sans = new FontFaceObserver('Lato', { weight: 700 });

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
}
