const path = require('path');
     const webpack = require('webpack');

     module.exports = {
       entry: './src/App.tsx',
       mode: 'development',
       module: {
         rules: [
           {
             test: /\.[jt]sx?$/,
             loader: 'babel-loader',
             options: {
               presets: [
                 '@babel/preset-env',
                 '@babel/preset-react',
                 '@babel/preset-typescript',
               ],
             },
           },
         ],
       },
       resolve: {
         extensions: ['.tsx', '.ts', '.js'],
         alias: {
           'react-native$': 'react-native-web',
         },
       },
       output: {
         path: path.resolve(__dirname, 'dist'),
         filename: 'bundle.js',
       },
       devServer: {
         static: path.join(__dirname, 'public'),
         compress: true,
         port: 3000,
       },
       plugins: [
         new webpack.DefinePlugin({
           'process.env.NODE_ENV': JSON.stringify('development'),
           __DEV__: true,
         }),
       ],
     };