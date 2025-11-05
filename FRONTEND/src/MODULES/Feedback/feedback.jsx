import React, { useState } from "react";
import style from "./feedback.module.css";

const Feedback = () => {
  const [feedback, setFeedback] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can send feedback to your backend or API
    setSubmitted(true);
    setFeedback("");
  };

  return (
    <div className={style.feedbackContainer}>
      <h2 className={style.feedbackTitle}>We value your feedback!</h2>
      {submitted ? (
        <div className={style.feedbackSuccess}>
          Thank you for your feedback!
        </div>
      ) : (
        <form onSubmit={handleSubmit} className={style.feedbackForm}>
          <textarea
            className={style.feedbackTextarea}
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Share your thoughts..."
            required
            rows={4}
          />
          <button type="submit" className={style.feedbackButton}>
            Submit
          </button>
        </form>
      )}
    </div>
  );
};

export default Feedback;
