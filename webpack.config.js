// This configuration file tells Webpack how to process and bundle your project files.
const prod = process.env.NODE_ENV === 'production';

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin'); // Import CopyWebpackPlugin
const path = require('path');

module.exports = {
  // Sets the mode for the build process (development or production).
  // In production mode, Webpack will optimize the build (e.g., minification).
  // In development mode, Webpack will include source maps and won't minify the code.
  mode: prod ? 'production' : 'development',
  // Specifies the entry point for your application.
  // This is where Webpack will start bundling your code.
  entry: './src/index.tsx',
  // Defines where the bundled files will be saved.
  output: {
    // The path where the output files will be placed.
    path: path.resolve(__dirname, 'dist'), // Use path.resolve for absolute paths
    publicPath: prod ? '/once-popup-a-time_v2/' : '/', // Specifies the public URL of the output directory when referenced in a browser. ???? verify this
    /*filename: '[name].[contenthash].js',
    clean: true*/
  },
  module: {
    // Determines how different file types should be processed.
    rules: [
      {
        // Looks for .ts or .tsx files and processes them using ts-loader.
        // Excludes the node_modules directory to speed up the build process.
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        // Specifies which file extensions Webpack should resolve.
        // For example, if you import a file without specifying its extension (import MyComponent from './MyComponent';),
        // Webpack will try to resolve this by appending the extensions listed
        resolve: {
          extensions: ['.ts', '.tsx', '.js', '.json', '.png'],
        },
        // Uses ts-loader to transpile TypeScript files into JavaScript.
        // TODO maybe use babel for prod ?
        use: 'ts-loader',
      },
      {
        // Tests for .css files and processes them.
        // Only applies the specified loaders to CSS files located within the src directory.
        test: /\.css$/i,
        // only apply the specified loaders to CSS files located within the src directory
        include: path.resolve(__dirname, 'src'),
        // Uses MiniCssExtractPlugin.loader to extract CSS into separate files.
        // Uses css-loader to interpret @import and url() like import/require() and will resolve them.
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
      },
    ],
  },
  // Sets the config for source maps, which help in debugging by mapping the compiled code back to the original source code.
  devtool: prod ? 'source-map' : 'eval-source-map',
  // Configures additional plugins.
  plugins: [
    // HtmlWebpackPlugin simplifies creation of HTML files to serve your bundles.
    // This is especially useful for including the generated bundles automatically.
    new HtmlWebpackPlugin({
      template: './public/index.html', // Specifies the HTML template to use.
      favicon: './public/favicon.png',
    }),
    // MiniCssExtractPlugin extracts CSS into separate files.
    // It creates a CSS file per JS file which contains CSS.
    new MiniCssExtractPlugin(),
    // CopyWebpackPlugin is used to copy assets from the public folder to the output folder.
    new CopyWebpackPlugin({
      patterns: [
        { from: path.resolve(__dirname, 'public/locales'), to: 'locales' }, // Copies locales to dist/locales
      ],
    }),
  ],
  // Sets up the development server configuration.
  devServer: {
    // necessary when using routes with react-router
    historyApiFallback: true,
    // Specifies the directory where the static files are located.
    static: {
      directory: path.resolve(__dirname, 'public'), // Use path.resolve for absolute paths
    },
    // Enables Hot Module Replacement, which allows for modules to be updated at runtime without a full refresh.
    hot: true,
    // Automatically opens the app in the browser when the server starts.
    open: true,
  },
  // Configures module resolution.
  // You can create aliases to import or require certain modules more easily.
  resolve: {
    alias: {
      components: path.resolve(__dirname, 'src/components'),
      utils: path.resolve(__dirname, 'src/utils'),
      // not strictly necessary, but it's good for consistency
      'test-utils': path.resolve(__dirname, 'src/test-utils/test-utils.tsx'),
      hooks: path.resolve(__dirname, 'src/hooks'),
    },
  },
};
