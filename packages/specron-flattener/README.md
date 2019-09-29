```js
import { Flattener } from '.';

const flattener = new Flattener();
flattener.source('./src/tests/assets/*.sol');
flattener.source('./src/tests/assets/*.sol');

if (await flattener.flatten()) {
  flattener.save('./build/foo');
  console.log('Done!');
} else {
  console.log('Errors:', JSON.stringify(compiler.output, null, 2));
}
flattener.clear();
```
