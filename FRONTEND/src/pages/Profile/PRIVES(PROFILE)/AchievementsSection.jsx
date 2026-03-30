import { FiAward, FiX } from "react-icons/fi";
import style from "../PROFILE.module.css";

const AchievementsSection = ({ achievements, isEditing, editData, handleAchievementChange, handleRemoveAchievement, handleAddAchievement }) => {
  
  // Render Edit Mode
  if (isEditing) {
    return (
       <div className={style.formGroup}>
          <label className="flex justify-between items-center text-zinc-300 mb-4">
            <span className="flex items-center gap-2">
              <FiAward /> Manage Achievements
            </span>
            <button type="button" onClick={handleAddAchievement} className="px-3 py-1 bg-green-600 rounded-full text-xs hover:bg-green-700 transition">
              + Add New
            </button>
          </label>
          <div className="space-y-3">
            {editData.achievements.map((achievement, index) => (
              <div key={index} className="flex gap-2 items-center bg-white/5 p-3 rounded-xl flex-col md:flex-row border border-white/10">
                <input
                  type="text"
                  placeholder="Title"
                  value={achievement.title}
                  onChange={(e) => handleAchievementChange(index, "title", e.target.value)}
                  className="w-full md:w-1/3 bg-black/20 p-2 rounded text-white border border-white/5 focus:border-blue-500 outline-none"
                />
                <input
                  type="text"
                  placeholder="Description"
                  value={achievement.description}
                  onChange={(e) => handleAchievementChange(index, "description", e.target.value)}
                  className="w-full md:w-1/2 bg-black/20 p-2 rounded text-white border border-white/5 focus:border-blue-500 outline-none"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveAchievement(index)}
                  className="p-2 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition"
                >
                  <FiX />
                </button>
              </div>
            ))}
            {editData.achievements.length === 0 && (
              <p className="text-zinc-500 text-sm text-center py-4">No achievements added yet.</p>
            )}
          </div>
        </div>
    );
  }

  // Render View Mode
  return (
    <div className={style.achievementsSection}>
      <h2 className={style.sectionTitle}>Your Achievements</h2>
      <div className={style.achievementsGrid}>
        {achievements && achievements.length > 0 ? (
          achievements.map((achievement, index) => (
            <div key={index} className={`${style.achievementCard} ${style.earned}`}>
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
          <div className="col-span-full text-center py-10 bg-white/5 rounded-2xl border border-dashed border-white/10">
            <FiAward className="mx-auto text-4xl text-zinc-600 mb-2"/>
            <p className="text-zinc-400">No achievements yet. Keep learning to earn badges!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AchievementsSection;
