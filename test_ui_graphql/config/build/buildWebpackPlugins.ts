import webpack from "webpack"
import HtmlWebpackPlugin from "html-webpack-plugin"
import MiniCssExtractPlugin from "mini-css-extract-plugin"
import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin"

import {BuildWebpackOptions} from "./types/config"


export function buildWebpackPlugins({
    isDev,
    paths,
    cssFilename,
    cssChunkFilename,
    apiUrl,
}: BuildWebpackOptions): webpack.WebpackPluginInstance[] {
    const plugins = [
        new HtmlWebpackPlugin({template: paths.html}),
        new webpack.ProgressPlugin(),
        new webpack.DefinePlugin({
            __IS_DEV__: JSON.stringify(isDev),
            __API__: JSON.stringify(apiUrl),
        }),
    ]

    if (isDev) {
        plugins.push(new ReactRefreshWebpackPlugin({overlay: false}))
        plugins.push(new webpack.HotModuleReplacementPlugin())
    } else {
        plugins.push(new MiniCssExtractPlugin({
            filename: cssFilename,
            chunkFilename: cssChunkFilename,
            experimentalUseImportModule: true,
        }))
    }

    return plugins
}
