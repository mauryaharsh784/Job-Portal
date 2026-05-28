import React from "react";
import { useNavigate } from "react-router-dom";
import { FaMicrosoft, FaApple, FaAmazon, FaGoogle } from "react-icons/fa";
import { SiTesla, SiMeta } from "react-icons/si";

const PopularCompanies = () => {
  const navigate = useNavigate();

  const companies = [
    { id: 1, title: "Microsoft", location: "Gurugram, Haryana", openPositions: 10, icon: <FaMicrosoft />, color: "#0078d4" },
    { id: 2, title: "Tesla", location: "Bangalore, Karnataka", openPositions: 5, icon: <SiTesla />, color: "#cc0000" },
    { id: 3, title: "Apple", location: "Hyderabad, Telangana", openPositions: 20, icon: <FaApple />, color: "#555555" },
    { id: 4, title: "Google", location: "Gurugram, Haryana", openPositions: 15, icon: <FaGoogle />, color: "#4285f4" },
    { id: 5, title: "Amazon", location: "Mumbai, Maharashtra", openPositions: 25, icon: <FaAmazon />, color: "#ff9900" },
    { id: 6, title: "Meta", location: "Pune, Maharashtra", openPositions: 8, icon: <SiMeta />, color: "#0866ff" },
  ];

  return (
    <div className="companies">
      <div className="container">
        <h3>TOP COMPANIES</h3>
        <div className="banner">
          {companies.map((element) => (
            <div className="card" key={element.id}>
              <div className="content">
                <div className="icon" style={{ color: element.color }}>
                  {element.icon}
                </div>
                <div className="text">
                  <p>{element.title}</p>
                  <p>{element.location}</p>
                </div>
              </div>
              <button onClick={() => navigate(`/job/getall?keyword=${element.title}`)}>
                Open Positions {element.openPositions}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PopularCompanies;