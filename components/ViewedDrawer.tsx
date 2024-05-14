import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";

type customFields = {
  id: string;
  label: string;
  value: string;
};

type ViewedDrawerProps = {
  imdbID: string;
  Title: string;
  imdbRating: string;
  imdbVotes: string;
  myRating: string;
  customFields: customFields[];
  Released: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Language: string;
  Country: string;
  Awards: string;
  availableOn: string;
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

const ViewedDrawer = ({
  children,
  imdbID,
  Title,
  imdbRating,
  imdbVotes,
  myRating,
  customFields,
  Released,
  Genre,
  Director,
  Writer,
  Actors,
  Language,
  Country,
  Awards,
  availableOn,
}: { children: React.ReactNode } & ViewedDrawerProps) => {
  return (
    <Drawer>
      <DrawerTrigger>{children}</DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>{Title}</DrawerTitle>
            <DrawerDescription>
              Streaming on{" "}
              {platforms.map((ott) => {
                if (ott.value == availableOn) return ott.label;
              })}
            </DrawerDescription>
          </DrawerHeader>
          <div className="p-4 pb-0">
            <p>
              <span className="font-semibold">IMDb Rating:</span> {imdbRating}
              /10 ({imdbVotes}
              votes)
            </p>
            <p>
              <span className="font-semibold">My Rating:</span> {myRating}%
            </p>
            <div className="ml-10">
              <ul className="text-sm font-light list-disc">
                {customFields?.map((field) => {
                  return (
                    <li key={field.id}>
                      {field.label[0].toUpperCase() + field.label.slice(1)}:{" "}
                      {field.value}/10
                    </li>
                  );
                })}
              </ul>
            </div>

            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger>Expand</AccordionTrigger>
                <AccordionContent>
                  <p>
                    <span className="font-semibold">Released on:</span>{" "}
                    {Released}
                  </p>
                  <p>
                    <span className="font-semibold">Language:</span> {Language}
                  </p>
                  <p>
                    <span className="font-semibold">Genre:</span> {Genre}
                  </p>
                  <p>
                    <span className="font-semibold">Lead Actors:</span> {Actors}
                  </p>
                  <p>
                    <span className="font-semibold">Director:</span> {Director}
                  </p>
                  <p>
                    <span className="font-semibold">Writer:</span> {Writer}
                  </p>
                  <p>
                    <span className="font-semibold">Country:</span> {Country}
                  </p>
                  <p>
                    <span className="font-semibold">Awards:</span> {Awards}
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
          <DrawerFooter>
            <Button>
              <Link
                href={`https://www.imdb.com/title/${imdbID}`}
                target="_blank">
                View in IMDb
              </Link>
            </Button>

            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default ViewedDrawer;
