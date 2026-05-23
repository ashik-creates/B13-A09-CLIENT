import RoomCard from "@/components/shared/RoomCard";
import RoomSearchCard from "@/ui/RoomSearchCard";
import { Button } from "@heroui/react";
import Link from "next/link";
import React from "react";
import { FiPlusCircle } from "react-icons/fi";

const AllRoomsPage = async ({ searchParams }) => {
  const params = await searchParams;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/rooms?search=${params?.search}&amenities=${params?.amenities}&min=${params?.min}&max=${params?.max}`,
  );

  const rooms = await res.json();

  return (
    <div className="bg-[#FFF7D6] py-10">
      <div className="container mx-auto">
        <div className="border-b-2 border-dashed border-gray-300 pb-5 flex items-end justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">All Rooms</h1>
            <p className="text-gray-600">
              Browse all rooms and book your favorite one.
            </p>
          </div>
          <Link href={"/add-room"}><Button className={"bg-[#06B6D4] hover:opacity-90 flex items-center"}><FiPlusCircle /> Add Room</Button></Link>
        </div>
        <div className="grid grid-cols-12 gap-3 mt-3 items-start">
          <div className="grid grid-cols-3 col-span-9 gap-10 items-start">
            {rooms.length === 0 ? (
              <p>No room available</p>
            ) : (
              rooms.map((room) => (
                <RoomCard key={room._id} room={room}></RoomCard>
              ))
            )}
          </div>
          <div className="col-span-3">
            <RoomSearchCard></RoomSearchCard>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllRoomsPage;
