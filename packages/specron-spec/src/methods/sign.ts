import { SignatureKind } from '../core/types';

/**
 * 
 */
export default async function sign(config: {
  web3: any;
  data: string;
  kind: SignatureKind;
  signer: string;
}) 
{
  try {
    if (config.kind === SignatureKind.ETH_SIGN) {
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
    else {
      return null;
    }
  } 
  catch (error) {
    return null;
  }
}
