import type {CodegenConfig} from '@graphql-codegen/cli';

const config: CodegenConfig = {
    overwrite: true,
    schema: "http://152.228.215.94:83/api",
    documents: ["src/**/*.graphql"],
    generates: {
        "src/graphql/": {
            preset: "client",
            plugins: [
                // "typescript",
            ],
        },
        "./graphql.schema.json": {
            plugins: ["introspection"]
        }
    }
};

export default config;
