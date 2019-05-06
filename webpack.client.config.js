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
const OUTPUT_DIR = (mode === "development") ? '/' : "/statik";
const nodeModules = path.resolve(__dirname, 'node_modules');

const baseConfig = {
    mode,

    entry: {
        "main": path.join(__dirname, ENTRY_DIR, 'main.js'),
    },

    output: {
        filename: "[name].bundle.js",
        path: path.join(__dirname, OUTPUT_DIR),
        publicPath: "/"
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
                test: /\.png$/,
                loader: "url-loader"
            },
            {
                test: /\.html$/,
                loader: 'html-loader'
            }
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
        })
    ]
};

let devConfig = baseConfig;
if (process.env.NODE_ENV === "development") {
    devConfig = merge(baseConfig, {
        devtool: "source-map",
        plugins: [new FriendlyErrorsPlugin()]
    });
}

const isDevServer = process.argv.find(
    arg => arg.indexOf("webpack-dev-server") > -1
);

let webpackConfig = devConfig;
if (isDevServer) {
    webpackConfig = merge(devConfig, {
        entry: {
            "libs": path.join(nodeModules, 'pixi.js/dist', 'pixi.min.js'),
        },
        output: {
            path: OUTPUT_DIR,
        },
        plugins: [
            new webpack.DefinePlugin({
                "process.env.DEV_SERVER": "true"
            }),
        ],
        devServer: {
            port: process.env.PORT || 8080,
            contentBase: path.join(__dirname, 'example'),
            publicPath: OUTPUT_DIR,
            // noInfo: false
        }
    });
}
module.exports = webpackConfig;
