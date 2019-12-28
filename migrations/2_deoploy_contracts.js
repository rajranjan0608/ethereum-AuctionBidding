const TenderAuction = artifacts.require("TenderAuction");

module.exports = function(deployer) {
	deployer.deploy(TenderAuction);
};