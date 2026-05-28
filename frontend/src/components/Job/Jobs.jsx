import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, Navigate, useLocation } from "react-router-dom";
import { Context } from "../../main";
import { FaSearch, FaMapMarkerAlt, FaFilter } from "react-icons/fa";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchLocation, setSearchLocation] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const { isAuthorized } = useContext(Context);
  const location = useLocation();

  useEffect(() => {
    try {
      axios
        .get("http://localhost:4000/api/v1/job/getall", {
          withCredentials: true,
        })
        .then((res) => {
          setJobs(res.data);
          setFilteredJobs(res.data.jobs || []);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  // Hero search bar se aaye params handle karo
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const keyword = params.get("keyword") || "";
    const loc = params.get("location") || "";
    setSearchKeyword(keyword);
    setSearchLocation(loc);
  }, [location.search]);

  // Filter logic
  useEffect(() => {
    if (!jobs.jobs) return;
    let filtered = jobs.jobs;

    if (searchKeyword) {
      filtered = filtered.filter(
        (job) =>
          job.title?.toLowerCase().includes(searchKeyword.toLowerCase()) ||
          job.category?.toLowerCase().includes(searchKeyword.toLowerCase())
      );
    }
    if (searchLocation) {
      filtered = filtered.filter((job) =>
        job.country?.toLowerCase().includes(searchLocation.toLowerCase()) ||
        job.city?.toLowerCase().includes(searchLocation.toLowerCase())
      );
    }
    if (selectedCategory) {
      filtered = filtered.filter((job) =>
        job.category?.toLowerCase().includes(selectedCategory.toLowerCase())
      );
    }
    setFilteredJobs(filtered);
  }, [searchKeyword, searchLocation, selectedCategory, jobs]);

  const handleSearch = () => {
    // useEffect automatically filter karega
  };

  const clearFilters = () => {
    setSearchKeyword("");
    setSearchLocation("");
    setSelectedCategory("");
  };

  const categories = [
    "Graphics & Design",
    "Mobile App Development",
    "Frontend Web Development",
    "MERN Stack Development",
    "Account & Finance",
    "Artificial Intelligence",
    "Video Animation",
    "Game Development",
  ];

  if (!isAuthorized) {
    return <Navigate to="/login" />;
  }

  return (
    <section className="jobs page">
      <div className="container">
        <h1>ALL AVAILABLE JOBS</h1>

        {/* Search + Filter Bar */}
        <div className="jobsFilterBar">
          <div className="jobsSearchRow">
            <div className="jobFilterInput">
              <FaSearch className="filterIcon" />
              <input
                type="text"
                placeholder="Job title or keyword..."
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
              />
            </div>
            <div className="jobFilterInput">
              <FaMapMarkerAlt className="filterIcon" />
              <input
                type="text"
                placeholder="Location..."
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
              />
            </div>
            <div className="jobFilterInput">
              <FaFilter className="filterIcon" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            {(searchKeyword || searchLocation || selectedCategory) && (
              <button className="clearFilterBtn" onClick={clearFilters}>
                Clear Filters ✕
              </button>
            )}
          </div>
          <p className="jobsCount">
            Showing <strong>{filteredJobs.length}</strong> jobs
          </p>
        </div>

        {/* Jobs List */}
        <div className="banner">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((element) => (
              <div className="card" key={element._id}>
                <p>{element.title}</p>
                <p>{element.category}</p>
                <p>{element.country}</p>
                <Link to={`/job/${element._id}`}>Job Details</Link>
              </div>
            ))
          ) : (
            <div className="noJobsFound">
              <h3>No jobs found</h3>
              <p>Try different keywords or clear filters</p>
              <button onClick={clearFilters}>Clear Filters</button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Jobs;