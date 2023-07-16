module.exports = {
  parser: require('postcss-comment'),
  plugins: {
    'postcss-nested': {},
    autoprefixer: {},
    'postcss-pxtorem': {
      rootValue: 16,
      unitPrecision: 5,
      propList: ['*', 'height', '!border*'],
      //propList: ['font', 'font-size', 'line-height', 'letter-spacing', 'padding', 'margin', 'width', 'padding-top', 'padding-bottom', 'padding-left', 'padding-right', 'margin-top', 'margin-bottom', 'margin-left', 'margin-right'],
      selectorBlackList: [],
      replace: true,
      mediaQuery: false,
      minPixelValue: 0,
      exclude: /node_modules/i,
    },
  },
};
