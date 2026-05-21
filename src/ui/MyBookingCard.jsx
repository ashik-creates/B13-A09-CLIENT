import { Button } from "@heroui/react";
import Image from "next/image";
import React from "react";
import { today, getLocalTimeZone } from "@internationalized/date";
import BookingCancelAlert from "./BookingCancelAlert";

const MyBookingCard = ({ booking }) => {

  const todayDate = today(getLocalTimeZone()).toString();

  const {
    roomName,
    roomImage,
    bookingDate,
    startTime,
    endTime,
    totalCost,
    status,
  } = booking;

  const isDateOver = bookingDate >= todayDate;

  return (
    <div className="bg-[#FFF7D6] border border-gray-200 rounded-2xl p-4 flex items-center justify-between gap-5 shadow-sm">
      <div className="flex items-center gap-4">
        <div className="relative w-28 h-24 rounded-xl overflow-hidden ">
          <Image
            src={roomImage}
            alt={roomName}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
          />
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-800">{roomName}</h2>

          <p className="text-sm text-gray-500 mt-1">{bookingDate}</p>

          <div className="flex items-center gap-2 mt-3">
            <span className="bg-[#C7F1F8] text-[#0891B2] px-3 py-1 rounded-full text-xs">
              {startTime}
            </span>

            <span className="text-gray-400">→</span>

            <span className="bg-[#C7F1F8] text-[#0891B2] px-3 py-1 rounded-full text-xs">
              {endTime}
            </span>
          </div>
        </div>
      </div>

      <div className="text-right">
        <p className="text-xs text-gray-500">Total Cost</p>

        <h3 className="text-2xl font-bold text-[#06B6D4]">${totalCost}</h3>
      </div>

      <div className="flex flex-col items-end gap-4">
        <span
          className={`text-xs px-3 py-1 rounded-full ${
            status === "confirmed"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {status}
        </span>

        {status === "confirmed" && isDateOver && (
          <BookingCancelAlert booking={booking}></BookingCancelAlert>
        )}
      </div>
    </div>
  );
};

export default MyBookingCard;
