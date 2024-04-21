import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import '../wallet-button.css'
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import check from '../assets/checked-blue.svg';
import { GetAccountResult } from "../types/account";
import { SDKState } from "@metamask/sdk-react-ui";

export default function Home({account, resident} : {account:SDKState; resident: any}) {
    const navigate = useNavigate()

    // const dburl = 'http://localhost:8080/'
    const dburl = 'https://caosdatabase.onrender.com/'
    
    const [buildingName, setBuildingName] = useState<string>("")
    const [property, setProperty] = useState(null)
    const [residents, setResidents] = useState(null)

    const getPropertyResidents = async () => {
        const options = {
            method: 'GET',
            mode: 'cors'
        }
        const propID = property.propertyID
        const send = await fetch(dburl + `Residents/property/${propID}`, options)
        const residents = await send.json()
        console.log(residents)
        setResidents(residents)
    } 
    
    const checkDatabase = async () => {
        const options = {
            method: 'GET',
            mode: 'cors'
        }
        const managerID = resident.loggedInResident.managerID
        const send = await fetch(dburl + `Properties/manager/${managerID}`, options)
        const property = await send.json()
        console.log(property)
        setProperty(property)
        setBuildingName(property.propertyName)
    }

    // Check if user is logged in:
    useEffect(() => {
        if(!account.connected) {
            navigate('/login')
        }

        checkDatabase()
        getPropertyResidents()
    }, [account.connected])

    const data = [];

    if(residents) {
        for(let i = 0; i < residents.length; i++) {
            const wallet = residents[i].wallet.toLowerCase()
            const newEntry = { 
                apartment: i, 
                resident: wallet.slice(0, 8) + '...' + wallet.slice(35, 42),
                status: "not paid"
            }
            data.push(newEntry)
        }
    }
    
    return (
        <>
            <div className="py-12 px-24 flex">
                <div className="w-[60vw]">
                    <h1 className="py-2 text-5xl font-bold mb-12 text-white text-left">{buildingName}</h1> {/* Centered text */}
                    <h1 className="text-4xl mb-16 text-white text-left">Welcome, dear manager!</h1> {/* Centered text */}
                    <p className="text-3xl mb-8 ml-12 text-white text-left">Token balance: <span className='text-[#407BFF]'>125 ETH</span></p>
                    <div className="flex items-center gap-60 ">
                        <p className="text-3xl ml-12 text-white text-left">Bills to pay: <span className='text-[#407BFF]'>$150</span></p>
                        <button className='w-[7vw] py-2 rounded text-white bg-[#6D9EEB] font-bold hover:bg-transparent hover:text-[#6D9EEB] hover:border-[#1155CC] hover:border ease-in-out duration-300 '>Pay bills</button>
                    </div>
                </div>
                <div className="w-[50vw]">
                    <table className="table-auto w-full text-xl">
                        <thead>
                            <tr>
                            <th className="border-b border-gray-500 px-4 py-2 text-white font-bold">Apartment</th>
                            <th className="border-b border-gray-500 px-4 py-2 text-white font-bold">Resident</th>
                            <th className="border-b border-gray-500 px-4 py-2 text-white font-bold">Status</th>
                            <th className="border-b border-gray-500 px-4 py-2 text-white font-bold">Manage</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((row, index) => (
                            <tr key={index}>
                                <td className="border-b border-gray-500 px-4 py-2 text-white font-bold">{row.apartment}</td>
                                <td className="border-b border-gray-500 px-4 py-2 text-white font-bold">{row.resident}</td>
                                <td className={`border-b border-gray-500 px-4 py-2 font-bold ${row.status === 'paid' ? 'text-blue-500' : 'text-red-500'}`}>{row.status}</td>
                                <td className="border-b border-gray-500 px-4 py-2 text-white font-bold">
                                <button className='w-[7vw] py-2 rounded text-white bg-[#6D9EEB] font-bold hover:bg-transparent hover:text-[#6D9EEB] hover:border-[#1155CC] hover:border ease-in-out duration-300 '>Edit</button>    
                                </td>
                            </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="flex gap-10 items-center justify-center">
                        <button className='mt-10 px-4 py-2 rounded text-white bg-[#6D9EEB] font-bold hover:bg-transparent hover:text-[#6D9EEB] hover:border-[#1155CC] hover:border ease-in-out duration-300 '>Add a new resident</button>
                        <button onClick={getPropertyResidents} className='mt-10 px-4 py-2 rounded text-white bg-[#6D9EEB] font-bold hover:bg-transparent hover:text-[#6D9EEB] hover:border-[#1155CC] hover:border ease-in-out duration-300 '>Refresh results</button>
                    </div>
                </div>
            </div>
        </>
    )
}