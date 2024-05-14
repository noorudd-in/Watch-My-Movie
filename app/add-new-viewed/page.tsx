"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useMovieStore } from "@/store/movieStore";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import SelectOTT from "@/components/SelectOTT";
import toast, { Toaster } from "react-hot-toast";
import CustomFields from "@/components/CustomFields";
import { v4 as uuid } from "uuid";

type SearchObject = {
  imdbID: string;
  Title: string;
  Type: string;
  imdbRating: string;
  imdbVotes: string;
  Released: string;
  Genre: string;
  Poster: string;
  GenreArray: string[];
  Director: string;
  Writer: string;
  Actors: string;
  Language: string;
  Country: string;
  Awards: string;
};

const AddViewed = () => {
  const { viewed, watchlist, genres, setViewed } = useMovieStore();
  const searchParams = useSearchParams();
  const router = useRouter();
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;
  const imdbID = searchParams.get("imdb");
  const DB_API_URL = process.env.NEXT_PUBLIC_DB_API_URL;
  const userAction = sessionStorage.getItem("userAction");
  const [movieData, setMovieData] = useState({} as SearchObject);
  const [ott, setOtt] = useState("");
  const [customFields, setCustomFields] = useState([
    {
      id: uuid(),
      label: "Acting",
      value: "5",
    },
    {
      id: uuid(),
      label: "Cinematography",
      value: "9",
    },
    {
      id: uuid(),
      label: "Story",
      value: "7",
    },
    {
      id: uuid(),
      label: "Engaging",
      value: "2",
    },
  ]);
  const [myRating, setMyRating] = useState(0);

  const handleAddField = () => {
    let newFields = [
      ...customFields,
      { id: uuid(), label: "Example", value: "1" },
    ];
    setCustomFields(newFields);
  };

  const handleAdd = () => {
    if (ott == "") {
      toast.error("Please select the OTT platform");
      return;
    }
    let newGenres = [...genres];
    movieData.GenreArray.map((genre) => {
      if (!newGenres.includes(genre)) {
        newGenres.push(genre);
      }
    });
    let newViewed = {
      imdbID: movieData.imdbID,
      Title: movieData.Title,
      Type: movieData.Type,
      imdbRating: movieData.imdbRating,
      imdbVotes: movieData.imdbVotes,
      Released: movieData.Released,
      Genre: movieData.Genre,
      GenreArray: movieData.GenreArray,
      Poster: movieData.Poster,
      Director: movieData.Director,
      Writer: movieData.Writer,
      Actors: movieData.Actors,
      Language: movieData.Language,
      Country: movieData.Country,
      Awards: movieData.Awards,
      availableOn: ott,
      myRating: myRating,
      customRatingFields: customFields,
    };
    axios
      .put(DB_API_URL!, {
        watchlist: watchlist,
        viewed: [...viewed, newViewed],
        genres: newGenres,
      })
      .then((res) => {
        setViewed(res.data.viewed);
        sessionStorage.setItem('toastMessage', 'Added to Viewed List!')
        sessionStorage.setItem('toastStatus', 'success')
        router.push("/");
      });
  };

  useEffect(() => {
    if (imdbID == null || imdbID == undefined) {
      router.push("/");
    }
    axios
      .get(`https://www.omdbapi.com/?apikey=${apiKey}&i=${imdbID}`)
      .then((res) => {
        let genres = res.data.Genre?.split(",").map((ele: string) =>
          ele.trim().toLowerCase()
        );
        setMovieData({
          imdbID: res.data.imdbID,
          Title: res.data.Title,
          Type: res.data.Type,
          Poster: res.data.Poster,
          imdbRating: res.data.imdbRating,
          imdbVotes: res.data.imdbVotes,
          Released: res.data.Released,
          Genre: res.data.Genre,
          GenreArray: genres,
          Director: res.data.Director,
          Writer: res.data.Writer,
          Actors: res.data.Actors,
          Language: res.data.Language,
          Country: res.data.Country,
          Awards: res.data.Awards,
        });
      });
  }, []);

  useEffect(() => {
    let totalCount = 0;
    let totalSum = 0;
    customFields.map((field) => {
      totalCount += 10;
      totalSum += parseInt(field.value);
    });
    let result = Math.round((totalSum / totalCount) * 100);
    setMyRating(result);
  }, [customFields]);
  return (
    <>
      <Toaster />
      <div className="flex mx-5 mb-5">
        <Image
          src={movieData?.Poster}
          alt="Movie Poster"
          priority={false}
          width={500}
          height={500}
          className="sm:w-[190px] sm:h-[280px] w-[190px] h-[280px] rounded-l"
        />

        <div className="ml-2">
          <p className="font-bold">{movieData?.Title}</p>
          <p>
            IMDB Rating:{" "}
            <span className="font-light">
              {movieData?.imdbRating}/10 ({movieData?.imdbVotes} votes)
            </span>
          </p>
          <p>
            Type:{" "}
            <span className="font-light">
              {movieData?.Type?.[0]?.toUpperCase() + movieData?.Type?.slice(1)}
            </span>
          </p>
          <p>
            Released: <span className="font-light">{movieData?.Released}</span>
          </p>
          <p>
            Genre: <span className="font-light">{movieData?.Genre}</span>
          </p>
        </div>
      </div>

      <div className="mx-5">
        <Label>Streaming OTT Platform:</Label>
        <div className="my-2 ">
          <SelectOTT ott={ott} setOtt={setOtt} />
        </div>
      </div>

      <div className="mx-5">
        <Label>My Rating: {myRating}%</Label>
        <CustomFields
          customFields={customFields}
          setCustomFields={setCustomFields}
        />
        <Button variant="secondary" onClick={handleAddField}>
          Add Field
        </Button>
      </div>
      <div className="flex justify-center">
        <Button variant="outline" onClick={handleAdd}>
          Add to {userAction} List
        </Button>
      </div>
    </>
  );
};

export default AddViewed;
