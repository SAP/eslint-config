const eslintPluginPrettierRecommended = require("eslint-plugin-prettier/recommended");
const baseConfig = require("./base");
const tsConfig = require("./typescript");
const reactConfig = require("./react");

module.exports.configs = {
  recommended: [...baseConfig, ...tsConfig, ...reactConfig, eslintPluginPrettierRecommended],
};

module.exports.withCustomConfig = (customConfigs) => {
  return [...baseConfig, ...tsConfig, ...reactConfig, ...customConfigs, eslintPluginPrettierRecommended];
};
