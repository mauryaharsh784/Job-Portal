import React, { useContext, useEffect, useState } from "react";
import { Link, useParams, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { Context } from "../../main";
import {
  FaBriefcase, FaMapMarkerAlt, FaMoneyBillWave,
  FaCalendarAlt, FaBuilding, FaArrowLeft, FaShare, FaBookmark
} from "react-icons/fa";
import toast from "react-hot-toast";

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState({});
  const [saved, setSaved] = useState(false);
  const navigateTo = useNavigate();
  const { isAuthorized, user } = useContext(Context);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/v1/job/${id}`, { withCredentials: true })
      .then((res) => setJob(res.data.job))
      .catch(() => navigateTo("/notfound"));
  }, []);

  const handleSave = () => {
    setSaved(!saved);
    toast.success(saved ? "Job removed from saved!" : "Job saved successfully!");
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Job link copied to clipboard!");
  };

  if (!isAuthorized) return <Navigate to="/login" />;

  return (
    <section className="jobDetail page">
      <div className="container">

        {/* Back Button */}
        <button className="backBtn" onClick={() => navigateTo(-1)}>
          <FaArrowLeft /> Back to Jobs
        </button>

        <div className="jobDetailCard">

          {/* Header */}
          <div className="jobDetailHeader">
            <div className="jobDetailTitle">
              <div className="jobDetailIcon"><FaBuilding /></div>
              <div>
                <h3>{job.title}</h3>
                <p className="jobDetailCompany">{job.category}</p>
              </div>
            </div>
            <div className="jobDetailActions">
              <button className={`saveBtn ${saved ? "saved" : ""}`} onClick={handleSave}>
                <FaBookmark /> {saved ? "Saved" : "Save Job"}
              </button>
              <button className="shareBtn" onClick={handleShare}>
                <FaShare /> Share
              </button>
            </div>
          </div>

          {/* Info Cards */}
          <div className="jobInfoCards">
            <div className="jobInfoCard">
              <FaMapMarkerAlt className="jobInfoIcon" />
              <div>
                <p className="jobInfoLabel">Location</p>
                <p className="jobInfoValue">{job.city}, {job.country}</p>
              </div>
            </div>
            <div className="jobInfoCard">
              <FaMoneyBillWave className="jobInfoIcon" />
              <div>
                <p className="jobInfoLabel">Salary</p>
                <p className="jobInfoValue">
                  {job.fixedSalary
                    ? `Rs ${job.fixedSalary}`
                    : `Rs ${job.salaryFrom} - Rs ${job.salaryTo}`}
                </p>
              </div>
            </div>
            <div className="jobInfoCard">
              <FaBriefcase className="jobInfoIcon" />
              <div>
                <p className="jobInfoLabel">Category</p>
                <p className="jobInfoValue">{job.category}</p>
              </div>
            </div>
            <div className="jobInfoCard">
              <FaCalendarAlt className="jobInfoIcon" />
              <div>
                <p className="jobInfoLabel">Posted On</p>
                <p className="jobInfoValue">
                  {job.jobPostedOn
                    ? new Date(job.jobPostedOn).toLocaleDateString("en-IN", {
                        day: "numeric", month: "long", year: "numeric"
                      })
                    : "N/A"}
                </p>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="jobDescription">
            <h4>Job Description</h4>
            <p>{job.description}</p>
          </div>

          {/* Location */}
          <div className="jobDescription">
            <h4>Full Address</h4>
            <p><FaMapMarkerAlt style={{color: "#2d5649", marginRight: "8px"}} />{job.location}, {job.city}, {job.country}</p>
          </div>

          {/* Apply Button */}
          {user && user.role === "Employer" ? (
            <div className="employerNote">
              You are viewing this job as an Employer.
            </div>
          ) : (
            <Link to={`/application/${job._id}`} className="applyNowBtn">
              Apply Now →
            </Link>
          )}
        </div>
      </div>
    </section>
  );
};

export default JobDetails;