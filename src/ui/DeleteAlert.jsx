"use client";
import { authClient } from "@/lib/auth-client";
import { AlertDialog, Button } from "@heroui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

const DeleteAlert = ({ room }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const { _id } = room;

  const handleDelete = async () => {
    setIsLoading(true);

    const { data: tokenData } = await authClient.token();

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/rooms/${_id}/delete`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${tokenData?.token}`,
        },
      },
    );

    const data = await res.json();

    setIsLoading(false);

    if (data) {
      toast.success("Room deleted successfully");
      router.push("/my-listings");
    }
  };

  return (
    <AlertDialog>
      <Button variant="outline" className="w-full text-red-500 bg-white">
        Delete
      </Button>
      <AlertDialog.Backdrop>
        <AlertDialog.Container>
          <AlertDialog.Dialog>
            <AlertDialog.CloseTrigger />
            <AlertDialog.Header>
              <AlertDialog.Icon status="danger" />
              <AlertDialog.Heading>Delete Room?</AlertDialog.Heading>
            </AlertDialog.Header>
            <AlertDialog.Body>
              <p>
                Are you sure you want to Delete this room? This action is
                permanent and cannot be undone.
              </p>
            </AlertDialog.Body>
            <AlertDialog.Footer className="flex flex-wrap gap-4">
              <Button slot="close" variant="outline">
                Keep Room
              </Button>
              <Button onClick={handleDelete} isDisabled={isLoading} variant="danger">
                {isLoading ? "Deleting..." : "Yes, Delete Room"}
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
};

export default DeleteAlert;
