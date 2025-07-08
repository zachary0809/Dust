import {
    Wormhole,
    PlatformUtils,
    chainToPlatform,
    Chain
} from '@wormhole-foundation/sdk-connect';

import {
    TokenId
} from '@wormhole-foundation/sdk';

import {_platform, EvmAddress, EvmPlatform } from '@wormhole-foundation/sdk-evm';
import {
    MayanRouteSWIFT,
    MayanRoute
  } from '@mayanfinance/wormhole-sdk-route';

// import {CHAINS ,ChainsEnum} from './const';

import {CHAINS, NETWORK, PLATFORMS} from './const';
import { error } from 'console';



export const get_support_tokens = async (src:CHAINS,dest:CHAINS)=>{

    const src_platform =  chainToPlatform.get(src);
    if (src_platform === undefined){
        throw error("source or destination symbol not support!");
    }

    const dest_platform = chainToPlatform.get(dest);
    if (dest_platform === undefined){
        throw error("source or destination symbol not support!");
    }


    let platforms : PlatformUtils<any>[];
    if (dest_platform === src_platform){
        let platform = PLATFORMS[src_platform];
        if (platform === null)
        {
            throw error("source or destination symbol not support!");
        }
        platforms =[platform];
    }
    else{
        let _src_platform = PLATFORMS[src_platform];
        let _dest_platform = PLATFORMS[dest_platform];
        if (_src_platform === null || _dest_platform === null)
        {
            throw error("source or destination symbol not support!");
        }
        platforms = [_src_platform,_dest_platform];
    }   

    let wh = new Wormhole(NETWORK,platforms);

    const sendChain = wh.getChain(src as Chain);
    const destChain = wh.getChain(dest as Chain);

    const source = Wormhole.tokenId(sendChain.chain, "native");
    
    const resolver = wh.resolver([MayanRoute]);

    const dstTokens = await resolver.supportedDestinationTokens(
        source,
        sendChain,
        destChain
    );
    return dstTokens;
}



