import { useEffect, useState } from "react";

export const MovieSlider = ({ featuredMovies }) => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === featuredMovies.length - 1 ? 0 : prev + 1));
    }, 5000); // Slides every 5 seconds
    return () => clearInterval(timer);
  }, [featuredMovies.length]);

  if (!featuredMovies.length) return null;

  const movie = featuredMovies[current];
  const imgUrl = "https://image.tmdb.org/t/p/w1280" // w500 is faster/better for smaller cards

console.log(movie);

  return (
    <div className="relative w-full h-[50vh] lg:h-[80vh] overflow-hidden rounded-[3rem] mb-16 group shadow-2xl">
      {/* Background Image with Ken Burns Effect */}
      <div className="absolute inset-0 transition-transform duration-6000 ease-linear scale-110 group-hover:scale-125">
        <img
          src={imgUrl + movie.poster_path}
          className="w-full h-full object-cover object-top"
          alt={movie.title}
        />
        {/* Multi-directional Overlays for readability */}
        <div className="absolute inset-0 bg-linear-to-t from-[#050505] via-[#050505]/30 to-transparent" />
        <div className="absolute inset-0 bg-linear-to-r from-[#050505]/90 via-transparent to-transparent" />
      </div>

      {/* Info Content Overlay */}
      <div className="absolute bottom-10 lg:bottom-0 left-0 p-8 lg:p-16 w-full lg:w-2/3 space-y-6 animate-in slide-in-from-left duration-700">
        <div className="inline-flex items-center gap-3 px-3 py-1 bg-green-500/20 border border-green-500/50 rounded-full">
           <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
           <span className="text-green-500 text-[10px] font-black uppercase tracking-widest">Trending Now</span>
        </div>
        {/* In your MovieSlider Component */}
<h1 className="text-2xl lg:text-5xl font-black text-white line-clamp-1 leading-tight uppercase  min-h-[1.2em]">
  {movie.title}
</h1>

        <p className="text-gray-300 text-[12px] lg:text-[14px] line-clamp-2 max-w-2xl font-medium leading-relaxed">
          {movie.overview}
        </p>
        <div className="flex gap-5 pt-6">
          <button className=" text-[10px] lg:text-[18px] px-6 py-3  lg:px-10 lg:py-5  bg-white
           text-black rounded-lg lg:rounded-2xl font-black hover:bg-green-500 hover:text-white transition-all shadow-xl">
            Watch Now
          </button>
          <button className=" text-[10px] lg:text-[18px] px-6 py-3  lg:px-10 lg:py-5  bg-white/10
           backdrop-blur-xl text-white border border-white/20 rounded-lg lg:rounded-2xl font-black hover:bg-white/20 transition-all">
            More Info
          </button>
        </div>
      </div>

      {/* Indicators */}
      <div className="absolute bottom-12 right-12 flex gap-3">
        {featuredMovies.map((_, idx) => (
          <div key={idx} className={`h-1 rounded-full transition-all duration-500 ${idx === current ? 'w-12 bg-green-500' : 'w-3 bg-white/20'}`} />
        ))}
      </div>
    </div>
  );
};
