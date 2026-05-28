import React, { useState, useEffect, useRef } from "react";
import { FaBuilding, FaSuitcase, FaUsers, FaUserPlus, FaSearch, FaMapMarkerAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

// Animated Counter Hook
const useCountUp = (target, duration = 2000, startCounting) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!startCounting) return;
    let start = 0;
    const targetNum = parseInt(target.replace(/,/g, ""));
    const increment = targetNum / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= targetNum) {
        setCount(targetNum);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [startCounting, target, duration]);

  return count.toLocaleString("en-IN");
};

const CountCard = ({ title, subTitle, icon }) => {
  const [startCounting, setStartCounting] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStartCounting(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const animatedCount = useCountUp(title, 2000, startCounting);

  return (
    <div className="card" ref={ref}>
      <div className="icon">{icon}</div>
      <div className="content">
        <p>{animatedCount}</p>
        <p>{subTitle}</p>
      </div>
    </div>
  );
};

const HeroSection = () => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchLocation, setSearchLocation] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchKeyword || searchLocation) {
      navigate(`/jobs?keyword=${searchKeyword}&location=${searchLocation}`);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  const details = [
    { id: 1, title: "123441", subTitle: "Live Job", icon: <FaSuitcase /> },
    { id: 2, title: "91220", subTitle: "Companies", icon: <FaBuilding /> },
    { id: 3, title: "234200", subTitle: "Job Seekers", icon: <FaUsers /> },
    { id: 4, title: "103761", subTitle: "Employers", icon: <FaUserPlus /> },
  ];

  return (
    <>
      <div className="heroSection">
        <div className="container">
          <div className="title">
            <h1>Find a job that suits</h1>
            <h1>your interests and skills</h1>
            <p>
              Discover job opportunities that match your skills and passions.
              Connect with employers seeking talent like yours for rewarding careers.
            </p>

            {/* Search Bar */}
            <div className="heroSearchBar">
              <div className="searchInput">
                <FaSearch className="searchIcon" />
                <input
                  type="text"
                  placeholder="Job title, keywords..."
                  value={searchKeyword}
                  onChange={(e) => setSearchKeyword(e.target.value)}
                  onKeyPress={handleKeyPress}
                />
              </div>
              <div className="searchInput">
                <FaMapMarkerAlt className="searchIcon" />
                <input
                  type="text"
                  placeholder="Location..."
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                  onKeyPress={handleKeyPress}
                />
              </div>
              <button onClick={handleSearch} className="searchBtn">
                Search Jobs
              </button>
            </div>
          </div>
          <div className="image">
            <img src="/heroS.jpg" alt="hero" />
          </div>
        </div>

        {/* Animated Stats */}
        <div className="details">
          {details.map((element) => (
            <CountCard
              key={element.id}
              title={element.title}
              subTitle={element.subTitle}
              icon={element.icon}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default HeroSection;