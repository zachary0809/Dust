import axios from 'axios';
import { get_token_price_dex } from './get_price/dexscreener';



export interface TokenPrice{
    token_prices: Record<string,string>
}

export interface TokenData{
    id :string,
    type:string,
    attributes: TokenPrice
}

interface ApiResponse{
    data:TokenData
}



/**
 * 获取代币当前价格，使用其合约地址和所在平台。
 * 
 * @param platform 代币所在的平台，例如 "ethereum", "binance-smart-chain"
 * @param contractAddress 代币的合约地址
 * @param vsCurrency 目标货币，例如 "usd", "btc"，默认为 "usd"
 * @returns 指定货币的代币价格，如果未找到则返回 null
 */
export const getTokenPrice=async (platform: string, contractAddress: string,vsCurrency:string): Promise<any | null> =>{
  return await get_token_price_dex(platform,contractAddress);
}

// 示例用法：
// getTokenPrice('ethereum', '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48').then(price => console.log(price));