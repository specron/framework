// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.5.11;

import "@0xcert/ethereum-utils-contracts/src/contracts/utils/address-utils.sol";

contract Token2 {

  /**
   * @dev Returns fake value.
   * @param _value Multiploer value.
   */
  function test () 
    public
    pure
    returns (uint256 _value)
  {
    uint256 a = 123456;
    uint256 b = a + 1;
    _value = b;
  }

}
