function SubjectArea() {
  return (
    <>
      <div className="subjectcontainer">
        <h1>Subject Areas</h1>
        <div className="subjectGrid">
          <div className="subjectcard">
            <svg
              className="subjecticon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            <span className="card-title">Cybersecurity</span>
          </div>

          <div className="subjectcard">
            <svg
              className="subjecticon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M9 2H5a2 2 0 0 0-2 2v4m6-6h4m4 0h4a2 2 0 0 1 2 2v4m-6-6V2M3 9v4m0 4v4a2 2 0 0 0 2 2h4m-6-6h6m4 0h6m-6 0v6m4-6v6" />
            </svg>
            <span className="card-title">Networking</span>
          </div>

          <div className="subjectcard">
            <svg
              className="subjecticon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M12 8V4m0 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8z" />
              <path d="M12 16v4" />
              <path d="M12 20h8" />
              <path d="M4 20h8" />
            </svg>
            <span className="card-title">AI & Data Science</span>
          </div>

          <div className="subjectcard">
            <svg
              className="subjecticon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M16 18L22 12L16 6" />
              <path d="M8 6L2 12L8 18" />
            </svg>
            <span className="card-title">Programming</span>
          </div>

          <div className="subjectcard">
            <svg
              className="subjecticon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <rect x="2" y="3" width="20" height="14" rx="2" />
              <path d="M8 21h8" />
              <path d="M12 17v4" />
            </svg>
            <span className="card-title">Information Technology</span>
          </div>

          <div className="subjectcard">
            <svg
              className="subjecticon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <path d="M14 2v6h6" />
              <path d="M16 13H8" />
              <path d="M16 17H8" />
              <path d="M10 9H8" />
            </svg>
            <span className="card-title">Digital Literacy</span>
          </div>

          <div className="subjectcard">
            <svg
              className="subjecticon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            <span className="card-title">Professional Skills</span>
          </div>

          <div className="subjectcard">
            <svg
              className="subjecticon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
            <span className="card-title">Sustainability</span>
          </div>

          <div className="subjectcard">
            <svg
              className="subjecticon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <rect x="2" y="2" width="20" height="8" rx="2" />
              <rect x="2" y="14" width="20" height="8" rx="2" />
              <path d="M6 6h.01" />
              <path d="M6 18h.01" />
            </svg>
            <span className="card-title">Cisco Packet Tracer</span>
          </div>
        </div>

        <button className="explore-button">Explore Full Catalog</button>
      </div>
    </>
  );
}
export default SubjectArea;
