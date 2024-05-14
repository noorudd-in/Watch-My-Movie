"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { SearchIcon, SpinnerIcon } from "@/components/icons/Icons";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { useMovieStore } from "@/store/movieStore";

type SearchObject = {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
};

const SearchTitle = () => {
  const {watchlist, viewed, genres} = useMovieStore()
  const router = useRouter();
  const [movieName, setMovieName] = useState("");
  const [movieData, setMovieData] = useState<SearchObject[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalResults, setTotalResults] = useState(0);
  const [count, setCount] = useState(1);
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;
  const userAction = sessionStorage.getItem("userAction");

  const handleSearch = async () => {
    if (movieName.length < 3) {
      toast.error("Name is too short.");
    } else {
      setMovieData([]);
      setTotalResults(0);
      setCount(1);
      setIsLoading(true);
      const data = await axios.get(
        `https://www.omdbapi.com/?apikey=${apiKey}&s=${movieName}`
      );
      if (data.status == 200) {
        setIsLoading(false);
        if (data.data?.Response == "False") {
          toast.error(data.data?.Error);
          setMovieData([]);
        } else {
          console.log(data.data);
          setMovieData(data.data.Search);
          setTotalResults(Math.ceil(parseInt(data.data.totalResults) / 10));
          console.log(Math.ceil(parseInt(data.data.totalResults) / 10));
        }
      } else {
        toast.error("Something went wrong. Please try again");
        setMovieData([]);
        setIsLoading(false);
      }
    }
  };

  const changePage = async (action: 1 | -1) => {
    if (action == -1 && count <= 1) {
      return;
    }
    if (action == 1 && count == totalResults) {
      return;
    }
    setMovieData([]);
    setIsLoading(true);
    const data = await axios.get(
      `https://www.omdbapi.com/?apikey=${apiKey}&s=${movieName}&page=${
        count + action
      }`
    );
    if (data.status == 200) {
      setIsLoading(false);
      if (data.data?.Response == "False") {
        toast.error(data.data?.Error);
        setMovieData([]);
      } else {
        console.log(data.data);
        setMovieData(data.data.Search);
        setTotalResults(Math.ceil(parseInt(data.data.totalResults) / 10));
        console.log(Math.ceil(parseInt(data.data.totalResults) / 10));
        setCount(count + action);
      }
    } else {
      toast.error("Something went wrong. Please try again");
      setMovieData([]);
      setIsLoading(false);
    }
  };

  const handleSelectMovie = (imdb: string, title: string) => {

    if (userAction == 'Watch') {
      for (let movie=0; movie<watchlist.length; movie++) {
        if(watchlist[movie].Title == title) {
          toast.error(`Movie already added to the ${userAction} list`)
          return
        }
      }
    } else if (userAction == 'Viewed') {
      for (let movie=0; movie<viewed.length; movie++) {
        if(viewed[movie].Title == title) {
          toast.error(`Movie already added to the ${userAction} list`)
          return
        }
      }
    }
    
    router.push(`/add-new-watchlist?imdb=${imdb}`);
  };
  return (
    <>
      <Toaster />
      <div className="flex justify-center mt-10">
        <Button variant="outline">Add Custom Data</Button>
      </div>
      <h1 className="flex justify-center my-5">OR</h1>
      <div>
        <p className="flex justify-center mb-2">
          Quickly Search and Add Movie to {userAction} List
        </p>
        <div className="flex mx-auto w-full max-w-sm items-center space-x-2">
          <Input
            value={movieName}
            type="text"
            placeholder="Iron Man"
            onChange={(e) => setMovieName(e.target.value)}
          />
          <Button variant="outline" size="icon" onClick={handleSearch}>
            <SearchIcon classname="w-4 h-4" />
          </Button>
        </div>
        {movieData[0] != undefined && (
          <p className="flex justify-center my-2">
            Showing result for {movieName}
          </p>
        )}

        {isLoading && (
          <h1 className="flex justify-center">
            <SpinnerIcon />
          </h1>
        )}

        <div className="compact">
          <ul>
            {movieData.map((movie) => {
              return (
                <>
                  <div
                    className="flex rounded shadow-md my-2"
                    onClick={() => handleSelectMovie(movie.imdbID, movie.Title)}>
                    <div>
                      <Image
                        src={
                          movie.Poster == "N/A"
                            ? "https://m.media-amazon.com/images/"
                            : movie.Poster
                        }
                        alt={
                          movie.Poster == "N/A"
                            ? "Not Available"
                            : "Movie Poster"
                        }
                        priority={false}
                        width={500}
                        height={500}
                        className="sm:w-[108px] sm:h-[160px] w-[54px] h-[80px] rounded-l"
                      />
                    </div>

                    <div className="ml-3 sm:text-3xl">
                      <h1 className="font-semibold">{movie.Title}</h1>
                      <p className="opacity-80 text-sm">
                        {movie.Type[0].toUpperCase() + movie.Type.slice(1)}{" "}
                        &#x2022; {movie.Year}
                      </p>
                    </div>
                  </div>
                </>
              );
            })}
          </ul>
        </div>

        {totalResults > 1 && (
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  className={
                    count == 1 ? "pointer-events-none opacity-40" : undefined
                  }
                  onClick={() => changePage(-1)}
                />
              </PaginationItem>
              <div>
                Page {count} of {totalResults}
              </div>
              <PaginationItem>
                <PaginationNext
                  className={
                    count == totalResults
                      ? "pointer-events-none opacity-40"
                      : undefined
                  }
                  onClick={() => changePage(1)}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </div>
    </>
  );
};

export default SearchTitle;
