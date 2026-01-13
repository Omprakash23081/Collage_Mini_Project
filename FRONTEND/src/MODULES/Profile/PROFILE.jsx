import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
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
import style from "./PROFILE.module.css";
import { AuthContext } from "../../context/AuthContext.jsx";

function PROFILE() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("activity");
  const [isEditing, setIsEditing] = useState(false);
  const { user, updateUser, changePassword, logout } = useContext(AuthContext);

  // Password Change State
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [loadingPass, setLoadingPass] = useState(false);

  const handleUpdatePassword = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("New passwords do not match!");
      return;
    }
    if (!passwordData.currentPassword || !passwordData.newPassword) {
      alert("Please fill all fields");
      return;
    }

    setLoadingPass(true);
    try {
      await changePassword({
        oldPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      });
      alert("Password updated successfully!");
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Failed to update password");
    } finally {
      setLoadingPass(false);
    }
  };

  // Initialize editData with user data when editing starts
  const [editData, setEditData] = useState({
    name: "",
    email: "",
    bio: "",
    year: "",
    achievements: [],
  });

  const handleEditClick = () => {
    setEditData({
      name: user?.name || "",
      email: user?.email || "",
      bio: user?.bio || "",
      year: user?.year || "",
      achievements: user?.achievements || [],
    });
    setIsEditing(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  // Achievement management hooks
  const handleAddAchievement = () => {
    setEditData((prev) => ({
      ...prev,
      achievements: [
        ...prev.achievements,
        { title: "", description: "", earned: true },
      ],
    }));
  };

  const handleAchievementChange = (index, field, value) => {
    const newAchievements = [...editData.achievements];
    newAchievements[index] = { ...newAchievements[index], [field]: value };
    setEditData((prev) => ({ ...prev, achievements: newAchievements }));
  };

  const handleRemoveAchievement = (index) => {
    const newAchievements = editData.achievements.filter((_, i) => i !== index);
    setEditData((prev) => ({ ...prev, achievements: newAchievements }));
  };

  const handleSaveProfile = async () => {
    try {
      await updateUser(editData);
      // toast.success("Profile updated successfully"); // Assuming toast is available or add import
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update profile", error);
      // toast.error("Failed to update profile");
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  if (!user) return <div className="text-white">Loading profile...</div>;

  return (
    <div className={style.profileContainer}>
      {/* Profile Header */}
      <div className={style.profileHeader}>
        <div className={style.avatarContainer}>
          <img
            src={user?.profileImage || "https://via.placeholder.com/150"}
            alt="Profile"
            className={style.avatar}
          />
          <div className={style.membershipBadge}>{user?.role}</div>
          {user?.isPremium && (
            <div
              style={{
                marginTop: "0.5rem",
                background: "linear-gradient(45deg, #F59E0B, #B45309)",
                color: "white",
                padding: "0.2rem 0.6rem",
                borderRadius: "4px",
                fontSize: "0.7rem",
                fontWeight: "bold",
                display: "flex",
                alignItems: "center",
                gap: "0.3rem",
              }}
            >
              <FiAward size={12} /> PREMIUM
            </div>
          )}
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
                disabled
                className="text-gray-500 cursor-not-allowed"
              />
            </div>
            <div className={style.formGroup}>
              <label>
                <FiCalendar /> Year
              </label>
              <select
                name="year"
                value={editData.year}
                onChange={handleEditChange}
                className={style.inputField}
              >
                <option value="">Select Year</option>
                <option value="year1">Year 1</option>
                <option value="year2">Year 2</option>
                <option value="year3">Year 3</option>
                <option value="year4">Year 4</option>
              </select>
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
                placeholder="Tell us about yourself..."
              />
            </div>

            {/* Achievement Edit Section */}
            <div className={style.formGroup}>
              <label className="flex justify-between items-center">
                <span>
                  <FiAward /> Achievements
                </span>
                <button type="button" onClick={handleAddAchievement}>
                  + Add
                </button>
              </label>
              <div className="space-y-2 mt-2">
                {editData.achievements.map((achievement, index) => (
                  <div
                    key={index}
                    className="flex gap-2 items-center bg-gray-800 p-2 rounded flex-col md:flex-row"
                  >
                    <input
                      type="text"
                      placeholder="Title"
                      value={achievement.title}
                      onChange={(e) =>
                        handleAchievementChange(index, "title", e.target.value)
                      }
                      className="w-full md:w-1/3 bg-gray-700 p-1 rounded text-white"
                    />
                    <input
                      type="text"
                      placeholder="Description"
                      value={achievement.description}
                      onChange={(e) =>
                        handleAchievementChange(
                          index,
                          "description",
                          e.target.value
                        )
                      }
                      className="w-full md:w-1/2 bg-gray-700 p-1 rounded text-white"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveAchievement(index)}
                      className="text-red-500 self-end md:self-center"
                    >
                      <FiX />
                    </button>
                  </div>
                ))}
                {editData.achievements.length === 0 && (
                  <p className="text-gray-500 text-sm">
                    No achievements added.
                  </p>
                )}
              </div>
            </div>

            <div className={style.formButtons}>
              <button className={style.saveBtn} onClick={handleSaveProfile}>
                <FiSave /> Update
              </button>
              <button className={style.cancelBtn} onClick={handleCancelEdit}>
                <FiX /> Cancel
              </button>
            </div>
          </div>
        ) : (
          <div className={style.userInfo}>
            <div className={style.headerActions}>
              <div className={style.headerActions2}>
                <h1 className={style.userName}>{user?.name}</h1>
                <p className={style.userEmail}>{user?.email}</p>
              </div>
              <button className={style.editBtn} onClick={handleEditClick}>
                <FiEdit /> Edit Profile
              </button>
            </div>
            <p className={style.userBio}>{user?.bio || "No bio added yet."}</p>
            <div className={style.userStats}>
              <div className={style.statItem}>
                <FiCalendar className={style.statIcon} />
                <span>
                  Joined:{" "}
                  {user?.createdAt
                    ? new Date(user.createdAt).toLocaleDateString()
                    : "N/A"}
                </span>
              </div>
              <div className={style.statItem}>
                <FiBook className={style.statIcon} />
                <span>{user?.year?.toUpperCase() || "N/A"} Student</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Profile Navigation */}
      <div className={style.profileNav}>
        <button
          className={`${style.navButton} ${
            activeTab === "activity" ? style.active : ""
          }`}
          onClick={() => setActiveTab("activity")}
        >
          <FiActivity className={style.navIcon} /> Activity
        </button>
        <button
          className={`${style.navButton} ${
            activeTab === "courses" ? style.active : ""
          }`}
          onClick={() => setActiveTab("courses")}
        >
          <FiBook className={style.navIcon} /> My Courses
        </button>
        <button
          className={`${style.navButton} ${
            activeTab === "achievements" ? style.active : ""
          }`}
          onClick={() => setActiveTab("achievements")}
        >
          <FiAward className={style.navIcon} /> Achievements
        </button>
        <button
          className={`${style.navButton} ${
            activeTab === "settings" ? style.active : ""
          }`}
          onClick={() => setActiveTab("settings")}
        >
          <FiSettings className={style.navIcon} /> Settings
        </button>
      </div>

      {/* Profile Content */}
      <div className={style.profileContent}>
        {activeTab === "activity" && (
          <div className={style.activitySection}>
            <h2 className={style.sectionTitle}>Recent Activity</h2>
            <div className={style.activityGrid}>
              {user?.courses && user.courses.length > 0 ? (
                user.courses.map((activity, index) => (
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
                  No recent activity found. Edit profile to add.
                </p>
              )}
            </div>
          </div>
        )}

        {activeTab === "achievements" && (
          <div className={style.achievementsSection}>
            <h2 className={style.sectionTitle}>Your Achievements</h2>
            <div className={style.achievementsGrid}>
              {user?.achievements && user.achievements.length > 0 ? (
                user.achievements.map((achievement, index) => (
                  <div
                    key={index}
                    className={`${style.achievementCard} ${style.earned}`}
                  >
                    <div className={style.achievementIcon}>
                      <FiAward />
                    </div>
                    <div className={style.achievementInfo}>
                      <h3>{achievement.title}</h3>
                      <p>{achievement.description}</p>
                    </div>
                    <span className={style.achievementBadge}>Earned</span>
                  </div>
                ))
              ) : (
                <p className="text-gray-400">
                  No achievements added. Edit profile to add.
                </p>
              )}
            </div>
          </div>
        )}

        {activeTab === "settings" && (
          <div className={style.settingsSection}>
            <h2 className={style.sectionTitle}>Account Settings</h2>

            {/* Change Password Card */}
            <div className={style.settingsCard}>
              <h3>
                <FiLock /> Change Password
              </h3>
              <div className={style.formGroup}>
                <label>Current Password</label>
                <input
                  type="password"
                  placeholder="Enter current password"
                  value={passwordData.currentPassword}
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      currentPassword: e.target.value,
                    })
                  }
                />
              </div>
              <div className={style.formGroup}>
                <label>New Password</label>
                <input
                  type="password"
                  placeholder="Enter new password"
                  value={passwordData.newPassword}
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      newPassword: e.target.value,
                    })
                  }
                />
              </div>
              <div className={style.formGroup}>
                <label>Confirm New Password</label>
                <input
                  type="password"
                  placeholder="Confirm new password"
                  value={passwordData.confirmPassword}
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      confirmPassword: e.target.value,
                    })
                  }
                />
              </div>
              <button
                className={style.saveBtn}
                onClick={handleUpdatePassword}
                disabled={loadingPass}
              >
                {loadingPass ? (
                  "Updating..."
                ) : (
                  <>
                    <FiSave /> Update
                  </>
                )}
              </button>
            </div>

            {/* Premium & Session Card */}
            <div className={style.settingsCard} style={{ marginTop: "2rem" }}>
              <h3>
                <FiActivity /> Subscription & Session
              </h3>

              {user?.isPremium && (
                <div
                  style={{
                    padding: "1rem",
                    background: "rgba(245, 158, 11, 0.1)",
                    borderRadius: "8px",
                    border: "1px solid rgba(245, 158, 11, 0.3)",
                    marginBottom: "1.5rem",
                  }}
                >
                  <p style={{ color: "#F59E0B", fontWeight: "bold" }}>
                    You are a Premium Member
                  </p>
                  <p style={{ color: "#A1A1AA", fontSize: "0.9rem" }}>
                    Expires on:{" "}
                    {user?.premiumExpiry
                      ? new Date(user.premiumExpiry).toLocaleDateString()
                      : "Lifetime"}
                  </p>
                </div>
              )}

              {!user?.isPremium && (
                <div
                  style={{
                    padding: "1rem",
                    background: "rgba(39, 39, 42, 0.5)",
                    borderRadius: "8px",
                    marginBottom: "1.5rem",
                  }}
                >
                  <p style={{ color: "#A1A1AA" }}>Free Plan</p>
                  <button
                    onClick={() => navigate("/primum/premium")}
                    style={{
                      marginTop: "0.5rem",
                      color: "#F43F5E",
                      fontSize: "0.9rem",
                    }}
                  >
                    Upgrade to Premium
                  </button>
                </div>
              )}

              <button
                onClick={() => {
                  if (window.confirm("Are you sure you want to logout?")) {
                    logout();
                  }
                }}
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  background: "#EF4444",
                  color: "white",
                  borderRadius: "0.5rem",
                  fontWeight: "bold",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.5rem",
                }}
              >
                <FiLogOut /> Log Out
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default PROFILE;
