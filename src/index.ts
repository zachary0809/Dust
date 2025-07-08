import 'dotenv/config';
import {get_coin_list_by_address,TokenData} from './get_coin_list_by_address';
import { get_cross_router } from './get_cross_router';
import { test_cross } from '../test/cross_router';
import {NETWORK ,PLATFORMS} from './const'


import { get_support_tokens_local } from './get_support_token_local';


const  main = async ()=> {
    {
        // 根据给定的网络和 链 获取支持的代币列表
        const data = get_support_tokens_local('Mainnet','Base');
        console.log(JSON.stringify( data));
    }
    {
        // 根据给定的 源链 和目标链 还有币名称 获取 最佳路由
        const route = await get_cross_router('Ethereum','Base','ETH');
        console.log(route);
        // test_cross();
    }
    {
        // 根据钱包地址获取代币列表
        const address = '0x6e95cb7f778fc3e44ddac8f67907482f98eb0002';
        const neworks = ["Ethereum",'Optimism','Base','Arbitrum'];
        const tokens = await  get_coin_list_by_address(NETWORK,address,neworks);
        console.log(tokens?.length);
        tokens?.forEach((token)=>{
            console.log('##############################################');
            console.log(`代币名称: ${token?.name}`);
            console.log(`代币链: ${token?.platform}`);
            console.log(`代币代码: ${token?.symbol}`);
            console.log(`代币地址: ${token?.address}`);
            console.log(`代币数量: ${token?.amount}`);
            console.log(`代币价格单位: ${token?.currency}`);
            console.log(`代币单价: ${token?.price}`);
            console.log(`代币价值: ${token?.balance}`);
            console.log('##############################################');
        });
    }
    {
        // const wh = new Wormhole(NETWORK,[EvmPlatform]);
        // const src_chain = wh.getChain('Optimism');
        // const dest_chain = wh.getChain('Base');
        
        // const src_token = Wormhole.tokenId(src_chain.chain,'native');

    }
    {
        //根据token  conotract 获取token price
        // const token = await getTokenPrice('ethereum','0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48');
        // const token = await getTokenPrice('solana','AdfPXoE1RBp2PCQp5NSFPM3n3fHoG3NTF6cwQhHkpump','usd');
        // console.log(token);

        // const token = await get_token_price_dex('solana','AdfPXoE1RBp2PCQp5NSFPM3n3fHoG3NTF6cwQhHkpump');
        // console.log(token);
    }
    {
        // const  dest_token = await get_cross_router('Avalanche','Solana','native')
        // const  dest_token = await get_cross_router('Ethereum','Solana','0xdAC17F958D2ee523a2206206994597C13D831ec7')
        // console.log(dest_token);
    }
    {
        //  获取 bridge route
        // await test_cross();
    }
    {
        // const list =await get_coin_listV();
        // if(list === null){
        //     console.log('获取coin list失败');
        //     return;
        // }
        // console.log(list.length,list[0]);
        // 获取swap的代币列表
        // const support_tokens = await get_support_tokens("Ethereum","Solana");
        
        // console.log((support_tokens[1].address as SolanaAddress).address.toString());
        // console.log(support_tokens);
        // let tokenData = support_tokens.map(item=>{
        //     return {
        //         chain:item.chain,
        //         address:get_coin_address(item)
        //     }
        // });
        // let data = tokenData.map(item=>{
        //     let token_info = list?.filter(coin=>{
        //         return coin.contract === item.address && coin.platform && item.chain.toLowerCase();
        //     })
        // })
        // console.log(data.length,data[0]);

    }

    // {
    //     // 获取代币列表
    //     const address = '0x6e95cb7f778fc3e44ddac8f67907482f98eb0002';
    //     const network = 'eth-mainnet';

    //     const data = await get_coin_list_by_address(address,[network]);
    //     if (data === null){
    //         return ;
    //     }
    //     let tokens:TokenData[] =[];
    //     data.data.tokens.forEach((data)=>{
    //         const token = get_token_data_by_token(data);
    //         if (token!= null){
    //             tokens = [...tokens,token];
    //         }
    //     })

    //     console.log(tokens.length);
    //     tokens.forEach((token)=>{
    //         console.log('##############################################');
    //         console.log(`代币名称: ${token?.name}`);
    //         console.log(`代币代码: ${token?.symbol}`);
    //         console.log(`代币地址: ${token?.address}`);
    //         console.log(`代币数量: ${token?.amount}`);
    //         console.log(`代币价格单位: ${token?.currency}`);
    //         console.log(`代币单价: ${token?.price}`);
    //         console.log(`代币价值: ${token?.balance}`);
    //         console.log('##############################################');
    //     })

    // }

    // data.data.tokens.forEach((data)=>{
    //     const amount_int = parseInt(data.tokenBalance,16);
    //     if (amount_int <= 0)
    //     {
    //         return;
    //     }
    //     console.log('##############################################');
    //     const decimals = data.tokenMetadata.decimals!;
    //     let amount = 0;
    //     if (decimals >0)
    //     {
    //         amount = amount_int/10** data.tokenMetadata.decimals!;
    //     }

    //     amount = new Decimal(amount).toDecimalPlaces(6).toNumber();
        
    //     let tokenaddress = data.tokenAddress;
    //     let tokenname = data.tokenMetadata.name;
    //     if (data.tokenAddress === null){
    //         tokenaddress = 'ETH';
    //         tokenname = 'ETH';
    //     }
    //     console.log(`代币地址:${tokenaddress}`);
    //     console.log(`代币名称:${tokenname}`);
    //     console.log(`代币数量:${data.tokenBalance}`);
    //     console.log(`代币数量: ${amount}`);
    //     console.log(`代币数量(int): ${amount_int}`);

    //     if (data.tokenPrices.length >0){
    //         console.log(`代币单价:${data.tokenPrices[0].value} ${data.tokenPrices[0].currency}`);
    //         let balance = amount*parseFloat(data.tokenPrices[0].value);
    //         balance = new Decimal(balance).toDecimalPlaces(6).toNumber()
    //         console.log(`代币价值 ${balance}`);
    //     }else{
    //         console.log('代币单价: 0');
    //         console.log('代币价值: 0');
    //     }
    //     console.log('##############################################');
    // })
}


main().then().catch(e=>console.log(e));