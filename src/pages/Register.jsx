import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FaUser } from 'react-icons/fa'
import { register, reset } from '../features/auth/authSlice'
import Spinner from '../components/Spinner'

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  })

  const { name, email, password, password2 } = formData

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  )

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    if (isSuccess || user) {
      navigate('/')
    }

    dispatch(reset())
  }, [user, isError, isSuccess, message, navigate, dispatch])

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()

    if (password !== password2) {
      toast.error('Passwords do not match')
    } else {
      const userData = {
        name,
        email,
        password,
      }

      dispatch(register(userData))
    }
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <div className="bg-orange-100 min-h-screen flex flex-col items-center  w-full">
   <div className="bg-white shadow-3xl mt-12 p-20">
      <section className="flex  gap-4 text-3xl text-orange-400 font-semibold justify-center items-center">
        <h1>
          <FaUser /> 
        </h1>
      <p>Register</p>
      </section>
      <p className="text-center text-blue-300 font-normal text-2xl mt-3">Please create an account</p>
      <section className='form mt-4'>
        <form className='flex flex-col gap-4' onSubmit={onSubmit}>
          <div className='form-group'>
            <input
              type='text'
              className='form-control'
              id='name'
              name='name'
              value={name}
              placeholder='Enter your name'
              onChange={onChange}
            />
          </div>
          <div className='form-group'>
            <input
              type='email'
              className='form-control'
              id='email'
              name='email'
              value={email}
              placeholder='Enter your email'
              onChange={onChange}
            />
          </div>
          <div className='form-group'>
            <input
              type='password'
              className='form-control'
              id='password'
              name='password'
              value={password}
              placeholder='Enter password'
              onChange={onChange}
            />
          </div>
          <div className='form-group'>
            <input
              type='password'
              className='form-control'
              id='password2'
              name='password2'
              value={password2}
              placeholder='Confirm password'
              onChange={onChange}
            />
          </div>
          <div className='form-group'>
          <div className="form-group flex items-center justify-center mt-4">
              <button type="submit" className="bg-blue-300 text-orange-100 px-8 py-3 rounded-md">
                Submit
              </button>
            </div>
          </div>
        </form>
        <div className="flex gap-4 justify-center mt-4 items-center">
          <p className="text-orange-400 text-lg"> Already an user</p>
          <Link className="text-orange-400 text-lg font-semibold" to={'/login'}>Login</Link>
          </div>
      </section>
      </div>
    </div>
  )
}

export default Register
