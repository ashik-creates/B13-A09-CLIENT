"use client";
import { authClient } from "@/lib/auth-client";
import { AlertDialog, Button } from "@heroui/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const BookingCancelAlert = ({ booking }) => {
  const router = useRouter();
  const { _id } = booking;
  
  const handleCancel = async () => {

    const {data:tokenData} = await authClient.token()

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/bookings/${_id}/cancel`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json",
           authorization: `Bearer ${tokenData?.token}`
         },
      },
    );

    const data = await res.json();
    if (data.modifiedCount > 0) {
      toast.success("Booking is canceled successfully");
      router.refresh();
    }
  };

  return (
    <AlertDialog>
      <Button variant="outline" className="text-red-500 bg-white">Cancel</Button>
      <AlertDialog.Backdrop>
        <AlertDialog.Container>
          <AlertDialog.Dialog>
            <AlertDialog.CloseTrigger />
            <AlertDialog.Header>
              <AlertDialog.Icon status="danger" />
              <AlertDialog.Heading>Cancel Booking?</AlertDialog.Heading>
            </AlertDialog.Header>
            <AlertDialog.Body>
              <p>
                Are you sure you want to cancel this booking? This action is
                permanent and cannot be undone.
              </p>
            </AlertDialog.Body>
            <AlertDialog.Footer>
              <Button slot="close" variant="outline">
                Keep Booking
              </Button>
              <Button onClick={handleCancel} slot="close" variant="danger">
                Yes, Cancel Booking
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
};

export default BookingCancelAlert;
