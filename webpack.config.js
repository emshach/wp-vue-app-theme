const webpack = require( 'webpack' );
const path = require( 'path' );
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
  mode: 'development',
  entry: {
    'moonraker':      './js/main.js'
  },
  output: {
    path:       path.join( __dirname, 'js/' ),
    publicPath: '/wp-content/themes/moonraker-theme/js/',
    filename:   '[name].js'
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      options: {
        babel: {
          presets: [ '@babel/env' ]
        }}}),
    new MiniCssExtractPlugin({
      filenme: "[name].css",
      chunkfilename: "[id].css"
    }),
    new VueLoaderPlugin()
  ],
  externals: {
    wpapi: [ 'wp', 'api' ]
  },
  module: {
    rules: [
      {
        test:   /\.vue$/,
        loader: "vue-loader"
      },
      {
        test:    /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader:  "babel-loader"
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
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    },
    // root: path.join(__dirname, '..'),
    extensions: [ '.js', '.vue', '.json' ]
  }
};

if ( process.env.NODE_ENV === 'production' ) {
  module.exports.plugins = [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false
        }
    }),
    new webpack.optimize.OccurenceOrderPlugin()
  ];
} else {
  module.exports.devtool = '#source-map';
}
