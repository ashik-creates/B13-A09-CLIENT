"use client";
import { Button, Spinner } from "@heroui/react";
import { FaBookOpen } from "react-icons/fa";
import NavLink from "./NavLink";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { Dropdown, Avatar } from "@heroui/react";
import { FiLogOut } from "react-icons/fi";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const Navbar = () => {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const handleLogout = async () => {
    await authClient.signOut();
    toast.success("User is logged out");
    router.refresh();
  };

  return (
    <div>
      <nav className="w-full border-b bg-linear-to-br from-[#E6FAFD]  to-[#FFF7D6]">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <FaBookOpen className="text-2xl text-[#FACC15]" />
            <span className="text-xl font-bold text-[#06B6D4]">StudyNook</span>
          </Link>

          <div className="flex items-center gap-8  font-medium text-sm">
            <NavLink href={"/"}>Home</NavLink>
            <NavLink href={"/rooms"}>Rooms</NavLink>
            {user && (
              <>
                <NavLink href={"/add-room"}>Add Room</NavLink>
                <NavLink href={"/my-listings"}>My Listings</NavLink>
                <NavLink href={"/my-bookings"}>My Bookings</NavLink>
              </>
            )}
          </div>

          <div className="flex items-center gap-3">
            {isPending ? (
              <Spinner size="sm" />
            ) : !user ? (
              <>
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
              </>
            ) : (
              <Dropdown>
                <Dropdown.Trigger className="rounded-full p-1 bg-white border border-gray-200">
                  <div className="flex items-center gap-2">
                    <Avatar>
                      <Avatar.Image alt={user?.name} src={user?.image} />
                      <Avatar.Fallback>{user?.name.charAt(0)}</Avatar.Fallback>
                    </Avatar>
                    <p className="text-sm font-medium">{user?.name}</p>
                  </div>
                </Dropdown.Trigger>

                <Dropdown.Popover className="mr-5">
                  <Dropdown.Menu>
                    <Dropdown.Item textValue="profile">
                      <div className="bg-white overflow-hidden">
                        <div className="px-4 py-3 border-b">
                          <p className="font-semibold text-sm">{user.name}</p>
                          <p className="text-xs text-gray-500">{user.email}</p>
                        </div>

                        <Link
                          href="/my-listings"
                          className="block px-4 py-3 text-sm hover:bg-gray-50"
                        >
                          My Listings
                        </Link>

                        <Link
                          href="/my-bookings"
                          className="block px-4 py-3 text-sm hover:bg-gray-50 border-b"
                        >
                          My Bookings
                        </Link>

                        <Button
                          onClick={handleLogout}
                          variant="outline"
                          className="w-full text-red-600 mt-3 flex items-center gap-2 text-sm"
                        >
                          <FiLogOut></FiLogOut>
                          Log out
                        </Button>
                      </div>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown.Popover>
              </Dropdown>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
