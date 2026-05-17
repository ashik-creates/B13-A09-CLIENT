"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavLink = ({ href, children }) => {
  const pathName = usePathname();
  const isSame = pathName === href;
  return (
    <Link className={`hover:text-[#FACC15] ${isSame ? "text-[#FACC15]" : ""}`} href={href}>
      {children}
    </Link>
  );
};

export default NavLink;
