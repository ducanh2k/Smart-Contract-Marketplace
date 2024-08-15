// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MyToken is ERC20 {
    uint256 public tokenCounter;

    constructor() ERC20("MyToken", "MTK") {
        tokenCounter = 0;
    }

    event TestEvent(address indexed _to, uint256 _amount);

    function mintToken(address _to, uint256 _amount) public {
        _mint(_to, _amount);
        tokenCounter++;
        emit TestEvent(_to, _amount);
    }
}
