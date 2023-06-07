import webpack from 'webpack'
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import {BuildOptions} from "./types/config";

export const loaders = ({isDev}: BuildOptions): webpack.RuleSetRule[] => {

  const svgLoader = {
    test: /\.svg$/,
    use: ['@svgr/webpack'],
  }

  const typescriptLoader = {
    test: /\.tsx?$/,
    use: 'ts-loader',
    exclude: /node_modules/,
  }

  const cssLoader = {
      test: /\.s[ac]ss$/i,
      use: [
        MiniCssExtractPlugin.loader,
        {
          loader: "css-loader",
          options: {
            modules: {
              auto: (resourcePath: string) => resourcePath.endsWith('.module.scss'),
              localIdentName: isDev
                ? "[path]module--[hash:base64:8]"
                : "[hash:base64:8]",
            },
          }
        },
        "sass-loader",
      ],
    }

  return [
    svgLoader,
    typescriptLoader,
    cssLoader
  ]
}
