import Image from "next/image";
import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import { Label } from "@/components/ui/label";
import SelectOTT from "@/components/SelectOTT";
import toast, { Toaster } from "react-hot-toast";
import { useMovieStore } from "@/store/movieStore";
import { Button } from "@/components/ui/button";
import axios from "axios";

type EditWatchListProps = {
  children: React.ReactNode;
  imdbID: string;
  Poster: string;
  Title: string;
  imdbRating: string;
  Type: string;
  availableOn: string;
};

const EditWatchList = ({
  children,
  imdbID,
  Poster,
  Title,
  Type,
  imdbRating,
  availableOn,
}: EditWatchListProps) => {
  const { watchlist, viewed, genres, setWatchlist } = useMovieStore();
  const [ott, setOtt] = useState(availableOn);
  const DB_API_URL = process.env.NEXT_PUBLIC_DB_API_URL;

  const handleEdit = () => {
    let newWatchlist = [...watchlist];
    newWatchlist.map((movie) => {
      if (movie.imdbID == imdbID) {
        movie.availableOn = ott;
      }
    });

    axios
      .put(DB_API_URL!, {
        watchlist: newWatchlist,
        viewed: viewed,
        genres: genres,
      })
      .then((res) => {
        setWatchlist(res.data.watchlist);
        toast.success(`${Title} edited successfully!`);
      });
  };
  return (
    <>
      <Toaster />
      <Sheet>
        <SheetTrigger>{children}</SheetTrigger>
        <SheetContent side="left">
          <SheetHeader>
            <SheetTitle>Edit WatchList</SheetTitle>
            <SheetDescription>
              <div>
                <div className="flex justify-center">
                  <Image
                    src={Poster}
                    alt="Movie Poster"
                    priority={false}
                    width={500}
                    height={500}
                    className="w-[190px] h-[280px] rounded-l"
                  />
                </div>

                <div className="mb-5">
                  <h1 className="font-bold flex justify-center">{Title}</h1>
                  <h1 className="flex justify-center">
                    {Type?.[0]?.toUpperCase() + Type?.slice(1)}
                    <span className="mx-2">&#x2022;</span>
                    {imdbRating}/10
                  </h1>
                </div>

                <Label className="flex justify-start">Select OTT Platform to watch.</Label>
                <div className="my-2 flex justify-start">
                  <SelectOTT ott={ott} setOtt={setOtt} />
                </div>
              </div>
            </SheetDescription>
          </SheetHeader>
          <SheetFooter>
            <div className="w-full">
            <SheetClose asChild>
              <Button onClick={handleEdit}>Save changes</Button>
            </SheetClose>
            </div>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default EditWatchList;
