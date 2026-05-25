export const dynamic = "force-dynamic";

import { Button } from "@heroui/react";
import Link from "next/link";
import React from "react";
import RoomCard from "../shared/RoomCard";

const AvailableSection = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/rooms/latest`,
    {
      cache: "no-store",
    },
  );
  const rooms = await res.json();

  return (
    <div className="bg-[#FFF7D6] pb-5">
      <div className="container mx-auto py-10 px-4 sm:px-0">
        <div className="py-5 flex flex-wrap items-center justify-between gap-4 ">
          <div>
            <h2 className="text-3xl font-bold text-gray-800">
              Available Study Rooms
            </h2>
            <p className="text-gray-600">Rooms recently added to StudyNook.</p>
          </div>
          <Link href={"/rooms"}>
            <Button className={"bg-[#06B6D4]"}>Browse All Rooms</Button>
          </Link>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-7 items-center">
          {rooms.map((room) => (
            <RoomCard key={room._id} room={room}></RoomCard>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AvailableSection;
