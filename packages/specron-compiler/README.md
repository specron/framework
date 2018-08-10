```js
import { Compiler } from '.';

const compiler = new Compiler();
compiler.source('./src/tests/assets/*.sol');
compiler.source('./src/tests/assets/*.sol');

if (compiler.compile()) {
  compiler.save('./build/foo');
  console.log('Done!');
} else {
  console.log('Errors:', JSON.stringify(compiler.output, null, 2));
}
compiler.clear();
```
