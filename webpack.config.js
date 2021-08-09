const path = require('path'); //[ru] - требовать, это глобальная функция Node.js
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const webpack = require('webpack') //?
// const autoprefixer = require('autoprefixer') //?
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: "./src/app.js",
  mode: 'development',
  devServer: {
    historyApiFallback: true,
    contentBase: path.resolve(__dirname, './dist'),
    open: true,
    compress: true,
    hot: true,
    port: 8080,
  },
  output: {
    path: path.resolve(__dirname, 'dist'), //__dirname - Это абсолютный путь к нашему js файлу в каталоге. path.resolve([путь]) - используется для преобразования последовательности сегментов в абсолютный путь => текущий путь к repo/dist/bundle.js
    filename: 'bundle.js'
  },
  module: { //В данном модуле прописываются правила лоадеров и плагинов.
    rules: [
      {
        test: /\.(s*)css$/,
        use: [
          MiniCssExtractPlugin.loader, //По сути miniCss.. заменяет собой 'style-loader'  Когда minicss.. не сможет выполнить работу будет применён fallback.
          'css-loader',
          'postcss-loader',
          'sass-loader',
          {
            loader: 'sass-resources-loader',
            options: {
              resources: './src/scss/abstracts/_variables.scss',
            }
          }
        ]
      },
      {
        test: /\.html$/,
        loader: 'html-loader'
      },
      {
        test: /\.svg/,
        type: 'asset/resource'
      },
      // {
      //   test: /\.(png|jpg|jpeg|gif|svg)$/,
      //   loader: 'file-loader'
      // }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'webpack Boilerplate',
      template: path.resolve(__dirname, 'index.html'), // шаблон
      filename: 'index.html', // название выходного файла
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'style.css',
    }),
    new webpack.HotModuleReplacementPlugin(),
    // new webpack.LoaderOptionsPlugin({ // ?
    //   options: {
    //     postcss: [
    //       autoprefixer()
    //     ]
    //   }
    // })
  ]
};

