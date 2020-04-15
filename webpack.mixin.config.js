const path = require('path');
const webpack = require('webpack');
const merge = require("webpack-merge");
const FriendlyErrorsPlugin = require("friendly-errors-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');


if (!process.env.NODE_ENV) {
    process.env.NODE_ENV =
        process.argv.indexOf("-p") !== -1 ? "production" : "development";
}
const mode = process.env.NODE_ENV;

const CLIENT_OUTPUT_DIR = "/mixin_build";
const CLIENT_ENTRY_DIR = "/mixin_src";
const nodeModules = path.resolve(__dirname, 'node_modules');

const baseConfig = {
    mode,

    entry: {
        "main4v": path.join(__dirname, CLIENT_ENTRY_DIR, 'main4v.js'),
        "main5v": path.join(__dirname, CLIENT_ENTRY_DIR, 'main5v.js'),
    },

    output: {
        filename: "[name].bundle.js",
        path: path.join(__dirname, CLIENT_OUTPUT_DIR),
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
            }
        ]
    },
    stats: {
        colors: true
    },
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
        // entry: {
        //     "libs": path.join(nodeModules, 'pixi.js/dist', 'pixi.min.js'),
        // },
        output: {
            path: CLIENT_OUTPUT_DIR,
        },
        plugins: [
            new webpack.DefinePlugin({
                "process.env.DEV_SERVER": "true"
            }),
        ],
        devServer: {
            port: 8080,
            contentBase: path.join(__dirname, 'example'),
            publicPath: CLIENT_OUTPUT_DIR,
            // noInfo: false
        }
    });
}
module.exports = webpackConfig;