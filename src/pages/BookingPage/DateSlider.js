import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import { dateData } from "./Data";
import { toast } from "react-toastify";
import axios from "axios";

const API_URL = "/api/slots";
export const DateSlider = ({ setbookingDetails, bookingDetails }) => {
  const [dateArr, setDateArr] = useState(dateData);
  const [loading, setLoading] = useState(false);
  const handleDate = (date) => {
    setbookingDetails((prev) => {
      return { ...prev, date: date };
    });
  };
  useEffect(() => {
    const fetchSlots = async () => {
      try {
        setLoading(true);
        const response = await axios.get(API_URL);
        console.log(response,'res');
        setDateArr(response.data);
        setLoading(false);
      } catch (error) {
        toast.error(error);
        console.log(error, "error in fetching slots");
      }
    };
    fetchSlots();
  }, []);

  if (loading)
    return (
      <div className="text-blue-300 p-8">Loading slots available......</div>
    );
  return (
    <div className="w-full">
      <div className="w-full flex gap-4 my-6 flex-wrap">
       
          {dateArr.map((item) => {
            return (
                <div
                  onClick={() => handleDate(item.date)}
                  className={`${
                    bookingDetails.date === item.date ? `font-semibold bg-orange-200` : "bg-white "
                  } flex shrink-0 flex-col px-4 py-4 rounded-sm  items-center cursor-pointer hover:font-semibold`}
                >
                  <p>{item.date}</p>
                  <p className="text-orange-400 text-base">
                    {item.free} Slots available
                  </p>
                </div>
            );
          })}

      
      </div>
    </div>
  );
};
