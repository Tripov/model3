const Contract = artifacts.require("Contract");
module.exports = function(_deployer) {
  _deployer.deploy(Contract)
};
