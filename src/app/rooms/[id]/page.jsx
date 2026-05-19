import Image from "next/image";
import Link from "next/link";
import { Chip, Button, Card } from "@heroui/react";
import {
  FaArrowLeft,
  FaLayerGroup,
  FaUsers,
  FaDollarSign,
} from "react-icons/fa";
import { BiCheckCircle } from "react-icons/bi";
import BookingModal from "@/components/roomDetailsPage/BookingModal";


const RoomDetailsPage = async ({ params }) => {
  const { id } = await params;
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/rooms/${id}`);
  const room = await res.json();

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
    <div className="bg-[#E6FAFD]">
      <div className="container mx-auto py-10">
        <Link href="/rooms" className="flex items-center gap-2 mb-6 text-sm">
          <FaArrowLeft /> Back
        </Link>

        <div className="grid grid-cols-3 gap-10">
          <Card className="col-span-2 space-y-6 bg-[#FFF7D6]">
            <div className="relative w-full h-105 rounded-3xl overflow-hidden">
              <Image src={image} alt={roomName} fill className="object-cover" />
            </div>

            <div>
              <div className="flex justify-between items-center">
                <h1 className="text-4xl font-bold mb-2">{roomName}</h1>
                <Chip size="lg" className="bg-[#E6FAFD] text-[#06B6D4]">
                  <BiCheckCircle></BiCheckCircle>10 bookings
                </Chip>
              </div>
              <p className="text-gray-600 leading-relaxed">{description}</p>
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

          <div>
            <Card className="p-6 rounded-3xl shadow-lg border bg-[#FFF7D6]">
              <div className="text-3xl font-bold text-primary mb-1">
                ${hourlyRate}
                <span className="text-sm text-gray-500 font-normal">
                  {" "}
                  / hour
                </span>
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

              <BookingModal hourlyRate={hourlyRate}></BookingModal>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomDetailsPage;
