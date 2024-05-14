"use client";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import ViewedDrawer from "./ViewedDrawer";

type customFields = {
  id: string;
  label: string;
  value: string;
};

type ViewedCardPropTypes = {
  imdbID: string;
  Title: string;
  Type: string;
  myRating: string;
  imdbRating: string;
  imdbVotes: string;
  Released: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  availableOn: string;
  customRatingFields: customFields[];
};

const ViewedCard = ({
  imdbID,
  Title,
  Type,
  myRating,
  imdbRating,
  imdbVotes,
  Released,
  Genre,
  Director,
  Writer,
  Actors,
  Language,
  Country,
  Awards,
  Poster,
  availableOn,
  customRatingFields,
}: ViewedCardPropTypes) => {
  return (
    <>
      <div className="flex rounded shadow-md">
        <div>
          <Image
            src={Poster}
            alt="Movie Poster"
            priority={false}
            width={500}
            height={500}
            className="sm:w-[190px] sm:h-[280px] w-[95px] h-[140px] rounded-l"
          />
        </div>
        <div className="flex flex-col justify-evenly">
          <div className="ml-3 sm:text-3xl">
            <Badge>
              <div className="sm:text-3xl">
                {Type?.[0]?.toUpperCase() + Type?.slice(1)}
              </div>
            </Badge>

            <h1 className="font-semibold">{Title}</h1>
            <div>
              <span>{imdbRating}</span>
              <span className="mx-2">&#x2022;</span>
              <span>{myRating}%</span>
            </div>
          </div>
          <div className="ml-3 sm:text-3xl">
            <ViewedDrawer
              imdbID={imdbID}
              Title={Title}
              imdbRating={imdbRating}
              imdbVotes={imdbVotes}
              myRating={myRating}
              customFields={customRatingFields}
              Genre={Genre}
              Released={Released}
              Director={Director}
              Writer={Writer}
              Actors={Actors}
              Language={Language}
              Country={Country}
              Awards={Awards}
              availableOn={availableOn}>
              <p className="underline underline-offset-4 cursor-pointer">
                See more...
              </p>
            </ViewedDrawer>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewedCard;
