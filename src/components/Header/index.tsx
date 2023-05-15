import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { Titillium_Web } from "next/font/google";
const titil = Titillium_Web({
  weight: "200",
  subsets: ["latin"],
  display: "block",
});
import Button from "../Button";

const Header = () => {
  const { data: sessionData } = useSession();
  const userName = sessionData?.user.name;
  return (
    <header className="font-['Work Sans'] flex items-center justify-between bg-gradient-to-r from-slate-700 from-10% via-blue-500 via-40% to-indigo-400 to-90% px-8 py-6">
      <div className="px-4 py-2">
        <div className="border-none shadow-lg">
          <div className="rounded-md border-2 border-indigo-800 bg-gradient-to-br from-violet-700 via-indigo-700 to-blue-700 p-2 px-4 pb-4 text-4xl text-indigo-300 shadow-inner shadow-blue-500">
            <div className="bg-gradient-to-br from-slate-600 via-blue-500 to-indigo-400 bg-clip-text text-transparent">
              The Tech Blog
            </div>
          </div>
        </div>
      </div>

      <div
        style={titil.style}
        className="bg-gradient-to-r from-slate-700 via-neutral-700 to-gray-700 bg-clip-text text-xl text-transparent"
      >
        {sessionData
          ? `Welcome Back ${userName as string}`
          : "Welcome to the Tech Blog"}
      </div>

      <div className="flex justify-between gap-2 px-4 py-2">
        <Link href={"/"}>
          <Button style={titil.style} className="nav-button">
            Home
          </Button>
        </Link>
        <Link href={"/dashboard"}>
          <Button style={titil.style} className="nav-button">
            Dashboard
          </Button>
        </Link>
        <Button
          style={titil.style}
          className="nav-button"
          onClick={sessionData ? () => void signOut() : () => void signIn()}
        >
          {sessionData ? "Sign Out" : "Sign In"}
        </Button>
      </div>
    </header>
  );
};

export default Header;
