require('dotenv').config();

const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const LiveReloadPlugin = require('webpack-livereload-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const root = path.resolve(__dirname);
const env = process.env.NODE_ENV;

module.exports = {
  mode: env,
  entry: ['@babel/polyfill', `${root}/src/index.js`],
  output: {
    path: `${root}/dist`,
    publicPath: '/',
    filename: 'js/[name].js',
  },
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ],
      },
      {
        test: /\.(png|jpeg|jpg|gif)$/,
        loader: 'file-loader',
        options: {
          name: env === 'production' ? 'images/[name].[hash:8].[ext]' : 'images/[name].[ext]',
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|svg)$/,
        loader: 'file-loader',
        options: {
          name: 'fonts/[name].[ext]',
        },
      },      
    ]
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          output: {
            comments: false,
          }
        }
      }),
      new OptimizeCssAssetsPlugin({
        cssProcessorPluginOptions: {
          preset: ['default', {
            discardComments: {
              removeAll: true
            }
          }],
        }
      })
    ]
  },  
  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [
        `${root}/dist`,
      ],
    }),
    new MiniCssExtractPlugin({
      filename: env === 'production' ? 'css/[name].[hash].css' : 'css/[name].css'
    }),
    new HtmlWebpackPlugin({
      inject: true,      
      template: `${root}/public/index.html`,
      env: process.env.NODE_ENV,
      minify: {
        collapseWhitespace: true,
      }
    }),
    new LiveReloadPlugin({
      port: 0,
      appendScriptTag: env === 'development' ? true : false
    }),    
  ],
};