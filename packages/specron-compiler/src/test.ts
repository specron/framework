// import { Compiler } from '.';

// const compiler = new Compiler();
// compiler.source('./src/tests/assets/*.sol');
// compiler.source('./src/tests/assets/*.sol');

// if (compiler.compile()) {
//   compiler.save('./build/foo');
//   console.log('Done!');
// } else {
//   console.log('Errors:', JSON.stringify(compiler.output, null, 2));
// }


import * as parser from 'solidity-parser-antlr';
 
var input = `
    contract test {
      /**
       * @dev Returns fake value.
       * @param value Multiploer value.
       */
      function test () 
        public
        pure
        returns (uint256 _value)
      {
        _value = 123;
      }
    }
`;

try {
  const a = parser.parse(input, { loc: true, range: true, tolerant: true });
  console.log('XX', a);
} catch (e) {
  console.log(e.errors);
}
