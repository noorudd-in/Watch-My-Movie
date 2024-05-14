import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DeleteIcon } from "./icons/Icons";
import toast, {Toaster} from "react-hot-toast";

type customRatingFields = {
  id: string;
  label: string;
  value: string;
};

type CustomFieldsProps = {
  customFields: customRatingFields[];
  setCustomFields: (newData: customRatingFields[]) => void;
};

const ratings = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];

const CustomFields = ({ customFields, setCustomFields }: CustomFieldsProps) => {
  const handleDelete = (id: string) => {
    if (customFields.length <= 1){
        toast.error('Atleast one field is required!')
        return
    }
    let newFields = customFields.filter( (field) => field.id != id)
    setCustomFields(newFields)
  };

  const handleChange = (
    id: string,
    field: "rating" | "label",
    value: string
  ) => {
    let newFields = [...customFields];
    newFields.map((ele) => {
      if (field == "rating") {
        if (ele.id == id) {
          ele.value = value;
        }
      } else if (field == "label") {
        if (ele.id == id) {
          ele.label = value;
        }
      }
    });
    setCustomFields(newFields);
  };
  return (
    <>
    <Toaster />
      {customFields.map((field) => {
        return (
          <div className="my-2 flex" key={field.id}>
            <Input
              placeholder={field.label}
              value={field.label}
              className="mr-1"
              onChange={(e) => handleChange(field.id, "label", e.target.value)}
            />
            <Select
              onValueChange={(value) => handleChange(field.id, "rating", value)}
              defaultValue={field.value}>
              <SelectTrigger className="w-[20%]">
                <SelectValue placeholder="0" />
              </SelectTrigger>
              <SelectContent>
                {ratings.map((rating) => {
                  return <SelectItem value={rating} key={rating}>{rating}</SelectItem>;
                })}
              </SelectContent>
            </Select>
            <div onClick={() => handleDelete(field.id)}>
              <DeleteIcon classname="ml-1 w-8 h-8 text-red-600" />
            </div>
          </div>
        );
      })}
    </>
  );
};

export default CustomFields;
