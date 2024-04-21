import '../wallet-button.css'
import { useEffect } from "react";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { MetaMaskButton, SDKState } from "@metamask/sdk-react-ui";
import { GetAccountResult } from "../types/account";

export default function ManagerLogin({account} : {account:SDKState}) {
    const navigate = useNavigate()
    

    // Check if user is logged in:
    useEffect(() => {
        if(account.connected) {
            navigate('/manager/overview')
        }
    }, [account.connected])
    
    return (
        <>
            <div className="p-16 items-center flex justify-center flex-col">
                <div className="mb-10 text-center text-white">
                    <h1 className="text-3xl">Welcome, dear manager!</h1>
                    <p className="text-2xl">please login or sign-up</p>
                </div>
                <div className="border border-[#1155CC] w-[45vw] py-10">
                    <p className="mb-12 text-white font-regular text-3xl">Connect your wallet to login</p>
                    <MetaMaskButton color="blue"/>
                </div>
                <a href="/manager/signup/1" className="mt-2 text-[#6D9EEB] text-2xl underline	">sign up</a>
                <div className="mt-20 w-[45vw]">
                    <div className="flex justify-between">
                        <p className="text-white text-2xl">New here?</p>
                        <a href="" className="text-[#6D9EEB] text-2xl underline	">learn more</a>
                    </div>
                </div>  
            </div>
            <Footer />
        </>
    )
}