import Menu from "@mui/icons-material/Menu";
import DescriptionIcon from "@mui/icons-material/Description";
import { Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export default function Header() {
  return (
    <div className="w-full flex items-center shadow-md px-1 py-4">
      <Button className="rounded-full my-4">
        <Menu className="text-black md:text-3xl" />
      </Button>
      <DescriptionIcon className="text-blue-500 text-4xl md:text-5xl" />
      <h1 className="text-gray-600 text-xl md:text-2xl">Docs</h1>

      <div className="sm:w-1/2 sm:px-2 sm:py-2 sm:flex sm:items-center sm:ml-4 sm:border-2 sm:rounded-lg sm:bg-gray-100 sm:text-gray-600 hidden">
        <SearchIcon />
        <input
          type="text"
          placeholder="Search"
          className="flex flex-grow outline-none bg-transparent ml-2"
        />
      </div>
    </div>
  );
}
