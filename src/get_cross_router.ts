import {
    Wormhole,
    PlatformUtils,
    chainToPlatform,
    Chain
} from '@wormhole-foundation/sdk-connect';
import {CHAINS, NETWORK, PLATFORMS, SUPPORT_CHAINS} from './const';
import { error } from 'console';
import {routes} from '@wormhole-foundation/sdk';
import { EvmAddress, EvmPlatform } from "@wormhole-foundation/sdk-evm";
import { get_support_token_local } from './get_support_token_local';
import {MayanRouteSWIFT} from '@mayanfinance/wormhole-sdk-route'

export const get_cross_router = async (src:SUPPORT_CHAINS,dest:SUPPORT_CHAINS ,tokenname:string)=>{

    const src_platform =  chainToPlatform.get(src);
    if (src_platform === undefined){
        throw error("source or destination symbol not support!");
    }

    const dest_platform = chainToPlatform.get(dest);
    if (dest_platform === undefined){
        throw error("source or destination symbol not support!");
    }

    const sendToken = get_support_token_local(NETWORK,src,tokenname);
    if(!sendToken){
        throw error(`${NETWORK} ${src} ${tokenname}  not support`);
    }
    const destToken = get_support_token_local(NETWORK,dest,tokenname);
    if(!destToken){
        throw error(`${NETWORK} ${dest} ${tokenname}  not support`);
    }
    console.log(`sendtoken address ${sendToken.token.address}`)
    console.log(`desttoken address ${destToken.token.address}`)

    console.log(`src platform ${src_platform}, dest platform ${dest_platform}`);

    let platforms : PlatformUtils<any>[] = [];
    if (dest_platform === src_platform){
        let platform = PLATFORMS[src_platform];
        if (platform === null)
        {
            throw error("source or destination symbol not support!");
        }
        platforms.push(platform);
    }
    else{
        let _src_platform = PLATFORMS[src_platform];
        let _dest_platform = PLATFORMS[dest_platform];
        if (_src_platform === null || _dest_platform === null)
        {
            throw error("source or destination symbol not support!");
        }
        platforms.push(_src_platform);
        platforms.push(_dest_platform);
    }   

    let wh = new Wormhole(NETWORK,platforms);
    console.log(NETWORK);
    console.log(platforms.length, platforms);

    const resolver = wh.resolver([
        routes.TokenBridgeRoute, // manual token bridge
        routes.AutomaticTokenBridgeRoute, // automatic token bridge
        routes.CCTPRoute, // manual CCTP
        routes.AutomaticCCTPRoute, // automatic CCTP
        routes.AutomaticPorticoRoute, // Native eth transfers
        MayanRouteSWIFT
      ]);

    const sendChain = wh.getChain(src as Chain);
    const destChain = wh.getChain(dest as Chain);

    const sendToken_wh = Wormhole.tokenId(sendChain.chain, sendToken.token.address);
    const destToken_wh = Wormhole.tokenId(destChain.chain,destToken.token.address);

    const tr = await routes.RouteTransferRequest.create(wh, {
        source: sendToken_wh,
        destination: destToken_wh,
      });
    
    if(!tr)
    {
        throw error(`network:${NETWORK}, srcchain:${src},destchain:${dest},tokenname: ${tokenname} can not found route 1`)
    }

    const foundRoutes = await resolver.findRoutes(tr);
    if(!foundRoutes|| foundRoutes.length<=0){
        throw error(`network:${NETWORK}, srcchain:${src},destchain:${dest},tokenname: ${tokenname} can not found route 2`)
    }


    // const dstTokens = await resolver.supportedDestinationTokens(
    //     sendToken_wh,
    //     sendChain,
    //     destChain
    // );
    return foundRoutes[0];
}