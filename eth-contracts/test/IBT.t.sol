// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "forge-std/Test.sol";
import "../src/IBT.sol"; // Adjust path as needed

contract IBTTest is Test {
    IBT public ibt;
    address public owner = address(this); // Using the test contract's address as owner for simplicity
    address public user = address(0x1); // Some arbitrary address

    function setUp() public {
        ibt = new IBT();
        // Mint some tokens to the user address for testing
        ibt.mint(user, 100e18); // Minting 100 IBT tokens to user
    }

    function testBurn() public {
        uint256 initialBalance = ibt.balanceOf(user);
        uint256 burnAmount = 50e18;

        // Only the owner can burn, so we're calling it directly from this test contract since we're the owner
        ibt.burn(user, burnAmount);

        // Check if the balance has decreased by the burn amount
        assertEq(ibt.balanceOf(user), initialBalance - burnAmount, "Burn amount incorrect");
        // Check total supply has decreased
        assertEq(ibt.totalSupply(), 100e18 - burnAmount, "Total supply not decreased");
    }
}