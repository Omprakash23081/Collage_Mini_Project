import { Plan } from "../models/plan.model.js";
import ApiResponse from "../utils/ApiResponse.js";

import { validatePlan } from "../validation/plan.validation.js";

const getPlans = async (req, res) => {
  try {
    const plans = await Plan.find({}).sort({ prices: 1 });
    return res
      .status(200)
      .json(new ApiResponse(200, plans, "Plans fetched successfully"));
  } catch (error) {
    return res
      .status(500)
      .json(new ApiResponse(500, null, "Failed to fetch plans"));
  }
};

const createPlan = async (req, res) => {
  try {
    await validatePlan.validateAsync(req.body);
    const plan = await Plan.create(req.body);
    return res
      .status(201)
      .json(new ApiResponse(201, plan, "Plan created successfully"));
  } catch (error) {
    // Check if Joi error
    if (error.isJoi) {
      return res
        .status(400)
        .json(
          new ApiResponse(
            400,
            error.details[0].message,
            error.details[0].message,
          ),
        );
    }
    return res
      .status(500)
      .json(
        new ApiResponse(500, null, error.message || "Failed to create plan"),
      );
  }
};

const updatePlan = async (req, res) => {
  try {
    const { id } = req.params;

    const plan = await Plan.findByIdAndUpdate(id, req.body, { new: true });

    if (!plan) {
      return res.status(404).json(new ApiResponse(404, null, "Plan not found"));
    }

    return res
      .status(200)
      .json(new ApiResponse(200, plan, "Plan updated successfully"));
  } catch (error) {
    return res
      .status(500)
      .json(new ApiResponse(500, null, "Failed to update plan"));
  }
};

const deletePlan = async (req, res) => {
  try {
    const { id } = req.params;
    await Plan.findByIdAndDelete(id);
    return res
      .status(200)
      .json(new ApiResponse(200, null, "Plan deleted successfully"));
  } catch (error) {
    return res
      .status(500)
      .json(new ApiResponse(500, null, "Failed to delete plan"));
  }
};

export { getPlans, createPlan, updatePlan, deletePlan };
