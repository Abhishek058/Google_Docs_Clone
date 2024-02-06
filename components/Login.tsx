import { Button } from "@mui/material";
import { GoogleAuthProvider } from "firebase/auth";
import { getAuth, signInWithPopup } from "firebase/auth";
import app from "../app/firebase/firebase";

export default function Login() {
  const signInWithGoogle = async () => {
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();

    try {
      await signInWithPopup(auth, provider);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <img
        src="https://links.papareact.com/1ui"
        width="400"
        height="400"
        alt="Google Docs Logo"
      />
      <Button
        className="!px-10 !py-2 !m-5 !text-xl !rounded-lg !bg-blue-500 !hover:bg-blue-400 !text-white"
        onClick={signInWithGoogle}
      >
        Log In
      </Button>
    </div>
  );
}
