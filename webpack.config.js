const webpack = require( 'webpack' );
const path = require( 'path' );
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: 'development',
  entry: {
    'moonraker':      './js/main.js'
  },
  output: {
    path:       path.join( __dirname, 'js' ),
    publicPath: path.join( __dirname, 'js' ),
    filename:   '[name].js'
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      options: {
        babel: {
          presets: [ 'es2015', 'stage-0' ]
        }}}),
    new MiniCssExtractPlugin({
      filenme: "[name].css",
      chunkfilename: "[id].css"
    })
  ],
  module: {
    rules: [
      {
        test:    /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader:  "babel-loader?presets[]=es2015&comments=false"
      },
      {
        test:   /\.html$/,
        loader: "html-loader"
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // you can specify a publicPath here
              // by default it use publicPath in webpackOptions.output
              publicPath: '../'
            }
          },
          "css-loader"
        ]
      }
    ]
  },
  resolve: {
    // root: path.join(__dirname, '..'),
    extensions: [ '.js', '.json' ]
  }
};

if ( process.env.NODE_ENV === 'production' ) {
  module.exports.plugins = [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    // new webpack.optimize.UglifyJsPlugin({
    //     compress: {
    //         warnings: false
    //     }
    // }),
    new webpack.optimize.OccurenceOrderPlugin()
  ];
} else {
  module.exports.devtool = '#source-map';
}
