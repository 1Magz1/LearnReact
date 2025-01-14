import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import {BuildOptions} from "./types/config";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import {BundleAnalyzerPlugin} from 'webpack-bundle-analyzer';

export const plugins = ({paths, isDev}: BuildOptions): webpack.WebpackPluginInstance[] => [
  new webpack.ProgressPlugin(),
  new HtmlWebpackPlugin({
    template: paths.html,
  }),
  new MiniCssExtractPlugin({
    filename: './css/[name].[contenthash:8].css',
    chunkFilename: './css/[name].[contenthash:8].chunk.css',
  }),
  new webpack.DefinePlugin({
    __IS_DEV__: JSON.stringify(isDev)
  }),
  new webpack.HotModuleReplacementPlugin(),
  new BundleAnalyzerPlugin({
    openAnalyzer: false
  })
]
