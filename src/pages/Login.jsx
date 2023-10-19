import { useState, useEffect } from "react";
import { FaSignInAlt } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { login, reset } from "../features/auth/authSlice";
import Spinner from "../components/Spinner";
import { useGlobalContext } from '../context'

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;
  const {bookingDetails} = useGlobalContext()
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess || user) {
      if(bookingDetails.brand)
      navigate("/complete",{replace:true});
      else
      navigate('/bookSlot')
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch, bookingDetails.brand]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const userData = {
      email,
      password,
    };

    dispatch(login(userData));
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="bg-orange-100 min-h-screen flex flex-col items-center  w-full">
      <div className="bg-white shadow-3xl mt-12 p-20">
        <section className="flex gap-8 text-3xl text-orange-400 font-semibold justify-center items-center">
          <h1>
            <FaSignInAlt /> 
          </h1>
          <p>Login</p>
        
        </section>
        <p className="text-center text-blue-300 font-normal text-2xl mt-3">Login and continue booking</p>
        <section className="form">
          <form onSubmit={onSubmit}>
            <div className="form-group mt-4 ">
              <input
                type="email"
                className="  text-blue-300 placeholder:text-blue-300"
                id="email"
                name="email"
                value={email}
                placeholder="Enter your email"
                onChange={onChange}
              />
            </div>
            <div className="form-group mt-4">
              <input
                type="password"
                className="text-blue-300 placeholder:text-blue-300 "
                id="password"
                name="password"
                value={password}
                placeholder="Enter password"
                onChange={onChange}
              />
            </div>

            <div className="form-group flex items-center justify-center mt-8">
              <button type="submit" className="bg-blue-300 text-orange-100 px-8 py-3 rounded-md">
                Submit
              </button>
            </div>
          </form>
          <div className="flex gap-4 justify-center mt-4 items-center">
          <p className="text-orange-400 text-lg"> Not an user</p>
          <Link className="text-orange-400 text-lg font-semibold" to={'/register'}>Register</Link>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Login;
