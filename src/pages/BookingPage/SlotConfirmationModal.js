import { Dialog, Transition } from "@headlessui/react";
import { useGlobalContext } from "../../context";
import { service } from "../../data/service";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function SlotConfirmationModal({ isOpen, closeModal }) {
  const { bookingDetails, setbookingDetails } = useGlobalContext();
  const { user } = useSelector((state) => state.auth);

  const navigate = useNavigate();
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

  const handleNavigation = () => {
    closeModal();
    navigate("/login");
  };
  return (
    <>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        open={isOpen}
        onClose={closeModal}
      >
        <div className="min-h-screen px-4 text-center">
          <Dialog.Overlay className="fixed inset-0 bg-black/60" />

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>

          <div className="inline-block w-full max-w-xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
            <Dialog.Title
              as="h3"
              className="text-2xl font-semibold leading-6 text-orange-400"
            >
              Here are the details of your appointment
            </Dialog.Title>
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
                onClick={handleNavigation}
              >
               {user?'Go to confirmation page':" Login and Confirm Booking"}
              </button>
            </div>
          </div>
        </div>
      </Dialog>
    </>
  );
}
