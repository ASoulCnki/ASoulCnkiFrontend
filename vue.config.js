'use strict'
const path = require('path')
const settings = require('./src/settings.js')

function resolve(dir) {
    return path.join(__dirname, dir)
}

const name = settings.title || '枝网查重'
const port = process.env.port || 8888 // dev port

module.exports = {
    publicPath: '/',
    outputDir: 'dist',
    assetsDir: 'static',
    productionSourceMap: false,
    devServer: {
        port: port,
        open: true,
        overlay: {
            warnings: false,
            errors: true
        },
        // before: require('./mock/mock-server.js')
    },
    configureWebpack: {
        name: name,
        resolve: {
            alias: {
                '@': resolve('src')
            }
        }
    },
    chainWebpack: config => {
        config.module.rule('url-loader').test(/\.(cur)(\?.*)?$/).use('url-loader').loader('url-loader').end();
    }
}
