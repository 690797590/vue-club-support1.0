module.exports = {
    devServer: {
        port: 8083,     // 端口
        proxy: {
            '/api': {
                target: 'https://blog.dulaoshi.club/', //对应自己的接口
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/apiTest': ''
                }
            }
        }
    },
    publicPath: '/',
    outputDir: 'dist',
};