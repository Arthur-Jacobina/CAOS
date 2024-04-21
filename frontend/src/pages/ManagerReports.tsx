import { useNavigate } from 'react-router-dom';
import pdf from '../assets/pdf.svg';
import img4 from '../assets/img4.jpg';
import { GetAccountResult } from '../types/account';

export default function Reports({account} : {account:SDKState}) {
    const navigate = useNavigate()

    return (
        <>
        <div className="items-center flex justify-center flex-col ">
            <div>
                <img src={img4} alt="" />
            </div>
            <button className='mt-4 w-[7vw] py-2 rounded text-white bg-[#6D9EEB] font-bold hover:bg-transparent hover:text-[#6D9EEB] hover:border-[#1155CC] hover:border ease-in-out duration-300 '>New entry</button>
            <div>
                <div className = "mt-4 p-2 px-4 bg-[#1055CC] w-[100vh] text-white text-left font-bold">
                    Reports on revenues, maintenance, services, contracts ands goals
                </div>
                <div className='py-4'>
                    <div className='flex gap-4 cursor-pointer hover:border-[#1055CC] hover:border-b'>
                        <img src={pdf} alt="" />
                        <div className='text-white text-left py-4 '>
                            <p>04/04/2024</p>
                            <p>Maintence requests status update</p>
                        </div>
                    </div>
                    <div className='flex gap-4 cursor-pointer hover:border-[#1055CC] hover:border-b'>
                        <img src={pdf} alt="" />
                        <div className='text-white text-left py-4 '>
                            <p>02/04/2024</p>
                            <p>Past month service report</p>
                        </div>
                    </div>
                    <div className='flex gap-4 cursor-pointer hover:border-[#1055CC] hover:border-b'>
                        <img src={pdf} alt="" />
                        <div className='text-white text-left py-4 '>
                            <p>31/03/2024</p>
                            <p>New cleaning provider contract report</p>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
        </>
    )
}