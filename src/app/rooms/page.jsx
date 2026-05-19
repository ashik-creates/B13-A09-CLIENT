import RoomCard from "@/components/shared/RoomCard";
import React from "react";

const AllRoomsPage = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/rooms`);
  const rooms = await res.json();

  if(rooms.length === 0){
    return <p>No room available</p>
  }

  return (
    <div className="bg-[#FFF7D6] py-10">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-center mb-5">All Rooms</h1>
        <div className="grid grid-cols-3 gap-10">
          {rooms.map((room) => (
            <RoomCard key={room._id} room={room}></RoomCard>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllRoomsPage;
