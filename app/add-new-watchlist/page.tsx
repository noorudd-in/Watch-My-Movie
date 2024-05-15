"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import SelectOTT from "@/components/SelectOTT";
import toast, { Toaster } from "react-hot-toast";
import { useMovieStore } from "@/store/movieStore";
import { SpinnerIcon } from "@/components/icons/Icons";

type SearchObject = {
  imdbID: string;
  Title: string;
  Type: string;
  imdbRating: string;
  imdbVotes: string;
  Released: string;
  Genre: string;
  Poster: string;
  GenreArray: string[];
  Plot: string;
};

const AddWatchlist = () => {
  const {viewed, watchlist, genres, setWatchlist, setGenres} = useMovieStore()
  const searchParams = useSearchParams();
  const router = useRouter();
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;
  const [movieData, setMovieData] = useState({} as SearchObject);
  const [ott, setOtt] = useState("");
  const imdbID = searchParams.get("imdb");
  const DB_API_URL = process.env.NEXT_PUBLIC_DB_API_URL
  const userAction = sessionStorage.getItem('userAction')

  const handleAdd = () => {
    if (ott == "") {
      toast.error("Please select the OTT platform");
      return;
    }
    let newGenres = [...genres];
    movieData.GenreArray.map((genre) => {
      if (!newGenres.includes(genre)) {
        newGenres.push(genre);
      }
    });
    let newWatchlist = {
      imdbID: movieData.imdbID,
      Title: movieData.Title,
      Type: movieData.Type,
      Poster: movieData.Poster,
      imdbRating: movieData.imdbRating,
      GenreArray: movieData.GenreArray,
      availableOn: ott
    }

    axios.put(DB_API_URL!, {
      watchlist: [...watchlist, newWatchlist],
      viewed: viewed,
      genres: newGenres,
    }).then( (res) => {
      setWatchlist(res.data.watchlist)
      setGenres(res.data.genres)
      sessionStorage.setItem('toastMessage', 'Added to Watchlist!')
      sessionStorage.setItem('toastStatus', 'success')
      router.push("/");
    })
  };

  useEffect(() => {
    if (imdbID == null || imdbID == undefined) {
      router.push("/");
    }
    if (genres[0] == undefined){
      router.push('/')
      sessionStorage.setItem('toastMessage', 'An error occured. Please try again!');
      sessionStorage.setItem('toastStatus', 'error')
    }
    axios
      .get(`https://www.omdbapi.com/?apikey=${apiKey}&i=${imdbID}`)
      .then((res) => {
        let genres = res.data.Genre?.split(",").map((ele: string) =>
          ele.trim().toLowerCase()
        );
        setMovieData({
          imdbID: res.data.imdbID,
          Title: res.data.Title,
          Type: res.data.Type,
          Poster: res.data.Poster,
          imdbRating: res.data.imdbRating,
          imdbVotes: res.data.imdbVotes,
          Released: res.data.Released,
          Genre: res.data.Genre,
          GenreArray: genres,
          Plot: res.data.Plot,
        });
      });
  }, []);

  if (movieData.Title == undefined) return <SpinnerIcon />
  return (
    <>
      <Toaster />
      <div className="flex mx-5 mb-5">
        <Image
          src={movieData?.Poster}
          alt="Movie Poster"
          priority={false}
          width={500}
          height={500}
          className="sm:w-[190px] sm:h-[280px] w-[190px] h-[280px] rounded-l"
        />
        <div className="ml-2">
          <p className="font-bold">{movieData?.Title}</p>
          <p>
            IMDB Rating:{" "}
            <span className="font-light">
              {movieData?.imdbRating}/10 ({movieData?.imdbVotes} votes)
            </span>
          </p>
          <p>
            Type:{" "}
            <span className="font-light">
              {movieData?.Type?.[0]?.toUpperCase() + movieData?.Type?.slice(1)}
            </span>
          </p>
          <p>
            Released: <span className="font-light">{movieData?.Released}</span>
          </p>
          <p>
            Genre: <span className="font-light">{movieData?.Genre}</span>
          </p>
        </div>
      </div>

      <div className="m-5">
        <p>Plot: {movieData?.Plot}</p>
      </div>

      <Label className="flex justify-center">
        Select OTT Platform to watch.
      </Label>
      <div className="my-2 flex justify-center">
        <SelectOTT ott={ott} setOtt={setOtt} />
      </div>
      <div className="flex justify-center">
        <Button variant="outline" onClick={handleAdd}>
          Add to {userAction} List
        </Button>
      </div>
    </>
  );
};

export default AddWatchlist;
