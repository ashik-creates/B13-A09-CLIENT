import Image from "next/image";
import Link from "next/link";
import { Button, Card, Chip } from "@heroui/react";
import { FaLayerGroup, FaUsers } from "react-icons/fa";

const RoomCard = ({ room }) => {
  const {
    _id,
    roomName,
    description,
    image,
    floor,
    capacity,
    hourlyRate,
    amenities = [],
  } = room;

  const shortDesc =
    description.length > 100 ? description.slice(0, 100) + "..." : description;

  const visibleAmenities = amenities.slice(0, 3);
  const remaining = amenities.length - 3;

  return (
    <Card className="rounded-2xl group bg-[#E6FAFD] shadow-lg overflow-hidden w-full h-full flex flex-col border border-gray-200">
      <div className="relative w-full h-52">
        <Image
          src={image}
          alt={roomName}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover rounded-t-2xl transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="p-5 space-y-3 flex-1">
        <h3 className="text-xl font-semibold">{roomName}</h3>

        <p className="text-sm text-gray-600">{shortDesc}</p>

        <div className="flex items-center flex-wrap gap-4 text-sm text-gray-700">
          <span className="flex items-center gap-2">
            <FaLayerGroup /> {floor}
          </span>
          <span className="flex items-center gap-2">
            <FaUsers /> {capacity} people
          </span>
        </div>

        <p className="font-semibold text-primary">${hourlyRate}/hr</p>

        <div className="flex flex-wrap gap-2">
          {visibleAmenities.map((item) => (
            <Chip key={item} size="sm" variant="flat">
              {item}
            </Chip>
          ))}
          {remaining > 0 && (
            <Chip size="sm" variant="flat">
              +{remaining} more
            </Chip>
          )}
        </div>
      </div>
      <Link href={`/rooms/${_id}`}>
        <Button className="w-full mt-3 bg-[#FACC15] text-black">View Details</Button>
      </Link>
    </Card>
  );
};

export default RoomCard;
