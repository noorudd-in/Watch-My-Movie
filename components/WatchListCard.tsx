import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import {
  StarIcon,
  VideoIcon,
  RedirectArrowIcon,
} from "@/components/icons/Icons";
import Link from "next/link";
import { DeleteIcon, EditIcon } from "@/components/icons/Icons";
import { useMovieStore } from "@/store/movieStore";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import AlertBox from "./AlertBox";
import EditWatchList from "./EditWatchList";
import { useRouter } from "next/navigation";

type WatchListCardProps = {
  Poster: string;
  Type: string;
  Title: string;
  imdbRating: string;
  availableOn: string;
  imdbID: string;
  Genre: string[];
};

const platforms = [
  {
    value: "netflix",
    label: "Netflix",
  },
  {
    value: "prime-video",
    label: "Amazon Prime",
  },
  {
    value: "hotstar",
    label: "Disney+ / Hotstar",
  },
  {
    value: "sonyliv",
    label: "Sony LIV",
  },
  {
    value: "jio-cinema",
    label: "Jio Cinema",
  },
  {
    value: "lionsgate",
    label: "Lionsgate",
  },
  {
    value: "zee5",
    label: "Zee5",
  },
  {
    value: "anime",
    label: "Anime",
  },
  {
    value: "hulu",
    label: "Hulu",
  },
  {
    value: "mubi",
    label: "MUBI",
  },
  {
    value: "others",
    label: "Others",
  },
  {
    value: "unknown",
    label: "Unknown",
  },
];

const WatchListCard = ({
  Poster,
  Type,
  Title,
  imdbRating,
  availableOn,
  imdbID,
  Genre,
}: WatchListCardProps) => {
  const { watchlist, viewed, genres, setWatchlist } = useMovieStore();
  const DB_API_URL = process.env.NEXT_PUBLIC_DB_API_URL;
  const router = useRouter()

  const handleDelete = (id: string) => {
    let newWatchlist = watchlist.filter((movie) => movie.imdbID != id);
    axios
      .put(DB_API_URL!, {
        watchlist: newWatchlist,
        viewed: viewed,
        genres: genres,
      })
      .then((res) => {
        setWatchlist(res.data.watchlist);
        toast.success("Movie deleted from Watch List");
      });
  };

  const handleMarkAsViewed = () => {
    sessionStorage.setItem('ottPlatform', availableOn)
    sessionStorage.setItem('origin', 'watchlist');
    sessionStorage.setItem('userAction', 'Viewed')
    router.push(`/add-new-viewed?imdb=${imdbID}`)
  }

  const RenderGenre = () => {
    const genreOne = Genre[0];
    const genreTwo = Genre[1];
    if (genreOne == "n/a" || genreOne == undefined) return null;
    if (genreOne != undefined && genreTwo == undefined)
      return (
        <h1 className="text-sm font-light">
          {genreOne.toUpperCase() + genreOne.slice(1)}
        </h1>
      );
    return (
      <h1 className="text-sm font-light">
        {genreOne[0].toUpperCase() + genreOne.slice(1)},{" "}
        {genreTwo[0].toUpperCase() + genreTwo.slice(1)}
      </h1>
    );
  };

  return (
    <>
      <Toaster />
      <div className="flex flex-row rounded shadow-md my-2">
        <div className="min-w-[95px] sm:min-w-[190px]">
          <Image
            src={
              Poster == "N/A" ? "https://m.media-amazon.com/images/" : Poster
            }
            alt={Poster == "N/A" ? "Not Available" : "Movie Poster"}
            priority={false}
            width={500}
            height={500}
            className="sm:w-[190px] sm:h-[280px] w-[95px] h-[140px] rounded-l"
          />
        </div>

        <div className="ml-3 sm:text-3xl w-full">
          <div className="grid grid-cols-2">
            <div className="flex items-center">
              <Badge>
                <div className="sm:text-3xl">
                  {Type?.[0]?.toUpperCase() + Type?.slice(1)}
                </div>
              </Badge>
            </div>
            <div className="flex justify-end">
              <EditWatchList
                imdbID={imdbID}
                Poster={Poster}
                Title={Title}
                Type={Type}
                imdbRating={imdbRating}
                availableOn={availableOn}>
                <EditIcon classname="mt-1 sm:w-9 sm:h-9 w-7 h-7 text-blue-600 cursor-pointer" />
              </EditWatchList>
              <AlertBox
                title={`Confirm Delete ${Title}?`}
                description={`This action cannot be undone. This will permanently delete ${Title} from Watch List.`}
                handleConfirm={() => handleDelete(imdbID)}>
                <DeleteIcon classname="sm:w-7 sm:h-7 w-6 h-6 text-red-600 cursor-pointer" />
              </AlertBox>
            </div>
          </div>

          <h1 className="font-semibold">{Title}</h1>

          <h1>
            <RenderGenre />
          </h1>
          <div className="flex">
            <div className="flex">
              <StarIcon classname="sm:w-8 sm:h-8 w-4 h-4 mt-1 mr-2" />
              <span>{imdbRating}</span>
            </div>
            <div className="flex ml-3">
              <VideoIcon classname="sm:w-8 sm:h-8 w-4 h-4 mt-1 mr-2" />
              <span>
                {platforms.map((ott) => {
                  if (ott.value == availableOn) return ott.label;
                })}
              </span>
            </div>
          </div>

          <div className="flex justify-between">
            <p className="underline underline-offset-4 cursor-pointer mr-1" onClick={handleMarkAsViewed}>
              Mark as viewed
            </p>
            <p className="flex underline underline-offset-4 cursor-pointer ml-1">
              <Link
                href={`https://www.imdb.com/title/${imdbID}`}
                target="_blank">
                View in IMDb
              </Link>
              <RedirectArrowIcon classname="sm:w-8 sm:h-8 w-4 h-4 mt-1 mr-2" />
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default WatchListCard;
