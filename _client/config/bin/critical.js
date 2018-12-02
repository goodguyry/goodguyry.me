const penthouse = require('penthouse');
const fs = require('fs');
const path = require('path');
const readYaml = require('read-yaml');
const paths = require('../paths');

/**
 * Get the hashed filename for a given asset.
 *
 * @param {String} name The unhashed filename.
 */
function getHashedAssets(name) {
  const [asset, ext] = name.split('.');
  const assets = readYaml.sync(
    path.join(paths.siteData, 'assets.yaml')
  );

  return assets[asset][ext];
}

// Strings for different templates
const templates = {
  home: {
    url: 'http://goodguyry.http',
    css: `./build/${getHashedAssets('base.css')}`,
    forceInclude: [/^\.global-nav__*/, /\.global-footer__*/],
    outfile: './_includes/critical-home.html',
  },
  post: {
    url: 'http://goodguyry.http/notes/multi-tenant-wordpress.html',
    css: `./build/${getHashedAssets('base.css')}`,
    forceInclude: [/^\.global-nav__*/],
    outfile: './_includes/critical-post.html',
  },
};

/**
 * Generate criticalCSS for each template.
 */
Object.keys(templates).forEach((key) => {
  penthouse({
    url: templates[key].url,
    css: templates[key].css,
    width: 720,
    height: 800,
    forceInclude: templates[key].forceInclude,
    timeout: 30000,
  }, (err, critical) => {
    if (err) {
      throw err;
    } else {
      // Wrap output in <style></style>
      fs.writeFileSync(templates[key].outfile, `<style>${critical}</style>`);
    }
  });
});
