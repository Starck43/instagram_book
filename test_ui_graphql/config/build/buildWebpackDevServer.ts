import type {Configuration as DevServerConfiguration} from "webpack-dev-server"
import {BuildWebpackOptions} from "./types/config"

export function buildWebpackDevServer(options: BuildWebpackOptions): DevServerConfiguration {
    return {
        port: options.port,
        open: true,
        historyApiFallback: true,
        hot: true,
    }
}
