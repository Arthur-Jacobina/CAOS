import { ethers } from 'ethers'
import { abi, bytecode } from '../../artifacts/contracts/Bills.sol/Bills.json' 


export default async function DeployBills(provider, signer) {
    
    await provider.send('eth_requestAccounts', [])

    const factory = new ethers.ContractFactory(abi, bytecode, signer)
    const token = await factory.deploy();
    const tx = await token.deployTransaction.wait();
    console.log("Bills deployed to:", tx.contractAddress);

    return tx.contractAddress;
}