const Entities = require('html-entities').AllHtmlEntities;

module.exports = function(content, caption) {
  const entities = new Entities();
  const figcaption = caption
    ? `<figcaption>${entities.decode(caption)}</figcapton>`
    : '';

  return `<figure>${content}${figcaption}</figure>`;
};
