import { ethers } from 'ethers'
import { abi, bytecode } from '../../artifacts/contracts/ERC20Token.sol/ERC20Token.json' 


export default async function DeployERC20(provider, signer) {

    await provider.send('eth_requestAccounts', [])

    const factory = new ethers.ContractFactory(abi, bytecode, signer)
    const token = await factory.deploy("MyToken", "TKN", 1000);
    const tx = await token.deployTransaction.wait();
    console.log("Token deployed to:", tx.contractAddress);

    return tx.contractAddress;
}