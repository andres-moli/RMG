import type { CodegenConfig } from '@graphql-codegen/cli'
const config: CodegenConfig = {
    overwrite: true,
    // schema: "https://nodejs.softwaretributario.com:6001/graphql",
    // schema: "https://cjjfg4vl-3002.use.devtunnels.ms/graphql",
    // schema: "https://4tpbvf4h-3035.use.devtunnels.ms/graphql",
    schema: "http://localhost:3035/graphql",
    // schema: "https://2dw9tmtv-3035.use2.devtunnels.ms/graphql",
    documents: ['src/domain/graphql/**/*.graphqls'],
    generates: {
        './src/domain/graphql/index.ts': {
            // preset: "client",
            plugins: ['typescript', 'typescript-operations', 'typescript-react-apollo'],
            config: {
              withHooks: true
            }
          }
    }
}

export default config