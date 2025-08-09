import React, { use, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { GoogleAuthProvider } from 'firebase/auth';
import { FaGoogle, FaEye, FaEyeSlash } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { AuthContext } from '../../context/AuthContext/AuthContext';

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { createUser, setUser, updateUser, googleLogin } = use(AuthContext);
  const [nameError, setNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();
  const handleRegister = (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    const photo = e.target.photo.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    if (name.length < 5) {
      setNameError("Name should be at least 5 characters long.");
      return;
    } else {
      setNameError("");
    }

    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (
      password.length < 8 ||
      !hasUpperCase ||
      !hasLowerCase ||
      !hasSpecialChar
    ) {
      setPasswordError(
        "Password must be at least 8 characters and include uppercase, lowercase letters, and a special character."
      );
      return;
    } else {
      setPasswordError("");
    }

    createUser(email, password)
      .then((result) => {
        const user = result.user;
        updateUser({ displayName: name, photoURL: photo })
          .then(() => {
            setUser({ ...user, displayName: name, photoURL: photo });
            toast.success("Registered Successfully");
            navigate("/");
          })
          .catch((error) => {
            console.log(error);
            setUser(user);
            toast.success("Registered Successfully");
            navigate("/");
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleGoogleRegister = () => {
          googleLogin()
            .then((result) => {
              const user = result.user;
              console.log(user)
            // fetch("https://greenworld-server.vercel.app/users", {
            //       method: "POST",
            //       headers: {
            //         "Content-Type": "application/json"
            //       },
            //       body: JSON.stringify(userInfo)
            //     }).then(res =>res.json())
              // .then(() => {

                 updateUser({ displayName: user.displayName, photoURL: user.photoURL })
                .then(() => {
                  setUser({ ...user, displayName: user.displayName, photoURL: user.photoURL });
                  toast.success("Registered Successfully");
                  navigate("/");
                })
                .catch((error) => {
                  console.log(error);
                  setUser(user);
                  toast.success("Registered Successfully");
                  navigate("/");
                });
                  
                // })
            })
            .catch((error) => {
              console.log(error);
            });
        };

  return (
    <div className="flex items-center justify-center min-h-screen px-10 pt-20 pb-15">
      <div className="flex flex-col md:flex-row w-full max-w-4xl rounded-2xl shadow-md overflow-hidden">
        <div className="w-full md:w-1/2 bg-white/30 backdrop-blur-sm flex flex-col justify-center items-center p-10">
          <h2 className="text-2xl font-medium mb-4">Join Us!</h2>
          <h1 className="text-4xl font-semibold text-green-600">
            Green<span className="text-black">World</span>
          </h1>
          <p className="mt-5 text-sm text-center font-normal">
            Already have an account?{" "}
            <Link className="text-black font-semibold underline" to="/auth/login">
              Log in now
            </Link>
          </p>
        </div>
        <div className="w-full md:w-1/2 bg-white flex flex-col justify-center px-6 md:px-16 py-12">
          <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">Register Your Account</h2>
          <form onSubmit={handleRegister} className="space-y-5">
            <div>
              <label htmlFor="name" className="text-sm font-normal text-gray-800">Name</label>
              <input type="text" name="name" id="name" required className="w-full border-b text-gray-800 font-normal pb-3 pt-5 focus:outline-none" placeholder="Your Name" />
              {nameError && <p className="text-xs text-red-500">{nameError}</p>}
            </div>

            <div>
              <label htmlFor="photo" className="text-sm font-normal text-gray-800">Photo URL</label>
              <input type="text" name="photo" id="photo" required className="w-full border-b text-gray-800 font-normal pb-3 pt-5 focus:outline-none" placeholder="Photo URL" />
            </div>

            <div>
              <label htmlFor="email" className="text-sm font-normal text-gray-800">Email</label>
              <input type="email" name="email" id="email" required className="w-full border-b text-gray-800 font-normal pb-3 pt-5 focus:outline-none" placeholder="Email" />
            </div>

            <div className="relative">
              <label htmlFor="password" className="text-sm font-normal text-gray-800">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                required
                className="w-full border-b text-gray-800 font-normal pb-3 pt-5 focus:outline-none pr-10"
                placeholder="Password"
              />
              <span
                className="absolute right-2 top-10 cursor-pointer text-gray-800"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
              {passwordError && <p className="text-xs text-red-500">{passwordError}</p>}
            </div>

            <button type="submit" className="w-full bg-black text-white py-3 rounded-full mt-4 font-semibold">
              Register
            </button>

            <button
              type="button"
              onClick={handleGoogleRegister}
              className="w-full font-semibold text-gray-800 border rounded-full py-3 flex items-center justify-center gap-2 hover:bg-gray-100"
            >
              <FaGoogle /> Sign Up with Google
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
