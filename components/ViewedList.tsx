import { useMovieStore } from "@/store/movieStore";
import ViewedHeader from "./ViewedHeader";
import ViewedCard from "./ViewedCard";

const ViewedList = () => {
  const { viewed } = useMovieStore();
  return (
    <div className="compact">
      <ViewedHeader />
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
