import '../wallet-button.css'
import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

import checked from '../assets/checked.svg'
import checkedb from '../assets/checked-blue.svg'
import { ManagerSignupInfo } from "../types/managerSignupInfo";
import { SDKState, useAccount } from '@metamask/sdk-react-ui';
import { ethers } from 'ethers';
// import DeployERC20 from '../deploy/DeployERC20';
// import DeployRent from '../deploy/DeployRent';
// import DeployEvents from '../deploy/DeployEvents';
// import DeployBills from '../deploy/DeployBills';
// import DeployMaintenance from '../deploy/DeployMaintenance';


export default function ManagerOwnersInfo({ info , account }: { info: ManagerSignupInfo |null ; account:SDKState }) {
    const navigate = useNavigate()

    const wallet = useAccount()


    const [message, setMessage] = useState<string>("")
    const [submited, setSubmited] = useState<boolean>(false)
    const [current, setCurrent] = useState(0)
    const [input, setInput] = useState({
        publicKey: ""
    })
    
    // Check if user is logged in:
    /* useEffect(() => {
        if(!account.connected) {
            navigate('/manager')
        }
    }, [account.connected]) */

    const handleNext = () => {
        const newResident  = {
            apartment: current,
            rentValueInUsd: info.rent,
            residentWallet: input.publicKey,
            hasPaidRent: false
        }
        console.log(input.publicKey)
        info.residents[current] = newResident
        setCurrent(a => a+1)
        setInput({publicKey: info.residents[current+1].residentWallet || ""})
    }

    const handlePrevious = () => {
        const newResident  = {
            apartment: current,
            rentValueInUsd: info.rent,
            residentWallet: input.publicKey,
            hasPaidRent: false
        }
        info.residents[current] = newResident
        setInput({publicKey: info.residents[current-1].residentWallet})
        setCurrent(a => a-1)
    }

    const handleSubmit = async () => {
        if(info) {
            // const dburl = 'http://localhost:8080/'
            const dburl = 'https://caosdatabase.onrender.com/'
            setSubmited(true)
            const newResident  = {
                apartment: current,
                rentValueInUsd: info.rent,
                residentWallet: input.publicKey,
                hasPaidRent: false
            }
            info.residents[current] = newResident

            const provider = new ethers.providers.Web3Provider(window.ethereum)
            await provider.send('eth_requestAccounts', [])
            const signer = provider.getSigner()

            console.log("deploying token...")
            setMessage("Token is being deployed... ")
            const tokenAddress = await DeployERC20(provider, signer);
            setMessage('Verifyng token contract...')
            const verifyERCOptions = { 
                method:'POST',
                mode:'cors', 
                headers:{ 'Content-Type': 'application/json' }, 
                body: JSON.stringify({tokenAddress})
            }
            await fetch(dburl + 'verifyERC20', verifyERCOptions)

            console.log("deploying maintenance...")
            setMessage("Maintenance is being deployed... ")
            const maintenenceAddress = await DeployMaintenance(provider, signer);
            setMessage('Verifyng maintenence contract...')
            const verifyMaintenenceOptions = {
                method:'POST',
                mode:'cors', 
                headers:{ 'Content-Type': 'application/json' }, 
                body: JSON.stringify({maintenenceAddress})
            }
            await fetch(dburl + 'verifyMaintenence', verifyMaintenenceOptions)

            console.log("deploying rent...")
            setMessage("Rent is being deployed... ")
            const rentAddress = await DeployRent(provider, signer, tokenAddress, info.residents);
            setMessage('Verifyng rent contract...')
            const verifyRentOptions = {
                method:'POST',
                mode:'cors', 
                headers:{ 'Content-Type': 'application/json' }, 
                body: JSON.stringify({rentAddress, tokenAddress, residents: info.residents})
            }
            await fetch(dburl + 'verifyRent', verifyRentOptions)
            
            console.log("deploying events...")
            setMessage("Events is being deployed... ")
            const eventsAddress = await DeployEvents(provider, signer, tokenAddress, rentAddress);
            setMessage('Verifyng events contract...')
            const verifyEventsOptions = {
                method:'POST',
                mode:'cors', 
                headers:{ 'Content-Type': 'application/json' }, 
                body: JSON.stringify({eventsAddress, rentAddress, tokenAddress})
            }
            await fetch(dburl + 'verifyEvents', verifyEventsOptions)

            console.log("deploying bills...")
            setMessage("Bills is being deployed... ")
            const billsAddress = await DeployBills(provider, signer);
            setMessage('Verifyng bills contract...')
            const verifyBillsOptions = {
                method:'POST',
                mode:'cors', 
                headers:{ 'Content-Type': 'application/json' }, 
                body: JSON.stringify({billsAddress})
            }
            await fetch(dburl + 'verifyBills', verifyBillsOptions)

            const newManager = {
                wallet: wallet.address.toString()
            }

            const ManagerOptions = { method:'POST', mode:'cors', headers:{ 'Content-Type': 'application/json' }, body: JSON.stringify(newManager)}

            console.log("Trying to fetch...")
            const managerResponse = await fetch(dburl + 'addManager', ManagerOptions)
            const addedManager = await managerResponse.json()
            console.log(addedManager)

            const newProperty = {
                propertyName: info.buldingName,
                Rent: rentAddress,
                Bills: billsAddress,
                Maintenance: maintenenceAddress,
                Event: eventsAddress,
                ERC: tokenAddress,
                managerID: addedManager.managerID
            }

            const PropertyOptions = { method:'POST', mode:'cors', headers:{ 'Content-Type': 'application/json' }, body: JSON.stringify(newProperty)}
            const propertyResponse = await fetch(dburl + 'addProperty', PropertyOptions)
            const addedProperty = await propertyResponse.json()
            console.log(addedProperty)

            for(const resident of info.residents) {
                const newResident = {
                    wallet: resident.residentWallet,
                    propertyID: addedProperty.propertyID
                }
                const ResidentOptions = { method:'POST', mode:'cors', headers:{ 'Content-Type': 'application/json' }, body: JSON.stringify(newResident)}
                const residentResponse = await fetch(dburl + 'addResident', ResidentOptions)
                const addedResident = await residentResponse.json()
                console.log(addedResident)
            }

            navigate('/overview')
        }
    }  
    return (
        <>
            <div className="p-16 items-center flex justify-center flex-col">
                {!submited ? 
                <>
                <div className="mb-10 text-center text-white">
                    <h1 className="text-3xl">Welcome, dear manager!</h1>
                    <p className="text-2xl text-[#6D9EEB]">Please enter owners info or click "Submit" to do it later</p>
                    <h1 className="mt-5 text-3xl">Resident of unit #{current+1}</h1>
                </div>
                <div className="w-[50vw]">
                    <div className="flex gap-5 items-center">
                        <label className="w-[16vw] text-white text-xl" htmlFor="bname">Resident's Public Key: </label>
                        <input value={input.publicKey} onChange={e => {setInput({publicKey: e.target.value})}} className=" text-lg px-2 text-white outline-0 w-[80%] bg-transparent border-b border-[#1155CC]" type="text" name="bname" id="bname"/>
                    </div>
                    <div className="flex gap-10 mt-10">
                        {current != 0 ? 
                        <button onClick={handlePrevious} className='w-[7vw] py-2 rounded text-[#6D9EEB] border-[#1155CC] border bg-transparent font-bold hover:bg-[#6D9EEB] hover:text-white ease-in-out duration-300'>Previous</button>
                        : ""
                        }

                        {current < info.numberUnits - 1 ?
                        <button onClick={handleNext} className='w-[7vw] py-2 rounded text-white bg-[#6D9EEB] font-bold hover:bg-transparent hover:text-[#6D9EEB] hover:border-[#1155CC] hover:border ease-in-out duration-300 '>Next</button>
                        : ""
                        }
                    </div>
                    <button onClick={handleSubmit} className='mt-10 w-[7vw] py-2 rounded text-white bg-[#6D9EEB] font-bold hover:bg-transparent hover:text-[#6D9EEB] hover:border-[#1155CC] hover:border ease-in-out duration-300 '>Submit</button>
                </div>
                <div className= "absolute right-12 border border-[#1155CC] p-5 rounded" >
                    <div className="flex items-center gap-3">
                        <img src={checkedb} alt="" />
                        <p className="text-white">Connect Wallet</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <img src={checkedb} alt="" />
                        <p className="text-white">Building Info</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <img src={checked} alt="" />
                        <p className="text-[#717171]">Owners Info</p>
                    </div>
                </div>
                </>
                :
                <>
                <div className="mb-10 text-center text-white">
                    <h1 className="text-3xl">Now, we're going to deploy your contracts to NEON Network</h1>
                    <p className="text-2xl text-[#6D9EEB]">{message}</p>
                    <h1 className="mt-5 text-3xl">Please, authorize the transaction</h1>
                </div>
                </>
                }
            </div>
            <Footer />
        </>
    )
}