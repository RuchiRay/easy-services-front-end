import React, { useState, useEffect } from "react";
import "swiper/css";
import "swiper/css/navigation";
import { toast } from "react-toastify";
import axios from "axios";
import { addSlots } from "../../features/slotService";
import { useGlobalContext } from "../../context";
const API_URL = "/api/slots";
export const DateSlider = ({ setbookingDetails, bookingDetails }) => {
  const [dateArr, setDateArr] = useState(null);
  const [loading, setLoading] = useState(false);
  const { setSlotInfo } = useGlobalContext()
  const handleDate = (slotInfo) => {
    setSlotInfo(slotInfo)
    setbookingDetails((prev) => {
      return { ...prev, date: slotInfo.date };
    });
  };
  useEffect(() => {
    const fetchSlots = async () => {
      try {
        setLoading(true);
        const response = await axios.get(API_URL);
        const data = response.data
        console.log(data);
        const lastDate = data?.length ? (new Date(data[data?.length - 1]?.date))?.getDate() : 0
        const todayDate = (new Date()).getDate();
        const isDataOld = todayDate > lastDate
        const today = new Date()
        let datesToBeAdded = 0
        if (isDataOld)
          datesToBeAdded = 7
        if (lastDate === todayDate) {
          datesToBeAdded = 6
        }
        else
          datesToBeAdded = 7 - data?.length
        const lastAcceptableDate = !isDataOld ? new Date(data[data.length - 1].date) : today
        lastAcceptableDate.setHours(0, 0, 0, 0);

        const nextDays = [...Array(datesToBeAdded)].map((_, i) => {
          const date = new Date(lastAcceptableDate);

          date.setDate(lastAcceptableDate.getDate() + i + (datesToBeAdded === 7 ? 1 : 2));

          return { date: date.toISOString().split('T')[0], free: 24 }
        });

        const filteredData = data.filter((item) => {
          return (new Date(item?.date)).getDate() >= todayDate
        })
        if (isDataOld)
          setDateArr(nextDays)
        else
          setDateArr([...filteredData, ...nextDays]);
        setLoading(false);

      } catch (error) {
        toast.error(error);
        console.log(error, "error in fetching slots");
      }
    };
    fetchSlots();
  }, []);

  useEffect(() => {
    if (dateArr?.length === 7)
      addSlots(dateArr)
  }, [dateArr])


  if (loading)
    return (
      <div className="text-blue-300 p-8">Loading slots available......</div>
    );
  return (
    <div className="w-full">
      <div className="w-full flex gap-4 my-6 flex-wrap">

        {dateArr?.map((item, index) => {
          return (
            <div
              key={index}
              onClick={() => handleDate(item)}
              className={`${bookingDetails.date === item.date ? `font-semibold bg-orange-200` : "bg-white "
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
