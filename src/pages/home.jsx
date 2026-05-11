import { useQuery } from "@tanstack/react-query";
import {  fetchMovies } from "../api/api";
import { MovieCard } from "../components/MovieCard";
import { NavLink, useOutletContext} from "react-router-dom";
import { MovieSlider } from "../components/movieslider";


export const HomePage = () => {
  const { search } = useOutletContext();
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["movie"],
    queryFn: fetchMovies,
    staleTime: 5 * 60 * 1000,
  });
console.log(search);

 
if (isLoading) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-5">
      {Array(8).fill(0).map((_, i) => (
        <div key={i} className="animate-pulse">
          <div className="aspect-[2/3] bg-gray-300 rounded-xl"></div>
          <div className="mt-4 space-y-2">
            <div className="h-4 bg-gray-300 rounded w-3/4"></div>
            <div className="h-3 bg-gray-300 rounded w-full"></div>
          </div>
        </div>
      ))}
    </div>
  );
}

  if (isError) return <p className="text-center mt-10">Error: {error.message}</p>;
const featuredMovies = data?.slice(0, 5) || [];

const filteredData = data?.filter((movie) => {
  // Ensure search is a string and movie.title exists
  const searchTerm = typeof search === "string" ? search.toLowerCase() : "";
  return movie.title?.toLowerCase().includes(searchTerm);
});



const newlyReleased = [...data].sort((a, b) => {
  return new Date(b.release_date) - new Date(a.release_date);
});


const adventureMovies = [...data].filter((cur)=>{
  console.log(cur.genre_ids);
  
  return cur.genre_ids
 
  
})



  return (
    // Added max-width and centering for better large-screen UX
    <div className="lg:p-4 sm:p-8 max-w-7xl mx-auto">
    {!search && <MovieSlider featuredMovies={featuredMovies} />}

{search.length > 0 ? (
  <div className="animate-in fade-in duration-700">
    {/* 1. Header with Glow Effect */}
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10 border-b border-white/10 pb-6">
      <div className="flex items-center gap-4">
        <div className="relative">
          <div className="w-1.5 h-10 bg-green-500 rounded-full shadow-[0_0_20px_rgba(34,197,94,0.8)]"></div>
          <div className="absolute top-0 left-0 w-1.5 h-10 bg-green-400 rounded-full animate-pulse blur-sm"></div>
        </div>
        <div>
          <h2 className="text-sm font-bold text-gray-400 uppercase tracking-[0.2em] mb-1">Search Results</h2>
          <h3 className="text-3xl font-black text-white tracking-tight">
            Found for <span className="text-green-500 italic">"{search}"</span>
          </h3>
        </div>
      </div>
      <span className="text-xs font-black text-gray-500 bg-white/5 px-4 py-2 rounded-full border border-white/10">
        {filteredData?.length} TITLES MATCHED
      </span>
    </div>

    {/* 2. Responsive Grid */}
    {filteredData?.length > 0 ? (
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 md:gap-8">
        {filteredData.map((cur) => (
          <div key={cur.id} className="hover:z-10 transition-transform duration-300 hover:scale-105">
            <MovieCard 
              id={cur.id} 
              title={cur.title} 
              overview={cur.overview} 
              date={cur.release_date}
              image={cur.poster_path}
            />
          </div>
        ))}
      </div> 
    ) : (
      /* 3. Modern Empty State */
      <div className="flex flex-col items-center justify-center py-32 bg-white/5 rounded-[3rem] border border-dashed border-white/10">
        <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-6">
           <svg className="w-10 h-10 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
           </svg>
        </div>
        <p className="text-xl font-bold text-gray-400">No movies found for "{search}"</p>
        <p className="text-sm text-gray-600 mt-2">Try checking for typos or use more general keywords.</p>
      </div>
    )}
  </div>
) : (
  /* 4. Search Prompt UX */
  <NavLink to="/movies">
  <div className="py-20 text-center opacity-40 flex items-center justify-center ">
    <p className="text-gray-500  w-fit p-2.5 rounded-full font-medium tracking-widest uppercase text-sm border 
     border-gray-500 hover:border-green-400 hover:text-green-400">Start to explore movies...</p>
  </div>

  </NavLink>
)}


    <div className="mt-12 px-3 max-w-7xl mx-auto">
  
  {/* Modern Heading */}
  <div className="flex items-center gap-3 mb-6">
    <div className="w-1.5 h-8 bg-green-500 rounded-full shadow-[0_0_15px_rgba(34,197,94,0.6)]"></div>
    <h2 className="text-2xl font-black text-white tracking-tight uppercase">
      Adventure <span className="text-green-500">Movies</span>
    </h2>
  </div>

  {/* Horizontal Scroll Container */}
  <div className="flex overflow-x-auto gap-6 pb-8 no-scrollbar  snap-x snap-mandatory">
    {adventureMovies.slice(0, 10).map((movie) => (
      <div 
        key={movie.id} 
        className="min-w-[160px] sm:min-w-[200px] md:min-w-[200px] snap-start transform transition-transform duration-300 hover:scale-105"
      >
        <MovieCard 
          id={movie.id} 
          title={movie.title} 
          date={movie.release_date}
          image={movie.poster_path}
        />
      </div>
    ))}
  </div>
</div>

{/* Section Wrapper */}
<div className="mt-12 px-4 max-w-7xl mx-auto">
  
  {/* Modern Heading */}
  <div className="flex items-center gap-3 mb-6">
    <div className="w-1.5 h-8 bg-green-500 rounded-full shadow-[0_0_15px_rgba(34,197,94,0.6)]"></div>
    <h2 className="text-2xl font-black text-white tracking-tight uppercase">
      Newly <span className="text-green-500">Released</span>
    </h2>
  </div>

  {/* Horizontal Scroll Container */}
  <div className="flex overflow-x-auto gap-6 pb-8 no-scrollbar  scrollbar-hide snap-x snap-mandatory">
    {newlyReleased.slice(0, 10).map((movie) => (
      <div 
        key={movie.id} 
        className="min-w-[160px] sm:min-w-[200px] md:min-w-[200px] snap-start transform transition-transform duration-300 hover:scale-105"
      >
        <MovieCard 
          id={movie.id} 
          title={movie.title} 
          date={movie.release_date}
          image={movie.poster_path}
        />
      </div>
    ))}
  </div>
</div>


      
      {/* Empty State UX */}
      {filteredData?.length === 0 && (
        <p className="text-center text-gray-500 mt-20">No movies found matching "{search}"</p>
      )}
    </div>
  );
};
