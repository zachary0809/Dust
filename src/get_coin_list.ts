import axios from "axios";

export interface TokenPlatform {
    [platformName: string]: string; // 动态键名索引签名
  }
  
export interface TokenData {
    id: string;
    symbol: string;
    name: string;
    platforms: TokenPlatform; // 使用动态键名类型
  }

export interface TokenDataV{
    id:string;
    symbol:string;
    name:string;
    platform:string;
    contract:string;
}

export const get_coin_list = async (): Promise< TokenData[]|null> =>{
    const url = process.env.COINS_URL!;
    try{
      const response = await axios.get(url);
      const rawdata = await response.data;
      return parseTokenData(rawdata);

    }
    catch(error){
      console.log(error);
      return null;
    }
}

export const get_coin_listV = async():Promise<TokenDataV[] |null> =>{
  const url = process.env.COINS_URL!;
    try{
      const response = await axios.get(url);
      const rawdata = await response.data;
      return parseTokenDataV(rawdata);

    }
    catch(error){
      console.log(error);
      return null;
    }
}

export const  parseTokenDataV =(rawData: string): TokenDataV[] => {
  // const rawData: unknown = JSON.parse(json);
  
  // 3. 运行时类型验证
  if (!Array.isArray(rawData)) {
    throw new Error("Expected an array of tokens");
  }

  let tokens : TokenDataV[]=[];

  rawData.forEach(item => {
    if (
      typeof item === "object" &&
      item !== null &&
      "id" in item &&
      "symbol" in item &&
      "name" in item &&
      "platforms" in item
    ) {
      const token = item as Record<string, unknown>;
      
      // 5. 验证 platforms 结构
      if (
        typeof token.platforms === "object" &&
        token.platforms !== null &&
        !Array.isArray(token.platforms)
      ) {
        const platforms: TokenPlatform = {};
        
        // 6. 动态键名处理
        for (const [key, value] of Object.entries(token.platforms)) {
          if (typeof value === "string") {
            const _token:TokenDataV = {
              id:String(token.id),
              symbol: String(token.symbol),
              name: String(token.name),
              platform: String(key),
              contract:String(value)
            }
            tokens.push(_token);
            
          }
        }
      }
    }
  });
  return tokens;

} 

export const  parseTokenData =(rawData: string): TokenData[] => {
    // const rawData: unknown = JSON.parse(json);
    
    // 3. 运行时类型验证
    if (!Array.isArray(rawData)) {
      throw new Error("Expected an array of tokens");
    }
  
    return rawData.map(item => {
      // 4. 类型守卫验证
      if (
        typeof item === "object" &&
        item !== null &&
        "id" in item &&
        "symbol" in item &&
        "name" in item &&
        "platforms" in item
      ) {
        const token = item as Record<string, unknown>;
        
        // 5. 验证 platforms 结构
        if (
          typeof token.platforms === "object" &&
          token.platforms !== null &&
          !Array.isArray(token.platforms)
        ) {
          const platforms: TokenPlatform = {};
          
          // 6. 动态键名处理
          for (const [key, value] of Object.entries(token.platforms)) {
            if (typeof value === "string") {
              platforms[key] = value;
            }
          }
          
          return {
            id: String(token.id),
            symbol: String(token.symbol),
            name: String(token.name),
            platforms
          };
        }
      }
      throw new Error(`Invalid token structure: ${JSON.stringify(item)}`);
    });
  }