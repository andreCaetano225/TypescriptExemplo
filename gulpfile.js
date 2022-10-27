"use strict";

const build = require("@microsoft/sp-build-web");
const path = require("path");
build.addSuppression(
  `Warning - [sass] The local CSS class 'ms-Grid' is not camelCase and will not be type-safe.`
);
build.configureWebpack.mergeConfig({
  additionalConfiguration: (generatedConfiguration) => {
    generatedConfiguration.resolve.alias = {
      shared: path.resolve(__dirname, "./lib/shared/"),
    };
    return generatedConfiguration;
  },
});
var getTasks = build.rig.getTasks;
build.rig.getTasks = function () {
  var result = getTasks.call(build.rig);

  result.set("serve", result.get("serve-deprecated"));

  return result;
};

build.initialize(require("gulp"));
