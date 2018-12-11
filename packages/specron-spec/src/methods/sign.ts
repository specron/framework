import { SignatureKind } from '../core/types';

/**
 * 
 */
export async function sign(config: {
  web3: any;
  data: string;
  kind: SignatureKind;
  signer: string;
}) {
  if (config.kind === SignatureKind.ETH_SIGN) {
    return signWithEthSign(config);
  } 
  else {
    return null;
  }
}

/**
 * 
 */
async function signWithEthSign(config) {
  try {
    const signature = await config.web3.eth.sign(config.data, config.signer);
    const signatureData = {
      signature,
      r: signature.substr(0, 66),
      s: `0x${signature.substr(66, 64)}`,
      v: parseInt(`0x${signature.substr(130, 2)}`),
    };
    if (signatureData.v < 27) {
      signatureData.v = signatureData.v + 27;
    }
    return signatureData;  
  }
  catch (err) {
    return null;
  }
}

