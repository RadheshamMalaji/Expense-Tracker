import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/usersSlice";
import { Button, Input, InputLabel } from '@mui/material';
const LoginPage = () => {
  const dispatch = useDispatch();
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [loginType, setLoginType] = useState("login");
  const [userCredentials, setUserCredentials] = useState({});
  const [error, setError] = useState("");
  const [users, setUsers] = useState([{email: "user@gmail.com", password: "user@123" }])
  
  const togglePasswordVisibility = () => {
    setPasswordVisibility(!passwordVisibility);
  };

  const toggleLoginType = () => {
    setLoginType(loginType === "login" ? "signup" : "login");
  };

  const handleCredentials = (e) => {
    setUserCredentials({ ...userCredentials, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    setUsers([...users,{ email: userCredentials.email, password: userCredentials.password }]);
    setLoginType("login")
    setUserCredentials({})
  };

  function shallowEqualityCheck(obj1, obj2) {
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);
    if (keys1.length !== keys2.length) {
      return false;
    }
    for (const key of keys1) {
      if (obj1[key] !== obj2[key]) {
        return false;
      }
    }
    return true;
  }


  const handleLogIn = (e) => {
    e.preventDefault();
    const authUser = users.some((item) => shallowEqualityCheck(item, userCredentials))
    if (authUser) {
      dispatch(setUser({ id: 12345, email: userCredentials.email }))
    } else {
      setError("invalid userCredential");
    }
  }

  return (
    <>

      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto"
            style={{width:`10rem`,height:`5rem`}}
            src="https://www.paisowala.com/wp-content/uploads/2020/03/Motilal-Oswal-Logo.jpg"
            alt="Your Company"
          />
          <h2 className="mt-8 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6">
            {loginType === "signup" && (
              <>
                <div>
                  <InputLabel
                    htmlFor="name"
                    className="block text-sm font-medium leading-4 text-gray-900"
                  >
                    Name
                  </InputLabel>
                  <div className="mt-2">
                    <Input
                      onChange={(e) => handleCredentials(e)}
                      id="name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      required
                      className="w-full"
                    />
                  </div>
                </div>
              </>
            )}

            <div>
              <InputLabel
                htmlFor="email"
                className="block text-sm font-medium leading-4 text-gray-900"
              >
                Email address
              </InputLabel>
              <div className="mt-2">
                <Input
                  onChange={(e) => handleCredentials(e)}
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={userCredentials.email??""}
                  className="w-full"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <InputLabel
                  htmlFor="password"
                  className="block text-sm font-medium leading-4 text-gray-900"
                >
                  Password
                </InputLabel>
              </div>
              <div className="mt-2 relative">
                <Input
                  onChange={(e) => handleCredentials(e)}
                  id="password"
                  name="password"
                  type={passwordVisibility ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  value={userCredentials.password??""}
                  className="w-full"
                />
                <i
                  className="absolute flex justify-center items-center top-0 right-0 h-full px-2 opacity-70 cursor-pointer"
                  onClick={togglePasswordVisibility}
                >
                  {passwordVisibility ? (
                    <EyeOff size={16} />
                  ) : (
                    <Eye size={16} />
                  )}
                </i>
              </div>
            </div>

            <div>
              {loginType === "login" ? (
                <Button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 p-3 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  onClick={(e) => handleLogIn(e)}
                >
                  Log In
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 p-3 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  onClick={(e) => handleSignUp(e)}
                >
                  Sign Up
                </Button>
              )}
            </div>

            <div className="text-center text-red-500">{error}</div>

            <div className="relative h-[1px] w-full bg-slate-400 mx-0"></div>
          </form>

          {loginType === "login" ? (
            <p className="mt-10 text-center text-sm text-gray-500">
              Not a member?{" "}
              <a
                href="#"
                className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                onClick={toggleLoginType}
              >
                Create an account
              </a>
            </p>
          ) : (
            <p className="mt-10 text-center text-sm text-gray-500">
              Already a member?{" "}
              <a
                href="#"
                className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                onClick={toggleLoginType}
              >
                Log in to your account
              </a>
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default LoginPage;
