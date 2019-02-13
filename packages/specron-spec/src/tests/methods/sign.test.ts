import test from 'ava';
import * as Web3 from 'web3';
import { Sandbox } from '@specron/sandbox';
import { SignatureKind } from '../../core/types';
import { sign } from '../../methods/sign';
import { deploy } from '../../methods/deploy';

const web3 = new Web3(Sandbox.createProvider({ port: 8545 }));

test('performs eth sign', async (t) => {
  const signer = await web3.eth.getAccounts().then((a) => a[0]);
  const data = web3.utils.randomHex(32);

  const signatureData = await sign({
    web3,
    kind: SignatureKind.ETH_SIGN,
    data,
    signer
  });

  const recover = await deploy({
    web3,
    from: await web3.eth.getAccounts().then((a) => a[0]),
    gas: 6000000,
    gasPrice: 1,
    src: './src/tests/assets/scaffold-ecrecover.json',
    contract: 'recoverContract',
  });
  const address = await recover.instance.methods.recover(data, signatureData.r, signatureData.s, signatureData.v).call();

  t.is(address, signer);
});

test('performs eth sign with string data', async (t) => {
  const signer = await web3.eth.getAccounts().then((a) => a[0]);
  const data = 'test';

  const signatureData = await sign({
    web3,
    kind: SignatureKind.ETH_SIGN,
    data,
    signer
  });

  t.not(signatureData, null);
});
