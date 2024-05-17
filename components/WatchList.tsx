import { useState } from "react";
import { useMovieStore } from "@/store/movieStore";
import WatchListCard from "./WatchListCard";
import WatchListHeader from "./WatchListHeader";
import { SpinnerIcon } from "./icons/Icons";
import SortMovies from "./SortMovies";
import FilterMovies from "./FilterMovies";
const WatchList = () => {
  const { watchlist, genres } = useMovieStore();
  const [movieData, setMovieData] = useState(watchlist);

  if (genres[0] == undefined) return <SpinnerIcon />;
  return (
    <div className="compact">
      <WatchListHeader />
      <div className="flex justify-between mb-5">
        <SortMovies data={watchlist} setData={(data) => setMovieData(data)} origin="watchlist"/>
        <FilterMovies data={watchlist} setData={(data) => setMovieData(data)} />
      </div>
      {watchlist[0] == undefined && (
        <h1 className="text-2xl flex justify-center m-5 font-bold">
          No movies to show. Click on `&apos;Add New Watch List&apos; to add movies you
          want to watch and share with your friends.
        </h1>
      )}
      {movieData[0] == undefined && (
        <h1 className="text-2xl flex justify-center m-5 font-bold">
          No Movies to show!
        </h1>
      )}
      {movieData.map((movie) => {
        return (
          <WatchListCard
            key={movie.imdbID}
            Poster={movie.Poster}
            Type={movie.Type}
            Title={movie.Title}
            imdbRating={movie.imdbRating}
            availableOn={movie.availableOn}
            imdbID={movie.imdbID}
            Genre={movie.GenreArray}
          />
        );
      })}
    </div>
  );
};

export default WatchList;
