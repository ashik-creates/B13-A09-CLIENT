import Link from "next/link";
import { Button } from "@heroui/react";
import { FiCalendar } from "react-icons/fi";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import MyBookingCard from "@/ui/MyBookingCard";

export const metadata = {
  title: "My Bookings",
};

const MyBookingsPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session?.user;
  const { token } = await auth.api.getToken({
    headers: await headers(),
  });
  
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/my-bookings/${user?.id}`,
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    },
  );

  const bookings = await res.json();
  return (
    <div className="bg-[#E6FAFD]">
      <div className="container mx-auto py-5 px-4 sm:px-0">
        <div className="flex items-center  flex-wrap gap-5 justify-between mb-10 border-b-2 border-dashed border-gray-300 pb-5">
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

        {bookings.length === 0 ? (
          <div className="border-2 border-gray-200 rounded-2xl px-4 py-20 flex flex-col items-center justify-center text-center bg-[#FFF7D6]">
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
        ) : (
          <div className="space-y-4">
            {bookings.map((booking) => (
              <MyBookingCard
                key={booking._id}
                booking={booking}
              ></MyBookingCard>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookingsPage;
