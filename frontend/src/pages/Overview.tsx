import '../wallet-button.css'
import { useEffect } from "react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import { SDKState, useAccount } from '@metamask/sdk-react-ui';
import OverviewTable from '../components/OverviewTable';
import { Chart as chartjs, LinearScale } from 'chart.js/auto';
import { Bar, Line, Doughnut } from 'react-chartjs-2';
import cashLogo from '../assets/cashLogo.svg';
import apartmentLogo from '../assets/apartmentLogo.svg';

import { ethers } from 'ethers';
// import { abi } from '../../artifacts/contracts/Rent.sol/Rent.json'

export default function Home({account, resident} : {account:SDKState; resident:any}) {
    const navigate = useNavigate()

    const [buildingName, setBuildingName] = useState<string>("")
    const [property, setProperty] = useState(null)

    const [inDebt, setInDebt] = useState(false)
    const [rentToPay, setRentToPay] = useState("")

    const wallet = useAccount()

    // const dburl = 'http://localhost:8080/'
    const dburl = 'https://caosdatabase.onrender.com/'
    
    const checkDatabase = async () => {
        const options = {
            method: 'GET',
            mode: 'cors'
        }
        const propertyID = resident.loggedInResident.propertyID
        const send = await fetch(dburl + `Properties/${propertyID}`, options)
        const property = await send.json()
        
        setProperty(property)
        setBuildingName(property.propertyName)
    }

    const fetchContracts = async () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        await provider.send('eth_requestAccounts', [])
        const signer = provider.getSigner()
        
        const RentContract = new ethers.Contract(property.Rent, abi, signer)
        setInDebt(await RentContract.functions.checkInDebt())
        setRentToPay((await RentContract.getRentValueByAddress(wallet.address)).toString())
    }

    const pay = async () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        await provider.send('eth_requestAccounts', [])
        const signer = provider.getSigner()

        const RentContract = new ethers.Contract(property.Rent, abi, signer)
        const tx = await RentContract.rent({ value: ethers.utils.parseEther("0.1") })
        console.log(tx)
    }
    
    // Check if user is logged in:
    useEffect(() => {
        if(!account.connected) {
            navigate('/login')
        }

        if(property) {
            fetchContracts()
        }
 
        checkDatabase()
    }, [account.connected, property])
    
    const [selectedMonth, setSelectedMonth] = useState('January');



    const PersonalExpensesData = {
        January: {
            Rent: 250,
            Maintenance: 300,
            Total: 550,
        },
        February: {
            Rent: 270,
            Maintenance: 320,
            Total: 590,
        },
        March: {
            Rent: 280,
            Maintenance: 330,
            Total: 610,
        },
        April: {
            Rent: 260,
            Maintenance: 310,
            Total: 570,
        },
        May: {
            Rent: 290,
            Maintenance: 340,
            Total: 630,
        },
        July: {
            Rent: 300,
            Maintenance: 350,
            Total: 650,
        }
    };
    const cascadeBarChartOptions = {
        resposive: true,
        scales: {
            x: {
                stacked: true,
            },
            y: {
                stacked: true,
                suggestedMin: 0,
            },
        },
    };

    
    return (
        <>
            <div className="py-12 px-24 flex justify-center">
            <div className="w-[full] text-center">
                    <h1 className="text-5xl font-bold mb-12 text-white text-center">{buildingName}</h1>  
                    <div className="flex gap-12 justify-left items-center">
                        <img className='w-12' src={apartmentLogo} alt="" />
                        <h1 className='text-4xl text-white'>Apartment: <span className='text-[#407BFF]'>105</span></h1>
                    </div>
                    <div className="mt-10 flex gap-[75px] justify-left items-center">
                        <img className='w-6' src={cashLogo} alt="" />
                        <h1 className='text-4xl text-white'>Rent Status: <span className='text-[#407BFF]'>{!inDebt ? "Paid" : "Not Paid"}</span></h1>
                        <button onClick={pay} className='w-[15vw] py-2 rounded text-white bg-[#6D9EEB] font-bold hover:bg-transparent hover:text-[#6D9EEB] hover:border-[#1155CC] hover:border ease-in-out duration-300 mx-[5vw]'>Pay rent</button>
                    </div>

                </div>
                
                </div>
                <div className='flex w-[full] items-top flex-row justify-center gap-20'>      
                    <div className='w-[40vw] mb-10 border border-[#407BFF] p-4'>
                        <div className="mb-6">
                            <select className="border border-gray-400 bg-gray-400 rounded bg-transparent text-white font-bold outline-0 px-4 py-2" value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)}>
                                <option className="text-black" value="January">January</option>
                                <option className="text-black" value="February">February</option>
                                <option className="text-black" value="March">March</option>
                                <option className="text-black" value="April">April</option>
                                <option className="text-black" value="May">May</option>
                                <option className="text-black" value="July">July</option>
                            </select>
                        </div>

                        
                        <div className="mb-6 w-full">
                            <h1 className="text-2xl mb-4 text-white text-center">Personal Expenses</h1> {/* Centered text */}
                                <Bar 
                                    data={{
                                        labels: ['Rent', 'Maintenance', 'Total'],
                                        datasets: [
                                            {
                                                label: '',
                                                data: [0, PersonalExpensesData[selectedMonth].Rent, 0], // Original Rent value and 0 for Maintenance
                                                backgroundColor: 'rgba(255, 99, 132, 0)',
                                                borderColor: 'rgba(255, 99, 132, 0)',
                                                borderWidth: 1,
                                            },
                                            {
                                                label: 'Maintenance',
                                                data: [0, PersonalExpensesData[selectedMonth].Maintenance, 0], // 0 for Original Rent and Maintenance value
                                                backgroundColor: '#6D9EEB',
                                                borderColor: '#6D9EEB',
                                                borderWidth: 1,
                                            },
                                            {
                                                label: 'Total',
                                                data: [0, 0, PersonalExpensesData[selectedMonth].Total], // Original Rent value and 0 for Maintenance
                                                backgroundColor: '#407BFF',
                                                borderColor: '#407BFF',
                                                borderWidth: 1,
                                            },
                                            {
                                                label: 'Rent',
                                                data: [PersonalExpensesData[selectedMonth].Rent, 0, 0], // First copy of Rent value and 0 for Maintenance
                                                backgroundColor: '#6D9EEB', // Adjust transparency or color as needed
                                                borderColor: '#6D9EEB',
                                                borderWidth: 1,
                                            },
                                            {
                                                label: '',
                                                data: [PersonalExpensesData[selectedMonth].Rent, 0, 0], // Second copy of Rent value and 0 for Maintenance
                                                backgroundColor: 'rgba(255, 99, 132, 0)', // Adjust transparency or color as needed
                                                borderColor: 'rgba(255, 99, 132, 0)',
                                                borderWidth: 1,
                                            }
                                        ]
                                    }}
                                    options={cascadeBarChartOptions} 
                                />
                        </div>
                    </div>
                    <OverviewTable/>
                </div>
        
        </>
    )
}