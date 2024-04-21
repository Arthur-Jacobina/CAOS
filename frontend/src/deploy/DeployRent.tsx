import { ethers } from 'ethers'
import { abi, bytecode } from '../../artifacts/contracts/Rent.sol/Rent.json' 


export default async function DeployRent(provider, signer, tokenContract, residents) {
    
    await provider.send('eth_requestAccounts', [])

    const factory = new ethers.ContractFactory(abi, bytecode, signer)
    const token = await factory.deploy(tokenContract, residents);
    const tx = await token.deployTransaction.wait();
    console.log("Rent deployed to:", tx.contractAddress);

    return tx.contractAddress;
}