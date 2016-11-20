var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var precss = require('precss');

module.exports = {
  devtool: 'inline-source-map',
  entry: [
    'webpack-hot-middleware/client',
    './client/client.js'
  ],
  output: {
    path: require("path").resolve("./dist"),
    filename: 'bundle.js',
    publicPath: '/'
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  module: {
    loaders: [
        {
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
            query: {
                presets: ['react', 'es2015', 'react-hmre'],
                plugins: [
                            'transform-object-rest-spread'
                        ]
            }
        },
        {
            test: /\.sass$/,
            loaders: ['style-loader', 'css-loader', 'sass-loader']
        }
    ]
},
postscss: function () {
    return [autoprefixer, precss]
}
}
