pragma solidity 0.6.1;

import "./token-b.sol";

/**
 * Overriding contract.
 */
contract Token1 is Token2 {} // This contract overrides token b
