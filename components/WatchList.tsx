import { useMovieStore } from "@/store/movieStore";
import WatchListCard from "./WatchListCard";
import WatchListHeader from "./WatchListHeader";

const WatchList = () => {
  const { watchlist } = useMovieStore();

  return (
    <div className="compact">
      <WatchListHeader />
      {watchlist.map((movie) => {
        return (
          <WatchListCard
            key={movie.imdbID}
            Poster={movie.Poster}
            Type={movie.Type}
            Title={movie.Title}
            imdbRating={movie.imdbRating}
            availableOn={movie.availableOn}
            imdbID={movie.imdbID}
          />
        );
      })}
    </div>
  );
};

export default WatchList;
