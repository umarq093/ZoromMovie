import { NavLink } from "react-router-dom";
import { MovieData } from "./MovieData";

export const MovieCard = ({ id, title, overview, date, image }) => {
  const imgUrl = "https://image.tmdb.org/t/p/w1280" // w500 is faster/better for smaller cards

  return (
    <NavLink to={`/aboutmovie/${id}`} className="block w-full">
      <div className="group relative overflow-hidden rounded-xl bg-gray-900 transition-all duration-300 hover:shadow-xl">
        
        {/* Image - Responsive Height */}
        <div className="aspect-[2/3] w-full overflow-hidden">
          <img
            src={imgUrl + image}
            alt={title}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
          />
        </div>

        
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent 
          opacity-0 group-hover:opacity-100 transition-all duration-300 
          flex flex-col justify-end p-4 pb-5 sm:pb-4">
          
          <span className="text-red-500 text-xs font-bold mb-1">{date}</span>
          <h1 className="text-white text-base font-bold leading-tight mb-2">{title}</h1>
          
          {/* Hide overview on very small screens to keep it clean */}
          <p className="hidden sm:line-clamp-3 text-gray-300 text-xs leading-relaxed">
            {overview}
          </p>
        </div>
      </div>
    </NavLink>
  );
};
