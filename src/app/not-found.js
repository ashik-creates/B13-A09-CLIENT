import Link from "next/link";
import { Button } from "@heroui/react";

const NotFound = () => {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 text-center">
      <h1 className="text-9xl font-extrabold text-gray-100 tracking-widest select-none">
        404
      </h1>

      <div className="absolute flex flex-col items-center">
        <h2 className="text-3xl font-bold text-gray-800 mt-8">
          Page Not Found
        </h2>
        <p className="text-gray-500 mt-3 max-w-md mb-8">
          Oops! The page you are looking for does not exist, has been removed, or
          is temporarily unavailable.
        </p>

        <Link href={"/"}>
          <Button className="px-8 bg-[#06B6D4] text-white font-medium rounded-full shadow-md hover:shadow-lg">
            Take Me Home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
