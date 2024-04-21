import { ethers } from 'ethers'
import { abi, bytecode } from '../../artifacts/contracts/Maintenance.sol/Maintenance.json' 


export default async function DeployMaintenance(provider, signer) {
    
    await provider.send('eth_requestAccounts', [])

    const factory = new ethers.ContractFactory(abi, bytecode, signer)
    const token = await factory.deploy();
    const tx = await token.deployTransaction.wait();
    console.log("Maintenance deployed to:", tx.contractAddress);

    return tx.contractAddress
}