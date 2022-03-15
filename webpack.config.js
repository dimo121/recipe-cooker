const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')

const isProduction = false;

module.exports = {
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[hash:8].js',
    sourceMapFilename: '[name].[hash:8].map',
    chunkFilename: '[id].[hash:8].js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json', '.css'] 
  },
  target: 'web',
  mode: isProduction ? 'production' : 'development', 
    rules: [
      {
        test: /\.(tsx|ts)$/,
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader',
          options: {
            transpileOnly: true
          }
        }
      }, 
      { 
        test: /\.css/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.(jpe?g|png|svg)$/,
        use: ['file-loader'],
      }, 
    ]
  , 
  plugins: [
    new ForkTsCheckerWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'Your project name',
      template: './src/index.html',
      filename: './index.html'
    })
  ],
  devtool: !isProduction ? 'source-map' : false
}