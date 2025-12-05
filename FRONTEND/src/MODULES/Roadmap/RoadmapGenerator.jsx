import { useState } from "react";
import axios from "../../API/axiosConfig.js";
import styles from "./RoadmapGenerator.module.css";
import { toast } from "react-hot-toast";

const RoadmapGenerator = () => {
  const [topic, setTopic] = useState("");
  const [roadmap, setRoadmap] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!topic.trim()) {
      toast.error("Please enter a topic");
      return;
    }

    setLoading(true);
    setRoadmap(null);

    try {
      const res = await axios.post("/roadmap/generate", { topic });
      if (res.data && res.data.data) {
        setRoadmap(res.data.data);
        toast.success("Roadmap generated successfully!");
      }
    } catch (error) {
      console.error("Error generating roadmap:", error);
      toast.error("Failed to generate roadmap. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>AI Learning Roadmap</h1>
        <p>
          Enter any skill or topic, and our AI will generate a personalized,
          step-by-step learning path just for you.
        </p>
      </div>

      <div className={styles.inputSection}>
        <input
          type="text"
          className={styles.input}
          placeholder="e.g., React JS, Data Science, Python..."
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleGenerate()}
        />
        <button
          className={styles.generateButton}
          onClick={handleGenerate}
          disabled={loading}
        >
          {loading ? "Generating..." : "Generate Roadmap"}
        </button>
      </div>

      {roadmap && (
        <div className={styles.roadmapContainer}>
          {roadmap.steps.map((step, index) => (
            <div
              key={index}
              className={styles.step}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className={styles.stepNumber}>{step.stepNumber}</div>
              <div className={styles.stepContent}>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepDescription}>{step.description}</p>

                {step.topics && (
                  <div className={styles.topics}>
                    {step.topics.map((t, i) => (
                      <span key={i} className={styles.topicTag}>
                        {t}
                      </span>
                    ))}
                  </div>
                )}

                {step.resources && (
                  <div className={styles.resources}>
                    <h4>Recommended Resources:</h4>
                    <ul>
                      {step.resources.map((r, i) => (
                        <li key={i}>{r}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RoadmapGenerator;
