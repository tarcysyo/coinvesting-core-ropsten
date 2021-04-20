// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.0 <0.9.0;

import "./ERC20.sol";
import "./utils/Ownable.sol";

contract CoinvestingDeFiToken is Ownable, ERC20 {
    // Public variables    
    address public devCommunityReserve;
    address public ecosystemGrantsReserve;
    address public foundersAccount1;
    address public foundersAccount2;
    address public RewardsAndBonusLPReserve;
    address public saleReserve;

    // Events
    event Received(address, uint);
    
    // Constructor
    constructor (
        string memory name,
        string memory symbol,
        uint _initialSupply,
        address _devCommunityReserve,
        address _ecosystemGrantsReserve,        
        address _foundersAccount1,
        address _foundersAccount2,
        address _RewardsAndBonusLPReserve,
        address _saleReserve            
    ) payable ERC20 (name, symbol) {
        devCommunityReserve = _devCommunityReserve;
        ecosystemGrantsReserve = _ecosystemGrantsReserve;
        foundersAccount1 = _foundersAccount1;
        foundersAccount2 = _foundersAccount2;
        saleReserve = _saleReserve;
        RewardsAndBonusLPReserve = _RewardsAndBonusLPReserve;        

        if (_initialSupply > 0) {
            require((_initialSupply % 10) == 0, "_initialSupply has to be a multiple of 10!");
            uint fortyFivePerCent = _initialSupply * (45) / (100);
            uint twentyTwoCent = _initialSupply * (22) / (100);
            uint fifteenPerCent = _initialSupply * (15) / (100);
            uint eightPerCent = _initialSupply * (8) / (100); 
            uint fivePerCent = _initialSupply * (5) / (100);          
            
            mint(devCommunityReserve, eightPerCent);

            mint(ecosystemGrantsReserve, twentyTwoCent);

            mint(foundersAccount1, fivePerCent);

            mint(foundersAccount2, fivePerCent);

            mint(RewardsAndBonusLPReserve, fortyFivePerCent);

            mint(saleReserve, fifteenPerCent);   
       
            mintingFinished = true;
        }
    }

    // Receive function 
    receive() external payable {
        emit Received(msg.sender, msg.value);
    }

    // External functions
    function withdraw() external onlyOwner {
        require(address(this).balance > 0, "Insuficient funds!");
        uint amount = address(this).balance;
        // sending to prevent re-entrancy attacks
        address(this).balance - amount;
        payable(msg.sender).transfer(amount);
    }
    
    // Public functions
    function mint(address account, uint amount) public onlyOwner canMint {
        _mint(account, amount);
    }
}
