/**
 * Exports function used to generate Webpack config. Can provide an 'environment' string, specifying 'development',
 * 'production' or 'test'.
 */
var
    path = require("path"),
    webpack = require("webpack")
;

var config = require("../config")(env);

var webpackConfig = {

    context: config.jsSource,
    entry: {
        //TODO
    },
    output: {
        path: config.jsBuild,
        filename: '[name].bundle.js'/*,
			library:       '[name]'*/
    },
    module: {
        loaders: []
    },
    devtool: "source-map",
    plugins: []
};

// Factor out common dependencies into a shared.js
webpackConfig.plugins.push(new webpack.optimize.CommonsChunkPlugin({
    name: 'shared',
    filename: 'shared.js'
}));

webpackConfig.devtool = 'source-map';
webpack.debug = true;

webpackConfig.plugins.push(
    new webpack.DefinePlugin({
        'process.env': {
            'NODE_ENV': JSON.stringify('production')
        }
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.NoErrorsPlugin()
);

module.exports = webpackConfig;


