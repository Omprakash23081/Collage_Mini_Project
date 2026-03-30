import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import toast from "react-hot-toast";

const CareerPathways = () => {
  const [careers, setCareers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCareers();
  }, []);

  const fetchCareers = async () => {
    try {
      // Replace with your actual API endpoint
      // const response = await axios.get("/api/career");
      // setCareers(response.data.data);
      
      // Mock data for now
      setCareers([
        {
          _id: "1",
          title: "Software Engineer Intern",
          company: "Google",
          location: "Bangalore",
          type: "Internship",
          description: "Work on cutting-edge technology.",
        },
        {
          _id: "2",
          title: "Frontend Developer",
          company: "Amazon",
          location: "Hyderabad",
          type: "Full-time",
          description: "Build amazing user interfaces.",
        },
      ]);
    } catch (error) {
      console.error("Error fetching careers:", error);
      toast.error("Failed to load career opportunities");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid p-4 bg-light min-vh-100">
      <div className="row mb-4">
        <div className="col-12 d-flex justify-content-between align-items-center">
          <h2 className="fw-bold text-dark">Career Pathways</h2>
          <Link to="/career/ats-analyzer" className="btn btn-primary rounded-pill px-4">
            <i className="bi bi-magic me-2"></i>
            ATS Resume Analyzer
          </Link>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="row g-4">
          {careers.map((career) => (
            <div key={career._id} className="col-md-6 col-lg-4">
              <motion.div
                whileHover={{ y: -5 }}
                className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden"
              >
                <div className="card-body p-4">
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <div>
                      <h5 className="card-title fw-bold mb-1">{career.title}</h5>
                      <p className="text-muted mb-0">{career.company}</p>
                    </div>
                    <span className="badge bg-light text-primary rounded-pill px-3 py-2">
                      {career.type}
                    </span>
                  </div>
                  <p className="card-text text-secondary mb-4">
                    {career.description.substring(0, 100)}...
                  </p>
                  <div className="d-flex justify-content-between align-items-center mt-auto">
                    <small className="text-muted">
                      <i className="bi bi-geo-alt me-1"></i>
                      {career.location}
                    </small>
                    <button className="btn btn-outline-primary rounded-pill btn-sm px-3">
                      View Details
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CareerPathways;
