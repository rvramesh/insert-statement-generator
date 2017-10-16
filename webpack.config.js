module.exports = {
  context: __dirname,
  entry: {
    jsx: "./src/index.jsx",
    html: "./src/index.html"
  },

  output: {
    path: __dirname + "/static",
    filename: "bundle.js"
  },
  module: {
    preLoaders: [
        //Eslint loader
      { test: /\.jsx?$/, exclude: /node_modules/, loader: "eslint-loader"}
    ],
    loaders: [
      { test: /\.html$/, loader: "file?name=[name].[ext]" },
      { test: /\.css$/,  loaders: [ 'style-loader', 'css-loader' ] },
      { test: /\.jsx?$/, exclude: /node_modules/, loaders: ["react-hot","babel-loader"]},
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx','.css']
  },
  eslint: {
    configFile: './.eslintrc'
  }
};
