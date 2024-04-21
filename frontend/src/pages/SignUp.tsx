import '../wallet-button.css'
import Footer from "../components/Footer";

import orch from '../assets/orch.png'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login({resident}: {resident: any}) {
    const navigate = useNavigate()

    useEffect(() => {
        if(resident.isManager) {
            navigate('/manager/overview')
        }
    }, [resident.isManager])

    return (
        <>
            <div className="p-16 items-center flex justify-center flex-col">
                <div className="border border-[#1155CC] w-[45vw] py-10 flex flex-col items-center">
                    <p className="mb-12 text-white font-regular text-3xl">Contact your building manager to get started!</p>
                    <img src={orch} alt="" />
                </div>
            </div>
            <Footer />
        </>
    )
}