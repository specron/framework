import test from 'ava';
import * as Web3 from 'web3';
import { Sandbox } from '@specron/sandbox';
import { Stage, Reporter } from '../..';
import { deploy } from '../../methods/deploy';

const web3 = new Web3(Sandbox.createProvider());
const reporter = new Reporter();

test('variable `web3` exposes the web3 instance', async (t) => {
  const stage = new Stage(web3, reporter);
  t.is(stage.web3, web3);
});

test('method `tuple` transforms an object to tuple type', async (t) => {
  const stage = new Stage(web3, reporter);
  const tuple = stage.tuple({
    foo: "FOO",
  });
  t.deepEqual(tuple, [
    "FOO",
  ]);
});

test('method `sign` creates a signature and validates it', async (t) => {
  const stage = new Stage(web3, reporter);
  const data = web3.utils.randomHex(32);

  const signatureData = await stage.sign({ data });

  const recover = await deploy({
    web3,
    from: await web3.eth.getAccounts().then((a) => a[0]),
    gas: 6000000,
    gasPrice: 1,
    src: './src/tests/assets/scaffold-ecrecover.json',
    contract: 'recoverContract',
  });
  const address = await recover.instance.methods.recover(data, signatureData.r, signatureData.s, signatureData.v).call();

  t.is(address, await stage.web3.eth.getAccounts().then((a) => a[0]));
});
