// Importing the `useNavigate` hook from `react-router-dom` to navigate between routes programmatically
import { useNavigate } from 'react-router-dom';
// Importing the logo image
import logo from '../assets/logoCaos.png';
import './Header.css';

// Defining the Header component responsible for rendering the header section of the application
export default function Header() {
    // Using the `useNavigate` hook to get the navigate function for routing
    const navigate = useNavigate();

    // Rendering the header section with logo, site name, and navigation links
    return (
        <header className="bg-darkColor text-sky-100 py-4 px-20 shadow-lg sticky w-full top-0 z-20 backdrop-blur-lg">
            {/* Div containing header content */}
            <div className="flex justify-between items-center">
                {/* Button with logo and site name */}
                <button className="flex items-center space-x-6"
                    // Navigate to the home page when the button is clicked
                    onClick={() => navigate('/')}
                >
                    {/* Displaying the logo */}
                    <img 
                        src={logo} 
                        alt="Logo" 
                        className="h-8" 
                    />
                    {/* Displaying the site name */}
                    <h1 className="text-white font-light">dao your property</h1>
                </button>
                
                <button onClick={() => navigate('/login')} className='w-[7vw] py-2 rounded text-white bg-[#6D9EEB] font-bold hover:bg-transparent hover:text-[#6D9EEB] hover:border-[#1155CC] hover:border ease-in-out duration-300'>login</button>
            </div>
        </header>
    );
}