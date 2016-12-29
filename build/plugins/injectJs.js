/**
 * Created by linxiaojie on 2016/12/16.
 */
function InjectJs (options) {
  this.options = options
}

InjectJs.prototype.apply = function (compiler) {
  let paths = this.options.paths
  compiler.plugin('compilation', function(compilation, options) {
    compilation.plugin('html-webpack-plugin-before-html-processing', function(htmlPluginData, callback) {
      for (var i = paths.length - 1; i >= 0; i--) {
        htmlPluginData.assets.js.unshift(paths[i]);
      }
      callback(null, htmlPluginData);
    });
  });
}

module.exports = InjectJs
