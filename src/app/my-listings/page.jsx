import Link from "next/link";
import { Button } from "@heroui/react";
import { FiPlusCircle } from "react-icons/fi";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import RoomCard from "@/components/shared/RoomCard";

export const metadata = {
  title: "My Listings",
};

const MyListingsPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session?.user;

  const { token } = await auth.api.getToken({
    headers: await headers(),
  });

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/my-listings/${user?.id}`,
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    },   
  );

  const rooms = await res.json();

  return (
    <div className="bg-[#FFF7D6]">
      <div className="container mx-auto py-10 px-4 sm:px-0">
        <div className="flex items-center flex-wrap gap-5 justify-between mb-5 border-b-2 border-dashed border-gray-300 pb-5">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">My Listings</h1>
            <p className="text-gray-500 mt-1">
              Rooms you are sharing on StudyNook.
            </p>
          </div>

          <Link href="/add-room">
            <Button className="bg-[#06B6D4] hover:opacity-90 text-white flex items-center gap-2">
              <FiPlusCircle />
              Add Room
            </Button>
          </Link>
        </div>

        {rooms.length === 0 ? (
          <div className="border-2  border-gray-200 rounded-2xl py-20 flex flex-col items-center justify-center px-4 text-center bg-[#E6FAFD]">
            <div className="bg-[#bae8f0] p-6 rounded-full mb-6">
              <FiPlusCircle className="text-4xl text-[#06B6D4]" />
            </div>

            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              No rooms listed yet
            </h2>

            <p className="text-gray-500 max-w-md mb-6">
              Have a quiet and comfortable space? List your room and start
              earning by helping others find the perfect study spot.
            </p>

            <Link href="/add-room">
              <Button className="bg-[#FACC15] text-black hover:opacity-90 px-6">
                Create Your First Listing
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {rooms.map((room) => (
              <RoomCard key={room._id} room={room}></RoomCard>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyListingsPage;
