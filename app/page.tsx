"use client";
import ChangeTabs from "@/components/ChangeTabs";
import { useMovieStore } from "@/store/movieStore";
import axios from "axios";
import { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function Home() {
  const DB_API_URL = process.env.NEXT_PUBLIC_DB_API_URL;
  const { setWatchlist, setViewed, setGenres } = useMovieStore();

  useEffect(() => {
    const toastStatus = sessionStorage.getItem("toastStatus");
    const toastMessage = sessionStorage.getItem("toastMessage");
    
    if (toastMessage != undefined || toastMessage != null) {
      if (toastStatus == "success") {
        toast.success(toastMessage);
      } else {
        toast.error(toastMessage);
      }
    }
    sessionStorage.clear()
    axios.get(DB_API_URL!).then((res) => {
      setWatchlist(res.data.watchlist);
      setViewed(res.data.viewed);
      setGenres(res.data.genres)
    });
  }, []);
  return (
    <main>
      <Toaster />
      <ChangeTabs />
    </main>
  );
}
