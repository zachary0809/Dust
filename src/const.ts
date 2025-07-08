
import {ethers} from 'ethers';
import { EvmAddress, EvmPlatform } from "@wormhole-foundation/sdk-evm";
import {SolanaAddress, SolanaPlatform } from "@wormhole-foundation/sdk-solana";
import {AlgorandAddress, AlgorandPlatform } from "@wormhole-foundation/sdk-algorand";
import {AptosAddress, AptosPlatform } from "@wormhole-foundation/sdk-aptos";
import {CosmwasmAddress, CosmwasmPlatform } from "@wormhole-foundation/sdk-cosmwasm";
import {SuiAddress, SuiPlatform } from "@wormhole-foundation/sdk-sui";


import {Platform ,PlatformUtils, TokenId,TokenAddress} from '@wormhole-foundation/sdk-connect';


import local_tokens from '../support_tokens.json'

export const LC_TOKENS = local_tokens;

const eth_url = process.env.ETH_RPC_URL!;

export const ETH_PROVIDER = new ethers.JsonRpcProvider(eth_url);

export const ALCHEMY_URL = process.env.ALCHEMY_URL!;
export const ALCHEMY_PRIVATE_KEY = process.env.ALCHEMY_PRIVATE_KEY!;

export declare const _support_network :readonly ['Mainnet','Testnet','Devnet'];
export type SUPPORT_NETWORK = (typeof _support_network) [number];

export const NETWORK = process.env.NETWORK! as SUPPORT_NETWORK;

export declare const  _support_chains :readonly ["Ethereum",'Optimism','Base','Arbitrum'];
export type SUPPORT_CHAINS = (typeof _support_chains)[number];

export const PLATFORMS : Record<Platform,PlatformUtils<any>|null> = {
    'Evm' : EvmPlatform,
    'Algorand': AlgorandPlatform,
    'Aptos': AptosPlatform,
    'Cosmwasm' : CosmwasmPlatform,
    'Solana':SolanaPlatform,
    'Sui':SuiPlatform,
    'Btc': null,
    'Near': null
}

export const ADDRESS : Record<CHAINS,TokenAddress<any> | null> ={
    "Arbitrum":EvmAddress, "Avalanche":EvmAddress, "Base":EvmAddress, "Bsc":EvmAddress, "Celo":EvmAddress, "Ethereum":EvmAddress, "Fantom":EvmAddress, "Gnosis":EvmAddress, "Klaytn":EvmAddress, "Moonbeam":EvmAddress, "Neon":EvmAddress, "Optimism":EvmAddress, "Polygon":EvmAddress, "Sepolia":EvmAddress, "ArbitrumSepolia":EvmAddress, "BaseSepolia":EvmAddress, "OptimismSepolia":EvmAddress, "Holesky":EvmAddress, "PolygonSepolia":EvmAddress, "Mantle":EvmAddress, "Scroll":EvmAddress, "Blast":EvmAddress, "Xlayer":EvmAddress, "Linea":EvmAddress, "Berachain":EvmAddress, "Seievm":EvmAddress, "Snaxchain":EvmAddress, "Unichain":EvmAddress, "Worldchain":EvmAddress, "Ink":EvmAddress, "HyperEVM":EvmAddress, "Monad":EvmAddress, "Mezo":EvmAddress, "Sonic":EvmAddress, "Converge":EvmAddress,
    "Solana":SolanaAddress, "Pythnet":SolanaAddress, "Fogo":SolanaAddress,
    "Cosmoshub": CosmwasmAddress, "Evmos": CosmwasmAddress, "Injective": CosmwasmAddress, "Kujira": CosmwasmAddress, "Osmosis": CosmwasmAddress, "Sei": CosmwasmAddress, "Terra2": CosmwasmAddress, "Wormchain": CosmwasmAddress, "Dymension": CosmwasmAddress, "Neutron": CosmwasmAddress, "Stargaze": CosmwasmAddress, "Celestia": CosmwasmAddress, "Seda": CosmwasmAddress, "Provenance": CosmwasmAddress, "Noble": CosmwasmAddress,
    'Algorand': AlgorandAddress,
    'Aptos': AptosAddress,
    'Sui':SuiAddress,
    'Btc': null,
    'Near': null
}

export declare const _chains: ["Arbitrum", "Avalanche", "Base", "Bsc", "Celo", "Ethereum", "Fantom", "Gnosis", "Klaytn", "Moonbeam", "Neon", "Optimism", "Polygon", "Sepolia", "ArbitrumSepolia", "BaseSepolia", "OptimismSepolia", "Holesky", "PolygonSepolia", "Mantle", "Scroll", "Blast", "Xlayer", "Linea", "Berachain", "Seievm", "Snaxchain", "Unichain", "Worldchain", "Ink", "HyperEVM", "Monad", "Mezo", "Sonic", "Converge",
                        "Solana", "Pythnet", "Fogo",
                        "Cosmoshub", "Evmos", "Injective", "Kujira", "Osmosis", "Sei", "Terra2", "Wormchain", "Dymension", "Neutron", "Stargaze", "Celestia", "Seda", "Provenance", "Noble",
                        "Btc",
                        "Algorand",
                        "Sui",
                        "Aptos",
                        "Near"];
export type CHAINS = (typeof _chains)[number];





export const get_coin_address = (data:TokenId):string|null=>{
    type chain = typeof data.chain;
    let address = data.address as typeof ADDRESS[chain];
    if (address === null || address === undefined){
        return null;
    }
    return address.address.toString();
}

