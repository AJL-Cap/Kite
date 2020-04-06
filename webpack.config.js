const isDev = process.env.NODE_ENV === "development";

module.exports = {
  mode: isDev ? "development" : "production",
  entry: [
    "@babel/polyfill", // enables async-await
    "./client/index.js"
  ],
  output: {
    path: __dirname,
    filename: "./public/bundle.js"
  },
  resolve: {
    extensions: [".js", ".jsx"]
  },
  devtool: "source-map",
  watchOptions: {
    ignored: /node_modules/
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        loader: "file-loader",
        exclude: /node_modules/,
        options: {
          outputPath: "public",
          publicPath: "/",
          name: "[contenthash].[ext]"
        }
      },
      {
        test: /\.(ogg|mp3|wav|mpe?g)$/i,
        loader: "file-loader",
        exclude: /node_modules/,
        options: {
          outputPath: "public",
          publicPath: "/",
          name: "[contenthash].[ext]"
        }
      }
    ]
  }
};
