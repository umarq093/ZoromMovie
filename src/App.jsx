

// src/App.jsx
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./layout/Mainlayout";
import { HomePage } from "./pages/home";
import { AboutPage } from "./pages/about";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MovieData } from "./components/MovieData";
import { MoviePage } from "./pages/movie";

const router = createBrowserRouter([

  {
    path: "/",
    element: <MainLayout />, // 👈 Layout applied
    children: [
      { path: "/", element: <HomePage/> },
      { path: "/about", element: <AboutPage/> },
      {path: `/aboutmovie/:id`, element: <MovieData/>},
       { path: "/movies", element:<MoviePage/>  },
    ],
  },
]);


const queryClient =  new QueryClient();


export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

  


