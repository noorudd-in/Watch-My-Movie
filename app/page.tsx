'use client'
import ChangeTabs from "@/components/ChangeTabs";
import { useMovieStore } from "@/store/movieStore";
import axios from "axios";
import { useEffect } from "react";

export default function Home() {
  const DB_API_URL = process.env.NEXT_PUBLIC_DB_API_URL
  const {setWatchlist} = useMovieStore()

  useEffect( () => {
    sessionStorage.removeItem('userAction')
    axios.get(DB_API_URL!).then( (res) => {
      setWatchlist(res.data.watchlist)
    })
  }, [])
  return (
    <main >
      <ChangeTabs />
    </main>
  );
}
