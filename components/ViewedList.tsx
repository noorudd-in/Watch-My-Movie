import { useMovieStore } from "@/store/movieStore";
import ViewedHeader from "./ViewedHeader";
import ViewedCard from "./ViewedCard";
import { SpinnerIcon } from "./icons/Icons";

const ViewedList = () => {
  const { viewed, genres } = useMovieStore();

  if (genres[0] == undefined) return <SpinnerIcon />;
  return (
    <div className="compact">
      <ViewedHeader />
      {viewed[0] == undefined && (
        <h1 className="text-2xl flex justify-center m-5 font-bold">
          No movies to show. Click on 'Add Record' to add movies you have viewed
          and share with your friends.
        </h1>
      )}
      {viewed.map((movie) => {
        return (
          <ViewedCard
            key={movie.imdbID}
            Poster={movie.Poster}
            Type={movie.Type}
            Title={movie.Title}
            imdbRating={movie.imdbRating}
            availableOn={movie.availableOn}
            imdbID={movie.imdbID}
            Director={movie.Director}
            Writer={movie.Writer}
            Actors={movie.Actors}
            Language={movie.Language}
            Country={movie.Country}
            Awards={movie.Awards}
            Genre={movie.Genre}
            Released={movie.Released}
            myRating={movie.myRating}
            imdbVotes={movie.imdbVotes}
            customRatingFields={movie.customRatingFields}
          />
        );
      })}
    </div>
  );
};

export default ViewedList;
