/* eslint-env node */
/* eslint-disable import/no-commonjs,import/no-nodejs-modules */
const webpack = require("webpack");
const merge = require("webpack-merge");
const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const FriendlyErrorsPlugin = require("friendly-errors-webpack-plugin");
const { VueLoaderPlugin } = require("vue-loader");
const HtmlWebpackPlugin = require('html-webpack-plugin');


if (!process.env.NODE_ENV) {
    process.env.NODE_ENV =
        process.argv.indexOf("-p") !== -1 ? "production" : "development";
}
const mode = process.env.NODE_ENV;

const ENTRY_DIR = '/client_src';
const OUTPUT_DIR = '/app_src/main-win/client';
const nodeModules = path.resolve(__dirname, 'node_modules');

const baseConfig = {
    mode,

    watch: true,

    entry: {
        "main": path.join(__dirname, ENTRY_DIR, 'main.js'),
    },

    output: {
        filename: "[name].bundle.js",
        path: path.join(__dirname, OUTPUT_DIR),
        publicPath: ""
    },

    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.vue$/,
                loader: "vue-loader",
                include: path.join(__dirname, ENTRY_DIR),
                options: {
                    loaders: {
                        scss: ["style-loader", "css-loader", "sass-loader"]
                    }
                }
            },
            {
                test: /\.scss$/,
                loaders: ["style-loader", "css-loader", "sass-loader"]
            },
            {
                test: /\.(png|jpg)$/,
                loader: "url-loader",
            },
            {
                test: /\.html$/,
                loader: 'html-loader'
            },
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV),
                DEBUG_DEVTOOLS_RX: JSON.stringify(process.env.DEBUG_DEVTOOLS_RX)
            }
        }),
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            title: 'PixiJs remoute helper',
            filename: 'main.html',
            template: path.join(__dirname, ENTRY_DIR, 'main.html'),
        }),
    ]
};

let devConfig = baseConfig;
if (process.env.NODE_ENV === "development") {
    devConfig = merge(baseConfig, {
        devtool: "source-map",
        plugins: [new FriendlyErrorsPlugin()]
    });
}

module.exports = devConfig;
