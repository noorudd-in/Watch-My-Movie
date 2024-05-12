"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SearchIcon, SpinnerIcon } from "@/components/icons/Icons";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

const SearchTitle = () => {
  const [movieName, setMovieName] = useState("");
  const [movieData, setMovieData] = useState<any[] | string>([]);
  const [count, setCount] = useState(0)
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;

  const handleSearch = async () => {
    if (movieName.length < 3) {
      toast.error("Name is too short.");
    } else {
      setMovieData("loading");
      const data = await axios.get(
        `https://www.omdbapi.com/?apikey=${apiKey}&s=${movieName}`
      );
      if (data.status == 200) {
        if (data.data?.Response == "False") {
          toast.error(data.data?.Error);
          setMovieData([]);
        } else {
          setMovieData(data.data.Search);
          setCount(data.data.totalResults)
        }
      } else {
        toast.error("Something went wrong. Please try again");
        setMovieData([]);
      }
    }
  };
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
        {movieData == "loading" && (
          <h1 className="flex justify-center"><SpinnerIcon /></h1>
        )}
      </div>
    </>
  );
};

export default SearchTitle;
