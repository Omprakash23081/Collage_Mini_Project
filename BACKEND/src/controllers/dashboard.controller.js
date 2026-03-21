import User from "../models/user.model.js";
import { StudyMaterial } from "../models/studyMaterial.model.js";
import { PYQ } from "../models/pyq.model.js";
import { AdminLog } from "../models/adminLog.model.js";
import ApiResponse from "../utils/ApiResponse.js";

export const getDashboardStats = async (req, res) => {
  try {
    const today = new Date();
    const last24Hours = new Date(today.getTime() - 24 * 60 * 60 * 1000);

    const [
      totalUsers,
      activeUsers,
      totalNotes,
      draftNotes,
      totalPYQs,
      recentLogs
    ] = await Promise.all([
      User.countDocuments({}),
      User.countDocuments({ lastLogin: { $gte: last24Hours } }),
      StudyMaterial.countDocuments({}),
      StudyMaterial.countDocuments({ status: "draft" }),
      PYQ.countDocuments({}),
      AdminLog.find({})
        .sort({ createdAt: -1 })
        .limit(5)
        .populate("adminId", "name email")
    ]);

    // Calculate content gaps (mock logic for now, or aggregation)
    // E.g., find subjects with 0 notes - requires aggregation, keeping it simple for now

    const stats = {
      users: {
        total: totalUsers,
        active24h: activeUsers,
      },
      content: {
        notes: totalNotes,
        notesDrafts: draftNotes,
        pyqs: totalPYQs,
      },
      recentLogs
    };

    return res
      .status(200)
      .json(new ApiResponse(200, stats, "Dashboard stats fetched successfully"));
  } catch (error) {
    console.error("Dashboard Stats Error:", error);
    return res.status(500).json(new ApiResponse(500, null, "Failed to fetch stats"));
  }
};
