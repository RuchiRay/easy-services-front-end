import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useGlobalContext } from "../context";
import { service } from "../data/service";
import axios from 'axios'
import { toast } from "react-toastify";
import { updateSlot } from "../features/slotService";

const API_URL = '/api/bookings/'

export const Complete = () => {
  const navigate = useNavigate();
  const { bookingDetails ,slotInfo} = useGlobalContext();
  const { user } = useSelector((state) => state.auth);
  const getPrices = () => {
    let price = 0;
    const map = bookingDetails.services.map((item) => {
      service.map((val) => {
        if (val.name === item) {
          price = price + parseInt(val.price);
        }
      });
    });
    return price;
  };
  const confirmBooking = async()=>{
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    }
   const bookingData = {
    brand:bookingDetails.brand,
    model:bookingDetails.selectedModel,
    shift:bookingDetails.shift,
    date:bookingDetails.date,
    time:bookingDetails.time,
    services:bookingDetails.services,
   }
   try {
    const response = await axios.post(API_URL, bookingData, config)
    updateSlot(slotInfo)
    toast.success('Booking successfull')
    console.log(  response.data,'res after booking');
     navigate("/dashboard");
   } catch (error) {
    toast.error('Error while booking')
   }
    
   
   
  
  }
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  return (
    <div className="bg-orange-100 flex justify-center w-full items-center min-h-screen">
      {" "}
      <div className="bg-white p-8 shadow-3xl">
      <p as="h3" className="text-2xl font-semibold leading-6 text-orange-400">
        Here are the details of your appointment
      </p>
      <div className="mt-6 text-normal items-center text-orange-400 flex gap-2">
        <p> Car:</p>
        <p className="font-medium text-lg">
          {bookingDetails.brand} {bookingDetails.selectedModel}
        </p>
      </div>
      <div className="text-normal items-center text-orange-400 flex gap-2">
        <p> Date:</p>
        <p className="font-medium text-lg">{bookingDetails.date}</p>
      </div>
      <div className=" text-normal items-center text-orange-400 flex gap-2">
        <p> Time:</p>
        <p className="font-medium text-lg">
          {bookingDetails.time}:00{" "}
          {bookingDetails.shift === "morning" ? "AM" : "PM"}
        </p>
      </div>
      <div className=" text-normal items-center text-orange-400 flex gap-2">
        <p> Services:</p>
        <div className="flex gap-2 items-center">
          {bookingDetails.services.map((item) => {
            return (
              <p key={item} className="font-medium text-lg">
                {item}
              </p>
            );
          })}
        </div>
      </div>
      <div className=" text-normal items-center text-orange-400 flex gap-2">
        <p> Price:</p>
        <p className="font-medium text-lg">Rs. {getPrices()}</p>
      </div>
      <div className="mt-4">
        <button
          type="button"
          className="inline-flex justify-center px-4 py-2 text-sm font-medium text-orange-100 bg-blue-300 border border-transparent rounded-md hover:bg-blue-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
          onClick={confirmBooking}
        >
           Confirm Booking
        </button>
      </div>
      </div>
    </div>
  );
};
