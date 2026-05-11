export const FooterPage = ()=>{
  return(<>
 <footer className="bg-[#222831] text-white pt-16 md:pt-20 pb-10 px-6 md:px-[5%] border-t-2 border-[#1a1a1a] font-sans">
  <div className="max-w-[1300px] mx-auto flex flex-col lg:flex-row justify-between gap-12">
    
    {/* Left Section: Branding */}
    <div className="flex-1">
      {/* Responsive Text Size: 4xl on mobile, 5xl on desktop */}
      <div className="text-4xl md:text-5xl font-black tracking-tighter mb-2">
        Z<span className="text-[#2ecc71] drop-shadow-[0_0_15px_rgba(46,204,113,0.4)]">O</span>RO
      </div>
      <p className="font-semibold text-[10px] md:text-xs uppercase text-[#4d8eff] tracking-[2px] mb-5">
        Sharper Streaming. Better Quality.
      </p>
      <p className="text-[#888] text-sm leading-relaxed max-w-sm mb-8">
        The ultimate destination for cinephiles. Tracking the sharpest 4K releases, 
        indie gems, and the latest blockbusters with surgical precision.
      </p>
      <div className="flex gap-3">
        <a href="#" className="py-2 px-5 border border-[#4d8eff] text-[#4d8eff] 
        rounded-sm text-[10px] font-bold transition-all hover:bg-[#4d8eff] hover:text-black">
          DISCORD
        </a>
        <a href="#" className="py-2 px-5 border border-[#4d8eff] text-[#4d8eff] 
        rounded-sm text-[10px] font-bold transition-all hover:bg-[#4d8eff] hover:text-black">
          TWITTER
        </a>
      </div>
    </div>

    {/* Right Section: Navigation Links */}
    {/* Switched to 2 columns on mobile, 3 on tablets/desktop */}
    <div className="flex-[2] grid grid-cols-2 sm:grid-cols-3 gap-10">
      
      <div>
        <h4 className="text-base md:text-lg font-bold mb-6 relative after:content-[''] after:absolute after:left-0 after:-bottom-2 after:w-8 after:h-[2px] after:bg-[#2ecc71] after:-skew-x-[45deg]">
          Catalog
        </h4>
        <nav className="flex flex-col space-y-3">
          {["Movies", "TV Shows", "Anime", "Collections"].map((item) => (
            <a key={item} href="#" className="text-[#888] text-sm transition-all duration-300 hover:text-[#2ecc71] hover:translate-x-1">
              {item}
            </a>
          ))}
        </nav>
      </div>

      <div>
        <h4 className="text-base md:text-lg font-bold mb-6 relative after:content-[''] after:absolute after:left-0 after:-bottom-2 after:w-8 after:h-[2px] after:bg-[#2ecc71] after:-skew-x-[45deg]">
          Community
        </h4>
        <nav className="flex flex-col space-y-3">
          {["Forum", "Top Users", "Request Movie", "Discord"].map((item) => (
            <a key={item} href="#" className="text-[#888] text-sm transition-all duration-300 hover:text-[#2ecc71] hover:translate-x-1">
              {item}
            </a>
          ))}
        </nav>
      </div>

      {/* Legal spans 2 columns on mobile so it's not squished, or 1 on desktop */}
      <div className="col-span-2 sm:col-span-1 mt-4 sm:mt-0">
        <h4 className="text-base md:text-lg font-bold mb-6 relative after:content-[''] after:absolute after:left-0 after:-bottom-2 after:w-8 after:h-[2px] after:bg-[#2ecc71] after:-skew-x-[45deg]">
          Legal
        </h4>
        <nav className="flex flex-col space-y-3">
          {["DMCA", "Terms of Service", "Privacy Policy", "Contact Us"].map((item) => (
            <a key={item} href="#" className="text-[#888] text-sm transition-all duration-300 hover:text-[#2ecc71] hover:translate-x-1">
              {item}
            </a>
          ))}
        </nav>
      </div>

    </div>
  </div>

  <div className="text-center mt-16 pt-8 border-t border-[#1a1a1a] text-[#444] text-[10px] md:text-xs">
    <p>&copy; 2026 ZORO. Crafted for the fans by fans.</p>
  </div>
</footer>

  </>)

}