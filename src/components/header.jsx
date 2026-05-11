// src/components/Header.jsx
import { NavLink } from "react-router-dom";
import { BiSearch } from "react-icons/bi";
import { useState, useEffect } from "react";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { FaUserCircle, FaBell, FaSearch } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";


export const Navbar = ({search, setSearch}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

   

  // Effect to add a background blur when user scrolls
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Movies", path: "/movies" },
    { name: "TV Shows", path: "/tvshows" },
    { name: "New & Popular", path: "/popular" },
    { name: "My List", path: "/mylist" },
  ];


  return (
   <nav className={`fixed top-0 w-full z-100 transition-all duration-300 px-4 md:px-6 py-4 
      ${scrolled ? "bg-gray-950/90 backdrop-blur-xl border-b border-white/10" : "bg-transparent"}`}>
      
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        
        {/* Left: Logo & Desktop Links */}
        <div className="flex items-center gap-4 lg:gap-10">
          <NavLink to="/" className="text-2xl md:text-3xl font-black text-white tracking-tighter shrink-0">
            Z<span className="text-green-500">O</span>RO
          </NavLink>
          
          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <NavLink 
                key={link.name} 
                to={link.path}
                className={({ isActive }) => `text-sm font-medium transition-colors hover:text-green-500 
                  ${isActive ? "text-green-500 font-bold" : "text-gray-300"}`}
              >
                {link.name}
              </NavLink>
            ))}
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2 md:gap-5 text-white flex-1 justify-end">
          
          {/* Responsive Search Bar */}
          <div className="relative flex items-center bg-gray-800/50 rounded-full px-3 py-1.5 border
           border-gray-700 focus-within:border-green-500 transition-all w-full max-w-20 sm:max-w-50 md:max-w-64 focus-within:max-w-75">
            <FaSearch className="text-gray-400 shrink-0" />
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              // hidden on tiny screens unless focused, shows on sm (640px) up
              className="bg-transparent border-none outline-none text-sm text-white ml-2 w-full sm:block focus:block"
            />
            {search && (
              <FaXmark 
                className="text-gray-400 cursor-pointer ml-1 text-xs hover:text-white" 
                onClick={() => setSearch("")} 
              />
            )}
          </div>

          {/* Desktop Only Buttons */}
          <button className="hidden md:block relative hover:text-green-500 transition-colors shrink-0">
            <FaBell />
            <span className="absolute -top-1 -right-1 bg-red-600 text-[10px] w-3 h-3 flex items-center justify-center rounded-full">3</span>
          </button>
          
          <div className="hidden sm:flex items-center gap-2 cursor-pointer group shrink-0">
            <FaUserCircle className="text-2xl" />
            <span className="hidden md:block text-xs font-semibold">Guest</span>
          </div>

          {/* Mobile Menu Toggle */}
          <button className="lg:hidden text-2xl md:text-3xl shrink-0" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <HiX /> : <HiMenuAlt3 />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="lg:hidden m-5 min-w-full absolute top-full  left-0 bg-white/10 backdrop-blur-2xl border-b border-white/10 border-t
          p-6 flex flex-col gap-6 shadow-2xl animate-in fade-in slide-in-from-top-2 rounded-2xl">
          {navLinks.map((link) => (
            <NavLink 
              key={link.name} 
              to={link.path} 
              onClick={() => setIsOpen(false)}
              className="text-xl font-bold text-gray-300 hover:text-green-500"
            >
              {link.name}
            </NavLink>
          ))}
          <div className="pt-6 border-t border-white flex justify-around text-2xl text-white">
             <FaBell /> <FaUserCircle />
          </div>
        </div>
      )}
    </nav>

  );
};
