import Link from "next/link";
import { Button } from "@heroui/react";
import { FiCalendar } from "react-icons/fi";

const MyBookingsPage = () => {
  return (
    <div className="bg-[#E6FAFD]">
      <div className="container mx-auto py-5">
        <div className="flex items-center justify-between mb-10 border-b-2 border-dashed border-gray-300 pb-5">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">My Bookings</h1>
            <p className="text-gray-500 mt-1">
              All the rooms you have booked on StudyNook.
            </p>
          </div>

          <Link href="/rooms">
            <Button className="bg-[#06B6D4] hover:opacity-90 text-white flex items-center gap-2">
              <FiCalendar />
              Explore Rooms
            </Button>
          </Link>
        </div>

        <div className="border-2 border-gray-200 rounded-2xl py-20 flex flex-col items-center justify-center text-center bg-[#FFF7D6]">
          <div className="bg-[#bae8f0] p-6 rounded-full mb-6">
            <FiCalendar className="text-4xl text-[#06B6D4]" />
          </div>

          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            No bookings yet
          </h2>

          <p className="text-gray-500 max-w-md mb-6">
            Find the perfect quiet space to study. Browse available rooms and
            book your next productive session in just a few clicks.
          </p>

          <Link href="/rooms">
            <Button className="bg-[#FACC15] text-black hover:opacity-90 px-6">
              Book Your First Room
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MyBookingsPage;