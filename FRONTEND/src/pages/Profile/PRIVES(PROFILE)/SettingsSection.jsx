import { FiLock, FiSave, FiActivity, FiLogOut } from "react-icons/fi";
import style from "../PROFILE.module.css";

const SettingsSection = ({ 
    passwordData, 
    setPasswordData, 
    handleUpdatePassword, 
    loadingPass, 
    user, 
    logout 
}) => {
  return (
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
              setPasswordData({ ...passwordData, currentPassword: e.target.value })
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
              setPasswordData({ ...passwordData, newPassword: e.target.value })
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
              setPasswordData({ ...passwordData, confirmPassword: e.target.value })
            }
          />
        </div>
        <button
          className={style.saveBtn}
          onClick={handleUpdatePassword}
          disabled={loadingPass}
        >
          {loadingPass ? "Updating..." : <><FiSave /> Update Password</>}
        </button>
      </div>

      {/* Premium & Session Card */}
      <div className={style.settingsCard} style={{ marginTop: "2rem" }}>
        <h3>
          <FiActivity /> Subscription & Session
        </h3>

        {user?.isPremium && (
          <div className={style.premiumStatusBox}>
            <p className="text-amber-500 font-bold">You are a Premium Member</p>
            <p className="text-zinc-400 text-sm">
              Expires on:{" "}
              {user?.premiumExpiry
                ? new Date(user.premiumExpiry).toLocaleDateString()
                : "Lifetime"}
            </p>
          </div>
        )}

        {!user?.isPremium && (
          <div className={style.freeStatusBox}>
            <p className="text-zinc-400">Free Plan</p>
            <button className="mt-2 text-rose-500 text-sm hover:underline">
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
          className={style.logoutBtn}
        >
          <FiLogOut /> Log Out
        </button>
      </div>
    </div>
  );
};

export default SettingsSection;
