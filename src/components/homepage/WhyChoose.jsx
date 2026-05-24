import { Card } from "@heroui/react";
import { FaClock, FaShieldAlt, FaUsers } from "react-icons/fa";

const WhyChoose = () => {
  return (
    <section className="py-20 bg-[#E6FAFD] ">
      <div className="container mx-auto px-4 sm:px-0  text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-12">Why Choose StudyNook?</h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="p-8 rounded-2xl shadow-lg border border-gray-200 bg-[#FFF7D6]">
            <FaClock className="text-4xl text-cyan-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Easy Booking</h3>
            <p className="text-gray-600">
              Book study rooms in seconds with real-time availability and
              instant confirmation.
            </p>
          </Card>

          <Card className="p-8 rounded-2xl shadow-lg border border-gray-200 bg-[#FFF7D6] ">
            <FaUsers className="text-4xl text-cyan-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Perfect for Groups</h3>
            <p className="text-gray-600">
              Choose rooms based on capacity and amenities for group or solo
              study sessions.
            </p>
          </Card>

          <Card className="p-8 rounded-2xl shadow-lg border border-gray-200 bg-[#FFF7D6] ">
            <FaShieldAlt className="text-4xl text-cyan-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Quiet & Secure</h3>
            <p className="text-gray-600">
              Enjoy a peaceful environment designed for focus, productivity, and
              comfort.
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default WhyChoose;
