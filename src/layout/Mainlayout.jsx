// src/layout/MainLayout.jsx
import { Outlet } from "react-router-dom";
import  { Navbar } from "../components/header";
import { FooterPage } from "../components/footer";
import { useState } from "react";


export default function MainLayout() {
  const [search, setSearch] = useState("");
  return (
    <div className="min-h-screen flex flex-col bg-[#222831]">
      <Navbar search={search} setSearch={setSearch} />

      <main className="flex-1 mt-10 p-4">
        <Outlet context={{search}}/>
      </main>

      <FooterPage />
    </div>
  );
}