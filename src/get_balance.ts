
import {ethers} from 'ethers';
import { ETH_PROVIDER } from './const';

export const get_balance = async (address:string, contract:string) =>{
    try{
        const contract_abi = new ethers.Contract(
            contract,
            ['function balanceOf(address) view returns (uint256)'],
            ETH_PROVIDER
        );

        const balance = await contract_abi.balanceOf(address);
        return balance;
    }
    catch(error){
        console.log(error);
    }
}