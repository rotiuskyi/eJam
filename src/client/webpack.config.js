const path = require('path')
const Dotenv = require('dotenv-webpack')
const HTMLPlugin = require('html-webpack-plugin')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')
const { ProvidePlugin } = require('webpack')

const {
  CLIENT_HOST,
  CLIENT_PORT,
  API_HOST,
  API_PORT,
  API_PROXY_PATH,
} = process.env

const configFile = path.resolve(__dirname, 'tsconfig.json')

module.exports = () => ({
  devtool: 'source-map',

  entry: { main: path.resolve(__dirname, 'App.tsx') },

  output: {
    filename: '[name].[contenthash].js',
    chunkFilename: '[name].[contenthash].js',
    publicPath: '/',
  },

  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },

  plugins: [
    new HTMLPlugin({
      template: path.resolve(__dirname, 'index.html'),
      favicon: path.resolve(__dirname, 'favicon.ico'),
    }),
    new ProvidePlugin({ React: 'react' }),
    new Dotenv(),
  ],

  resolve: {
    plugins: [new TsconfigPathsPlugin({ configFile })],
    extensions: ['.ts', '.tsx', '.js', '.json'],
    alias: { src: 'src' },
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        options: { configFile },
      },
      { test: /\.css$/i, use: ['style-loader', 'css-loader'] },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        use: ['url-loader?limit=100000'],
      },
      { test: /\.(png|jpe?g|gif)$/i, use: [{ loader: 'file-loader' }] },
    ],
  },

  devServer: {
    host: CLIENT_HOST,
    port: CLIENT_PORT,
    historyApiFallback: true,
    open: true,
    proxy: {
      [API_PROXY_PATH]: {
        target: `http://${API_HOST}:${API_PORT}`,
        pathRewrite: { [`^${API_PROXY_PATH}`]: '' },
      },
    },
  },
})
