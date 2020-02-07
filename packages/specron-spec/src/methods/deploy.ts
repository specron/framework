import * as path from 'path';

/**
 * 
 */
export async function deploy(config: {
  src: string;
  contract?: string;
  web3: any;
  from: string;
  gas: number;
  gasPrice: number;
  args?: any[];
}) {
  const src = path.resolve(process.cwd(), (config.src[0] != '.' ? 'node_modules' : ''), config.src);
  const data = require(src);
  const abi = config.contract ? data[config.contract].abi : data.abi;
  const bytecode = config.contract ? data[config.contract].evm.bytecode.object : data.bytecode;
  const contract = new config.web3.eth.Contract(abi);
  let txHash = null;
  const receipt = await contract.deploy({
    data: bytecode,
    arguments: config.args,
  }).send({
    from: config.from,
    gas: config.gas,
    gasPrice: config.gasPrice,
  }).on('transactionHash', (transactionHash) => {
    txHash = transactionHash;
  });
  const instance = new config.web3.eth.Contract(
    abi,
    receipt.options.address,
    {
      gas: config.gas,
      from: config.from,
    },
  );
  if(txHash) {
    const transactionReceipt = await config.web3.eth.getTransactionReceipt(txHash);
    Object.assign(receipt, transactionReceipt);
  }
  return { instance, receipt };
}
