import { AdminLog } from "../models/adminLog.model.js";

export const logAdminAction = async ({ adminId, action, targetCollection, targetId, details, req }) => {
  try {
    await AdminLog.create({
      adminId,
      action,
      targetCollection,
      targetId,
      details,
      ipAddress: req?.ip || req?.connection?.remoteAddress,
      userAgent: req?.headers?.['user-agent']
    });
  } catch (error) {
    console.error("Failed to create admin log:", error);
    // Non-blocking: don't throw error, just log it
  }
};
