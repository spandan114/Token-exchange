const { expect } = require("chai");

describe("Token",  async () => {
    // const accounts = await ethers.getSigners();  
    // for (const account of accounts) {
    //     console.log(account.address);
    //   }

      const Token = await ethers.getContractFactory("Token"); //create instance
      const hardhatToken = await Token.deploy();//Deploy contract
      describe('Deployment', () => {
      it("Name should be SJ", async ()=>{
        expect(await hardhatToken.name()).to.equal('SJ')
      })
    })

})