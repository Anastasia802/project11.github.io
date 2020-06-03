const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const isDev = process.env.NODE_ENV === 'development';
const webpack = require('webpack');

module.exports = {
  
    entry: { main: './src/js/script.js' },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[chunkhash].js'
    },
    module: {
        rules: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
              loader: "babel-loader"
            }
          },
      
           {
            test: /\.(eot|ttf|woff|woff2)$/,
            loader: 'file-loader?name=./vendor/[name].[ext]'
        },
        {
            test: /\.css$/i,
            use: [(isDev ? 'style-loader' : MiniCssExtractPlugin.loader),'css-loader', 'postcss-loader']
    },
    {
        test: /\.(gif|png|jpe?g|ico|svg)$/i,
        use: [
            'file-loader?name=./images/[name].[ext]', 
            {
              loader: 'image-webpack-loader',
              options: {
                  bypassOnDebug: true,
                  disable: true,
              },
            },
          ],
    }
        ]
      },
      plugins: [ 
        new MiniCssExtractPlugin({
            filename: 'index.[contenthash].css',
        }),
        new webpack.DefinePlugin({
            'NODE_ENV': JSON.stringify(process.env.NODE_ENV),
            'API_URL' : JSON.stringify(isDev ? 'http://praktikum.tk' : 'https://praktikum.tk')
        }),
        new HtmlWebpackPlugin({
          inject: false,
          template: './src/index.html',
          filename: 'index.html'
        }),
        
        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessor: require('cssnano'),
            cssProcessorPluginOptions: {
                    preset: ['default'],
            },
            canPrint: true
    }), 
        new WebpackMd5Hash(),
        new webpack.SourceMapDevToolPlugin({}),
      ],
      devtool: false,
    };