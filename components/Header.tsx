import Menu from "@mui/icons-material/Menu";
import DescriptionIcon from "@mui/icons-material/Description";
import { Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AppsIcon from "@mui/icons-material/Apps";

export default function Header() {
  return (
    <header className="w-full flex items-center justify-between shadow-md px-1">
      <div className="flex items-center">
        <Button className="rounded-full my-4">
          <Menu className="text-black md:text-3xl" />
        </Button>
        <DescriptionIcon className="text-blue-500 text-4xl md:text-5xl" />
        <h1 className="text-gray-600 text-xl md:text-2xl">Docs</h1>
      </div>

      <div className="sm:w-1/2 sm:px-2 sm:py-2 sm:flex sm:items-center sm:ml-4 sm:border-2 sm:rounded-lg sm:bg-gray-100 sm:text-gray-500 hidden focus-within:shadow-md focus-within:text-black">
        <SearchIcon />
        <input
          type="text"
          placeholder="Search"
          className="flex flex-grow outline-none bg-transparent ml-2"
        />
      </div>
      <div className="flex items-center mr-4 gap-3">
        <Button className="rounded-full">
          <AppsIcon className="text-gray-500 text-3xl" />
        </Button>
        <img
          src="https://lh3.googleusercontent.com/ogw/ANLem4ZRiMwS5EAPHvNmHa3ay2op6XaVl3M4D2UxZOc8=s64-c-mo"
          alt="user image"
          className="w-12 h-12 rounded-full cursor-pointer"
        />
      </div>
    </header>
  );
}
