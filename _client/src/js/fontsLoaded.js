import FontFaceObserver from 'fontfaceobserver';
import createCookie from './createCookie';

/**
 * Listen as fonts are loaded.
 */
export default function fontsLoaded() {
  const fonts = {
    Merriweather: {
      weight: [
        200,
        700,
      ],
    },
    Lato: {
      weight: [
        700,
      ],
    },
  };

  // Collect FontFaceObserver instances
  const observers = Object.keys(fonts).reduce((acc, key) => {
    const fontData = fonts[key];

    // Load multiple weights for a given font name
    const observer = fontData.weight
      .reduce((obs, weight) => {
        const data = Object.assign({}, fontData, { weight });
        return [...obs, new FontFaceObserver(key, data)];
      }, []);

    return [...acc, ...observer];
  }, []);

  // Check for the 'fonts-loaded' class first
  if (! document.documentElement.classList.contains('fonts-loaded')) {
    // When loaded, add a 'fonts-loaded' class to <html>
    window.Promise.all(observers).then(() => {
      requestAnimationFrame(() => {
        document.documentElement.classList.add('fonts-loaded');
      });

      // Create the 'fonts_loaded' cookie
      createCookie('fonts_loaded', 'true');
    });
  }
}
