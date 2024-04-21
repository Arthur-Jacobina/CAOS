import '../wallet-button.css'
import { useEffect } from "react";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { MetaMaskButton, SDKState, useAccount} from "@metamask/sdk-react-ui";

export default function Login({account, resident} : {account:SDKState; resident:any}) {
    const navigate = useNavigate()
    const wallet = useAccount()
    

    useEffect(() => {
        const checkRDatabase = async () => {
            let exists = false
            // const dburl = 'http://localhost:8080/'
            const dburl = 'https://caosdatabase.onrender.com/'
            const options = {
                method: 'GET',
                mode: 'cors'
            }
            const send = await fetch(dburl + 'Residents', options)
            const residents = await send.json()
            const walletAddress = wallet.address.toString()
            for(const _resident of residents) {
                if(walletAddress.toUpperCase() == _resident.wallet.toUpperCase()) {
                    console.log('ENTREI')
                    navigate('/overview')
                    resident.loggedInResident = _resident
                    resident.exists = true
                    exists = true
                    break
                }
            }

            if(!exists) {
                navigate('/signup')
            }
        }

        const checkMDatabase = async () => {
            // const dburl = 'http://localhost:8080/'
            const dburl = 'https://caosdatabase.onrender.com/'
            const options = {
                method: 'GET',
                mode: 'cors'
            }
            const send = await fetch(dburl + 'Managers', options)
            const managers = await send.json()
            const walletAddress = wallet.address.toString()
            for(const _manager of managers) {
                if(walletAddress.toUpperCase() == _manager.wallet.toUpperCase()) {
                    console.log("YOU ARE MANAGER!")
                    resident.loggedInResident = _manager
                    resident.isManager = true
                    resident.exists = true
                    navigate('/manager/overview')
                    break
                }
            }
        }

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

                                    // navigate('/overview')
                            } catch (addError) {
                                // Handle "add" error.
                            }
                        }
                        // Handle other "switch" errors.
                    }
                }
            }
            checkChain()
        }

        if(wallet.address) {
            checkMDatabase()
            if(!resident.isManager) {
                checkRDatabase()
            }
        }
    }, [account.connected, wallet.address])
    
    return (
        <>
            <div className="p-5 items-center flex justify-center flex-col">
                <h1 className='mt-12 text-3xl text-white'>Login</h1>
            </div>
            <div className="items-center flex justify-center flex-col">
                <div className="border border-[#1055CC] w-[30vw] h-[15vw] py-10 bg-[#141519]">
                    <p className=" mt-12 text-white font-regular text-2xl">Connect your wallet to get started</p>
                    <div className="mt-3 flex items-center justify-center gap-3">
                        <p className="text-white text-1xl">New here?</p>
                        <a href="" className="text-[#6D9EEB] text-1xl underline	">sign up</a>
                    </div>
                </div>
                <div className="mt-5 w-[45vw]">
                    <div className='flex justify-center items-center'>
                    <MetaMaskButton color="blue"/>
                    </div>
                    <div className="mt-5 flex gap-3 justify-center">
                        <p className="text-white text-1xl">Are you a property manager?</p>
                        <a href="/manager/signup/1" className="text-[#6D9EEB] text-1xl underline	">click here</a>
                    </div>
                </div>  
            </div>
            <Footer />
        </>
    )
}