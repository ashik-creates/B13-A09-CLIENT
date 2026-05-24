"use client";

import { authClient } from "@/lib/auth-client";
import {
  Button,
  Checkbox,
  CheckboxGroup,
  FieldError,
  Input,
  Label,
  Modal,
  Surface,
  TextArea,
  TextField,
} from "@heroui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

import { BiEdit } from "react-icons/bi";
import { FaCheck } from "react-icons/fa";

const EditModal = ({ room }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const {
    _id,
    roomName,
    description,
    image,
    floor,
    capacity,
    hourlyRate,
    amenities = [],
  } = room;

  const router = useRouter();

  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const { data: tokenData } = await authClient.token();

    const updatedRoom = Object.fromEntries(formData);
    updatedRoom.amenities = formData.getAll("amenities");

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/rooms/${_id}/edit`,
      {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${tokenData?.token}`,
        },
        body: JSON.stringify(updatedRoom),
      },
    );

    const data = await res.json();

    setIsLoading(false);

    if (data) {
      toast.success("Room updated successfully");
      setIsOpen(false);
      router.refresh();
    }
  };

  return (
    <div>
      <Modal isOpen={isOpen} onOpenChange={setIsOpen}>
        <Button
          onClick={() => setIsOpen(true)}
          variant="outline"
          className="w-full text-[#06B6D4] bg-white"
        >
          Edit
        </Button>

        <Modal.Backdrop>
          <Modal.Container placement="auto">
            <Modal.Dialog className="sm:max-w-2xl">
              <Modal.CloseTrigger />

              <Modal.Header>
                <Modal.Icon className="bg-accent-soft text-accent-soft-foreground">
                  <BiEdit />
                </Modal.Icon>

                <Modal.Heading className="text-2xl">Edit Room</Modal.Heading>

                <p className="text-sm text-muted">
                  Update the details of your room listing.
                </p>
              </Modal.Header>

              <Modal.Body className="p-6">
                <Surface variant="default">
                  <form onSubmit={handleSubmit} className="space-y-6 p-6">
                    <TextField
                      name="roomName"
                      isRequired
                      defaultValue={roomName}
                    >
                      <Label className="text-sm font-medium">Room Name</Label>
                      <Input className="rounded-full border-border/60" />
                      <FieldError />
                    </TextField>

                    <TextField
                      name="description"
                      isRequired
                      defaultValue={description}
                    >
                      <Label className="text-sm font-medium">Description</Label>
                      <TextArea className="border-border/60" />
                      <FieldError />
                    </TextField>

                    <TextField
                      name="image"
                      type="url"
                      isRequired
                      defaultValue={image}
                    >
                      <Label className="text-sm font-medium">Image URL</Label>
                      <Input className="rounded-full border-border/60" />
                      <FieldError />
                    </TextField>

                    <div className="flex flex-wrap gap-4 w-full">
                      <TextField
                        name="floor"
                        className="flex-1"
                        isRequired
                        defaultValue={floor}
                      >
                        <Label className="text-sm font-medium">Floor</Label>
                        <Input className="rounded-full border-border/60" />
                        <FieldError />
                      </TextField>

                      <TextField
                        name="capacity"
                        type="number"
                        className="flex-1"
                        isRequired
                        defaultValue={capacity}
                      >
                        <Label className="text-sm font-medium">Capacity</Label>
                        <Input className="rounded-full border-border/60" />
                        <FieldError />
                      </TextField>
                    </div>

                    <TextField
                      name="hourlyRate"
                      type="number"
                      isRequired
                      defaultValue={hourlyRate}
                    >
                      <Label className="text-sm font-medium">
                        Hourly Rate ($)
                      </Label>
                      <Input className="rounded-full border-border/60" />
                      <FieldError />
                    </TextField>

                    <div>
                      <p className="text-base font-semibold mb-3">Amenities</p>
                      <CheckboxGroup defaultValue={amenities}>
                        <div className="grid md:grid-cols-2 gap-3">
                          {[
                            "Whiteboard",
                            "Projector",
                            "Wi-Fi",
                            "Power Outlets",
                            "Quiet Zone",
                            "Air Conditioning",
                          ].map((item) => (
                            <label
                              key={item}
                              htmlFor={`amenity-${item}`}
                              className="flex items-center gap-2.5 px-4 py-3 rounded-full border text-sm cursor-pointer"
                            >
                              <Checkbox
                                id={`amenity-${item}`}
                                name="amenities"
                                value={item}
                                className={"flex items-center m-0 p-0"}
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
                                  <Label htmlFor={`amenity-${item}`}>
                                    {item}
                                  </Label>
                                </Checkbox.Content>
                              </Checkbox>
                            </label>
                          ))}
                        </div>
                      </CheckboxGroup>
                    </div>

                    <Button
                      type="submit"
                      isDisabled={isLoading}
                      className="w-fit bg-[#06B6D4] rounded-full"
                    >
                      {isLoading ? "Saving..." : "Save Changes"}
                    </Button>
                  </form>
                </Surface>
              </Modal.Body>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>
    </div>
  );
};

export default EditModal;
