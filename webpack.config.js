import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import TerserPlugin from 'terser-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';

const isProd = process.env.NODE_ENV === 'production';

export default {
  entry: './src/index.js',
  output: {
    path: path.resolve(process.cwd(), 'dist'),
    filename: isProd ? 'app.[contenthash].js' : 'app.js',
  },
  devtool: isProd ? false : 'source-map',
  devServer: {
    static: {
      directory: path.resolve(process.cwd(), 'dist'),
    },
    port: 5173,
    open: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [isProd ? MiniCssExtractPlugin.loader : 'style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
    }),
    new MiniCssExtractPlugin({
      filename: isProd ? 'styles.[contenthash].css' : 'styles.css',
    }),
  ],
  optimization: {
    minimize: isProd,
    minimizer: [new TerserPlugin()],
  },
};
