import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const ATSAnalyzer = () => {
  const [resume, setResume] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState(null);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setResume(file);
    }
  };

  const analyzeResume = () => {
    if (!resume || !jobDescription) return;

    setAnalyzing(true);
    // Simulate analysis delay
    setTimeout(() => {
      setAnalyzing(false);
      setResult({
        score: 85,
        matchedKeywords: ["React", "JavaScript", "Node.js", "CSS"],
        missingKeywords: ["TypeScript", "GraphQL", "AWS"],
        strengths: [
          "Strong frontend experience",
          "Good project portfolio",
          "Clear formatting",
        ],
        weaknesses: [
          "Lack of cloud experience",
          "No TypeScript mentioned",
        ],
        advice: "Consider adding a section on cloud technologies and learning TypeScript to boost your profile.",
      });
    }, 2000);
  };

  return (
    <div className="min-vh-100 bg-light d-flex flex-column align-items-center py-5">
      <div className="container" style={{ maxWidth: "900px" }}>
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-5">
          <Link to="/career" className="text-decoration-none text-secondary">
            <i className="bi bi-arrow-left me-2"></i>Back to Career
          </Link>
          <h1 className="fw-bold m-0" style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif", letterSpacing: "-0.5px" }}>
            ATS Analyzer
          </h1>
          <div style={{ width: "100px" }}></div> {/* Spacer for centering */}
        </div>

        {/* Main Content */}
        <AnimatePresence mode="wait">
          {!result ? (
            <motion.div
              key="input"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white rounded-5 shadow-sm p-5"
            >
              <div className="text-center mb-5">
                <h2 className="fw-bold mb-3">Optimize Your Resume</h2>
                <p className="text-secondary fs-5">
                  Get AI-powered insights to beat the ATS and land your dream job.
                </p>
              </div>

              <div className="row g-4">
                <div className="col-md-6">
                  <div className="p-4 border rounded-4 h-100 bg-light position-relative text-center d-flex flex-column justify-content-center align-items-center" style={{ borderStyle: "dashed !important" }}>
                    <i className="bi bi-cloud-upload fs-1 text-primary mb-3"></i>
                    <h5 className="fw-bold">Upload Resume</h5>
                    <p className="text-muted small mb-3">PDF or DOCX</p>
                    <input
                      type="file"
                      className="position-absolute w-100 h-100 opacity-0"
                      style={{ cursor: "pointer" }}
                      onChange={handleFileUpload}
                      accept=".pdf,.docx,.doc"
                    />
                    {resume && (
                      <div className="mt-2 text-success fw-medium">
                        <i className="bi bi-check-circle-fill me-2"></i>
                        {resume.name}
                      </div>
                    )}
                  </div>
                </div>
                <div className="col-md-6">
                  <textarea
                    className="form-control h-100 rounded-4 p-4 border-0 bg-light"
                    placeholder="Paste the Job Description here..."
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    style={{ resize: "none", minHeight: "200px" }}
                  ></textarea>
                </div>
              </div>

              <div className="mt-5 text-center">
                <button
                  className="btn btn-dark rounded-pill px-5 py-3 fs-5 fw-bold shadow-lg"
                  onClick={analyzeResume}
                  disabled={!resume || !jobDescription || analyzing}
                  style={{ transition: "all 0.3s ease" }}
                >
                  {analyzing ? (
                    <span>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Analyzing...
                    </span>
                  ) : (
                    "Analyze Resume"
                  )}
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="d-flex flex-column gap-4"
            >
              {/* Score Hero */}
              <div className="bg-white rounded-5 shadow-sm p-5 text-center position-relative overflow-hidden">
                <div className="position-absolute top-0 start-0 w-100 h-100 bg-gradient-primary opacity-10"></div>
                <h5 className="text-uppercase text-secondary fw-bold letter-spacing-2 mb-4">ATS Compatibility Score</h5>
                <div className="d-inline-flex align-items-center justify-content-center rounded-circle border border-5 border-primary p-5 mb-4" style={{ width: "200px", height: "200px" }}>
                  <span className="display-1 fw-bold text-primary">{result.score}</span>
                </div>
                <p className="fs-5 text-secondary">Your resume is <strong className="text-dark">High Match</strong> for this role.</p>
              </div>

              {/* Keywords Row */}
              <div className="row g-4">
                <div className="col-md-6">
                  <div className="bg-white rounded-5 shadow-sm p-4 h-100">
                    <h5 className="fw-bold mb-4 text-success"><i className="bi bi-check-circle-fill me-2"></i>Matched Keywords</h5>
                    <div className="d-flex flex-wrap gap-2">
                      {result.matchedKeywords.map((kw, i) => (
                        <span key={i} className="badge bg-success-subtle text-success rounded-pill px-3 py-2 fs-6 fw-normal">{kw}</span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="bg-white rounded-5 shadow-sm p-4 h-100">
                    <h5 className="fw-bold mb-4 text-danger"><i className="bi bi-x-circle-fill me-2"></i>Missing Keywords</h5>
                    <div className="d-flex flex-wrap gap-2">
                      {result.missingKeywords.map((kw, i) => (
                        <span key={i} className="badge bg-danger-subtle text-danger rounded-pill px-3 py-2 fs-6 fw-normal">{kw}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Analysis Details */}
              <div className="bg-white rounded-5 shadow-sm p-5">
                <h4 className="fw-bold mb-4">Detailed Analysis</h4>
                
                <div className="mb-4">
                  <h6 className="fw-bold text-uppercase text-secondary small mb-3">Strengths</h6>
                  <ul className="list-unstyled">
                    {result.strengths.map((item, i) => (
                      <li key={i} className="d-flex align-items-start mb-2">
                        <i className="bi bi-check2 text-success me-2 mt-1"></i>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-4">
                  <h6 className="fw-bold text-uppercase text-secondary small mb-3">Weaknesses</h6>
                  <ul className="list-unstyled">
                    {result.weaknesses.map((item, i) => (
                      <li key={i} className="d-flex align-items-start mb-2">
                        <i className="bi bi-exclamation-circle text-warning me-2 mt-1"></i>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 bg-light rounded-4 border-start border-4 border-primary">
                  <h6 className="fw-bold text-primary mb-2"><i className="bi bi-lightbulb-fill me-2"></i>Strategic Advice</h6>
                  <p className="mb-0 text-secondary">{result.advice}</p>
                </div>
              </div>

              <div className="text-center mt-4">
                <button 
                  className="btn btn-outline-secondary rounded-pill px-4 py-2"
                  onClick={() => { setResult(null); setResume(null); setJobDescription(""); }}
                >
                  Analyze Another
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ATSAnalyzer;
