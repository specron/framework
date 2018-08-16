import test from 'ava';
import { Sandbox } from '@specron/sandbox';
import * as Web3 from 'web3';
import deploy from '../../methods/deploy';

const web3 = new (Web3 as any)('http://localhost:8545') as Web3.default;
const sandbox = new Sandbox();

test.before(async () => {
  sandbox.listen(8545);
});

test.after(async () => {
  sandbox.close();
});

test('deploys contract from specron file', async (t) => {
  const contact = await deploy({
    web3,
    from: await web3.eth.getAccounts().then((a) => a[0]),
    gas: 6000000,
    gasPrice: 1,
    src: './src/tests/assets/scaffold-b.json',
    contract: 'Main',
  });
  const res = await contact.methods.test().call();
  t.is(res, '100');
});

test('deploys contract from truffle file', async (t) => {
  const contact = await deploy({
    web3,
    from: await web3.eth.getAccounts().then((a) => a[0]),
    gas: 6000000,
    gasPrice: 1,
    src: './src/tests/assets/scaffold-a.json',
  });
  const res = await contact.methods.test().call();
  t.is(res, '123457');
});

test('deploys contract from node_modules', async (t) => {
  try {
    await deploy({
      web3,
      from: await web3.eth.getAccounts().then((a) => a[0]),
      gas: 6000000,
      gasPrice: 1,
      src: '@0xcert/ethereum-utils/build/contracts/Ownable.json',
    });  
    t.pass();
  } catch (e) {
    t.fail();
  }
});
