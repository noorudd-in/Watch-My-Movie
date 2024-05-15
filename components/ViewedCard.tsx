"use client";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import ViewedDrawer from "./ViewedDrawer";
import { DeleteIcon, EditIcon } from "@/components/icons/Icons";
import { useMovieStore } from "@/store/movieStore";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import AlertBox from "./AlertBox";
import EditViewedList from "./EditViewedList";

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
  const { watchlist, viewed, genres, setViewed } = useMovieStore();
  const DB_API_URL = process.env.NEXT_PUBLIC_DB_API_URL;

  const handleDelete = (id: string) => {
    let newViewed = viewed.filter((movie) => movie.imdbID != id);
    axios
      .put(DB_API_URL!, {
        watchlist: watchlist,
        viewed: newViewed,
        genres: genres,
      })
      .then((res) => {
        setViewed(res.data.viewed);
        toast.success("Movie deleted from Viewed List");
      });
  };
  return (
    <>
      <Toaster />
      <div className="rounded shadow-md my-2 flex flex-row">
        <div className="min-w-[95px] sm:min-w-[190px]">
          <Image
            src={Poster}
            alt="Movie Poster"
            priority={false}
            width={500}
            height={500}
            className="sm:w-[190px] sm:h-[280px] w-[95px] h-[140px] rounded-l"
          />
        </div>

        <div className="ml-3 sm:text-3xl w-full">
          <div className="grid grid-cols-2 ">
            <div className="flex items-center">
              <Badge>
                <div className="sm:text-3xl">
                  {Type?.[0]?.toUpperCase() + Type?.slice(1)}
                </div>
              </Badge>
            </div>
            <div className="flex justify-end">
              <EditViewedList
                imdbID={imdbID}
                Title={Title}
                Poster={Poster}
                imdbRating={imdbRating}
                Type={Type}
                availableOn={availableOn}
                availaibleMyRating={myRating}
                availableCustomFields={customRatingFields}
                >
                <EditIcon classname="mt-1 sm:w-9 sm:h-9 w-7 h-7 text-blue-600 cursor-pointer" />
              </EditViewedList>
              <AlertBox
                title={`Confirm Delete ${Title}?`}
                description={`This action cannot be undone. This will permanently delete ${Title} from Viewed List.`}
                handleConfirm={() => handleDelete(imdbID)}>
                <DeleteIcon classname="sm:w-7 sm:h-7 w-6 h-6 text-red-600 cursor-pointer" />
              </AlertBox>
            </div>
          </div>

          <h1 className="font-semibold">{Title}</h1>
          <div>
            <span>{imdbRating}</span>
            <span className="mx-2">&#x2022;</span>
            <span>{myRating}%</span>
          </div>
          <div className="sm:text-3xl">
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
