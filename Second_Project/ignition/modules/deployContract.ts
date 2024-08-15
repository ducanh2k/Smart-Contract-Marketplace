import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
export default buildModule("MyContracts", (m) => {
  const myToken = m.contract("MyToken");
  
  const myNFT = m.contract("MyNFT");

  const myVault = m.contract("MyVault", [myToken, myNFT]);

  return { myToken, myNFT, myVault };
});
