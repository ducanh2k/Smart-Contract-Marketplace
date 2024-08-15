import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
export default buildModule("MyToken1", (m) => {
  const myToken = m.contract("MyToken1");
  return { myToken};
});
