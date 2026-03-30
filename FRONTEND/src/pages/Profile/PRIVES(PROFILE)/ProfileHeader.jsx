import { FiUser, FiMail, FiCalendar, FiBook, FiEdit, FiAward } from "react-icons/fi";
import style from "../PROFILE.module.css";

const ProfileHeader = ({ user, isEditing, editData, handleEditChange, handleEditClick, handleSaveProfile, handleCancelEdit }) => {
  return (
    <div className={style.profileHeader}>
        <div className={style.avatarContainer}>
          <img
            src={user?.profileImage || "https://via.placeholder.com/150"}
            alt="Profile"
            className={style.avatar}
          />
          <div className={style.membershipBadge}>{user?.role}</div>
          {user?.isPremium && (
            <div className={style.premiumBadge}>
              <FiAward size={12} /> PREMIUM
            </div>
          )}
        </div>

        {isEditing ? (
          <div className={style.editForm}>
            <div className={style.formGroup}>
              <label><FiUser /> Name</label>
              <input type="text" name="name" value={editData.name} onChange={handleEditChange} />
            </div>
            <div className={style.formGroup}>
              <label><FiMail /> Email</label>
              <input type="email" name="email" value={editData.email} disabled className="text-gray-500 cursor-not-allowed" />
            </div>
            <div className={style.formGroup}>
              <label><FiCalendar /> Year</label>
              <select name="year" value={editData.year} onChange={handleEditChange} className={style.inputField}>
                <option value="">Select Year</option>
                <option value="year1">Year 1</option>
                <option value="year2">Year 2</option>
                <option value="year3">Year 3</option>
                <option value="year4">Year 4</option>
              </select>
            </div>
            <div className={style.formGroup}>
              <label><FiUser /> Bio</label>
              <textarea name="bio" value={editData.bio} onChange={handleEditChange} rows="3" placeholder="Tell us about yourself..." />
            </div>

            <div className={style.formButtons}>
              <button className={style.saveBtn} onClick={handleSaveProfile}>Update</button>
              <button className={style.cancelBtn} onClick={handleCancelEdit}>Cancel</button>
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
                <span>Joined: {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : "N/A"}</span>
              </div>
              <div className={style.statItem}>
                <FiBook className={style.statIcon} />
                <span>{user?.year?.toUpperCase() || "N/A"} Student</span>
              </div>
            </div>
          </div>
        )}
      </div>
  );
};

export default ProfileHeader;
