import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";
import Spinner from "../components/Spinner";
function Dashboard() {
  const navigate = useNavigate();
  const API_URL = "/api/bookings/";
  const { user } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(true);
  const [bookings, setBookings] = useState([]);
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);
  useEffect(() => {
    const getBookings = async () => {
      const config = {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      };
      try {
        setLoading(true);
        const response = await axios.get(API_URL, config);
        setBookings(response.data);
        setLoading(false);
      } catch (error) {
        toast.error("error in fetching bookings");
      }
    };
    getBookings();
  }, [user?.token]);
  const handleCancel = async (id) => {
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
   try {
    const response = await axios.delete(API_URL + id, config);
    console.log(response);
    const newBookings = bookings.filter((item)=>item._id!==id)
    setBookings(newBookings)
    toast.success('booking cancelled successfully')
   } catch (error) {
    toast.error('error in booking cancellation')
   }
  };
  console.log(bookings);
  return (
    <div className="bg-orange-100   w-full  min-h-screen">
      <div className="w-full h-1 bg-orange-400"></div>
      <section className="flex text-orange-400 flex-col items-center">
        <h1 className="text-orange-400 text-4xl mt-8 font-semibold">
          Welcome {user && user.name}
        </h1>
        <p>This is your Dashboard</p>
        <p>Check out your booking history with us </p>
      </section>
      <div className="m-8">
        <p className=" font-semibold text-3xl text-blue-300">Your bookings</p>
        <div className="h-1 bg-blue-300 w-56"></div>

        {loading && <Spinner />}
        {!loading && bookings.length === 0 && (
          <div className="mt-4 text-blue-300">
            <p>You dont have any bookings , please go ahead and book a slot</p>
            <Link
              to={"/bookSlot"}
              className=" mt-2 inline-flex justify-center px-4 py-2 text-sm font-medium text-orange-100 bg-blue-300 border border-transparent rounded-md hover:bg-blue-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
            >
              Book a slot
            </Link>
          </div>
        )}
        {!loading && bookings.length > 0 && (
          <div className="flex flex-wrap text-blue-300 mt-6 gap-6">
            {bookings.map((item) => {
              return (
                <div key={item._id} className="bg-white shadow-3xl p-6">
                  <div className=" text-normal items-center  flex gap-2">
                    <p> Car:</p>
                    <p className="font-medium text-lg">
                      {item.brand} {item.selectedModel}
                    </p>
                  </div>
                  <div className="text-normal items-center  flex gap-2">
                    <p> Date:</p>
                    <p className="font-medium text-lg">{item.date}</p>
                  </div>
                  <div className=" text-normal items-center  flex gap-2">
                    <p> Time:</p>
                    <p className="font-medium text-lg">
                      {item.time}:00 {item.shift === "morning" ? "AM" : "PM"}
                    </p>
                  </div>
                  <div className=" text-normal items-center  flex gap-2">
                    <p> Services:</p>
                    <div className="flex gap-2 items-center">
                      {item?.services?.map((val) => {
                        return (
                          <p key={val} className="font-medium text-lg">
                            {val}
                          </p>
                        );
                      })}
                    </div>
                  </div>
                  <button
                    onClick={() => handleCancel(item._id)}
                    className="mt-3 border-orange-400 border-2 text-sm text-orange-400 rounded-md px-3 py-2"
                  >
                    Cancel booking
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
