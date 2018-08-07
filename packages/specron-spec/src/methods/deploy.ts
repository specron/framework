import * as path from 'path';

/**
 * 
 */
export default async function deploy(config: {
  src: string;
  web3: any;
  from: string;
  gas: number;
  gasPrice: number;
  args?: any[];
}) {
  const src = path.resolve(process.cwd(), (config.src[0] != '.' ? 'node_modules' : ''), config.src);
  const data = require(src);
  const contract = new config.web3.eth.Contract(data.abi);
  const deploy = await contract.deploy({
    data: data.bytecode,
    arguments: config.args,
  }).send({
    from: config.from,
    gas: config.gas,
    gasPrice: config.gasPrice,
  });
  return new config.web3.eth.Contract(
    data.abi,
    deploy.options.address
  );
}
