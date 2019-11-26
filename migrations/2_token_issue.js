const DatariusToken = artifacts.require("DatariusToken");

module.exports = function(deployer) {
  deployer.deploy(DatariusToken);
};
