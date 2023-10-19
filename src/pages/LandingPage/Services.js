import React from "react";
import {
  MdMiscellaneousServices,
  MdOutlineCleaningServices,
  MdDesignServices
} from "react-icons/md";
import { RiBatteryChargeFill } from "react-icons/ri";
import { FaPaintRoller } from "react-icons/fa";
import { GiAutoRepair, GiCarWheel, GiSteeringWheel } from "react-icons/gi";
import { BsShieldFillCheck } from "react-icons/bs";
import { HiOutlineLightBulb } from "react-icons/hi";
export const Services = () => {
  return (
    <div className="bg-orange-200 py-24 px-6" id='services'>
      <div className="flex gap-4 items-center justify-center">
        <div className="h-[2px] w-48 bg-orange-400"></div>
        <p className=" text-5xl text-orange-400">Services</p>
        <div className="h-[2px] w-48 bg-orange-400"></div>
      </div>
      <div className="flex items-center justify-center  w-full  mt-12 flex-wrap gap-8">
        <div className="flex hover:shadow-3xl bg-orange-100 w-56 h-48 rounded-md flex-col justify-center items-center text-orange-400">
          <div className=" rounded-full p-4 bg-orange-400 text-4xl">
            <MdMiscellaneousServices className="icon" />
          </div>
          <p className="mt-4 text-lg font-medium">Periodic Services</p>
        </div>
        <div className="flex hover:shadow-3xl bg-orange-100 w-56 h-48 rounded-md flex-col justify-center items-center text-orange-400">
          <div className=" rounded-full p-4 bg-orange-400 text-4xl">
            <FaPaintRoller className="icon" />
          </div>
          <p className="mt-6 text-lg font-medium">Denting and Painting</p>
        </div>
        <div className="flex hover:shadow-3xl bg-orange-100 w-56 h-48 rounded-md flex-col justify-center items-center text-orange-400">
          <div className=" rounded-full p-4 bg-orange-400 text-4xl">
            <RiBatteryChargeFill className="icon" />
          </div>
          <p className="mt-6 text-xl font-medium">Batteries</p>
        </div>
        <div className="flex hover:shadow-3xl bg-orange-100 p-4 w-56 h-48 rounded-md flex-col justify-center items-center text-orange-400">
          <div className=" rounded-full p-4 bg-orange-400 text-4xl">
            <MdOutlineCleaningServices className="icon" />
          </div>
          <p className="mt-6 text-lg font-medium text-center">
            Car services and cleaning
          </p>
        </div>
        <div className="flex hover:shadow-3xl bg-orange-100 p-4 w-56 h-48 rounded-md flex-col justify-center items-center text-orange-400">
          <div className=" rounded-full p-4 bg-orange-400 text-4xl">
            <GiAutoRepair className="icon" />
          </div>
          <p className="mt-6 text-lg font-medium text-center">
            AC services and repair
          </p>
        </div>
        <div className="flex hover:shadow-3xl bg-orange-100 p-4 w-56 h-48 rounded-md flex-col justify-center items-center text-orange-400">
          <div className=" rounded-full p-4 bg-orange-400 text-4xl">
            <GiCarWheel className="icon" />
          </div>
          <p className="mt-6 text-lg font-medium text-center">
            Tyres and wheel care
          </p>
        </div>
        <div className="flex hover:shadow-3xl bg-orange-100 p-4 w-56 h-48 rounded-md flex-col justify-center items-center text-orange-400">
          <div className=" rounded-full p-4 bg-orange-400 text-4xl">
            <GiSteeringWheel className="icon" />
          </div>
          <p className="mt-6 text-lg font-medium text-center">
            Clutch and fitments
          </p>
        </div>
        <div className="flex hover:shadow-3xl bg-orange-100 p-4 w-56 h-48 rounded-md flex-col justify-center items-center text-orange-400">
          <div className=" rounded-full p-4 bg-orange-400 text-4xl">
            <BsShieldFillCheck className="icon" />
          </div>
          <p className="mt-6 text-lg font-medium text-center">
            Insurance claims
          </p>
        </div>
        <div className="flex hover:shadow-3xl bg-orange-100 p-4 w-56 h-48 rounded-md flex-col justify-center items-center text-orange-400">
          <div className=" rounded-full p-4 bg-orange-400 text-4xl">
            <HiOutlineLightBulb className="icon" />
          </div>
          <p className="mt-6 text-lg font-medium text-center">
            Windshields and light
          </p>
        </div>

        <div className="flex hover:shadow-3xl bg-orange-100 p-4 w-56 h-48 rounded-md flex-col justify-center items-center text-orange-400">
          <div className=" rounded-full p-4 bg-orange-400 text-4xl">
            <MdDesignServices className="icon" />
          </div>
          <p className="mt-6 text-lg font-medium text-center">
           Custom services
          </p>
        </div>
      </div>
    </div>
  );
};
