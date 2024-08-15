// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./MyNFT.sol";

contract MyVault {
    IERC20 public token;
    MyNFT public nftContract;
    uint256 public constant MINT_THRESHOLD = 10000*10**18;

    mapping(address => uint256) public deposits;

    constructor(address _tokenAddress, address _nftContractAddress) {
        token = IERC20(_tokenAddress);
        nftContract = MyNFT(_nftContractAddress);
    }

    mapping(address => bool) public hasMinted;

    function deposit(uint256 amount) public {
        require(amount > 0, "Amount must be greater than 0");
        // require(!hasMinted[msg.sender], "NFT already minted");

        require(
            token.transferFrom(msg.sender, address(this), amount),
            "Token transfer failed"
        );

        deposits[msg.sender] += amount;

        if (deposits[msg.sender] >= MINT_THRESHOLD) {
            nftContract.mintNFT(msg.sender);
            hasMinted[msg.sender] = true;
        }
    }
}
