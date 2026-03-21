import { StudyMaterial } from "../models/studyMaterial.model.js";
import { PYQ } from "../models/pyq.model.js";
import ApiResponse from "../utils/ApiResponse.js";

export const searchContent = async (req, res) => {
  const { q } = req.query;

  if (!q) {
    return res.status(200).json(new ApiResponse(200, [], "Empty query"));
  }

  try {
    const regex = new RegExp(q, "i"); // Case-insensitive regex

    // Search Notes
    const notesPromise = StudyMaterial.find({
      $or: [
        { title: regex },
        { subject: regex },
        { tags: regex }
      ],
      status: "published"
    })
    .select("title subject isPremium views fileUrl thumbnail createdAt type")
    .limit(10);

    // Search PYQs
    const pyqsPromise = PYQ.find({
      $or: [
        { subject: regex },
        { year: regex },
        { examination: regex }
      ],
      status: "published"
    })
    .select("subject year examination isPremium views fileUrl thumbnail createdAt type")
    .limit(10);

    const [notes, pyqs] = await Promise.all([notesPromise, pyqsPromise]);

    // Combine and Sort
    // Strategy: Premium first, then relevance (simple concatenation here, but could be more complex), then views
    const combined = [
        ...notes.map(n => ({ ...n.toObject(), type: 'date' })), // schema has type? StudyMaterial doesn't have type field usually, adding one helper
        ...pyqs.map(p => ({ ...p.toObject(), type: 'pyq' }))
    ];

    // Sorting: Published Premium content higher? Or just relevance?
    // Plan says: "Ranking by Relevance & Premium status"
    // Let's sort by isPremium (true > false), then views (desc)
    combined.sort((a, b) => {
        if (a.isPremium === b.isPremium) {
            return (b.views || 0) - (a.views || 0);
        }
        return b.isPremium ? 1 : -1;
    });

    return res
      .status(200)
      .json(new ApiResponse(200, combined, "Search results fetched successfully"));
  } catch (error) {
    console.error("Search Error:", error);
    return res.status(500).json(new ApiResponse(500, null, "Internal server error during search"));
  }
};
