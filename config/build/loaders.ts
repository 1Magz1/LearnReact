import webpack from 'webpack'
import MiniCssExtractPlugin from "mini-css-extract-plugin";

export const loaders = (): webpack.RuleSetRule[] => {

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
            modules: true
          }
        },
        "sass-loader",
      ],
    }

  return [
    typescriptLoader,
    cssLoader
  ]
}
