import React from "react";
import { Link } from "react-router-dom";
import hero from "../../img/hero.png";
import { useSelector, useDispatch } from "react-redux";

export const Hero = () => {
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );
  return (
    <div className="bg-orange-100 px-20 w-full min-h-[88vh] items-center flex justify-between">
      <div className="">
        <p className="text-orange-400 text-5xl font-medium">
          Online service booking{" "}
        </p>
        <p className="text-orange-400 text-5xl font-medium">
          system for your cars
        </p>
        <div className="text-2xl mt-4 ">
          <p className="text-orange-400">
            Save time and money by quickly booking{" "}
          </p>
          <p className="text-orange-400">
            appointment for your next car service
          </p>
        </div>
        <div className="flex gap-6">
          <Link
            to={"/bookSlot"}
            className="mt-6 block w-max bg-orange-400 hover:bg-orange-500 text-white p-4 text-xl rounded-md"
          >
            Book a slot
          </Link>
        {
          !user?  <Link
          to={"/login"}
          className="mt-6 border-2  block w-max border-orange-400 text-orange-400 p-4 px-12 text-xl rounded-md"
        >
          Login
        </Link>:""
        }
        </div>
      </div>
      <div className="mr-12  w-[600px] h-[600px]">
        <img src={hero} alt="" />
      </div>
    </div>
  );
};
