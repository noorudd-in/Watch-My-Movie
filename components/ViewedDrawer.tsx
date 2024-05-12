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

const ViewedDrawer = ({ children }: { children: React.ReactNode }) => {
  return (
    <Drawer>
      <DrawerTrigger>{children}</DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Aamdani Atthanni Kharcha Rupaiya</DrawerTitle>
            <DrawerDescription>Availabe to watch on Hotstar</DrawerDescription>
          </DrawerHeader>
          <div className="p-4 pb-0">
            <p>
              <span className="font-semibold">IMDb Rating:</span> 4.8/10 (1,646
              votes)
            </p>
            <p>
              <span className="font-semibold">My Rating:</span> 73%
            </p>
            <div className="ml-10">
              <ul className="text-sm font-light list-disc">
                <li>Cinematography: 10/10</li>
                <li>Cinematography: 10/10</li>
                <li>Cinematography: 10/10</li>
                <li>Cinematography: 10/10</li>
              </ul>
            </div>

            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger>Expand</AccordionTrigger>
                <AccordionContent>
                  <p>
                    <span className="font-semibold">Released on:</span> 21 Dec
                    2001
                  </p>
                  <p>
                    <span className="font-semibold">Language:</span> Hindi
                  </p>
                  <p>
                    <span className="font-semibold">Genre:</span> Comedy, Drama,
                    Family
                  </p>
                  <p>
                    <span className="font-semibold">Lead Actors:</span> Govinda,
                    Juhi Chawla, Tabu
                  </p>
                  <p>
                    <span className="font-semibold">Director:</span> K.
                    Raghavendra Rao, A.S. Ravindra Babu
                  </p>
                  <p>
                    <span className="font-semibold">Writer:</span> Anwar Khan,
                    V. Shekhar
                  </p>
                  <p>
                    <span className="font-semibold">Country:</span> India
                  </p>
                  <p>
                    <span className="font-semibold">Awards:</span> 2 nominations
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
          <DrawerFooter>
            <Button>View in IMDb</Button>
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
