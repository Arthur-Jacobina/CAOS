import logo from '../assets/logoCaos.png';

export default function Footer() {
    return (
        <footer className="bottom-0 absolute py-6 px-20 shadow-lg w-full flex justify-between items-center">
            <img 
                src={logo} 
                alt="Logo" 
                className="h-12" 
            />
            <h1 className="text-white font-light">dao your property</h1>
        </footer>
    )
}