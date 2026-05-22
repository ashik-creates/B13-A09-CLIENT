import RoomCard from "@/components/shared/RoomCard";
import RoomSearchCard from "@/ui/RoomSearchCard";
import React from "react";

const AllRoomsPage = async ({ searchParams }) => {
  const params = await searchParams;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/rooms?search=${params?.search}&amenities=${params?.amenities}&min=${params?.min}&max=${params?.max}`,
  );

  const rooms = await res.json();

  return (
    <div className="bg-[#FFF7D6] py-10">
      <div className="container mx-auto">
        <div className="border-b-2 border-dashed border-gray-300 pb-5 ">
          <h1 className="text-3xl font-bold text-gray-800 text-center">
            All Rooms
          </h1>
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
