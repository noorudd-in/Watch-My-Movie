import { TrendingUpIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const DiscoverToggle = () => {
  return (
    <Link href={"/discover"}>
      <Button variant="outline" size="icon" className="mr-2">
        <TrendingUpIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
      </Button>
    </Link>
  );
};

export default DiscoverToggle;
