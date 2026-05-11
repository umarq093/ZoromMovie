import { useParams } from "react-router-dom";
import { fetchMovieById } from "../api/api";
import { useQuery } from "@tanstack/react-query";
import { FaSave, FaShare, FaShareAlt, FaThumbsUp } from "react-icons/fa";

import { AiFillDislike } from "react-icons/ai";
import { BiPlay, BiShare } from "react-icons/bi";

export const MovieData = () => {
  const imgUrl = "https://image.tmdb.org/t/p/w500";
  const { id } = useParams();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["movie", id],
    queryFn: () => fetchMovieById(id),
  });
  console.log(data);
  

  if (isLoading) return <DetailSkeleton />;
  if (isError) return <div className="text-white text-center p-20">Error loading movie...</div>;

  const languageMap = { en: "English", hi: "Hindi", fr: "French", es: "Spanish", ja: "Japanese", ko: "Korean", ru: "Russian" };

  return (
  
    <div className="mt-10 min-h-screen bg-gray-950 p-4 md:p-10 flex justify-center">
      <div className="max-w-6xl w-full bg-gray-900 rounded-3xl overflow-hidden shadow-2xl flex flex-col lg:flex-row">
        
        {/* LEFT/TOP SECTION: Movie Info */}
        <div className="flex-1 p-6 md:p-12 flex flex-col justify-between order-2 lg:order-1">
          <div>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <h1 className="text-white font-bold text-3xl md:text-5xl leading-tight">{data.title}</h1>
              <span className="text-yellow-400 text-xl font-bold shrink-0">
                ⭐ {data.vote_average.toFixed(1)}
              </span>
            </div>

            <div className="mt-6 space-y-4">
              <div className="flex flex-wrap gap-3 text-sm md:text-base text-gray-400">
                <p>{data.release_date}</p>
                <p>• {languageMap[data.original_language] || "Unknown"}</p>
                <div className="flex flex-wrap gap-1">
                  • {data.genres.map((g, i) => (
                    <span key={g.id}>{g.name}{i < data.genres.length - 1 ? ", " : ""}</span>
                  ))}
                </div>
              </div>

              <p className="text-gray-300 text-sm md:text-base leading-relaxed border border-gray-700 p-4 rounded-xl bg-gray-800/50">
                {data.overview}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-10">
            <div className="flex flex-wrap gap-4 mb-8">
              <button className="flex-1 md:flex-none px-8 py-3 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition-colors">
                Buy Movie
              </button>
              <button className="flex-1 md:flex-none px-8 py-3 bg-gray-800 text-white font-bold rounded-full border border-gray-700 hover:bg-gray-700 transition-colors">
                Rent Movie
              </button>
            </div>

            <div className="flex gap-4">
              {[FaThumbsUp, AiFillDislike, FaSave, FaShareAlt].map((Icon, idx) => (
                <button key={idx} className="group bg-gray-800 p-4 rounded-full hover:bg-blue-600 transition-all duration-300">
                  <Icon className="text-white text-xl group-hover:scale-110" />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT/TOP SECTION: Poster Image */}
        <div className="lg:w-1/3 w-full order-1 lg:order-2 relative group cursor-pointer">
          <img
            src={imgUrl + data.poster_path}
            alt={data.title}
            className="w-full h-full object-cover aspect-[2/3] lg:aspect-auto"
          />
          {/* Trailer Overlay */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center">
            <div className="bg-white p-5 rounded-full shadow-xl transform scale-75 group-hover:scale-100 transition-transform">
              <BiPlay className="text-black text-4xl" />
            </div>
            <p className="text-white font-bold mt-4 tracking-widest uppercase text-sm">Watch Trailer</p>
          </div>
        </div>

      </div>
    </div>

   
   
  );
};

const DetailSkeleton = () => (
  <div className="min-h-screen bg-gray-950 p-10 flex justify-center animate-pulse">
    <div className="max-w-6xl w-full bg-gray-900 rounded-3xl h-[600px] flex flex-col lg:flex-row">
      <div className="flex-1 p-12 space-y-6">
        <div className="h-12 bg-gray-800 rounded w-3/4"></div>
        <div className="h-6 bg-gray-800 rounded w-1/4"></div>
        <div className="h-32 bg-gray-800 rounded w-full"></div>
      </div>
      <div className="lg:w-1/3 bg-gray-800"></div>
    </div>
  </div>
);
