import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import WatchListHeader from "./WatchListHeader";

import {
  StarIcon,
  VideoIcon,
  RedirectArrowIcon,
} from "@/components/icons/Icons";

const WatchListCard = () => {
  return (
    <>
      <WatchListHeader />
      <div className="flex rounded shadow-md">
        <div>
          <Image
            src="https://m.media-amazon.com/images/M/MV5BMTQyNTgxODA1Ml5BMl5BanBnXkFtZTcwOTUwMDE0MQ@@._V1_SX300.jpg"
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
              <div className="sm:text-3xl">Movie</div>
            </Badge>

            <h1 className="font-semibold">Aamdani Atthanni Kharcha Rupaiya</h1>
            <div className="flex">
              <div className="flex">
                <StarIcon classname="sm:w-8 sm:h-8 w-4 h-4 mt-1 mr-2" />
                <span>7.3</span>
              </div>
              <div className="flex ml-3">
                <VideoIcon classname="sm:w-8 sm:h-8 w-4 h-4 mt-1 mr-2" />
                <span>Hotstar</span>
              </div>
            </div>

            <div className="flex justify-between">
              <p className="underline underline-offset-4 cursor-pointer">
                Mark as viewed
              </p>
              <p className="flex underline underline-offset-4 cursor-pointer">
                View in IMDb
                <RedirectArrowIcon classname="sm:w-8 sm:h-8 w-4 h-4 mt-1 mr-2" />
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WatchListCard;
