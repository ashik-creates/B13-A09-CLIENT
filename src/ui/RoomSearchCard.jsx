"use client";

import React, { useEffect, useState } from "react";
import { Input, Checkbox, CheckboxGroup, Button, Label } from "@heroui/react";
import { FaCheck, FaSearch } from "react-icons/fa";
import { useRouter } from "next/navigation";

const RoomSearchCard = () => {
  const [search, setSearch] = useState("");
  const [amenities, setAmenities] = useState([]);
  const [min, setMin] = useState("");
  const [max, setMax] = useState("");

  const router = useRouter();

  useEffect(() => {
    const params = new URLSearchParams();

    if (search) {
      params.set("search", search);
    }
    if (amenities.length > 0) {
      params.set("amenities", amenities.join(","));
    }
    if (min) {
      params.set("min", min);
    }
    if (max) {
      params.set("max", max);
    }

    const paramString = params.toString();
    if (paramString) {
      router.push(`/rooms?${paramString}`);
    } else {
      router.push("/rooms");
    }
  }, [search, amenities, min, max]);

  const handleReset = () => {
    setSearch("");
    setAmenities([]);
    setMin("");
    setMax("");
  };

  return (
    <div className="bg-[#f0df9c] border border-gray-200 rounded-3xl p-6 shadow-sm space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">
          Find Your Study Space
        </h2>

        <p className="text-gray-500 mt-1">
          Search rooms and filter by amenities or hourly rate.
        </p>
      </div>

      <div className="relative">
        <Input
          aria-label="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by room name..."
          className="w-full"
        />

        <FaSearch className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
      </div>

      <div>
        <p className="text-gray-800 font-semibold mb-3">Amenities</p>
        <CheckboxGroup
          value={amenities}
          onChange={(value) => setAmenities(value)}
        >
          <div className="space-y-4 text-sm">
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
                  className={`flex items-center  gap-2.5 px-4 py-3 rounded-full border text-sm transition-all duration-200 cursor-pointer `}
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
                                ${
                                  isSelected
                                    ? "bg-[#06B6D4] border-[#06B6D4] scale-110"
                                    : "bg-transparent "
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
                      <Label htmlFor={`amenity-${item}`}>{item} </Label>
                    </Checkbox.Content>
                  </Checkbox>
                </label>
              );
            })}
          </div>
        </CheckboxGroup>
      </div>

      <div>
        <Label className="text-sm font-semibold mb-3 block">
          Hourly Rate Range
        </Label>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            value={min}
            onChange={(e) => setMin(e.target.value)}
            type="number"
            label="Minimum Hourly Rate"
            placeholder="Min"
          />

          <Input
            value={max}
            onChange={(e) => setMax(e.target.value)}
            type="number"
            label="Maximum Hourly Rate"
            placeholder="Max"
          />
        </div>
      </div>

      <div className="flex items-center gap-3 pt-2">
        <Button
          onClick={handleReset}
          variant="outline"
          className={"bg-white border border-[#FACC15]"}
        >
          Reset
        </Button>
      </div>
    </div>
  );
};

export default RoomSearchCard;
