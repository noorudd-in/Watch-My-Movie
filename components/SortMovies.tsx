import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { type Watchlist, type Viewed } from "@/store/movieStore";

type SortMoviesProps = {
  data: Watchlist[] & Viewed[];
  setData: (data: Watchlist[] & Viewed[]) => void;
  origin: "watchlist" | "viewed";
};

const SortMovies = ({ data, setData, origin }: SortMoviesProps) => {
  let newData = [...data];
  const handleSort = (value: string) => {
    switch (value) {
      case "high-to-low-rating":
        newData.sort((a, b) => parseInt(b.imdbRating) - parseInt(a.imdbRating));
        setData(newData);
        break;
      case "low-to-high-rating":
        newData.sort((a, b) => parseInt(a.imdbRating) - parseInt(b.imdbRating));
        setData(newData);
        break;
      case "a-z":
        newData.sort((a, b) => {
          if (a.Title < b.Title) {
            return -1;
          }
          if (a.Title > b.Title) {
            return 1;
          }
          return 0;
        });
        setData(newData);
        break;
      case "z-a":
        newData.sort((a, b) => {
          if (a.Title < b.Title) {
            return 1;
          }
          if (a.Title > b.Title) {
            return -1;
          }
          return 0;
        });
        setData(newData);
        break;
      case "high-to-low-my-rating":
        newData.sort((a, b) => parseInt(b.myRating) - parseInt(a.myRating));
        setData(newData);
        break;
      case "low-to-high-my-rating":
        newData.sort((a, b) => parseInt(a.myRating) - parseInt(b.myRating));
        setData(newData);
        break;
      case "default":
        setData(data);
        break;
      default:
        break;
    }
  };
  return (
    <>
      <Select
        defaultValue="default"
        onValueChange={(value) => handleSort(value)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Sort" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="default">Default Sort</SelectItem>
          <SelectItem value="high-to-low-rating">
            Highest to Lowest (imDb ratings)
          </SelectItem>
          <SelectItem value="low-to-high-rating">
            Lowest to Highest (imDb ratings)
          </SelectItem>
          {origin == "viewed" && (
            <>
              <SelectItem value="high-to-low-my-rating">
                Highest to Lowest (My ratings)
              </SelectItem>
              <SelectItem value="low-to-high-my-rating">
                {" "}
                Lowest to Highest (My ratings)
              </SelectItem>
            </>
          )}
          <SelectItem value="a-z">A - Z Title</SelectItem>
          <SelectItem value="z-a">Z - A Title</SelectItem>
        </SelectContent>
      </Select>
    </>
  );
};

export default SortMovies;
