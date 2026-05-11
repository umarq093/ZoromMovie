import axios from "axios";


export const fetchMovies = async () => {

  const res = await axios.get(
    "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1"
  );

  console.log("DATA:", res.data);

  return res.data.results;
};

export const fetchMovieById = async (id) => {
  const res = await axios.get(
    `https://api.themoviedb.org/3/movie/${id}?api_key=04c35731a5ee918f014970082a0088b1`
  );

  return res.data;
};




// const imgUrl = "https://image.tmdb.org/t/p/w1280";
// const searchUrl =
//   "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";


  