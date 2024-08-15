import { expect } from "chai";
import { ethers } from "hardhat";
import { MyNFT } from "../typechain-types";

describe("MyContract", () => {
  it("Should mint a new Token", async function () {
    const MyContract = await ethers.getContractFactory("MyToken");
    const myContract = await MyContract.deploy();

    const address = "0xCA915780d6d9b48bC2803E4a7AB983779e65F128";
    const transaction = await myContract.mintToken(address, 5000);
    await transaction.wait();
  });
});


describe("MyNFT Contract", function () {
  let myNFT: MyNFT;
  let owner: any, addr1: any;

  beforeEach(async function () {
    const MyNFTFactory = await ethers.getContractFactory("MyNFT");
    [owner, addr1] = await ethers.getSigners();

    myNFT = (await MyNFTFactory.deploy()) as MyNFT;
  });

  it("Should have correct name and symbol", async function () {
    expect(await myNFT.name()).to.equal("MyNFT");
    expect(await myNFT.symbol()).to.equal("MNFT");
  });

  it("Should mint a new NFT and increment tokenCounter", async function () {
    const initialCounter = await myNFT.tokenCounter();
    expect(initialCounter).to.equal(0);

    const mintTx = await myNFT.mintNFT(owner.address);
    await mintTx.wait();

    const newCounter = await myNFT.tokenCounter();
    expect(newCounter).to.equal(1);

    expect(await myNFT.ownerOf(0)).to.equal(owner.address);
  });

  it("Should mint multiple NFTs", async function () {
    await myNFT.mintNFT(owner.address);
    await myNFT.mintNFT(addr1.address);

    expect(await myNFT.tokenCounter()).to.equal(2);
    expect(await myNFT.ownerOf(0)).to.equal(owner.address);
    expect(await myNFT.ownerOf(1)).to.equal(addr1.address);
  });

  it("Should transfer NFT from one address to another", async function () {
    await myNFT.mintNFT(owner.address);

    await myNFT["safeTransferFrom(address,address,uint256)"](
      owner.address,
      addr1.address,
      0
    );

    expect(await myNFT.ownerOf(0)).to.equal(addr1.address);
  });
});
