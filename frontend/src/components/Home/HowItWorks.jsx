import React from "react";
import { FaUserPlus } from "react-icons/fa";
import { MdFindInPage } from "react-icons/md";
import { IoMdSend } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const HowItWorks = () => {
  const navigate = useNavigate();

  const steps = [
    {
      id: 1,
      icon: <FaUserPlus />,
      title: "Create Account",
      description: "Sign up as a Job Seeker or Employer. Create your profile and get started in minutes.",
      link: "/register",
      btnText: "Register Now →",
    },
    {
      id: 2,
      icon: <MdFindInPage />,
      title: "Find a Job / Post a Job",
      description: "Browse thousands of jobs or post your job opening to find the perfect candidate.",
      link: "/job/getall",
      btnText: "Browse Jobs →",
    },
    {
      id: 3,
      icon: <IoMdSend />,
      title: "Apply / Recruit Candidates",
      description: "Apply for your dream job or review applications and recruit suitable candidates.",
      link: "/applications/me",
      btnText: "Get Started →",
    },
  ];

  return (
    <>
      <div className="howitworks">
        <div className="container">
          <h3>How Career Connect Works !</h3>
          <div className="banner">
            {steps.map((step) => (
              <div
                className="card howItWorksCard"
                key={step.id}
                onClick={() => navigate(step.link)}
              >
                <div className="stepNumber">0{step.id}</div>
                {step.icon}
                <p>{step.title}</p>
                <p>{step.description}</p>
                <span className="howItWorksBtn">{step.btnText}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default HowItWorks;