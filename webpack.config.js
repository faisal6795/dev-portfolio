const path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: './main.js',
    mode: 'production',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.js',
        publicPath: '',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            },
            {
                test: /\.html$/,
                loader: 'html-loader',
                options: {
                    minimize: true,
                    attributes: {
                        list: [
                            '...',
                            {
                                tag: 'img',
                                attribute: 'data-src',
                                type: 'src',
                            },
                            {
                                tag: 'link',
                                attribute: 'href',
                                type: 'src',
                            },
                            {
                                tag: 'a',
                                attribute: 'href',
                                type: 'src',
                            },
                        ],
                    },
                },
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader',
                ],
            },
            {
                test: /\.(svg|png|jpe?g|gif|pdf|webmanifest)$/,
                loader: 'file-loader',
                options: {
                    outputPath: 'assets',
                    esModule: false
                },
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "index.html",
            minify: true,
        })
    ]
}