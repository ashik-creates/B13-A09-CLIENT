import Link from "next/link";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-[#0d8499] text-[#FACC15]">
      <div className="container mx-auto px-6 py-12 grid md:grid-cols-3 gap-10">
        <div>
          <h3 className="text-2xl font-bold mb-4 text-[#FACC15]">StudyNook</h3>
          <p className="text-sm opacity-90">
            Book quiet and comfortable study rooms easily for focused learning.
          </p>
        </div>

        <div>
          <h4 className="font-semibold mb-4">Useful Links</h4>
          <div className="flex flex-col gap-2 text-sm opacity-90">
            <Link href="/">Home</Link>
            <Link href="/rooms">Rooms</Link>
            <Link href="/">About</Link>
          </div>
        </div>

        <div>
          <h4 className="font-semibold mb-4">Contact</h4>
          <p className="text-sm opacity-90">Email: support@studynook.com</p>
          <p className="text-sm opacity-90">Phone: +880 1234-567890</p>

          <div className="flex gap-4 mt-4 text-lg">
            <FaFacebookF />
            <FaXTwitter />
            <FaLinkedinIn />
            <FaInstagram />
          </div>
        </div>
      </div>

      <div className="sm:text-center px-2 py-4 border-t border-white/20 text-sm">
        © 2026 StudyNook. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
