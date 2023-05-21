import {BuildOptions} from "./types/config";
import {Configuration} from "webpack-dev-server";

export const devServer = ({port}: BuildOptions): Configuration => {
  return {
    port,
    open: true,
    historyApiFallback: true,
  }
}
