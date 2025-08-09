import React, { useState, useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';

;
import { FaGoogle } from 'react-icons/fa';
//import useTitle from '../hooks/useTitle';
import { GoogleAuthProvider } from 'firebase/auth';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import { AuthContext } from '../../context/AuthContext/AuthContext';

const Login = () => {
  //useTitle("Login");
  const [error, setError] = useState("");
  const { logIn, signInGoogle } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  

  const handleLogIn = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    logIn(email, password)
      .then(() => {
        toast.success("Logged In Successfully")
        navigate(location.state ? location.state : "/");
      })
      .catch(error => {
        setError(error.code);
      });
  };

  const handleGoogleLogin = () => {
    signInGoogle()
      .then(() => {
        toast.success("Logged In Successfully");
        navigate(location.state ? location.state : "/");
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 pt-20 pb-15">
      <div className="flex flex-col md:flex-row w-full max-w-4xl rounded-2xl shadow-md overflow-hidden">
        
        {/* Left side welcome section */}
        <div className="w-full md:w-1/2 bg-white/30 backdrop-blur-sm flex flex-col justify-center items-center p-10">
          <h2 className="text-2xl font-medium mb-4 text-gray-800">Welcome!</h2>
          <h1 className="text-2xl font-semibold text-orange-500 cursor-pointer select-none">
            Food<span className="text-orange-200">Fridge</span>
          </h1>
          <p className="mt-5 text-sm text-center text-gray-700 font-normal">
            Not a member yet?{" "}
            <Link className="text-green-600 font-semibold underline" to="/auth/register">
              Register now
            </Link>
          </p>
        </div>

        {/* Right side login form */}
        <div className="w-full md:w-1/2 bg-white flex flex-col justify-center px-6 md:px-12 py-10">
          <h2 className="text-3xl text-gray-800 text-center font-semibold mb-7">Log in</h2>
          <form onSubmit={handleLogIn} className="space-y-5">
            <div>
              <label htmlFor="email" className="text-sm font-normal text-gray-800">EMAIL OR USERNAME</label>
              <input id="email" name="email" type="email" required placeholder="Email or Username"
                className="w-full border-b pb-3 font-normal pt-5 focus:outline-none text-black" />
            </div>
            <div>
              <label htmlFor="password" className="text-sm font-normal text-gray-800">PASSWORD</label>
              <input id="password" name="password" type="password" required placeholder="Password"
                className="w-full border-b pb-3 font-normal pt-5 focus:outline-none text-black" />
            </div>
            <div className="flex justify-between items-center text-sm">
              <label className="flex items-center gap-2 font-normal text-gray-800">
                <input type="checkbox" className="checkbox checkbox-sm font-normal text-gray-800" />
                Keep me logged in
              </label>
            </div>
            {error && <p className="text-xs text-red-500">{error}</p>}
            <button type="submit" className="w-full bg-black text-white py-3 rounded-full mt-4 font-medium">
              Log in now
            </button>
          </form>
          <div className="mt-6 text-center">
            <p className="text-sm mb-4 font-normal text-gray-800">Or sign in with</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleGoogleLogin}
                className="border rounded px-4 py-2 flex items-center gap-2 hover:bg-gray-100 font-medium text-gray-800"
              >
                <FaGoogle /> Google
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Login;
