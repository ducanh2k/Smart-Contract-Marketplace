// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MyToken1 is ERC20 {
    constructor() ERC20("MyToken1", "MTK") {}

    function mintToken(address _to, uint256 _amount) public {
        _mint(_to, _amount);
    }
}
