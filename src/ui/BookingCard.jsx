import BookingModal from "@/components/roomDetailsPage/BookingModal";
import { Card } from "@heroui/react";
import React from "react";
import { FaDollarSign, FaLayerGroup, FaUsers } from "react-icons/fa";

const BookingCard = ({ room }) => {
  const {
    roomName,
    description,
    image,
    floor,
    capacity,
    hourlyRate,
    amenities = [],
  } = room;
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
            <FaDollarSign /> Total 10 bookings
          </div>
        </div>

        <BookingModal hourlyRate={hourlyRate} roomName={roomName}></BookingModal>
      </Card>
    </div>
  );
};

export default BookingCard;
