import { Button } from "@heroui/react";
import Link from "next/link";
import React from "react";

const AvailableSection = () => {
  return (
    <div>
      <div className="container mx-auto py-10">
        <div className="py-5">
          <div>
            <h2>Available Study Rooms</h2>
            <p>Rooms recently added to StudyNook.</p>
          </div>
          <Link href={"/rooms"}>
            <Button>Browse All Room</Button>
          </Link>
        </div>
        <div>
            
        </div>
      </div>
    </div>
  );
};

export default AvailableSection;
