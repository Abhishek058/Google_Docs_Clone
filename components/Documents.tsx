import { Button } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import FolderOpenOutlinedIcon from "@mui/icons-material/FolderOpenOutlined";
import SortByAlphaOutlinedIcon from "@mui/icons-material/SortByAlphaOutlined";

export default function Documents() {
  return (
    <div className="w-full p-4">
      <div className="flex items-center justify-around">
        <h1>Recent Documents</h1>
        <h1>Date Modified</h1>
        <Button className="flex items-center text-gray-500">
          <h1>Owned by me</h1>
          <ArrowDropDownIcon />
        </Button>
        <div>
          <Button className="text-black w-14 h-14 rounded-full">
            <SortByAlphaOutlinedIcon className="cursor-pointer" />
          </Button>
          <Button className="text-black w-12 h-14 rounded-full">
            <FolderOpenOutlinedIcon className="cursor-pointer" />
          </Button>
        </div>
      </div>
    </div>
  );
}
