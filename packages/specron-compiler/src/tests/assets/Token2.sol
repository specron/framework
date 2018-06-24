pragma solidity ^0.4.24;

import "@0xcert/ethereum-utils/contracts/math/SafeMath.sol";

contract Token2 {
  using SafeMath for uint256;

  function test () 
    public
    pure
    returns (uint256 _value)
  {
    uint256 a = 123456;
    uint256 b = a.add(1);
    _value = b;
  }

}
