import { signIn } from "next-auth/react";

export default function Login() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <img
        src="https://links.papareact.com/1ui"
        width="400"
        height="400"
        alt="Google Docs Logo"
      />
      <button className="px-10 py-2 m-5 text-xl rounded-lg bg-blue-500 hover:bg-blue-400 text-white">
        Sign In
      </button>
    </div>
  );
}
