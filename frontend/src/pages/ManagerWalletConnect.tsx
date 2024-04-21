import checked from '../assets/checked.svg'
import '../wallet-button.css'
import { useEffect } from "react";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { GetAccountResult } from "../types/account";
import { MetaMaskButton } from "@metamask/sdk-react-ui";

export default function ManagerWalletConnect({account} : {account:SDKState}) {
    const navigate = useNavigate()
    
    // Check if user is logged in:
    useEffect(() => {
        if(account.connected)  {
            const checkChain = async () => {
                const chainId = await window.ethereum.request({ method: "eth_chainId"})
                if(chainId != "0xe9ac0ce") {
                    console.log(chainId)
                    console.log("NOT CONNECTED TO NEON!")

                    try {
                        await window.ethereum 
                            .request({
                                method: "wallet_switchEthereumChain",
                                params: [{ chainId: "0xf00" }],
                            });
                    } catch (switchError) {
                        // This error code indicates that the chain has not been added to MetaMask.
                        if (switchError.code === 4902) {
                            try {
                                await window.ethereum // Or window.ethereum if you don't support EIP-6963.
                                    .request({
                                        method: "wallet_addEthereumChain",
                                        params: [
                                            {   
                                                chainId: "0xe9ac0ce",
                                                chainName: "Neon EVM DevNet",
                                                rpcUrls: ["https://devnet.neonevm.org/"],
                                                nativeCurrency: {
                                                    decimals: 18,
                                                    name: "NEON",
                                                    symbol: "NEON"
                                                }
                                            },
                                        ],
                                    });

                                    navigate('/manager/signup/2')
                            } catch (addError) {
                                // Handle "add" error.
                            }
                        }
                        // Handle other "switch" errors.
                    }
                } else {
                    navigate('/manager/signup/2')
                }
            }

            checkChain()
        }
    }, [account.connected])
    
    return (
        <>
            <div className="p-16 items-center flex justify-center flex-col">
                <div className="mb-10 text-center text-white">
                    <h1 className="text-3xl">Welcome, dear manager!</h1>
                    <p className="text-2xl text-[#6D9EEB]">Thank you for choosing us</p>
                </div>
                <div className="w-[45vw] py-10">
                    <p className="mb-12 text-white font-regular text-3xl">Connect your wallet to get started</p>
                    <MetaMaskButton color='blue' />
                </div>
                <div className= "absolute right-12 border border-[#1155CC] p-5 rounded" >
                    <div className="flex items-center gap-3">
                        <img src={checked} alt="" />
                        <p className="text-[#717171]">Connect Wallet</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <img src={checked} alt="" />
                        <p className="text-[#717171]">Building Info</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <img src={checked} alt="" />
                        <p className="text-[#717171]">Owners Info</p>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}