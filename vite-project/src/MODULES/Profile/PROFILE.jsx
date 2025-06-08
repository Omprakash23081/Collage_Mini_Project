import { useState } from "react";
import {
  FiUser,
  FiSettings,
  FiLogOut,
  FiAward,
  FiBook,
  FiActivity,
  FiEdit,
  FiSave,
  FiX,
  FiLock,
  FiMail,
  FiCalendar,
} from "react-icons/fi";
import { BsCheckCircleFill, BsGraphUp } from "react-icons/bs";
import style from "./PROFILE.module.css"; // Adjust the path as necessary

function PROFILE() {
  const [activeTab, setActiveTab] = useState("activity");
  const [isEditing, setIsEditing] = useState(false);

  const [userData, setUserData] = useState({
    name: "Omprakash",
    email: "omprakash@example.com",
    joinDate: "January 15, 2023",
    membership: "Premium",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    completedCourses: 12,
    ongoingCourses: 3,
    achievements: 5,
    lastActive: "2 hours ago",
    bio: "Computer Science student passionate about web development and AI.",
  });

  const [editData, setEditData] = useState({ ...userData });

  const [activityData] = useState([
    {
      id: 1,
      course: "Python Programming",
      progress: 85,
      date: "Today",
      timeSpent: "2h 30m",
    },
    {
      id: 2,
      course: "Data Structures",
      progress: 65,
      date: "Yesterday",
      timeSpent: "1h 45m",
    },
    {
      id: 3,
      course: "Machine Learning",
      progress: 42,
      date: "3 days ago",
      timeSpent: "3h 10m",
    },
  ]);

  const [achievements] = useState([
    {
      id: 1,
      title: "Fast Learner",
      description: "Completed 5 courses in one month",
      icon: <FiAward />,
      earned: true,
    },
    {
      id: 2,
      title: "Perfect Score",
      description: "Scored 100% in PYQ test",
      icon: <BsCheckCircleFill />,
      earned: true,
    },
  ]);

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveProfile = () => {
    setUserData(editData);
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditData(userData);
    setIsEditing(false);
  };

  return (
    <div className={style.profileContainer}>
      {/* Profile Header */}
      <div className={style.profileHeader}>
        <div className={style.avatarContainer}>
          <img src={userData.avatar} alt="Profile" className={style.avatar} />
          <div className={style.membershipBadge}>{userData.membership}</div>
        </div>

        {isEditing ? (
          <div className={style.editForm}>
            <div className={style.formGroup}>
              <label>
                <FiUser /> Name
              </label>
              <input
                type="text"
                name="name"
                value={editData.name}
                onChange={handleEditChange}
              />
            </div>
            <div className={style.formGroup}>
              <label>
                <FiMail /> Email
              </label>
              <input
                type="email"
                name="email"
                value={editData.email}
                onChange={handleEditChange}
                disabled
              />
            </div>
            <div className={style.formGroup}>
              <label>
                <FiUser /> Bio
              </label>
              <textarea
                name="bio"
                value={editData.bio}
                onChange={handleEditChange}
                rows="3"
              />
            </div>
            <div className={style.formButtons}>
              <button className={style.saveBtn} onClick={handleSaveProfile}>
                <FiSave /> Save Changes
              </button>
              <button className={style.cancelBtn} onClick={handleCancelEdit}>
                <FiX /> Cancel
              </button>
            </div>
          </div>
        ) : (
          <div className={style.userInfo}>
            <div className={style.headerActions}>
              <h1 className={style.userName}>{userData.name}</h1>
              <button
                className={style.editBtn}
                onClick={() => setIsEditing(true)}
              >
                <FiEdit /> Edit Profile
              </button>
            </div>
            <p className={style.userEmail}>{userData.email}</p>
            <p className={style.userBio}>{userData.bio}</p>
            <div className={style.userStats}>
              <div className={style.statItem}>
                <FiCalendar className={style.statIcon} />
                <span>Joined: {userData.joinDate}</span>
              </div>
              <div className={style.statItem}>
                <FiBook className={style.statIcon} />
                <span>{userData.completedCourses} Courses</span>
              </div>
              <div className={style.statItem}>
                <BsGraphUp className={style.statIcon} />
                <span>{userData.ongoingCourses} Active</span>
              </div>
              <div className={style.statItem}>
                <FiAward className={style.statIcon} />
                <span>{userData.achievements} Achievements</span>
              </div>
            </div>
          </div>
        )}

        <div className={style.lastActive}>
          Last active: {userData.lastActive}
        </div>
      </div>

      {/* Profile Navigation */}
      <div className={style.profileNav}>
        <button
          className={`${style.navButton} ${
            activeTab === "activity" ? style.active : ""
          }`}
          onClick={() => setActiveTab("activity")}
        >
          <FiActivity className={style.navIcon} />
          Activity
        </button>
        <button
          className={`${style.navButton} ${
            activeTab === "courses" ? style.active : ""
          }`}
          onClick={() => setActiveTab("courses")}
        >
          <FiBook className={style.navIcon} />
          My Courses
        </button>
        <button
          className={`${style.navButton} ${
            activeTab === "achievements" ? style.active : ""
          }`}
          onClick={() => setActiveTab("achievements")}
        >
          <FiAward className={style.navIcon} />
          Achievements
        </button>
        <button
          className={`${style.navButton} ${
            activeTab === "settings" ? style.active : ""
          }`}
          onClick={() => setActiveTab("settings")}
        >
          <FiSettings className={style.navIcon} />
          Settings
        </button>
      </div>

      {/* Profile Content */}
      <div className={style.profileContent}>
        {activeTab === "activity" && (
          <div className={style.activitySection}>
            <h2 className={style.sectionTitle}>Recent Activity</h2>
            <div className={style.activityGrid}>
              {activityData.map((activity) => (
                <div key={activity.id} className={style.activityCard}>
                  <div className={style.activityHeader}>
                    <h3>{activity.course}</h3>
                    <span className={style.activityDate}>{activity.date}</span>
                  </div>
                  <div className={style.progressContainer}>
                    <div
                      className={style.progressBar}
                      style={{ width: `${activity.progress}%` }}
                    ></div>
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
              ))}
            </div>
          </div>
        )}

        {activeTab === "achievements" && (
          <div className={style.achievementsSection}>
            <h2 className={style.sectionTitle}>Your Achievements</h2>
            <div className={style.achievementsGrid}>
              {achievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className={`${style.achievementCard} ${
                    achievement.earned ? style.earned : style.locked
                  }`}
                >
                  <div className={style.achievementIcon}>
                    {achievement.icon}
                  </div>
                  <div className={style.achievementInfo}>
                    <h3>{achievement.title}</h3>
                    <p>{achievement.description}</p>
                  </div>
                  {achievement.earned ? (
                    <span className={style.achievementBadge}>Earned</span>
                  ) : (
                    <span className={style.achievementBadge}>Locked</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "settings" && (
          <div className={style.settingsSection}>
            <h2 className={style.sectionTitle}>Account Settings</h2>
            <div className={style.settingsCard}>
              <h3>
                <FiLock /> Change Password
              </h3>
              <div className={style.formGroup}>
                <label>Current Password</label>
                <input type="password" placeholder="Enter current password" />
              </div>
              <div className={style.formGroup}>
                <label>New Password</label>
                <input type="password" placeholder="Enter new password" />
              </div>
              <div className={style.formGroup}>
                <label>Confirm New Password</label>
                <input type="password" placeholder="Confirm new password" />
              </div>
              <button className={style.saveBtn}>
                <FiSave /> Update Password
              </button>
            </div>

            <div className={style.settingsCard}>
              <h3>
                <FiMail /> Email Preferences
              </h3>
              <div className={style.checkboxGroup}>
                <label>
                  <input type="checkbox" defaultChecked />
                  Course updates and announcements
                </label>
              </div>
              <div className={style.checkboxGroup}>
                <label>
                  <input type="checkbox" defaultChecked />
                  Weekly progress reports
                </label>
              </div>
              <button className={style.saveBtn}>
                <FiSave /> Update Preferences
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default PROFILE;
