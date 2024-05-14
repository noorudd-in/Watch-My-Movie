import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";

type SelectOTTProps = {
  ott: string
  setOtt: (currentValue: string) => void
}

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

const SelectOTT = ({ott, setOtt}: SelectOTTProps) => {
  const [open, setOpen] = useState(false);
  
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between">
          {ott
            ? platforms.find((platform) => platform.value === ott)?.label
            : "Select OTT Platform..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search framework..." />
          <CommandEmpty>No framework found.</CommandEmpty>
          <CommandList>
          <CommandGroup>
            {platforms.map((platform) => (
              <CommandItem
                key={platform.value}
                value={platform.value}
                onSelect={(currentValue) => {
                  setOtt(currentValue === ott ? "" : currentValue);
                  setOpen(false);
                }}>
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    ott === platform.value ? "opacity-100" : "opacity-0"
                  )}
                />
                {platform.label}
              </CommandItem>
            ))}
          </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default SelectOTT;
