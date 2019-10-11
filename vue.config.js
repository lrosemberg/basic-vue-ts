const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ContextReplacementPlugin = require('webpack/lib/ContextReplacementPlugin');
const path = require('path');
const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
    publicPath: '',
    configureWebpack: {
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: isProduction ? '[name].[chunkhash].js' : '[name].[hash].js',
        },
        module: {
            rules: [
                {
                    test: /\.html$/,
                    loader: 'html-loader',
                    exclude: ['/index.html/']
                },
                {
                    test: /\.(jpg|png|gif)$/,
                    loader: 'file-loader?name=assets/img/[name].[ext]'
                },
                {
                    test: /\.(eot|svg|ttf|woff|woff2)$/,
                    loader: 'file-loader?name=fonts/[name].[ext]'
                }
            ]
        },
        resolve: {
            extensions: ['.ts', '.js', '.html'],
            alias: {
                vue$: 'vue/dist/vue.esm.js'
            }
        },
        optimization: {
            minimizer: [new TerserPlugin()],
            splitChunks: {
                chunks: 'all',
            }
        },
        plugins: [
            new HtmlWebpackPlugin({
                inject: true,
                template: './public/index.html',
                favicon: './public/favicon.ico',
                minify: isProduction ? {
                    removeComments: true,
                    collapseWhitespace: true,
                    removeRedundantAttributes: true,
                    useShortDoctype: true,
                    removeEmptyAttributes: true,
                    removeStyleLinkTypeAttributes: true,
                    keepClosingSlash: true,
                    minifyJS: true,
                    minifyCSS: true,
                    minifyURLs: true
                } : false
            }),
            new CompressionPlugin({
                test: /\.min\.js$/
            }),
            new CopyWebpackPlugin([
                {
                    from: 'src/assets',
                    to: './assets'
                }
            ]),
            new ContextReplacementPlugin(/moment[\/\\]locale$/, /pt-br|en/)
        ]
    }
};