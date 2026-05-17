import { Button } from "@heroui/react";
import { FaBookOpen } from "react-icons/fa";
import NavLink from "./NavLink";
import Link from "next/link";

const Navbar = () => {
  return (
    <div>
      <nav className="w-full border-b bg-linear-to-br from-[#E6FAFD]  to-[#FFF7D6]">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <FaBookOpen className="text-2xl text-[#FACC15]" />
            <span className="text-xl font-bold text-[#06B6D4]">StudyNook</span>
          </Link>

          <div className="hidden md:flex items-center gap-8  font-medium">
            <NavLink href={"/"}>Home</NavLink>
            <NavLink href={"/rooms"}>Rooms</NavLink>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button
                variant="outline"
                className="border-[#06B6D4] hover:opacity-80 text-[#06B6D4]"
              >
                Login
              </Button>
            </Link>
            <Link href="/register">
              <Button className="bg-[#FACC15] text-black hover:opacity-80">
                Register
              </Button>
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
