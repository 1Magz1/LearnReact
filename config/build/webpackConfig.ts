import webpack from "webpack";

import {loaders} from "./loaders";
import {resolves} from "./resolves";
import {plugins} from "./plugins";
import {devServer} from "./devServer";

import {BuildOptions} from "./types/config";

export const webpackConfig = (options: BuildOptions): webpack.Configuration => {

  const {
    mode,
    paths,
    isDev
  } = options;

  return {
    mode,
    entry: paths.entry,
    module: {
      rules: loaders(options),
    },
    resolve: resolves(options),
    output: {
      filename: './js/[name].[contenthash].js',
      path: paths.output,
      clean: true,
      publicPath: '/'
    },
    plugins: plugins(options),
    devtool: isDev ? 'inline-source-map' : undefined,
    devServer: isDev ? devServer(options) : undefined,
  }
}
