const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const ProxyConfig = {
  target: 'http://10.0.0.249:9999',
  changeOrigin: true,
  secure: false,
}
const ProxyConfig2 = {
  target: 'http://10.0.0.249:20334',
  changeOrigin: true,
  secure: false,
}

module.exports = {
  entry: [
    'babel-polyfill',
    'react-hot-loader/patch',
    __dirname+'/app/main.jsx',
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        exclude: [/node_module/],
        use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 1,
              localIdentName: '[name]_[local]__[hash:base64:5]',
            },
          },
          {
            loader: 'sass-loader',
            options: {
              modules: true,
              importLoaders: 1,
              localIdentName: '[name]_[local]__[hash:base64:5]',
            },
          },
        ],
      },
      {
        test: /\.(ico|png|jpg|jpeg|mp4|gif|mov)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 8192,
          },
        }],
      },
      {
        test: /\.js|jsx$/,
        exclude: [/node_module/, /third-party/, /\.json$/],
        use: [{
          loader: 'babel-loader',
          options: {
            presets: ['es2015', 'react', 'stage-0'],
          },
        }],
      },
    ],
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
    alias: {
      'react-dom': '@hot-loader/react-dom',
    },
  },
  devServer: {
    port: 3000,
    contentBase: path.join(__dirname, 'dist'),
    historyApiFallback: true,
    https: false,
    hot: true,
    inline: true,
    compress: false,
    open: true,
    proxy: {
      '/user/register/*': ProxyConfig,
      '/user/login/*': ProxyConfig,
      '/user/info/*': ProxyConfig,
      '/api/v1/*': ProxyConfig2,
      '/project/create/*': ProxyConfig,
      '/project/list/*': ProxyConfig,
      '/transaction/list/*': ProxyConfig,
      '/project/detail/*': ProxyConfig,
      '/project/confirm/*': ProxyConfig,
      '/transaction/vested/*':ProxyConfig
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      favicon: './favicon.ico',
      filename: './index.html',
      template: './index.html',
      inject: true,
      hash: false,
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
}
