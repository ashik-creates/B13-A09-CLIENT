"use client";

import React, { useEffect, useState } from "react";
import {
  Modal,
  Button,
  TextArea,
  Select,
  ListBox,
  Label,
  Surface,
  DatePicker,
  DateField,
  Calendar,
  FieldError,
} from "@heroui/react";
import { today, getLocalTimeZone } from "@internationalized/date";
import { BsArrowDown } from "react-icons/bs";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";

const hours = [
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
];

const BookingModal = ({ hourlyRate, roomName }) => {
  const { data: session } = authClient.useSession();
  const user = session?.user;


  const hourlyRateNum = parseInt(hourlyRate);
  const minDate = today(getLocalTimeZone());
  const [startTime, setStartTime] = useState(hours[0]);
  const [endTime, setEndTime] = useState(hours[1]);

  const startIndex = hours.indexOf(startTime);

  const handleStartChange = (time) => {
    setStartTime(time);

    const nextIndex = hours.indexOf(time) + 1;
    if (nextIndex >= hours.indexOf(endTime)) {
      setEndTime(hours[nextIndex]);
    }
  };

  const start = parseInt(startTime.split(":")[0]);
  const end = parseInt(endTime.split(":")[0]);
  const totalCost = (end - start) * hourlyRateNum;

  if(!user){
    return <Link href={"/login"}><Button className="w-full bg-[#06B6D4] text-white">Login To Book</Button></Link>
  }

  console.log(startTime, endTime);
  return (
    <Modal>
      <Button className="w-full bg-[#06B6D4] text-white">Book Now</Button>
      <Modal.Backdrop>
        <Modal.Container>
          <Modal.Dialog className="max-w-md rounded-2xl bg-[#FFF7D6]">
            <Modal.CloseTrigger />

            <Modal.Header>
              <Modal.Heading>{roomName}</Modal.Heading>
              <p className="text-sm text-gray-500">
                Pick a date and time slot. Bookings run on the hour.
              </p>
            </Modal.Header>

            <Modal.Body>
              <Surface className="space-y-4 p-4">
                <DatePicker
                  defaultValue={minDate}
                  minValue={minDate}
                  aria-label="Select Booking Date"
                  className="w-full"
                >
                  <Label className="text-sm font-medium mb-1 block">Date</Label>
                  <DateField.Group fullWidth>
                    <DateField.Input>
                      {(segment) => <DateField.Segment segment={segment} />}
                    </DateField.Input>
                    <DateField.Suffix>
                      <DatePicker.Trigger>
                        <DatePicker.TriggerIndicator />
                      </DatePicker.Trigger>
                    </DateField.Suffix>
                  </DateField.Group>
                  <FieldError>Date must be today or in the future.</FieldError>
                  <DatePicker.Popover>
                    <Calendar aria-label="Event date">
                      <Calendar.Header>
                        <Calendar.YearPickerTrigger>
                          <Calendar.YearPickerTriggerHeading />
                          <Calendar.YearPickerTriggerIndicator />
                        </Calendar.YearPickerTrigger>
                        <Calendar.NavButton slot="previous" />
                        <Calendar.NavButton slot="next" />
                      </Calendar.Header>
                      <Calendar.Grid>
                        <Calendar.GridHeader>
                          {(day) => (
                            <Calendar.HeaderCell>{day}</Calendar.HeaderCell>
                          )}
                        </Calendar.GridHeader>
                        <Calendar.GridBody>
                          {(date) => <Calendar.Cell date={date} />}
                        </Calendar.GridBody>
                      </Calendar.Grid>
                      <Calendar.YearPickerGrid>
                        <Calendar.YearPickerGridBody>
                          {({ year }) => (
                            <Calendar.YearPickerCell year={year} />
                          )}
                        </Calendar.YearPickerGridBody>
                      </Calendar.YearPickerGrid>
                    </Calendar>
                  </DatePicker.Popover>
                </DatePicker>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label className="text-sm font-medium mb-1 block">
                      Start
                    </Label>
                    <Select
                      value={startTime}
                      onChange={handleStartChange}
                      defaultSelectedKey={hours[0]}
                    >
                      <Select.Trigger className="w-full border border-gray-200 rounded-xl bg-white p-2.5 flex items-center justify-between">
                        <Select.Value />
                        <BsArrowDown></BsArrowDown>
                      </Select.Trigger>
                      <Select.Popover>
                        <ListBox>
                          {hours.slice(0, -1).map((h) => (
                            <ListBox.Item
                              key={h}
                              id={h}
                              textValue={h}
                              className="p-2 hover:bg-gray-100 rounded-md cursor-pointer outline-none"
                            >
                              {h}
                            </ListBox.Item>
                          ))}
                        </ListBox>
                      </Select.Popover>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-sm font-medium mb-1 block">
                      End
                    </Label>
                    <Select
                      value={endTime}
                      onChange={(value) => setEndTime(value)}
                      defaultSelectedKey={endTime}
                    >
                      <Select.Trigger className="w-full border border-gray-200 rounded-xl bg-white p-2.5 flex items-center justify-between">
                        <Select.Value placeholder="Select time" />
                        <BsArrowDown></BsArrowDown>
                      </Select.Trigger>
                      <Select.Popover>
                        <ListBox>
                          {hours.slice(startIndex + 1).map((h) => (
                            <ListBox.Item
                              key={h}
                              id={h}
                              textValue={h}
                              className="p-2 hover:bg-gray-100 rounded-md cursor-pointer outline-none"
                            >
                              {h}
                            </ListBox.Item>
                          ))}
                        </ListBox>
                      </Select.Popover>
                    </Select>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <Label>Special note (optional)</Label>
                  <TextArea placeholder="Any setup needed?" />
                </div>

                <div className="bg-[#F4F1EB] rounded-xl p-4 flex justify-between items-center">
                  <span className="text-gray-600">Total cost</span>
                  <span className="text-xl font-semibold text-[#0895ad]">
                    ${totalCost}
                  </span>
                </div>
              </Surface>
            </Modal.Body>

            <Modal.Footer className="flex justify-end gap-3">
              <Button variant="light" slot={"close"}>
                Cancel
              </Button>
              <Button className="bg-[#06B6D4] text-white">
                Confirm Booking
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
};

export default BookingModal;
