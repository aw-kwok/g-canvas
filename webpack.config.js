const path = require('path');
// const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: {
        background: './src/background.js',
        content: './src/content.js',
        popup: './src/popup.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    }
    // plugins: [
    //     new CopyWebpackPlugin({
    //         patterns: [
    //             { from: 'src/popup.html', to: 'popup.html' },
    //             { from: 'src/styles.css', to: 'styles.css' },
    //             { from: 'src/gcal.js', to: 'gcal.js' }
    //         ]
    //     })
    // ]
};
