import Image from "next/image";
import Link from "next/link";
import { Chip, Card, Avatar } from "@heroui/react";
import { FaArrowLeft } from "react-icons/fa";
import { BiCheckCircle } from "react-icons/bi";
import BookingCard from "@/ui/BookingCard";

const RoomDetailsPage = async ({ params }) => {
  const { id } = await params;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/rooms/${id}`,
  );
  const room = await res.json();

  const {
    roomName,
    description,
    image,
    amenities = [],
    bookingCount,
    ownerName,
    ownerImage,
    ownerEmail,
  } = room;

  return (
    <div className="bg-[#E6FAFD]">
      <div className="container mx-auto py-10 px-4 sm:px-0">
        <Link href="/rooms" className="flex items-center gap-2 mb-6 text-sm">
          <FaArrowLeft /> Back
        </Link>

        <div className="grid md:grid-cols-3 gap-10">
          <Card className="md:col-span-2 space-y-6 bg-[#FFF7D6]">
            <div className="relative w-full h-105 rounded-3xl overflow-hidden">
              <Image
                src={image}
                alt={roomName}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                fill
                className="object-cover"
              />
            </div>

            <div className="flex justify-between items-center flex-wrap gap-5">
              <div className="space-y-3">
                <h1 className="text-4xl font-bold mb-2">{roomName}</h1>
                <p className="text-gray-600 leading-relaxed">{description}</p>
              </div>

              <Chip size="lg" className="bg-[#E6FAFD] text-[#06B6D4]">
                <BiCheckCircle></BiCheckCircle>
                {bookingCount} bookings
              </Chip>
            </div>

            <div>
              <h3 className="font-semibold mb-3">Amenities</h3>
              <div className="flex flex-wrap gap-3">
                {amenities.map((item) => (
                  <Chip key={item} variant="flat" color="primary">
                    {item}
                  </Chip>
                ))}
              </div>
            </div>
          </Card>

          <div className="space-y-7">
            <BookingCard room={room}></BookingCard>
            <Card className="p-5 rounded-3xl border shadow-md">
              <p className="text-xs text-gray-500 mb-3">LISTED BY</p>
              <div className="flex items-center gap-3">
                <Avatar size="lg">
                  <Avatar.Image src={ownerImage} />
                  <Avatar.Fallback>{ownerName.charAt(0)}</Avatar.Fallback>
                </Avatar>
                <div>
                  <p className="font-semibold">{ownerName}</p>
                  <p className="text-sm text-gray-500">{ownerEmail}</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomDetailsPage;
