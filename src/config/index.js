const path = require('path');

const android = require('./android');
const ios = require('./ios');
const findAssets = require('./findAssets');

const getRNPMConfig = (folder) =>
  require(path.join(folder, './package.json')).rnpm || {};

/**
 * Returns project config from the current working directory
 * @return {Object}
 */
exports.getProjectConfig = function getProjectConfig() {
  const folder = process.cwd();
  const rnpm = getRNPMConfig(folder);

  return Object.assign({}, rnpm, {
    ios: ios.projectConfig(folder, rnpm.ios || {}),
    android: android.projectConfig(folder, rnpm.android || {}),
  });
};

/**
 * Returns a dependency config from node_modules/<package_name>
 * @param {String} packageName Dependency name
 * @return {Object}
 */
exports.getDependencyConfig = function getDependencyConfig(packageName) {
  const folder = path.join(process.cwd(), 'node_modules', packageName);
  const rnpm = getRNPMConfig(folder);

  return Object.assign({}, rnpm, {
    ios: ios.dependencyConfig(folder, rnpm.ios || {}),
    android: android.dependencyConfig(folder, rnpm.android || {}),
    assets: findAssets(folder, rnpm.assets),
  });
};
