module.exports = {
    lintOnSave: false,
    productionSourceMap: false,
    transpileDependencies: [
        'vuetify'
    ],
    configureWebpack: {
        devServer: {
            open: true
        }
    }
}