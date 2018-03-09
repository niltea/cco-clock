/* eslint-disable no-console */

const path = require('path');
const webpack = require('webpack');
// const DEBUG = !process.argv.includes('--release');
const DEBUG = false;
// postCSS plugins
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoPrefixer = require('autoprefixer');

const plugins = [
  new webpack.optimize.OccurrenceOrderPlugin(),
];

if (DEBUG) {
  console.log('###########################\n## Debug mode is enabled ##\n###########################');
} else {
  plugins.push(
    new webpack.optimize.UglifyJsPlugin({ compress: { screw_ie8: true, warnings: false } }),
    new webpack.optimize.AggressiveMergingPlugin(),
  );
}
module.exports = [{
  entry: {
    app: './src/js/app.ts',
  },
  output: {
    path: path.join(__dirname, ),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.js$|\.ts$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        loader: 'ts-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  plugins,
}, {
  entry: {
    style: './src/sass/style.scss',
  },
  output: {
    path: path.join(__dirname, './docs/css/'),
    filename: '[name].css',
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                url: false,
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: (loader) => {
                  return [
                    autoPrefixer,
                  ];
                },
                sourceMap: false,
              },
            },
            {
              loader: 'sass-loader',
              options: {},
            },
          ],
        }),
      },
    ],
  },
  plugins: [
    new ExtractTextPlugin({
      filename: '[name].css',
    }),
  ],
},
];
