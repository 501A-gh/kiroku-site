import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/Dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { HelpCircle } from "react-feather";

const Support = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <HelpCircle className="size-5 duration-700 cursor-pointer" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>How To Use</DialogTitle>
        </DialogHeader>
        <div className="px-4 pb-4">
          <b>Adding an Item</b>
          <ul>
            <li>Enter the product name and (optional) description.</li>
            <li>Select a category from the dropdown menu.</li>
            <li>Pick the purchase and expiration dates.</li>
            <li>
              Click the <strong>“+ Add Item”</strong> button to save it.
            </li>
          </ul>
          <br />
          <b>Managing Items</b>
          <ul>
            <li>View all added items under the "All Items" section.</li>
            <li>
              Use the filter options to sort by category or purchase date.
            </li>
          </ul>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Support;
