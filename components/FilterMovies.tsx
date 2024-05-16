import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { type Watchlist, type Viewed, useMovieStore } from "@/store/movieStore";

type SortMoviesProps = {
  data: Watchlist[] | Viewed[];
  setData: (data: Watchlist[] | Viewed[]) => void;
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

const FilterMovies = ({ data, setData }: SortMoviesProps) => {
  const { genres } = useMovieStore();

  const handleFilter = (value: string) => {
    let action = value.split('#');
    if (action[0] == 'type') {
        let newData = data.filter( (movie) => movie.Type == action[1]);
        setData(newData)
    }
    if (action[0] == 'genre') {
        let newData = data.filter( (movie) => movie.GenreArray.includes(action[1]));
        setData(newData)
    }
    if (action[0] == 'ott') {
        let newData = data.filter( (movie) => movie.availableOn == action[1]);
        setData(newData)
    }
    if (value == 'default') {
        setData(data)
    }
  };
  return (
    <>
      <Select
        defaultValue="default"
        onValueChange={(value) => handleFilter(value)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Theme" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="default">No Filter</SelectItem>
          <SelectItem value="type#movie">Type: Movies</SelectItem>
          <SelectItem value="type#series">Type: TV Shows</SelectItem>
          {genres.map((genre) => (
            <SelectItem key={genre} value={`genre#${genre}`}>
              Genre: {genre[0].toUpperCase() + genre.slice(1)}
            </SelectItem>
          ))}
          {platforms.map( (platform) => (
            <SelectItem key={platform.value} value={`ott#${platform.value}`}>
            Available On: {platform.label}
          </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </>
  );
};

export default FilterMovies;
