const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  entry: './index.web.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.[contenthash].js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules\/(?!(react-native-vector-icons|@react-navigation|react-native-gesture-handler|react-native-reanimated)\/).*/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react',
              '@babel/preset-typescript',
              'module:metro-react-native-babel-preset',
            ],
            plugins: ['react-native-web', 'react-native-reanimated/plugin'],
          },
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.ttf$/,
        type: 'asset/resource',
      },
    ],
  },
  resolve: {
    alias: {
      'react-native$': 'react-native-web',
      'react-native-linear-gradient': path.resolve(__dirname, 'src/components/LinearGradient.web.js'),
      '@react-native-async-storage/async-storage': '@react-native-async-storage/async-storage',
      'react-native-geolocation-service': path.resolve(__dirname, 'src/services/locationService.web.js'),
      // Mock native gesture handler modules for web
      'react-native-gesture-handler/lib/module/handlers/NativeViewGestureHandler': path.resolve(__dirname, 'src/mocks/NativeViewGestureHandler.js'),
      'react-native-gesture-handler/lib/module/web/handlers/NativeViewGestureHandler': path.resolve(__dirname, 'src/mocks/NativeViewGestureHandler.js'),
      'react-native-gesture-handler/lib/module/web_hammer/NativeViewGestureHandler': path.resolve(__dirname, 'src/mocks/NativeViewGestureHandler.js'),
      'react-native-gesture-handler/lib/module/handlers/gestures/nativeGesture': path.resolve(__dirname, 'src/mocks/nativeGesture.js'),
    },
    extensions: ['.web.tsx', '.web.ts', '.web.js', '.tsx', '.ts', '.js', '.jsx', '.json'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
    new webpack.DefinePlugin({
      __DEV__: JSON.stringify(process.env.NODE_ENV !== 'production'),
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
    }),
    new webpack.ContextReplacementPlugin(
      /react-native-worklets/,
      (data) => {
        delete data.dependencies[0].critical;
        return data;
      }
    ),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    compress: true,
    port: 3000,
    hot: true,
    historyApiFallback: true,
    open: true,
  },
};
