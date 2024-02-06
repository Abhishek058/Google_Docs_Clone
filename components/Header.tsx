import Menu from "@mui/icons-material/Menu";
import DescriptionIcon from "@mui/icons-material/Description";
import { Button, Popover, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AppsIcon from "@mui/icons-material/Apps";
import { getAuth, signOut, onAuthStateChanged, User } from "firebase/auth";
import app from "../app/firebase/firebase";
import { useState, useEffect } from "react";
import { doc, getFirestore, setDoc } from "firebase/firestore";

interface HeaderProps {
  user: {
    displayName: string;
    email: string;
    photoURL: string;
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

  const auth = getAuth(app);
  const [acc, setAcc] = useState<User | null>(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (acc) => {
      if (acc) {
        setAcc(acc);
      } else {
        setAcc(null);
      }
    });

    return () => unsub();
  }, [auth]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <header className="w-full flex items-center justify-between shadow-md px-1 py-2">
      <div className="flex items-center">
        <Button className="rounded-full !my-4">
          <Menu className="text-black md:text-3xl" />
        </Button>
        <DescriptionIcon className="text-blue-500 !text-4xl !md:text-5xl" />
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
            <Button
              onClick={handleLogout}
              className="!px-3 !m-5 !text-xs !rounded-lg !bg-blue-500 !hover:bg-blue-400 !text-white"
            >
              Logout
            </Button>
          </Typography>
        </Popover>
      </div>
    </header>
  );
};

export default Header;
