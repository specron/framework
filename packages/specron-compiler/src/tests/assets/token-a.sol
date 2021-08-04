pragma solidity 0.8.0;

import "./token-b.sol";

/**
 * Overriding contract.
 */
contract Token1 is Token2 {} // This contract overrides token b
