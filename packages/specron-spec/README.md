```ts
import { Spec, Contract } from '@specron/core';

interface Data {
  id?: number;
  name?: string;
  User?: Contract;
}

const spec = new Spec<Data>();

spec.before(async (ctx) => {
  ctx.set('id', 100);
  ctx.set('web3', context.web3);
  ctx.set('accounts', await context.getAccounts());
  ctx.set('User', await context.requireContract({ str: './src/contracts/User' }));
});

export default spec;
```
