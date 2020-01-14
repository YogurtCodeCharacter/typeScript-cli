// webpack.config.js

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const NODE_MODULES = /node_modules/;

module.exports = {
  mode: 'development', // 开发模式
  entry: path.resolve(__dirname, './src/main.js'),    // 入口文件
  output: {
    filename: '[name].[hash:8].js',      // 打包后的文件名称
    path: path.resolve(__dirname, './dist')  // 打包后的目录
  },
  devServer:{
    port:3000,
    hot:true,
    contentBase:'./dist'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './public/index.html')
    }),
    new MiniCssExtractPlugin({
      filename: "[name].[hash].css",
      chunkFilename: "[id].css",
    }),
    new webpack.HotModuleReplacementPlugin(),
    new CleanWebpackPlugin() // TODO: 清除dist文件
  ],
  resolve: {
    extensions: ['.js', '.tsx', '.json']
  },
  module: {
    rules: [
      {
        test: /\.(tsx|js)$/,
        exclude: NODE_MODULES,
        use: [
          {
            loader: 'babel-loader',
            options: {
              "presets": ["@babel/preset-env", "@babel/preset-react", "@babel/preset-typescript"],
              "plugins": [
                [
                    "@babel/plugin-proposal-decorators",
                    {
                        "legacy": true
                    }
                ],
                [
                    "@babel/plugin-proposal-class-properties",
                    {
                        "loose": true
                    }
                ],
                [
                  "babel-plugin-import",
                  {
                    "libraryName": "antd",
                    "libraryDirectory": "lib",   // default: lib
                    "style": true
                  }
                ]
            ]
            }
          }
        ]
      },
      {
        test: /\.(c|le)ss$/,
        exclude: NODE_MODULES,
        use: [
          MiniCssExtractPlugin.loader,
        "@teamsupercell/typings-for-css-modules-loader",
        {
          loader: "css-loader",
          options: { modules: true }
        }, 
        'postcss-loader',
        'less-loader',
      ]
      },
      {
        test: /\.(c|le)ss$/,
        include: NODE_MODULES,
        use: [
          MiniCssExtractPlugin.loader,
        // "@teamsupercell/typings-for-css-modules-loader",
        "css-loader",
        'postcss-loader',
        {
          loader: 'less-loader',
          options: { 
            javascriptEnabled: true 
          }
        }
      ]
      },
      {
        test: /\.(jpe?g|png|gif)$/, //图片文件
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10240,
              fallback: {
                loader: 'file-loader',
                options: {
                    name: 'img/[name].[hash:8].[ext]'
                }
              }
            }
          }
        ]
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/, // 字体
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10240,
              fallback: {
                loader: 'file-loader',
                options: {
                  name: 'fonts/[name].[hash:8].[ext]'
                }
              }
            }
          }
        ]
      },
    ]
  }
}
