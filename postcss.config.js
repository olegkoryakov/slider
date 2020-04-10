const autoprefixer = require('autoprefixer');
const cssMQPacker = require('css-mqpacker');
const cssNano = require('cssnano');

module.exports = {
  plugins: [
    autoprefixer,
    cssMQPacker,
    cssNano({
      preset: [
        'default', {
          discardComments: {
            removeAll: true,
          },
        },
      ],
    }),
  ],
};
