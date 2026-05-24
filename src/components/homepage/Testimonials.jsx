import { Card, Avatar } from "@heroui/react";

const Testimonials = () => {
    const students = [
            {
              name: "Ayesha Rahman",
              img: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg",
              text: "StudyNook helped me find a quiet place during exams. Super easy booking!",
            },
            {
              name: "Tanvir Hasan",
              img: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg",
              text: "Perfect for group study. The amenities and environment are excellent.",
            },
            {
              name: "Nusrat Jahan",
              img: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg",
              text: "I love how simple and fast the booking process is. Highly recommended!",
            },
          ] 
  return (
    <div className="py-20 bg-[#FFF7D6]">
      <div className="container mx-auto px-4 sm:px-0 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-12">What Students Say</h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {students.map((student) => {
            return (
              <Card key={student.name} className="p-8 rounded-2xl shadow-lg border border-gray-200 flex flex-col bg-[#E6FAFD]">
                <Avatar className="mx-auto mb-4 w-24 h-24 rounded-full" >
                  <Avatar.Image alt={student.name} src={student.img} />
                  <Avatar.Fallback>{student.name.charAt(0)}</Avatar.Fallback>
                </Avatar>

                <p className="text-gray-600 mb-4 flex-1">“{student.text}”</p>
                <h4 className="font-semibold">{student.name}</h4>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
