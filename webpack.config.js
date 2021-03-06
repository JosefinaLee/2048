// Hack for Ubuntu on Windows: interface enumeration fails with EINVAL, so return empty.
try {
  require('os').networkInterfaces()
} catch (e) {
  require('os').networkInterfaces = () => ({})
}

const webpack = require('webpack');

module.exports = {
  entry: {
      app:["./app/main.js",
      'webpack-hot-middleware/client',
      'webpack-dev-server/client?http://localhost:8080',
      'webpack/hot/dev-server']
  },
  output: {
    path: __dirname + "/public",//打包后的文件存放的地方
    filename: "bundle.js",//打包后输出文件的文件名
    publicPath:'http://localhost:8080/'
  },
  module: {
    loaders: [
      {test: /\.css$/, loader: 'style!css'},
      {test: /\.vue$/, loader: 'vue'},
      {test: /\.js$/,exclude:/node_modules/ ,loader: 'babel'}
    ]
  },
  vue:{
    loaders:{
      js:'babel'
    }
  },
  babel: {
    presets: ['es2015'],
    plugins: ['transform-runtime']
  },
  plugins:[
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ],
  devServer: {
    contentBase: "./public",//本地服务器所加载的页面所在的目录
    colors: true,//终端中输出结果为彩色
    hot: true,
    inline: true//实时刷新
  },
  resolve: {
    extensions: ['', '.js', '.vue']
  },
  devtool: 'source-map'
}