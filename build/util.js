/**
 * Created by linxiaojie on 2016/11/4.
 */
const path = require('path')
const config = require('./webpack/config')
const hasOwnProperty = Object.prototype.hasOwnProperty

exports.assetsPath = function (_path) {
    const assetsSubDirectory = config.assetsSubDirectory;
    return path.posix.join(assetsSubDirectory, _path)
}

exports.mergeOptions = (source, target) => {
    if (typeof source !== 'object') {
        return source
    }
    let keys = Object.keys(source)
    for (let idx in keys) {
        let key = keys[idx]
        if (!hasOwnProperty.call(target, key)) {
            target[key] = source[key]
        }
    }
    return target;
}