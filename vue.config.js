module.exports = {
  "publicPath": "/",
  "outputDir": "dist",
  "lintOnSave": true,
  "productionSourceMap": true,
  "css": {
    "extract": true,
    "sourceMap": false,
    "loaderOptions": {},
    "modules": false
  },
  "parallel": true,
  "pwa": {},
  "devServer": {
    "contentBase": "/Users/mageia/Dropbox/Workspace/GoProject/device_adaptor/frontend/src",
    "progress": true,
    "stats": {
      "color": true
    },
    "https": false,
    "hotOnly": false,
    "proxy": {
      "/*": {
        "target": "http://localhost:8080",
        "ws": true,
        "changeOrigin": true
      }
    }
  },
  "pluginOptions": {},
  "transpileDependencies": [
    "vuetify"
  ]
}