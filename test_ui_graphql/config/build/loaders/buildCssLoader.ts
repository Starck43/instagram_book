import MiniCssExtractPlugin from "mini-css-extract-plugin"


export function buildCssLoader(isDev: boolean) {
    return {
        test: /\.s?[ac]ss$/i,
        use: [
            // Creates `style` nodes from JS strings
            !isDev
                ? {
                    loader: MiniCssExtractPlugin.loader,
                    options: {},
                }
                : "style-loader",
            {
                // Translates CSS into CommonJS
                loader: "css-loader",
                options: {
                    esModule: true,
                    modules: {
                        auto: (resPath: string) => Boolean(resPath.includes(".module.")),
                        // different *.module.css classes names for dev or prod mode
                        localIdentName: isDev
                            ? "[path][name]__[local]--[hash:base64:5]"
                            : "[hash:base64:8]",
                        exportLocalsConvention: "camelCase",
                    },
                },
            },
            // Compiles Sass to CSS
            "sass-loader",
        ],
    }
}
