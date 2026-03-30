import { FiActivity } from "react-icons/fi";
import style from "../PROFILE.module.css";

const ActivitySection = ({ courses }) => {
  return (
    <div className={style.activitySection}>
      <h2 className={style.sectionTitle}>Recent Activity</h2>
      <div className={style.activityGrid}>
        {courses && courses.length > 0 ? (
          courses.map((activity, index) => (
            <div key={index} className={style.activityCard}>
              <div className={style.activityHeader}>
                <h3>{activity.name}</h3>
                <span className={style.activityDate}>
                  {activity.lastAccessed
                    ? new Date(activity.lastAccessed).toLocaleDateString()
                    : "N/A"}
                </span>
              </div>
              <div className={style.progressContainer}>
                <div className={style.progressBarTrack}>
                  <div
                    className={style.progressBar}
                    style={{ width: `${activity.progress}%` }}
                  ></div>
                </div>
                <span className={style.progressText}>
                  {activity.progress}%
                </span>
              </div>
              <div className={style.activityFooter}>
                <span className={style.timeSpent}>
                  <FiActivity className={style.timeIcon} />
                  {activity.timeSpent}
                </span>
                <button className={style.continueButton}>Continue</button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-400">
            No recent activity found. Start a course to see it here!
          </p>
        )}
      </div>
    </div>
  );
};

export default ActivitySection;
