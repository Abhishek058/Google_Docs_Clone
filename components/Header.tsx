import React, { useState } from "react";
import Menu from "@mui/icons-material/Menu";
import DescriptionIcon from "@mui/icons-material/Description";
import { Button, Popover, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AppsIcon from "@mui/icons-material/Apps";

interface HeaderProps {
  user: {
    photoURL: string;
    email: string;
  };
}

const Header: React.FC<HeaderProps> = ({ user }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

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
          src={user.photoURL}
          alt="user image"
          className="w-12 h-12 rounded-full cursor-pointer"
          onClick={handleClick}
        />
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
        >
          <Typography sx={{ p: 2 }}>
            {user.email}
            <Button className="px-10 py-2 m-10 text-md rounded-lg bg-blue-600 hover:bg-blue-500 hover:shadow-2xl hover:scale-105 text-white">
              Logout
            </Button>
          </Typography>
        </Popover>
      </div>
    </header>
  );
};

export default Header;
