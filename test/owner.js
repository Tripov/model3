const Contract = artifacts.require("Init_contract");

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
// accounts: string[]
contract("Contract", function (accounts) {
  it("should assert true", async function () {
    await Contract.deployed();
    return assert.isTrue(true);
  });
  it("createUser good", async function() {
    const instance = await Contract.deployed();
    await instance.createUser(accounts[0]);
    const addr = await instance.logins(accounts[0]);
    if (addr === accounts[0]) {
      return assert.isTrue(true);
    }
    return assert.isTrue(false)
  })
  it("createUser bad (non address)", async function() {
    const instance = await Contract.deployed();
    try {
      await instance.createUser();
      return assert.isTrue(false)
    }
    catch (e) {
      return assert.isTrue(true);
    }
  })
  it("createUser bad (two times)", async function() {
    const instance = await Contract.deployed();
    try {
      await instance.createUser(accounts[0]);
      await instance.createUser(accounts[0]);
      return assert.isTrue(false)
    }
    catch (e) {
      return assert.isTrue(true);
    }
  })
  it("updateWhiteList good", async function() {
    const instance = await Contract.deployed();
    await instance.updateWhiteList(accounts[0]);
    const inWhitelist = await instance.whiteList(accounts[0]);
    return assert.isTrue(inWhitelist);
  })
  it("updateWhiteList bad (two times)", async function() {
    const instance = await Contract.deployed();
    try {
      await instance.updateWhiteList(accounts[0]);
      return assert.isTrue(false);
    }
    catch (e) {
      return assert.isTrue(true);
    }
  })
  it("sellProduct good", async function() {
    const instance = await Contract.deployed();
    await instance.createProduct("name", 1, "");
    await instance.sellProduct(0);
    return assert.isTrue(true);
  })
  it("sellProduct bad (two times)", async function() {
    const instance = await Contract.deployed();
    try {
      await instance.sellProduct(0);
      return assert.isTrue(false);
    }
    catch (e) {
      return assert.isTrue(true);
    }
  })
});