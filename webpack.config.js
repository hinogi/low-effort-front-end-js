const path = require('path');

module.exports = {
  entry: './src/main.ts',
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    path: path.resolve(__dirname,"dist"),
    filename: 'low-effort-front-end.js',
    library: {
        name: 'LowEffortFrontEnd',
        type: 'var',
        export: 'default',
      }
    }
};