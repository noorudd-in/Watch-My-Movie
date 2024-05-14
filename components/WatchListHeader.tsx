'use client'
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const WatchListHeader = () => {
  const router = useRouter();

  const redirectUser = (action: string) => {
    sessionStorage.setItem("userAction", action);
    router.push("/search-title");
  };
  return (
    <>
      <Button
        variant="outline"
        className="my-5"
        onClick={() => redirectUser("Watch")}>
        Add New Watch List
      </Button>
    </>
  );
};

export default WatchListHeader;
