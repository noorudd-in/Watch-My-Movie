import Image from "next/image";
import { useEffect, useState } from "react";
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
import CustomFields from "@/components/CustomFields";
import axios from "axios";
import { v4 as uuid } from "uuid";

type customFields = {
  id: string;
  label: string;
  value: string;
};

type EditViewedList = {
  children: React.ReactNode;
  imdbID: string;
  Poster: string;
  Title: string;
  imdbRating: string;
  Type: string;
  availableOn: string;
  availaibleMyRating: string;
  availableCustomFields: customFields[];
};

const EditViewedList = ({
  children,
  imdbID,
  Poster,
  Title,
  Type,
  imdbRating,
  availableOn,
  availaibleMyRating,
  availableCustomFields,
}: EditViewedList) => {
  const { watchlist, viewed, genres, setViewed } = useMovieStore();
  const [ott, setOtt] = useState(availableOn);
  const [myRating, setMyRating] = useState(availaibleMyRating)
  const [customFields, setCustomFields] = useState(availableCustomFields);
  const DB_API_URL = process.env.NEXT_PUBLIC_DB_API_URL;

  const handleEdit = () => {
    let newViewed = [...viewed];
    newViewed.map((movie) => {
      if (movie.imdbID == imdbID) {
        movie.availableOn = ott;
        movie.customRatingFields = customFields;
        movie.myRating = myRating
      }
    });

    axios
      .put(DB_API_URL!, {
        watchlist: watchlist,
        viewed: newViewed,
        genres: genres,
      })
      .then((res) => {
        setViewed(res.data.viewed);
        toast.success(`${Title} edited successfully!`);
      });
     
  };

  const handleAddField = () => {
    let newFields = [
      ...customFields,
      { id: uuid(), label: "Example", value: "1" },
    ];
    setCustomFields(newFields);
  };

  useEffect(() => {
    let totalCount = 0;
    let totalSum = 0;
    customFields.map((field) => {
      totalCount += 10;
      totalSum += parseInt(field.value);
    });
    let result = Math.round((totalSum / totalCount) * 100);
    setMyRating(String(result));
  }, [customFields]);
  return (
    <>
      <Toaster />
      <Sheet>
        <SheetTrigger>{children}</SheetTrigger>
        <SheetContent side="left" className="scrollbar-hide overflow-scroll">
          <SheetHeader>
            <SheetTitle>Edit WatchList</SheetTitle>
            <SheetDescription>
              <div >
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

                <Label className="flex justify-start">
                  Select OTT Platform to watch.
                </Label>
                <div className="my-2 flex justify-start">
                  <SelectOTT ott={ott} setOtt={setOtt} />
                </div>

                <div className="mb-5">
                  <Label>My Rating: {myRating}%</Label>
                  <CustomFields
                    customFields={customFields}
                    setCustomFields={setCustomFields}
                  />
                  <Button variant="secondary" onClick={handleAddField}>
                    Add Field
                  </Button>
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

export default EditViewedList;
