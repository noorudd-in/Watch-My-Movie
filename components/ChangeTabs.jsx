import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ViewedCard from "./ViewedCard";

export default function ChangeTabs() {
  return (
    <Tabs defaultValue="watched">
      <div className="flex justify-center">
        <TabsList>
          <TabsTrigger value="watched">
            <div className="sm:mx-24 mx-5">Viewed</div>
          </TabsTrigger>
          <TabsTrigger value="watch-list">
            <div className="sm:mx-24 mx-5">Watch List</div>
          </TabsTrigger>
        </TabsList>
      </div>
      <TabsContent value="watched" className="sm:mx-20 mx-5">
        <ViewedCard />
      </TabsContent>
      <TabsContent value="watch-list" className="sm:mx-20 mx-5">
        Watch List Movies
      </TabsContent>
    </Tabs>
  );
}
