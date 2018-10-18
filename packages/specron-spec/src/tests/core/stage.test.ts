import test from 'ava';
import * as Web3 from 'web3';
import { Sandbox } from '@specron/sandbox';
import { Stage, Reporter } from '../..';

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
