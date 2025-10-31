import OpenAI from "openai";
import dotenv from "dotenv";
import Course from "../models/courseModel.js";
dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const searchWithAi = async (req, res) => {
  try {
    const { input } = req.body;

    if (!input) {
      return res.status(400).json({ message: "Search query is required" });
    }

    const prompt = `
You are an intelligent assistant for an LMS platform. 
A user will type any query about what they want to learn. 
Your task is to understand the intent and return one **most relevant keyword** 
from the following list of course categories and levels:

- App Development  
- AI/ML  
- AI Tools  
- Data Science  
- Data Analytics  
- Ethical Hacking  
- UI UX Designing  
- Web Development  
- Others  
- Beginner  
- Intermediate  
- Advanced  

Only reply with one single keyword from the list above that best matches the query. 
Do not explain anything. No extra text.

Query: ${input}
`;

    // Generate keyword using OpenAI
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini", // fast, cost-effective, latest model
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: prompt },
      ],
      temperature: 0, // deterministic output
    });

    const keyword = response.choices[0].message.content.trim();

    // First: search with the user input
    let courses = await Course.find({
      isPublished: true,
      $or: [
        { title: { $regex: input, $options: "i" } },
        { subTitle: { $regex: input, $options: "i" } },
        { description: { $regex: input, $options: "i" } },
        { category: { $regex: input, $options: "i" } },
        { level: { $regex: input, $options: "i" } },
      ],
    });

    // If no match found → search using AI keyword
    if (courses.length === 0) {
      courses = await Course.find({
        isPublished: true,
        $or: [
          { title: { $regex: keyword, $options: "i" } },
          { subTitle: { $regex: keyword, $options: "i" } },
          { description: { $regex: keyword, $options: "i" } },
          { category: { $regex: keyword, $options: "i" } },
          { level: { $regex: keyword, $options: "i" } },
        ],
      });
    }

    return res.status(200).json(courses);
  } catch (error) {
    console.error("AI search error:", error);
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
};