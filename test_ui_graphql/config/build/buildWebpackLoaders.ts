import webpack from "webpack"

import {buildBabelLoader} from "./loaders/buildBabelLoader"
import {buildFileLoader} from "./loaders/buildFileLoader";
import {buildCssLoader} from "./loaders/buildCssLoader"
import {buildSvgLoader} from "./loaders/buildSvgLoader"
import {buildTypescriptLoader} from "./loaders/buildTypescriptLoader"

import {BuildWebpackOptions} from "./types/config"


export function buildWebpackLoaders(options: BuildWebpackOptions): webpack.RuleSetRule[] {
    const babelLoader = buildBabelLoader(options.isDev)
    const typescriptLoader = buildTypescriptLoader()
    const fileLoader = buildFileLoader()
    const svgLoader = buildSvgLoader()
    const stylesLoader = buildCssLoader(options.isDev)

    return [
        fileLoader,
        svgLoader,
        babelLoader,
        typescriptLoader,
        stylesLoader,
    ]
}
