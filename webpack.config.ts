import webpack from 'webpack';
import {webpackConfig} from "./config/build/webpackConfig";
import path from "path";
import {BuildEnv} from "./config/build/types/config";

export default (env: BuildEnv) => {
  const paths = {
    entry: path.resolve(__dirname, 'src', 'index.ts'),
    output: path.resolve(__dirname, 'build'),
    html: path.resolve(__dirname, 'public', 'index.html'),
  }

  const mode = env.mode ? env.mode : 'development';
  const isDev = mode === 'development';
  const port = env.port ? env.port : 3000;

  const config: webpack.Configuration = webpackConfig({
    mode,
    paths,
    isDev,
    port
  });

  return config;
};