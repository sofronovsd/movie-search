const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = () => {

    const config = {
        node: {
            fs: 'empty'
        },
        devtool: 'source-map',
        entry: './src/script.js',
        output: {
            path: path.join(__dirname, '/dist'),
            filename: 'script.js'
        },

        module: {
            rules: [
                {
                    enforce: 'pre',
                    test: /\.js$/,
                    exclude: /node_modules/,
                    loader: 'eslint-loader',
                    options: {
                        fix: true,
                    },
                },
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env']
                        }
                    }
                },
                {
                    test: /\.scss$/,
                    use: [MiniCssExtractPlugin.loader, 'css-loader', 'resolve-url-loader', 'sass-loader']
                },
                {
                    test: /\.(png|jpe?g|gif|svg|env)$/i,
                    use: [
                        {
                            loader: 'file-loader'
                        },
                    ],
                }
            ]
        },

        plugins: [
            new CleanWebpackPlugin(),
            new Dotenv(),
            new CopyPlugin([
                {
                    from: './src/img', to: './img'
                },
            ]),
            new HtmlWebpackPlugin({
                template: './src/index.html'
            }),
            new MiniCssExtractPlugin({
                filename: 'style.css'
            }),
        ],

        devServer: {
            port: 8080,
            contentBase: path.join(__dirname, 'dist'),
        }

    };

    return config;
};
