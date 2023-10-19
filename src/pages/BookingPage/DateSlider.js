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
      <div className="w-[900px]">
        <Swiper
          // install Swiper modules
          modules={[Navigation]}
          spaceBetween={50}
          slidesPerView={3}
          navigation
          onSwiper={(swiper) => console.log(swiper)}
          onSlideChange={() => console.log("slide change")}
        >
          {dateArr.map((item) => {
            return (
              <SwiperSlide key={item.date}>
                <div
                  onClick={() => handleDate(item.date)}
                  className={`${
                    bookingDetails.date === item.date ? `font-semibold` : ""
                  } flex shrink-0 flex-col items-center cursor-pointer hover:font-semibold`}
                >
                  <p>{item.date}</p>
                  <p className="text-orange-400 text-base">
                    {item.free} Slots available
                  </p>
                </div>
              </SwiperSlide>
            );
          })}

          <SwiperSlide>
            {" "}
            <div className="flex shrink-0 flex-col items-center cursor-pointer hover:font-semibold">
              <p>Tomorrow</p>
              <p className="text-orange-400 text-base">6 Slots available</p>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};
