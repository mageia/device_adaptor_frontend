var path = require('path')

module.exports = {
    baseUrl: '/',
    // 输出文件目录
    outputDir: 'dist',
    // eslint 是否保存时检查
    lintOnSave: true,
    // use the full build with in-browser compiler?
    // https://vuejs.org/v2/guide/installation.html#Runtime-Compiler-vs-Runtime-only
    // compiler: false,
    // webpack配置
    // see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
    chainWebpack: () => {},
    configureWebpack: () => {

    },
    // vue-loader 配置项
    // https://vue-loader.vuejs.org/en/options.html
    // vueLoader: {},
    // 生产环境是否启用 source map 文件
    productionSourceMap: true,
    // css相关配置
    css: {
        // 是否使用css分离插件 ExtractTextPlugin
        extract: true,
        // 是否开启css source map
        sourceMap: false,
        // css预设器配置项
        loaderOptions: {},
        // 是否启用css modules for all css / pre-processor files
        modules: false
    },
    // use thread-loader for babel & TS in production build
    // enabled by default if the machine has more than 1 cores
    parallel: require('os').cpus().length > 1,
    // 是否启用dll
    // dll: false,
    // pwa 插件相关配置
    pwa: {},
    // webpack dev server 相关配置
    devServer: {
        contentBase: path.resolve(__dirname, './src'),
        progress: true,
        stats: {
            color: true
        },
        host: '0.0.0.0',
        port: '8080',
        https: false,
        hotOnly: false,
        proxy: {
            '/*': {
                target: 'http://localhost:8080',
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    '^/interface': ''
                }
            }
        },
        before: app => {}
    },
    // 第三方插件
    pluginOptions: {

    }
}