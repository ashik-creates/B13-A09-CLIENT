import RoomCard from "@/components/shared/RoomCard";
import RoomSearchCard from "@/ui/RoomSearchCard";
import { Button } from "@heroui/react";
import Link from "next/link";
import React from "react";
import { FiPlusCircle } from "react-icons/fi";

const AllRoomsPage = async ({ searchParams }) => {
  const params = await searchParams;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/rooms?search=${params?.search || ""}&amenities=${params?.amenities || ""}&min=${params?.min || ""}&max=${params?.max || ""}`,
    {
      cache: "no-store",
    }
  );

  const rooms = await res.json();

  return (
    <div className="bg-[#FFF7D6] py-10 min-h-screen">
      <div className="container mx-auto px-4 sm:px-0">
        <div className="border-b-2 border-dashed border-gray-300 pb-5 flex items-end justify-between flex-wrap gap-5">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              All Rooms
            </h1>

            <p className="text-gray-600">
              Browse all rooms and book your favorite one.
            </p>
          </div>

          <Link href="/add-room">
            <Button className="bg-[#06B6D4] hover:opacity-90 flex items-center text-white">
              <FiPlusCircle />
              Add Room
            </Button>
          </Link>
        </div>

        <div className="lg:grid lg:grid-cols-12 gap-6 mt-6 items-start space-y-5">
          <div className="col-span-3 lg:hidden">
            <RoomSearchCard />
          </div>
          <div className="col-span-9">
            <p className="text-gray-500 pb-4">Showing rooms</p>
            {rooms.length === 0 ? (
              <div className="bg-white border border-gray-300 rounded-2xl py-20 flex items-center justify-center">
                <p className="text-gray-500 text-lg font-medium">
                  No rooms available.
                </p>
              </div>
            ) : (
              <div className="grid  md:grid-cols-2 xl:grid-cols-3 gap-6">
                {rooms.map((room) => (
                  <RoomCard
                    key={room._id}
                    room={room}
                  />
                ))}
              </div>
            )}
          </div>

          <div className="col-span-3 hidden lg:flex">
            <RoomSearchCard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllRoomsPage;