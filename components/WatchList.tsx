import { useMovieStore } from "@/store/movieStore";
import WatchListCard from "./WatchListCard";
import WatchListHeader from "./WatchListHeader";
import { SpinnerIcon } from "./icons/Icons";

const WatchList = () => {
  const { watchlist, genres } = useMovieStore();

  if (genres[0] == undefined) return <SpinnerIcon />;
  return (
    <div className="compact">
      <WatchListHeader />
      {watchlist[0] == undefined && (
        <h1 className="text-2xl flex justify-center m-5 font-bold">
          No movies to show. Click on 'Add New Watch List' to add movies you want to watch
          and share with your friends.
        </h1>
      )}
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
            Genre={movie.GenreArray}
          />
        );
      })}
    </div>
  );
};

export default WatchList;
