import AvailableSection from "@/components/homepage/AvailableSection";
import Banner from "@/components/homepage/Banner";
import Testimonials from "@/components/homepage/Testimonials";
import WhyChoose from "@/components/homepage/WhyChoose";



export default function Home() {
  return (
    <div>
      <Banner></Banner>
      <AvailableSection></AvailableSection>
      <WhyChoose></WhyChoose>
      <Testimonials></Testimonials>
    </div>
  );
}
