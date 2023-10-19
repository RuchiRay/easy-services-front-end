import React, { useState } from "react";
import { brand } from "../../data/brand";
import SlotConfirmationModal from "./SlotConfirmationModal";
import { DateSlider } from "./DateSlider";
import { service } from "../../data/service";
import { useGlobalContext } from '../../context'

export const BookingPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {bookingDetails,setbookingDetails} = useGlobalContext()
  const closeModal = () => {
    setIsOpen(false);
  };
  const morning = ["9", "10", "11", "12", "1"];
  const afternoon = ["2", "3", "4", "5"];
  const handleModel = (item) => {
    console.log(item, "model item");
    setbookingDetails((prev) => {
      return { ...prev, selectedModel: item };
    });
  };
  const handleBrand = (item) => {
    setbookingDetails((prev) => {
      return { ...prev, brand: item.name, models: item.models };
    });
  };
  const handleTimeShift = (time, shift) => {
    setbookingDetails((prev) => {
      return { ...prev, time: time, shift: shift };
    });
  };
  const handleService = (item) => {
   
    if(bookingDetails.services.find((service)=>service===item))
    {
      const newServices = bookingDetails.services.filter((service)=>service!==item)
      setbookingDetails((prev) => {
        return { ...prev, services: newServices };
      });
    }
    else
    setbookingDetails((prev) => {
      return { ...prev, services: [...prev.services, item] };
    });
  };
  console.log(bookingDetails, "details");
  return (
    <div className="bg-orange-100 py-6 px-12">
      <div className="flex gap-4 mt-10 items-center justify-center">
        <div className="h-[2px] w-48 bg-orange-400"></div>
        <p className=" text-5xl text-orange-400">Book a slot</p>
        <div className="h-[2px] w-48 bg-orange-400"></div>
      </div>
      <div className="mt-16">
        <p className="text-orange-400 text-2xl font-medium">Select Brand</p>
        <div className="flex flex-wrap gap-4 mt-6">
          {brand.map((item) => {
            return (
              <div
                key={item.id}
                className={`${
                  bookingDetails.brand === item.name
                    ? `bg-orange-400 text-orange-100`
                    : `text-orange-400`
                } px-6 py-2 text-lg rounded-md border-2 border-orange-400  cursor-pointer`}
                onClick={() => handleBrand(item)}
              >
                {item.name}
              </div>
            );
          })}
        </div>
      </div>
      {bookingDetails.brand && (
        <div className="mt-16">
          <p className="text-orange-400 text-2xl font-medium">Select model</p>
          <div className="flex flex-wrap gap-4 mt-6">
            {bookingDetails.models.map((item) => {
              return (
                <div
                  key={item}
                  className={`${
                    bookingDetails.selectedModel === item
                      ? `bg-orange-400 text-orange-100`
                      : `text-orange-400`
                  } px-6 py-2 text-lg rounded-md border-2 border-orange-400  cursor-pointer`}
                  onClick={() => handleModel(item)}
                >
                  {item}
                </div>
              );
            })}
          </div>
        </div>
      )}
      <div className="mt-16 text-blue-300">
        <p className=" text-2xl font-medium">Select date and time</p>
        <div className="mt-6 flex flex-col">
          <div className="w-full h-px bg-blue-300"></div>

          <DateSlider
            setbookingDetails={setbookingDetails}
            bookingDetails={bookingDetails}
          />
          <div className="w-full h-[0.5px] bg-blue-300"></div>
        </div>
        <div className="mt-6">
          <div className="flex gap-16">
            <p className="text-lg">Morning</p>
            <div className="flex  flex-wrap gap-4">
              {morning.map((item) => {
                return (
                  <p
                  key={item}
                    className={`${
                      bookingDetails.time === item
                        ? `bg-blue-300 text-orange-100`
                        : `text-blue-300`
                    } px-4 py-1 border text-blue-300 rounded-md border-blue-300 cursor-pointer`}
                    onClick={() => handleTimeShift(item, "morning")}
                  >
                    {item}:00 AM
                  </p>
                );
              })}
            </div>
          </div>
          <div className="flex gap-12 mt-6">
            <p className="text-lg">Afternoon</p>
            <div className="flex  flex-wrap gap-4">
              {afternoon.map((item) => {
                return (
                  <p
                  key={item}
                    className={`${
                      bookingDetails.time === item
                        ? `bg-blue-300 text-orange-100`
                        : `text-blue-300`
                    } px-4 py-1 border text-blue-300 rounded-md border-blue-300 cursor-pointer`}
                    onClick={() => handleTimeShift(item, "afternoon")}
                  >
                    {item}:00 PM
                  </p>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <div className="mt-16 text-orange-400">
        <div className="text-2xl font-medium">Select services</div>
        <div className="text-base ">You can select multiple services</div>
        <div className="flex flex-wrap gap-4 mt-6">
          {service.map((item) => {
            return (
              <div
                key={item.id}
                className={`${
                  bookingDetails.services.find((service)=>service===item.name) === item.name
                    ? `bg-orange-400 text-orange-100`
                    : `text-orange-400`
                } px-6 py-2 text-lg rounded-md border-2 border-orange-400 cursor-pointer`}
                onClick={() => handleService(item.name)}
              >
                {item.name}
              </div>
            );
          })}
        </div>
      </div>
      <button
        onClick={() => setIsOpen(true)}
        className="bg-orange-400 text-orange-100 px-6 py-2 block mt-6 rounded-md text-xl "
      >
        Confirm
      </button>
      <SlotConfirmationModal isOpen={isOpen} closeModal={closeModal} />
    </div>
  );
};
