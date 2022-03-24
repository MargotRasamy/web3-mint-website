// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;

import '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import '@openzeppelin/contracts/access/Ownable.sol';

contract RoboPunksNFT is ERC721, Ownable {
    uint public mintPrice;
    // Number of NFTs we are minting
    uint public totalSupply;
    // Max number of NFTs in the collection
    uint public maxSupply;
    // Max number of NFTs that a wallet can have
    uint public maxPerWallet;
    // determines when user can mint
    bool public isPublicMintEnabled;
    // determines the url that opensea can use to find the images
    string internal baseTokenUri;

    address payable public withdrawWallet; 

    mapping(address => uint) public walletMints;
    
    // ERC721(name, initials)
    constructor() payable ERC721('RoboPunks', 'RP') {
        mintPrice = 0.02 ether;
        totalSupply = 0;
        maxSupply = 1000;
        maxPerWallet = 3;
        // set withdraw wallet address;
        withdrawWallet = payable(0xBc9B9915abbef151F8963cfCFC9DC432E8FCeA34);
    }

    function setIsPublicMintEnabled(bool _isPublicMintEnabled) external onlyOwner {
        isPublicMintEnabled = _isPublicMintEnabled;
    } 

    function setBaseTokenUri(string calldata _baseTokenUri) external onlyOwner {
        baseTokenUri = _baseTokenUri;
    }

    function tokenURI(uint tokenId_) public view override returns (string memory) {
        require(_exists(tokenId_), 'Token does not exist!');
        return string(abi.encodePacked(baseTokenUri, Strings.toString(tokenId_), ".json "));
    }

    function withdraw() external onlyOwner {
        (bool success, ) = withdrawWallet.call{ value: address(this).balance } ('');
        require(success, 'withdraw failed');
    }

    function mint(uint quantity_) public payable {
        require(isPublicMintEnabled, 'minting not enabled');
        require(msg.value == quantity_ * mintPrice, 'wrong mint value');
        require(totalSupply + quantity_ <= maxSupply, 'sold out');
        require(walletMints[msg.sender] + quantity_ <= maxPerWallet, 'exceeded max wallet, you cant mint that much');
    
        for (uint i = 0; i< quantity_; i++) {
            uint newTokenId = totalSupply + 1;
            totalSupply++;
            _safeMint(msg.sender, newTokenId);
        }
    }
}
