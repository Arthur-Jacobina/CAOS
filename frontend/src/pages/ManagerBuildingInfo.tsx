    import '../wallet-button.css'
import { useEffect } from "react";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

import checked from '../assets/checked.svg'
import checkedb from '../assets/checked-blue.svg'
import { ManagerSignupInfo } from "../types/managerSignupInfo";
import { GetAccountResult } from "../types/account";

export default function ManagerBuildingInfo({ info , account }: { info: ManagerSignupInfo | null ; account:SDKState }) {
    const navigate = useNavigate()
    
    // Check if user is logged in:
    useEffect(() => {
        if(!account.connected) {
            navigate('/manager/signup/1')
        }
    }, [account.connected]) 

    const handleSubmit = (event) => {
        if(info) {
            event.preventDefault()
            info.buldingName = event.target[0].value
            info.numberUnits = event.target[1].value.toString()
            info.rent = event.target[2].value
            
            navigate('/manager/signup/3')
        }
    }
    
    return (
        <>
            <div className="p-16 items-center flex justify-center flex-col">
                <div className="mb-10 text-center text-white">
                    <h1 className="text-3xl">Welcome, dear manager!</h1>
                    <p className="text-2xl text-[#6D9EEB]">Please enter the name of your building and the number of units</p>
                    
                </div>
                <form className="w-[50vw]" onSubmit={handleSubmit}>
                    <div className="flex gap-5 items-center">
                        <label className="w-[15vw] text-white text-xl" htmlFor="bname">Building name: </label>
                        <input className="text-lg px-2 text-white outline-0 w-[80%] bg-transparent border-b border-[#1155CC]" type="text" name="bname" id="bname" required/>
                    </div>
                    <div className="flex gap-5 items-center mt-10">
                        <label className="w-[15vw] text-white text-xl" htmlFor="bnumber">Number of units: </label>
                        <input className="text-lg px-2 text-white outline-0 w-[80%] bg-transparent border-b border-[#1155CC]" type="number" name="bnumber" id="bnumber" required/>
                    </div>
                    <div className="flex gap-5 items-center mt-10">
                        <label className="w-[15vw] text-white text-xl" htmlFor="rent">Rent value (U$): </label>
                        <input className="text-lg px-2 text-white outline-0 w-[80%] bg-transparent border-b border-[#1155CC]" type="number" name="rent" id="rent" required/>
                    </div>
                    <button type="submit" className='mt-10 w-[7vw] py-2 rounded text-white bg-[#6D9EEB] font-bold hover:bg-transparent hover:text-[#6D9EEB] hover:border-[#1155CC] hover:border ease-in-out duration-300 '>Continue</button>
                </form>
                <div className= "absolute right-12 border border-[#1155CC] p-5 rounded" >
                    <div className="flex items-center gap-3">
                        <img src={checkedb} alt="" />
                        <p className="text-white">Connect Wallet</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <img src={checked} alt="" />
                        <p className="text-[#717171]">Building Info</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <img src={checked} alt="" />
                        <p className="text-[#717171]">Residents Info</p>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}