import { useQuery } from "@tanstack/react-query";
import { fetchMovies } from "../api/api";
import { useOutletContext } from "react-router-dom";
import { MovieCard } from "../components/MovieCard";

export const MoviePage = () => {
  const { search } = useOutletContext();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["movie"],
    queryFn: fetchMovies,
    staleTime: 5 * 60 * 1000,
  });

  // 1. Enhanced Skeleton Loader
  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto p-6 lg:p-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 lg:gap-10">
        {Array(10).fill(0).map((_, i) => (
          <div key={i} className="animate-pulse space-y-4">
            <div className="aspect-[2/3] bg-white/5 rounded-[2rem] border border-white/5"></div>
            <div className="h-4 bg-white/10 rounded-full w-3/4 mx-2"></div>
            <div className="h-3 bg-white/5 rounded-full w-1/2 mx-2"></div>
          </div>
        ))}
      </div>
    );
  }

  if (isError) return (
    <div className="flex flex-col items-center justify-center py-20 text-red-400">
      <p className="text-xl font-black">System Overload</p>
      <p className="text-sm opacity-60">{error.message}</p>
    </div>
  );

  const filteredData = data?.filter((movie) => {
    const searchTerm = typeof search === "string" ? search.toLowerCase() : "";
    return movie.title?.toLowerCase().includes(searchTerm);
  });

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <div className="p-4 sm:p-8 lg:p-12 max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-white/5 pb-8">
          <div className="flex items-center gap-4">
            <div className="w-2 h-10 bg-green-500 rounded-full shadow-[0_0_25px_rgba(34,197,94,0.8)]"></div>
            <div>
              <p className="text-xs font-black text-gray-500 uppercase tracking-[0.3em] mb-1">Explore</p>
              <h2 className="text-3xl lg:text-5xl font-black tracking-tight">
                {search ? (
                  <>Results for <span className="text-green-500 italic">"{search}"</span></>
                ) : (
                  "Trending Movies"
                )}
              </h2>
            </div>
          </div>
          {search && (
            <span className="text-xs font-bold text-gray-500 bg-white/5 px-4 py-2 rounded-full border border-white/10">
              {filteredData?.length} Matches Found
            </span>
          )}
        </div>

        {/* Results Grid */}
        {filteredData?.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 lg:gap-10">
            {filteredData.map((cur) => (
              <div key={cur.id} className="transition-all duration-500 hover:scale-105 active:scale-95">
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
          /* Empty State for Search */
          <div className="flex flex-col items-center justify-center py-32 bg-white/5 rounded-[4rem] border border-dashed border-white/10 mx-4">
            <div className="text-6xl mb-6 grayscale opacity-30">🎬</div>
            <h3 className="text-2xl font-black text-gray-400">Movie Not Found</h3>
            <p className="text-gray-600 mt-2 font-medium">Try searching for something else or clear the filter.</p>
            <button 
              className="mt-8 px-8 py-3 bg-white text-black rounded-full font-black hover:bg-green-500 hover:text-white transition-all shadow-xl"
              onClick={() => window.location.reload()}
            >
              Reset View
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

