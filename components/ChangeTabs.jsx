import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ViewedCard from "./ViewedCard";
import WatchListCard from "./WatchListCard";
import WatchList from "./WatchList";

export default function ChangeTabs() {
  return (
    <Tabs defaultValue="watched">
      <div className="flex justify-center">
        <TabsList>
          <TabsTrigger value="watched">
            <div className="compact">Viewed</div>
          </TabsTrigger>
          <TabsTrigger value="watch-list">
            <div className="compact">Watch List</div>
          </TabsTrigger>
        </TabsList>
      </div>
      <TabsContent value="watched" className="compact">
        <ViewedCard />
      </TabsContent>
      <TabsContent value="watch-list">
        <WatchList />
      </TabsContent>
    </Tabs>
  );
}
