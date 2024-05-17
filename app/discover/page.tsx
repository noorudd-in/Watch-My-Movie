"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type DiscoverProps = {
  title: string;
  name: string;
  poster_path: string;
  first_air_date: string;
  release_date: string;
  media_type: string;
  genre_ids: number[];
};

type apiUrlsObject = {
  trending: string;
  "top-movies": string;
  "top-shows": string;
  "now-world": string;
  "now-india": string;
  "now-tv": string;
  "upcoming-world": string;
  "upcoming-india": string;
};

const monthsName = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const genreLabel = [
  { id: 28, name: "Action" },
  { id: 12, name: "Adventure" },
  { id: 16, name: "Animation" },
  { id: 35, name: "Comedy" },
  { id: 80, name: "Crime" },
  { id: 99, name: "Documentary" },
  { id: 18, name: "Drama" },
  { id: 10751, name: "Family" },
  { id: 14, name: "Fantasy" },
  { id: 36, name: "History" },
  { id: 27, name: "Horror" },
  { id: 10402, name: "Music" },
  { id: 9648, name: "Mystery" },
  { id: 10749, name: "Romance" },
  { id: 878, name: "Science Fiction" },
  { id: 10770, name: "TV Movie" },
  { id: 53, name: "Thriller" },
  { id: 10752, name: "War" },
  { id: 37, name: "Western" },
  { id: 10759, name: "Action & Adventure" },
  { id: 10762, name: "Kids" },
  { id: 10763, name: "News" },
  { id: 10764, name: "Reality" },
  { id: 10765, name: "Sci-Fi & Fantasy" },
  { id: 10766, name: "Soap" },
  { id: 10767, name: "Talk" },
  { id: 10768, name: "War & Politics" },
];

