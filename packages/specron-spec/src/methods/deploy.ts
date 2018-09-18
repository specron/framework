import * as path from 'path';

/**
 * 
 */
export default async function deploy(config: {
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
  const deploy = await contract.deploy({
    data: bytecode,
    arguments: config.args,
  }).send({
    from: config.from,
    gas: config.gas,
    gasPrice: config.gasPrice,
  });
  return new config.web3.eth.Contract(
    abi,
    deploy.options.address,
    {
      gas: config.gas,
      from: config.from,
    },
  );
}
