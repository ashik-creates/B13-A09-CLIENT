"use client";
import { authClient } from "@/lib/auth-client";
import {
  Form,
  Button,
  TextField,
  Input,
  Label,
  FieldError,
  CheckboxGroup,
  Checkbox,
  Card,
  TextArea,
} from "@heroui/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { FaCheck } from "react-icons/fa";

const AddRoomPage = () => {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const room = Object.fromEntries(formData);
    room.amenities = formData.getAll("amenities");
    const roomObj = {
      ...room,
      ownerId: user?.id,
      ownerName: user?.name,
      ownerImage: user?.image,
      ownerEmail: user?.email,
      bookingCount: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const { data: tokenData } = await authClient.token();

    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/rooms`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${tokenData?.token}`,
      },
      body: JSON.stringify(roomObj),
    });

    const data = await res.json();
    console.log(data);
    if (data.insertedId) {
      toast.success("Room added successfully");
      router.push("/my-listings");
    }
  };

  return (
    <div className="bg-[#E6FAFD]">
      <div className="container mx-auto py-10 flex justify-center items-center">
        <Card className="shadow-lg max-w-2xl border bg-[#FFF7D6] border-gray-200">
          <div className="max-w-4xl mx-auto mb-5">
            <h1 className="text-4xl font-serif font-bold text-[#1A2E35] mb-2">
              Add a Room
            </h1>
            <p className="text-[#5E6A6E] text-lg max-w-2xl">
              Contribute to our collective knowledge hub. Detail your study
              sanctum to welcome others. Your digital blueprint is edit-ready.
            </p>
          </div>
          <Form onSubmit={handleSubmit} className="space-y-6  p-6">
            <TextField name="roomName" isRequired>
              <Label className="text-sm font-medium">Room Name</Label>
              <Input
                className="rounded-full border-border/60"
                placeholder="Conference Room A"
              />
              <FieldError className="text-xs text-danger" />
            </TextField>

            <TextField name="description" isRequired>
              <Label className="text-sm font-medium">Description</Label>
              <TextArea
                className="border-border/60"
                placeholder="Describe the room..."
              />
              <FieldError className="text-xs text-danger" />
            </TextField>

            <TextField name="image" type="url" isRequired>
              <Label className="text-sm font-medium">Image URL</Label>
              <Input
                className="rounded-full border-border/60"
                placeholder="https://example.com/room.jpg"
              />
              <FieldError className="text-xs text-danger" />
            </TextField>

            <div className="flex gap-4 w-full ">
              <TextField name="floor" className="flex-1" isRequired>
                <Label className="text-sm font-medium">Floor</Label>
                <Input
                  className="rounded-full border-border/60"
                  placeholder="3rd Floor"
                />
                <FieldError className="text-xs text-danger" />
              </TextField>

              <TextField
                name="capacity"
                type="number"
                className="flex-1"
                isRequired
              >
                <Label className="text-sm font-medium">Capacity</Label>
                <Input
                  className="rounded-full border-border/60"
                  placeholder="4"
                />
                <FieldError className="text-xs text-danger" />
              </TextField>
            </div>

            <TextField name="hourlyRate" type="number" isRequired>
              <Label className="text-sm font-medium">Hourly Rate ($)</Label>
              <Input
                className="rounded-full border-border/60"
                placeholder="5"
              />
              <FieldError className="text-xs text-danger" />
            </TextField>

            <div>
              <p className="text-base font-semibold mb-3">Amenities</p>
              <div className="grid grid-cols-3 gap-3">
                {[
                  "Whiteboard",
                  "Projector",
                  "Wi-Fi",
                  "Power Outlets",
                  "Quiet Zone",
                  "Air Conditioning",
                ].map((item) => {
                  return (
                    <label
                      key={item}
                      htmlFor={`amenity-${item}`}
                      className={`flex items-center gap-2.5 px-4 py-3 rounded-full border text-sm transition-all duration-200 cursor-pointer `}
                    >
                      <Checkbox
                        id={`amenity-${item}`}
                        name="amenities"
                        value={item}
                      >
                        <Checkbox.Control>
                          <Checkbox.Indicator>
                            {({ isSelected }) => (
                              <div
                                className={`
                                flex items-center justify-center 
                                w-5 h-5 rounded-full 
                                ${
                                  isSelected
                                    ? "bg-[#06B6D4] border-[#06B6D4] scale-110"
                                    : "bg-transparent border-gray-400"
                                }
                                `}
                              >
                                {isSelected && (
                                  <FaCheck className="text-white text-[10px]" />
                                )}
                              </div>
                            )}
                          </Checkbox.Indicator>
                        </Checkbox.Control>
                        <Checkbox.Content>
                          <Label htmlFor={`amenity-${item}`}>{item}</Label>
                        </Checkbox.Content>
                      </Checkbox>
                    </label>
                  );
                })}
              </div>
            </div>

            <Button type="submit" className="w-full bg-[#06B6D4] rounded-full">
              Create Room
            </Button>
          </Form>
        </Card>
      </div>
    </div>
  );
};

export default AddRoomPage;
