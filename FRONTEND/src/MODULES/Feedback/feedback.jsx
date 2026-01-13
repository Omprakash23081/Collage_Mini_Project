import React, { useState, useEffect } from "react";
import style from "./feedback.module.css";
import apiClient from "../../utils/axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { feedbackService } from "../../services/feedbackService";
import toast from "react-hot-toast";

const Feedback = () => {
  const [feedback, setFeedback] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [myFeedbacks, setMyFeedbacks] = useState([]);

  const fetchMyFeedbacks = async () => {
    try {
      const response = await apiClient.get("/feedback/my-feedback");
      setMyFeedbacks(response.data.data);
    } catch (err) {
      console.error("Error fetching my feedbacks:", err);
    }
  };

  useEffect(() => {
    fetchMyFeedbacks();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this feedback?")) return;

    try {
      await feedbackService.deleteFeedback(id);
      setMyFeedbacks((prev) => prev.filter((item) => item._id !== id));
      toast.success("Feedback deleted successfully");
    } catch (err) {
      console.error("Error deleting feedback:", err);
      toast.error("Failed to delete feedback");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    try {
      await apiClient.post("/feedback", { feedback });
      setSubmitted(true);
      setFeedback("");
      fetchMyFeedbacks(); // Refresh list
    } catch (err) {
      console.error("Feedback submission error:", err);
      setError("Failed to submit feedback. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={style.feedbackContainer}>
      <h2 className={style.feedbackTitle}>We value your feedback!</h2>
      {submitted ? (
        <div className={style.feedbackSuccess}>
          <h3>Thank you!</h3>
          <p>Your feedback helps us improve.</p> 
          <button 
            className={style.submitAnotherBtn}
            onClick={() => setSubmitted(false)}
          >
            Send another
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className={style.feedbackForm}>
          {error && <div className={style.feedbackError}>{error}</div>}
          <textarea
            className={style.feedbackTextarea}
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Share your thoughts, suggestions, or report issues..."
            required
            rows={4}
            disabled={loading}
          />
          <button 
            type="submit" 
            className={style.feedbackButton}
            disabled={loading}
          >
            {loading ? "Sending..." : "Submit Feedback"}
          </button>
        </form>
      )}

      {/* History Section */}
      {myFeedbacks.length > 0 && (
        <div className={style.historyContainer}>
          <h3 className={style.historyTitle}>Your Feedback History</h3>
          <div className={style.historyList}>
            {myFeedbacks.map((item) => (
              <div key={item._id} className={style.historyItem}>
                <p className={style.historyText}>{item.feedback}</p>
                <div className={style.historyHeader} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                   <span className={style.historyDate}>
                    {new Date(item.createdAt).toLocaleDateString()}
                  </span>
                  <button 
                    onClick={() => handleDelete(item._id)}
                    className={style.deleteBtn}
                    style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '5px' }}
                    title="Delete Feedback"
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
                
                {item.response && (
                  <div className={style.adminResponse}>
                    <div className={style.responseHeader}>
                       <span>Admin Response</span>
                       <span className={style.responseDate}>
                         {new Date(item.respondedAt).toLocaleDateString()}
                       </span>
                    </div>
                    <p className={style.responseText}>{item.response}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Feedback;
