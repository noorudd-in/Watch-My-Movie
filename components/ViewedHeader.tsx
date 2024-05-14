import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const ViewedHeader = () => {
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
        onClick={() => redirectUser("Viewed")}>
        Add Record
      </Button>
    </>
  );
};

export default ViewedHeader;
