import webpack from "webpack";

import {loaders} from "./loaders";
import {resolves} from "./resolves";
import {plugins} from "./plugins";

import {BuildOptions} from "./types/config";

export const webpackConfig = (options: BuildOptions): webpack.Configuration => {
  const {mode, paths} = options;
  return {
    mode: mode,
    entry: paths.entry,
    module: {
      rules: loaders(),
    },
    resolve: resolves(),
    output: {
      filename: '[name].[contenthash].js',
      path: paths.output,
      clean: true,
    },
    plugins: plugins(options),
  }
}
