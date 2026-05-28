import React, { useContext, useState } from "react";
import { Context } from "../../main";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";
import { FaHome, FaBriefcase, FaFileAlt, FaPlusCircle, FaListAlt, FaSignOutAlt, FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  const [show, setShow] = useState(false);
  const { isAuthorized, setIsAuthorized, user, setUser } = useContext(Context);
  const navigateTo = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/user/logout`,
        { withCredentials: true }
      );
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || "Logged out.");
    } finally {
      setUser({});
      setIsAuthorized(false);
      navigateTo("/login");
    }
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className={isAuthorized ? "navbarShow" : "navbarHide"}>
      <div className="container">
        <div className="logo">
          <img src="/careerconnect-white.png" alt="logo" />
        </div>

        <ul className={!show ? "menu" : "show-menu menu"}>
          <li>
            <Link
              to={"/"}
              onClick={() => setShow(false)}
              className={isActive("/") ? "activeLink" : ""}
            >
              <FaHome className="navIcon" /> HOME
            </Link>
          </li>
          <li>
            <Link
              to={"/job/getall"}
              onClick={() => setShow(false)}
              className={isActive("/job/getall") ? "activeLink" : ""}
            >
              <FaBriefcase className="navIcon" /> ALL JOBS
            </Link>
          </li>
          <li>
            <Link
              to={"/applications/me"}
              onClick={() => setShow(false)}
              className={isActive("/applications/me") ? "activeLink" : ""}
            >
              <FaFileAlt className="navIcon" />
              {user && user.role === "Employer"
                ? "APPLICANT'S APPLICATIONS"
                : "MY APPLICATIONS"}
            </Link>
          </li>

          {user && user.role === "Employer" && (
            <>
              <li>
                <Link
                  to={"/job/post"}
                  onClick={() => setShow(false)}
                  className={isActive("/job/post") ? "activeLink" : ""}
                >
                  <FaPlusCircle className="navIcon" /> POST NEW JOB
                </Link>
              </li>
              <li>
                <Link
                  to={"/job/me"}
                  onClick={() => setShow(false)}
                  className={isActive("/job/me") ? "activeLink" : ""}
                >
                  <FaListAlt className="navIcon" /> VIEW YOUR JOBS
                </Link>
              </li>
            </>
          )}

          {/* User Info */}
          <li className="navUserInfo">
            <FaUserCircle className="navUserIcon" />
            <span>{user?.name}</span>
            <span className="navUserRole">{user?.role}</span>
          </li>

          <button onClick={handleLogout} className="navLogoutBtn">
            <FaSignOutAlt /> LOGOUT
          </button>
        </ul>

        <div className="hamburger" onClick={() => setShow(!show)}>
          {show ? <AiOutlineClose /> : <GiHamburgerMenu />}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;