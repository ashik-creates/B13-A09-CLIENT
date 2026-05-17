import Link from "next/link";
import Image from "next/image";
import { Button } from "@heroui/react";
import { FaArrowRight } from "react-icons/fa";

const Banner = () => {
  return (
    <div className="bg-[#CFFAFE]">
      <div className="container mx-auto px-6 py-20 grid grid-cols-2 gap-12 items-center">
        <div>
          <h1 className="text-5xl font-bold text-gray-800">
            Find Your Perfect <span className="text-[#06B6D4]">Study Room</span>
          </h1>
          <p className="mt-6 text-gray-600 text-lg">
            Browse and book quiet, private study rooms in your library. List your own room and earn.
          </p>
          <div className="mt-8 flex items-center gap-4">
            <Link href="/rooms">
              <Button className="bg-[#06B6D4] text-white px-6">
                Browse Rooms <FaArrowRight className="ml-2" />
              </Button>
            </Link>
            <Link href="/register">
              <Button variant="outline" className="border-[#FACC15] text-[#9c7f07] px-6">
                Get Started
              </Button>
            </Link>
          </div>
        </div>

        <div >
          <Image
            src="/assets/banner.jpg"
            alt="Library study room"
            height={500}
            width={500}
            className="object-cover border border-gray-200 overflow-hidden rounded-2xl shadow-xl"
            priority
          />
        </div>
      </div>
    </div>
  );
};

export default Banner;