const apiUrls = {
  trending: "https://api.themoviedb.org/3/trending/all/day?language=en-US",
  "top-movies": "https://api.themoviedb.org/3/movie/top_rated?language=en-US",
  "top-shows": "https://api.themoviedb.org/3/tv/top_rated?language=en-US",
  "now-world": "https://api.themoviedb.org/3/movie/now_playing?language=en-US",
  "now-india":
    "https://api.themoviedb.org/3/movie/now_playing?language=en-US&region=IN",
  "now-tv": "https://api.themoviedb.org/3/tv/airing_today?language=en-US",
  "upcoming-world":
    "https://api.themoviedb.org/3/movie/upcoming?language=en-US",
  "upcoming-india":
    "https://api.themoviedb.org/3/movie/upcoming?language=en-US&region=IN",
};
const selectLabels = {
  trending: "Trending Movies & Shows worldwide",
  "top-movies": "Top Rated Movies of all the time",
  "top-shows": "Top Rated TV Shows of all the time",
  "now-world": "Movies now playing in theatres worldwide",
  "now-india": "Movies now playing in theatres in India",
  "now-tv": "TV Show now airing worldwide",
  "upcoming-world": "Upcoming Movies Worldwide",
  "upcoming-india": "Upcoming Movies in India",
};
const Discover = () => {
  const [data, setData] = useState<DiscoverProps[]>([]);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [selectData, setSelectData] = useState("trending");
  const TMDB_API = process.env.NEXT_PUBLIC_TMDB_API_KEY;

  const handleChange = (value: string) => {
    setSelectData(value);
    axios
      .get(
        `${apiUrls[value as keyof apiUrlsObject]}&api_key=${TMDB_API}&page=1`
      )
      .then((res) => {
        setData(res.data.results);
        setTotalResults(res.data.total_pages);
        setPage(1);
      });
  };

  const handleLoadMore = () => {
    axios
      .get(
        `${
          apiUrls[selectData as keyof apiUrlsObject]
        }&api_key=${TMDB_API}&page=${page + 1}`
      )
      .then((res) => {
        let newData = [...data, ...res.data.results];
        setData(newData);
        setPage(page + 1);
      });
  };

  const RenderReleaseDate = ({
    date,
    title,
  }: {
    date: string;
    title: string;
  }) => {
    if (date == undefined) {
      return <span>N/A</span>;
    }
    const Date = date.split("-");
    const year = Date[0];
    const month = monthsName[parseInt(Date[1]) - 1];
    const day = Date[2];
    return (
      <span>
        {day} {month} {year}
      </span>
    );
  };

  const RenderGenre = ({ genre }: { genre: number[] }) => {
    let genreNames = ["", "", ""];
    genreLabel.map((label) => {
      if (label.id == genre?.[0]) genreNames[0] = label.name;
      if (label.id == genre?.[1]) genreNames[1] = label.name;
      if (label.id == genre?.[2]) genreNames[2] = label.name;
    });
    const genreOne = genreNames[0];
    const genreTwo = genreNames[1];
    const genreThree = genreNames[2];

    if (genreOne == "") return null;
    if (genreOne != "" && genreTwo == "")
      return (
        <p className="text-sm font-light">
          {genreOne[0].toUpperCase() + genreOne.slice(1)}
        </p>
      );
    if (genreOne != "" && genreTwo != "" && genreThree == "")
      return (
        <p className="text-sm font-light">
          {genreOne[0].toUpperCase() + genreOne.slice(1)},{" "}
          {genreTwo[0].toUpperCase() + genreTwo.slice(1)}
        </p>
      );
    return (
      <p className="text-sm font-light">
        {genreOne[0].toUpperCase() + genreOne.slice(1)},{" "}
        {genreTwo[0].toUpperCase() + genreTwo.slice(1)},{" "}
        {genreThree[0].toUpperCase() + genreThree.slice(1)}
      </p>
    );
  };

  useEffect(() => {
    axios
      .get(`${apiUrls["trending"]}&api_key=${TMDB_API}&page=${page}`)
      .then((res) => {
        setData(res.data.results);
        setTotalResults(res.data.total_pages);
      });
  }, []);

  return (
    <div className="mb-10">
      <h1 className="m-5 flex justify-center text-2xl font-bold">
        Dicover Movies and Shows
      </h1>

      <div className="flex justify-center">
        <Select
          defaultValue="trending"
          onValueChange={(value) => handleChange(value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="trending">Trending Movies & Shows</SelectItem>
            <SelectItem value="top-movies">Top Rated Movies</SelectItem>
            <SelectItem value="top-shows">Top Rated TV Shows</SelectItem>
            <SelectItem value="now-world">
              Now Playing Movies (Worldwide)
            </SelectItem>
            <SelectItem value="now-india">
              Now Playing Movies (India)
            </SelectItem>
            <SelectItem value="now-tv">Now Playing TV Shows</SelectItem>
            <SelectItem value="upcoming-world">
              Upcoming Movies (Worldwide)
            </SelectItem>
            <SelectItem value="upcoming-india">
              Upcoming Movies (India)
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="compact">
        <h1 className="my-2 flex justify-center font-bold sm:text-3xl">{selectLabels[selectData as keyof apiUrlsObject]}</h1>
        {data.map((movie) => {
          return (
            <div key={movie.poster_path}>
              {movie.poster_path == null ? null : (
                <div className="flex rounded shadow-md my-2">
                  <div className="min-w-[54px] sm:min-w-[108px]">
                    <Image
                      src={
                        movie.poster_path == null
                          ? "/"
                          : `https://image.tmdb.org/t/p/original${movie.poster_path}`
                      }
                      alt="Movie Poster"
                      priority={false}
                      width={500}
                      height={500}
                      className="sm:w-[108px] sm:h-[160px] w-[54px] h-[80px] rounded-l"
                    />
                  </div>

                  <div className="ml-3 sm:text-3xl">
                    <h1 className="font-semibold">
                      {movie.title || movie.name}
                    </h1>
                    <p className="opacity-80 text-sm">
                      {[
                        "top-movies",
                        "now-world",
                        "now-india",
                        "upcoming-world",
                        "upcoming-india",
                      ].includes(selectData) && "Movie"}
                      {["top-shows", "now-tv"].includes(selectData) &&
                        "TV Show"}
                      {selectData == "trending" &&
                        movie.media_type?.[0].toUpperCase() +
                          movie.media_type?.slice(1)}{" "}
                      &#x2022;{" "}
                      <RenderReleaseDate
                        date={movie.first_air_date || movie.release_date}
                        title={movie.name || movie.title}
                      />
                    </p>

                    <RenderGenre genre={movie.genre_ids} />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {totalResults > 1 && page < totalResults && page < 500 && (
        <div className="flex justify-center mt-5" onClick={handleLoadMore}>
          <Button>Load More</Button>
        </div>
      )}
    </div>
  );
};

export default Discover;
