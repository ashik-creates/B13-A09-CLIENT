import BookingModal from "@/components/roomDetailsPage/BookingModal";
import { auth } from "@/lib/auth";
import { Button, Card } from "@heroui/react";
import { headers } from "next/headers";
import React from "react";
import { FaDollarSign, FaLayerGroup, FaUsers } from "react-icons/fa";

const BookingCard = async ({ room }) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const user = session?.user;
  const {
    ownerId,
    roomName,
    description,
    image,
    floor,
    capacity,
    hourlyRate,
    amenities = [],
    bookingCount,
  } = room;

  const isSameOwner = ownerId === user?.id;

  return (
    <div>
      <Card className="p-6 rounded-3xl shadow-lg border bg-[#FFF7D6]">
        <div className="text-3xl font-bold text-primary mb-1">
          ${hourlyRate}
          <span className="text-sm text-gray-500 font-normal"> / hour</span>
        </div>

        <div className="space-y-3 text-sm text-gray-700 my-6">
          <div className="flex items-center gap-3">
            <FaLayerGroup /> {floor}
          </div>
          <div className="flex items-center gap-3">
            <FaUsers /> Up to {capacity} people
          </div>
          <div className="flex items-center gap-3">
            <FaDollarSign /> Total {bookingCount} bookings
          </div>
        </div>

        <BookingModal
          room={room}
        ></BookingModal>

        {isSameOwner && (
          <div className="flex items-center gap-2 mt-3">
            <Button variant="outline" className={"flex-1"}>
              Edit
            </Button>
            <Button variant="danger" className={"flex-1"}>
              Delete
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
};

export default BookingCard;
