const path = require('path');
const MyPlugin = require('./myplugin');
const webpack = require('webpack')
const banner = require('./banner')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    main: './src/app.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve('./dist'),
  },
  module: {
    rules: [{
      test: /\.js$/, // .js 확장자로 끝나는 모든 파일
      use: [path.resolve('./myloader.js')] // 방금 만든 로더를 적용한다
    },
    {
      test: /\.css$/,
      use: ['style-loader', 'css-loader']
    },
    {
      test: /\.png$/,
      use: {
		    loader: 'url-loader', // url 로더를 설정한다
		    options: {
		      publicPath: './dist/', // file-loader와 동일
		      name: '[name].[ext]?[hash]', // file-loader와 동일
		      limit: 5000000
		    }
		  }
    },
  ],
  },
  plugins: [
    new webpack.BannerPlugin(banner),
    new webpack.DefinePlugin({
        TWO: '1+1',
        STRINGTWO: JSON.stringify('1+1')
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      templateParameters: {
        env: `${process.env.NODE_ENV}`,
      }
    }),
    new CleanWebpackPlugin(),
  ]
}