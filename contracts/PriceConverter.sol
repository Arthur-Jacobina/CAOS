// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@chainlink/contracts/src/v0.8/shared/interfaces/AggregatorV3Interface.sol";

library PriceConverter {
    function getPrice() internal view returns(uint256) {
        // SOLANA DEVNET: 0xec852B2A009f49E4eE4ffEddeDcF81a1AD1bbD6d
        // SOLANA MAINNET: 0x76721563EC3CF5fB94737Eb583F38f3cD166C7Bb
        AggregatorV3Interface priceFeed = AggregatorV3Interface(0xec852B2A009f49E4eE4ffEddeDcF81a1AD1bbD6d); 
        (,int price,,,) = priceFeed.latestRoundData();
        return uint256(price * 1e10);   
    }

    function getVersion() internal view returns(uint256) {
        AggregatorV3Interface priceFeed = AggregatorV3Interface(0xec852B2A009f49E4eE4ffEddeDcF81a1AD1bbD6d);
        return priceFeed.version();
    }

    function getConversionRate(uint256 solAmount) internal view returns(uint256) {
        uint256 solPrice = getPrice();
        uint256 solAmountInUsd = (solPrice * solAmount) / 1e18;
        return solAmountInUsd;
    }
}
