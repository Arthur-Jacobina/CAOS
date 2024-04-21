import { ethers } from 'ethers'
import { abi, bytecode } from '../../artifacts/contracts/Events.sol/Events.json' 


export default async function DeployEvents(provider, signer, tokenAdrress, rentAddress) {
    
    await provider.send('eth_requestAccounts', [])

    const factory = new ethers.ContractFactory(abi, bytecode, signer)
    const token = await factory.deploy(tokenAdrress, rentAddress);
    const tx = await token.deployTransaction.wait();
    console.log("Events deployed to:", tx.contractAddress);

    return tx.contractAddress;

}