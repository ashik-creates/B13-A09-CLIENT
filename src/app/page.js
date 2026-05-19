import AvailableSection from "@/components/homepage/AvailableSection";
import Banner from "@/components/homepage/Banner";
import WhyChoose from "@/components/homepage/WhyChoose";
import Image from "next/image";
import toast from "react-hot-toast";

export default function Home() {
  return (
    <div>
      <Banner></Banner>
      <AvailableSection></AvailableSection>
      <WhyChoose></WhyChoose>
    </div>
  );
}
