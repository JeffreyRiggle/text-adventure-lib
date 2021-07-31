const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: './src/index.js',
    mode: 'production',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: './[name].js',
        libraryTarget: 'umd',
        library: 'textAdventureLib'
    },
    module: {
        rules: [
            {
                test: /\.js$|.jsx$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, "css-loader"],
            },
        ]
    },
    plugins: [new MiniCssExtractPlugin()]
}