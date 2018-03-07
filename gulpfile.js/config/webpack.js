/**
 * Exports function used to generate Webpack config. Can provide an 'environment' string, specifying 'development',
 * 'production' or 'test'.
 */
var
    path = require("path"),
    webpack = require("webpack"),
    config = require("../config")
;

//TODO read through docs for new Webpack config options
var webpackConfig = {
    entry: './src/main/js/app.jsx',
    mode: 'development', //TODO set via build params
    devtool: 'source-map',
    output: {
        path: path.resolve(config.buildDir),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules)/,
                loader: 'babel-loader',
                query: {
                    cacheDirectory: true,
                    presets: ['es2015', 'react']
                }
            }
        ]
    },
    plugins: []
};

module.exports = webpackConfig;


