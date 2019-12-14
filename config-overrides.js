//安装react-app-rewired取代react-scripts，可扩展webpack的配置 ，类似vue.config.js
//根目录创建config-overrides.js



//override 返回一个函数，该函数返回对象将作为webpack的配置对象
const { override, fixBabelImports,addDecoratorsLegacy} = require("customize-cra");
module.exports = override(
    fixBabelImports("import", {
        libraryName: "antd",
        libraryDirectory: "es",
        style: "css"
    }),
    addDecoratorsLegacy()
);