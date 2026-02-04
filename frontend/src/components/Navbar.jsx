import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BookOpen, PlusCircle, BrainCircuit } from 'lucide-react';

const Navbar = () => {
    const location = useLocation();

    return (
        <nav className="bg-gray-900 border-b border-gray-800 p-4 sticky top-0 z-50">
            <div className="max-w-4xl mx-auto flex items-center justify-between">
                <Link to="/" className="flex items-center gap-2 text-xl font-bold text-blue-400 hover:text-blue-300 transition-colors">
                    <BookOpen size={24} />
                    <span>Vocabtion</span>
                </Link>
                
                <div className="flex items-center gap-4">
                    <NavLink to="/" icon={<BookOpen size={18} />} label="Words" active={location.pathname === '/'} />
                    <NavLink to="/add" icon={<PlusCircle size={18} />} label="Add New" active={location.pathname === '/add'} />
                    <NavLink to="/quiz" icon={<BrainCircuit size={18} />} label="Quiz" active={location.pathname === '/quiz'} />
                </div>
            </div>
        </nav>
    );
};

const NavLink = ({ to, icon, label, active }) => (
    <Link 
        to={to} 
        className={`flex items-center gap-2 px-3 py-2 rounded-md transition-all ${
            active 
                ? 'bg-blue-600/20 text-blue-400' 
                : 'text-gray-400 hover:text-white hover:bg-gray-800'
        }`}
    >
        {icon}
        <span className="hidden sm:inline">{label}</span>
    </Link>
);

export default Navbar;
