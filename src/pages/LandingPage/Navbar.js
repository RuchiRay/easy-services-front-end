import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import logo from "../../img/logo.png";
import { useSelector, useDispatch } from "react-redux";
import { FaUser } from 'react-icons/fa'
import { logout, reset } from '../../features/auth/authSlice'
import { Link, useNavigate } from 'react-router-dom'

export const Navbar = () => {
  let location = useLocation();
  console.log(location);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const onLogout = () => {
    dispatch(logout())
    dispatch(reset())
    navigate('/')
  }
  console.log(user);
  return (
    <div>
      <div className="flex justify-between w-full items-center text-orange-400 font-medium py-6 px-12 bg-orange-100">
        <Link to={'/'} className="text-3xl text-blue-300 font-bold flex items-center">
          <p>Easy</p>
          <div className="w-12 h-12">
            <img src={logo} alt="" />
          </div>
          <p>Services</p>
        </Link>
        {location.pathname === "/" ? (
          <div className="flex gap-6  justify-center text-lg">
            <a href="#services" className="hover:underline">
              Services
            </a>
            {/* <a href="#how" className="hover:underline">
              How it works
            </a> */}
          </div>
        ) : (
          ""
        )}
        {
          user && <div className="flex gap-4 items-center">
            <div><FaUser /></div>
            <p className="font-semibold text-lg">{user.name}</p>
            <Link to={'/dashboard'} className="bg-orange-400 text-orange-100 px-4 py-2 rounded-md">Dashboard</Link>
            <button onClick={onLogout} className="border-orange-400 border-2  text-orange-400 px-4 py-2 rounded-md">Logout</button>
          </div>
        }
      </div>
      <Outlet />
    </div>
  );
};
