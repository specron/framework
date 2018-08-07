import test from 'ava';
import { Sandbox } from '@specron/sandbox';
import * as Web3 from 'web3';
import deploy from '../../helpers/deploy';

const web3 = new (Web3 as any)('http://localhost:8545') as Web3.default;
const sandbox = new Sandbox();

test.before(async () => {
  sandbox.listen(8545);
});

test.after(async () => {
  sandbox.close();
});

test('deploys contract from JSON file', async (t) => {
  const contact = await deploy({
    web3,
    src: './src/tests/assets/Example.json',
  });
  const res = await contact.methods.test().call();
  t.is(res, '123457');
});
