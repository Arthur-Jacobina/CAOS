import { useNavigate } from 'react-router-dom';
import img2 from '../assets/img2.png';
import img3 from '../assets/img3.png';
import { GetAccountResult } from '../types/account';
import { SDKState } from '@metamask/sdk-react-ui';

import landingLogo from '../assets/landingLogo.svg'
import landingChecked from '../assets/landingChecked.svg'
import residentialLogo from '../assets/residentialLogo.svg'
import studentLogo from '../assets/studentHousing.svg'
import hotelLogo from '../assets/hotelChains.svg'
import as3 from '../assets/as3.svg'
import pricing from '../assets/pricing.svg'
import logo from '../assets/logoCaos.png';
import '../components/footer.css'

export default function Home({account} : {account:SDKState}) {
    const navigate = useNavigate()

    return (
        <div>
            <div className='h-[80vh] bg-[#071C42] flex flex-col gap-20 justify-center items-center'>
                <img src={landingLogo} className='h-[15vh]' alt="" />
                <h1 className='text-5xl font-bold text-white'>Web3 All-in-one property management software </h1>
                <div className='flex items-center gap-24 w-100% justify-center'>
                    <button onClick={() => navigate('/SignUp')} className='w-[10vw] py-2 rounded text-white bg-[#6D9EEB] font-bold hover:bg-transparent hover:text-[#6D9EEB] hover:border-[#1155CC] hover:border ease-in-out duration-300 '>SIGN UP</button>
                    <button onClick={() => navigate('/login')} className='w-[10vw] py-2 rounded text-[#6D9EEB] border-[#1155CC] border bg-transparent font-bold hover:bg-[#6D9EEB] hover:text-white ease-in-out duration-300'>LOGIN</button>
                </div>  
            </div>
            <div className='flex justify-center py-5'>
                <div className='text-center w-[85vw] px-24 font-medium border-[20px] border-l-[#407BFF] border-r-[#407BFF] border-t-[#0D1117] border-b-[#0D1117]'>
                    <h2 className='mt-5 text-2xl text-white font-light text-justify'>We get it, nobody wants to endure the hassle of attending condominium meetings, sifting through countless emails, or feeling uncertain about where your money is going. But those frustrations are now a thing of the past...</h2>
                </div>
            </div>
            <div className='flex flex-col justify-center items-center mt-10' >
                <img src={landingLogo} className='h-[8vh]' alt="" />
                <div className='text-left'>
                    <div className='mt-8 flex gap-2 items-center justify-left '>
                        <img src={landingChecked} className='h-8'  alt="" />
                        <h1 className='text-[26px] text-white font-bold'>Transparent voting system and no more need for long meetings</h1>
                    </div>
                    <div className='mt-5 flex gap-2 items-center justify-left '>
                        <img src={landingChecked} className='h-8'  alt="" />
                        <h1 className='text-[26px] text-white font-bold'>Maintenance requests registered directly through our app</h1>
                    </div>
                    <div className='mt-5 flex gap-2 items-center justify-left '>
                        <img src={landingChecked} className='h-8'  alt="" />
                        <h1 className='text-[26px] text-white font-bold'>Transparent management of funds and payments</h1>
                    </div>
                    <div className='mt-5 flex gap-2 items-center justify-left '>
                        <img src={landingChecked} className='h-8'  alt="" />
                        <h1 className='text-[26px] text-white font-bold'>Rent and maintenance taxes are payed directly through our app</h1>
                    </div>
                    <div className='mt-5 flex gap-2 items-center justify-left '>
                        <img src={landingChecked} className='h-8'  alt="" />
                        <h1 className='text-[26px] text-white font-bold'>Transactions performed in Solana Network</h1>
                    </div>
                    <div className='mt-5 flex gap-2 items-center justify-left '>
                        <img src={landingChecked} className='h-8'  alt="" />
                        <h1 className='text-[26px] text-white font-bold'>Users don’t need to have a wallet </h1>
                    </div>
                </div>
                <div className='mt-8'>
                    <button onClick={() => navigate('/SignUp')} className='w-[10vw] py-2 rounded text-white bg-[#6D9EEB] font-bold hover:bg-transparent hover:text-[#6D9EEB] hover:border-[#1155CC] hover:border ease-in-out duration-300 '>SIGN UP</button>
                </div>
            </div>
            <div className='text-left px-24 mt-16 '>
                <h1 className='text-4xl font-bold text-white'>Made for <span className='text-[#6D9EEB]'>everyone</span></h1>
                <h1 className='text-3xl font-bold text-white mt-5'>Mixed Portifolio</h1>
                <div className='mt-10 flex w-full items-center justify-center'>
                    <img src = {as3} alt=''className='w-[60vw]'/>
                </div>
            </div>
            <div className="text-left px-24 mt-16"> 
                <h1 className='text-4xl font-bold text-white mt-5'>Affordable prices</h1>
                <h1 className='text-xl font-bold text-white mt-1'>(monthly)</h1>
                <div className='mt-10 flex w-full items-center justify-center'>
                    <img src = {pricing} alt=''className='w-[60vw]'/>
                </div>
            </div>
            <div className='flex justify-between px-24 py-12 mt-10'>
                <div >
                    <div className=' flex gap-2 items-center justify-left '>
                        <img src={landingChecked} className='h-8'  alt="" />
                        <h1 className='text-[26px] text-white font-bold'>Special pricing for student housing</h1>
                    </div>
                    <div className='mt-5 flex gap-2 items-center justify-left '>
                        <img src={landingChecked} className='h-8'  alt="" />
                        <h1 className='text-[26px] text-white font-bold'>Provides GAAP Standard reports to Hotel Chains</h1>
                    </div>
                    <div className='mt-5 flex gap-2 items-center justify-left '>
                        <img src={landingChecked} className='h-8'  alt="" />
                        <h1 className='text-[26px] text-white font-bold'>Special conditions for annual plans, contact us!</h1>
                    </div>
                </div>
                <div className='flex flex-col gap-10 justify-center items-center'>
                    <button onClick={() => navigate('/SignUp')} className='w-[10vw] py-2 rounded text-white bg-[#6D9EEB] font-bold hover:bg-transparent hover:text-[#6D9EEB] hover:border-[#1155CC] hover:border ease-in-out duration-300 '>SIGN UP</button>
                    <button onClick={() => window.open('https://twitter.com/CaosOrca', '_blank')} className='w-[10vw] py-2 rounded text-white bg-[#6D9EEB] font-bold hover:bg-transparent hover:text-[#6D9EEB] hover:border-[#1155CC] hover:border ease-in-out duration-300 '>CONTACT US</button>
                </div>
            </div>

            <footer className="mt-20 py-6 px-20 shadow-lg w-full flex justify-between items-center">
                <img 
                    src={logo} 
                    alt="Logo" 
                    className="h-12" 
                />
                <h1 className="text-white font-light">dao your property</h1>
            </footer>

        </div>
    )
}