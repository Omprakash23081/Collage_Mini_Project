import { GoogleGenAI } from "@google/genai";

// MOCK FALLBACK
const generateMockRoadmap = (topic) => ({
  title: `Roadmap for ${topic} (Mock Generated)`,
  steps: [
    {
      stepNumber: 1,
      title: "Basics & Fundamentals",
      description: `Start with the core concepts of ${topic}.`,
      topics: ["Introduction", "Setup", "Core Syntax"],
      resources: ["Official Docs", "FreeCodeCamp"],
    },
    {
      stepNumber: 2,
      title: "Intermediate Concepts",
      description: "Learn more detailed patterns and techniques.",
      topics: ["Patterns", "Tooling", "State Management"],
      resources: ["Udemy", "Blogs"],
    },
    {
      stepNumber: 3,
      title: "Advanced Mastery",
      description: "Master internals and build real-world projects.",
      topics: ["Architecture", "Performance", "Scalability"],
      resources: ["Research Papers", "Expert Talks"],
    },
  ],
});

// ====== CONTROLLER FUNCTION (THIS IS WHAT EXPRESS CALLS) ======
export const generateRoadmap = async (req, res) => {
  const { topic } = req.body; // <-- YES, topic comes from BODY
  console.log("comming for data ");

  if (!topic) {
    return res.status(400).json({ message: "Topic is required" });
  }

  const apiKey = process.env.GEMINI_API_KEY;

  try {
    if (apiKey) {
      try {
        const genAI = new GoogleGenAI({ apiKey });

        const prompt = `
Generate a learning roadmap for "${topic}".
Return STRICT JSON:

{
  "title": "Roadmap for ${topic}",
  "steps": [
    {
      "stepNumber": 1,
      "title": "Step Title",
      "description": "Detailed explanation",
      "topics": [],
      "resources": []
    }
  ]
}
`;

        // NEW SDK SYNTAX
        const result = await genAI.models.generateContent({
          model: "gemini-2.0-flash",
          contents: [
            {
              role: "user",
              parts: [{ text: prompt }],
            },
          ],
        });

        const text =
          result.text ||
          result.candidates?.[0]?.content?.parts?.[0]?.text ||
          "";

        const clean = text.replace(/```json|```/g, "").trim();
        const json = JSON.parse(clean);

        return res.status(200).json({ data: json });
      } catch (err) {
        console.log("⚠️ Gemini failed:", err.message);
        console.log("➡ Using fallback mock...");
      }
    }

    // FALLBACK ALWAYS WORKS
    return res.status(200).json({
      data: generateMockRoadmap(topic),
      message: "Generated using fallback data",
    });
  } catch (err) {
    console.log("❌ Controller error:", err.message);
    return res.status(200).json({
      data: generateMockRoadmap(topic),
      message: "Fallback due to internal error",
    });
  }
};
