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
          <DialogTitle>Support and Contact</DialogTitle>
        </DialogHeader>
        <div className="px-2 pb-2">
          <div className="w-full space-y-8 border border-zinc-200 bg-white p-7 shadow-xs rounded-2xl">
            <b>Adding an Item</b>
            <ul>
              <li>Enter the product name and (optional) description.</li>
              <li>Select a category from the dropdown menu.</li>
              <li>Pick the purchase and expiration dates.</li>
              <li>
                Click the <strong>“+ Add Item”</strong> button to save it.
              </li>
            </ul>
            <b>Managing Items</b>
            <ul>
              <li>View all added items under the “All Item” section.</li>
              <li>
                Use the filter options to sort by category or purchase date.
              </li>
            </ul>
            <div className="pr-5 flex flex-col gap-1">
              <b>Contact Us</b>
              <div className="w-full border border-zinc-200 bg-zinc-50 rounded-lg p-2">
                <a
                  className="text-zinc-800 no-underline hover:text-blue-600"
                  href="https://forms.gle/UTZRv5P7R9jwsXvG7"
                >
                  https://forms.gle/UTZRv5P7R9jwsXvG7
                </a>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Support;
