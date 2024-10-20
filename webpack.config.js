const path = require('path');

module.exports = {
  entry: './js/botc.tsx',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'botc.js',
    path: path.resolve(__dirname, 'bin'),
    clean: true,
  },
  mode: 'production'
};