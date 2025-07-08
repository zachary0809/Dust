
import {
    Wormhole,
    PlatformUtils,
    chainToPlatform,
    Chain,
    canonicalAddress,
} from '@wormhole-foundation/sdk-connect';
import { error } from 'console';
import {routes, wormhole} from '@wormhole-foundation/sdk';
import { EvmAddress, EvmPlatform } from "@wormhole-foundation/sdk-evm";
import { SolanaPlatform } from '@wormhole-foundation/sdk-solana/dist/cjs';
import evm from "@wormhole-foundation/sdk/evm";
import solana from "@wormhole-foundation/sdk/solana";
import {MayanRouteSWIFT} from '@mayanfinance/wormhole-sdk-route'

export const test_cross = async()=>{

  try{

  
    const wh = await wormhole("Mainnet", [evm]);

    // Get chain contexts
    const sendChain = wh.getChain("Ethereum");
    const destChain = wh.getChain("Base");
    // const destChain = wh.getChain("Base");

    console.log('1');
  
    // EXAMPLE_RESOLVER_CREATE
    // create new resolver, passing the set of routes to consider
    const resolver = wh.resolver([
      routes.TokenBridgeRoute, // manual token bridge
      routes.AutomaticTokenBridgeRoute, // automatic token bridge
      routes.CCTPRoute, // manual CCTP
      routes.AutomaticCCTPRoute, // automatic CCTP
      routes.AutomaticPorticoRoute, // Native eth transfers
      MayanRouteSWIFT,
    ]);
    // EXAMPLE_RESOLVER_CREATE
  
    // EXAMPLE_RESOLVER_LIST_TOKENS
    // const sendToken = Wormhole.tokenId(sendChain.chain, "0xdAC17F958D2ee523a2206206994597C13D831ec7");
    const sendToken = Wormhole.tokenId(sendChain.chain, "native");
    // console.log(sendToken.address);
  
    // // given the send token, what can we possibly get on the destination chain?
    // const destTokens = await resolver.supportedDestinationTokens(sendToken, sendChain, destChain);
    // console.log(
    //   "For the given source token and routes configured, the following tokens may be receivable: ",
    //   destTokens.map((t) => canonicalAddress(t)),
    // );
    // if (destTokens.length === 0){
    //   return;
    // }
    
    //grab the first one for the example
    // const destinationToken = destTokens[0]!;
    // EXAMPLE_RESOLVER_LIST_TOKENS

    // const destinationToken = Wormhole.tokenId(destChain.chain, "0xaf88d065e77c8cC2239327C5EDb3A432268e5831");
    const destinationToken = Wormhole.tokenId(destChain.chain, "native");
    console.log(2);

    // EXAMPLE_REQUEST_CREATE
    // creating a transfer request fetches token details
    // since all routes will need to know about the tokens
    const tr = await routes.RouteTransferRequest.create(wh, {
        source: sendToken,
        destination: destinationToken,
    });

    console.log(3);

    // resolve the transfer request to a set of routes that can perform it
    const foundRoutes = await resolver.findRoutes(tr);
    console.log("For the transfer parameters, we found these routes: ", foundRoutes);
    // EXAMPLE_REQUEST_CREATE

    // Sort the routes given some input (not required for mvp)
    // const bestRoute = (await resolver.sortRoutes(foundRoutes, "cost"))[0]!;
    const bestRoute = foundRoutes[0]!;
    console.log("Selected: ", bestRoute);

    // EXAMPLE_REQUEST_VALIDATE
    console.log("This route offers the following default options", bestRoute.getDefaultOptions());
  }
  catch(error){
    console.log(error);
  }
}