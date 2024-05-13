"use client";

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
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

type SearchObject = {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
};

const SearchTitle = () => {
  const [movieName, setMovieName] = useState("");
  const [movieData, setMovieData] = useState<SearchObject[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalResults, setTotalResults] = useState(0);
  const [count, setCount] = useState(1);
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;

  const handleSearch = async () => {
    if (movieName.length < 3) {
      toast.error("Name is too short.");
    } else {
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
          setTotalResults(Math.ceil(parseInt(data.data.totalResults)/10));
          console.log(Math.ceil(parseInt(data.data.totalResults)/10))
        }
      } else {
        toast.error("Something went wrong. Please try again");
        setMovieData([]);
        setIsLoading(false);
      }
    }
  };

  const changePage= async (action: 1 | -1) => {
    if (action == -1 && count <= 1) {
      return
    }
    if (action == 1 && count == totalResults) {
      return
    }
    setMovieData([])
    setIsLoading(true)
    const data = await axios.get(
      `https://www.omdbapi.com/?apikey=${apiKey}&s=${movieName}&page=${count + action}`
    );
    if (data.status == 200) {
      setIsLoading(false);
      if (data.data?.Response == "False") {
        toast.error(data.data?.Error);
        setMovieData([]);
      } else {
        console.log(data.data);
        setMovieData(data.data.Search);
        setTotalResults(Math.ceil(parseInt(data.data.totalResults)/10));
        console.log(Math.ceil(parseInt(data.data.totalResults)/10))
        setCount(count + action);
      }
    } else {
      toast.error("Something went wrong. Please try again");
      setMovieData([]);
      setIsLoading(false);
    }
    
  }
  return (
    <>
      <Toaster />
      <div className="flex justify-center mt-10">
        <Button variant="outline">Add Custom Data</Button>
      </div>
      <h1 className="flex justify-center my-5">OR</h1>
      <div>
        <p className="flex justify-center mb-2">Quickly Search and Add Movie</p>
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
        {movieData[0] != undefined && <p className="flex justify-center my-2">Showing result for {movieName}</p>}
        {isLoading && (
          <h1 className="flex justify-center">
            <SpinnerIcon />
          </h1>
        )}

        {movieData.map((movie) => {
          return <li>{movie.Title}</li>;
        })}

        {totalResults > 1 && (
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" className={count == 1 ? 'pointer-events-none opacity-40' : undefined} onClick={() => changePage(-1)} />
              </PaginationItem>
              <div>
                Page {count} of {totalResults}
              </div>
              <PaginationItem>
                <PaginationNext href="#" className={count == totalResults ? 'pointer-events-none opacity-40' : undefined} onClick={() => changePage(1)}/>
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </div>
    </>
  );
};

export default SearchTitle;
