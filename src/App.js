import "./App.scss";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Toaster, toast } from "react-hot-toast";
import { useContext, useEffect } from "react";
import axios from "axios";
import { Context, server } from ".";

function App() {
  const { setUser, setIsAuthenticated, setLoader } = useContext(Context);

  useEffect(() => {
    setLoader(true);
    axios
      .get(`${server}/users/mydetails`, {
        withCredentials: true,
      })
      .then((res) => {
        setUser(res.data.user);
        setIsAuthenticated(true);
        setLoader(false);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
        setUser({});
        setIsAuthenticated(false);
        setLoader(false);
      });
  }, []);

  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/profile"
            element={
              <Profile name={"Satyam"} email={"satyammatoo@gmail.com"} />
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
        <Toaster />
      </Router>
    </>
  );
}
export default App;
