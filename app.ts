import express from "express";
import dotenv from "dotenv";

dotenv.config();

export const app = express();

app.use(express.json());

const apiRouter = express.Router();

async function callLLM(prompt: string): Promise<string> {
  const apiKey = process.env.GROK_API_KEY;
  if (!apiKey) {
    throw new Error("GROK_API_KEY is not set. Please set it in the environment variables.");
  }

  // Using Groq API as requested with llama-3.3-70b-versatile
  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content: "You are an expert technical recruiter and interviewer. You generate high quality interview questions and scripts. Provide your response in clear, well-formatted plain text or markdown. Do NOT wrap your response in quotes. Do NOT output JSON."
        },
        {
          role: "user",
          content: prompt
        }
      ]
    })
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`LLM API Error: ${response.status} ${response.statusText} - ${errorBody}`);
  }

  const data = await response.json();
  let content = data.choices[0].message.content;
  
  // Sometimes the LLM might still return a JSON stringified text, so we unwrap it
  try {
    if (content.trim().startsWith('"') && content.trim().endsWith('"')) {
      content = JSON.parse(content);
    }
  } catch (e) {
    // Ignore parsing errors
  }

  // Replace literal '\n' strings with actual newlines just in case
  if (typeof content === 'string') {
    content = content.replace(/\\n/g, '\n');
  }
  
  return content;
}

// API Routes
apiRouter.post("/generate-oncall-questions", async (req, res) => {
  try {
    const prompt = `Generate structured screening questions based on the following job description.
    
Input:
${JSON.stringify(req.body, null, 2)}

Please provide the output in a clear, readable text format with sections for each Skill/Rubric, and list the questions and keywords under each.`;

    const response = await callLLM(prompt);
    res.json({ text: response });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

apiRouter.post("/improve-phone-screening", async (req, res) => {
  try {
    const prompt = `Improve the following phone screening questions to be more effective, clear, and comprehensive.

Input:
${req.body.text || JSON.stringify(req.body, null, 2)}

Please provide the improved questions in a clear, readable text format, organized by Rubric.`;

    const response = await callLLM(prompt);
    res.json({ text: response });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

apiRouter.post("/generate-hygiene-check", async (req, res) => {
  try {
    const prompt = `Generate fitment and soft skill questions for the following role.

Input:
${JSON.stringify(req.body, null, 2)}

Please provide the output in a clear, readable text format, separated into "Fitment Check Questions" and "Soft Skills Check Questions", with keywords for each.`;

    const response = await callLLM(prompt);
    res.json({ text: response });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

apiRouter.post("/generate-brand-pitch", async (req, res) => {
  try {
    const { companyName, jobTitle, rolesAndResponsibilities, techStack, duration, tone } = req.body;
    
    const prompt = `Generate a recruiter pitch script for the following role.
    
Company Name: ${companyName}
Job Title: ${jobTitle}
Roles and Responsibilities: ${rolesAndResponsibilities}
Tech Stack: ${techStack}
Desired Duration: ${duration}
Desired Tone: ${tone}

Please provide the pitch script in a clear, readable text format, structured with an Intro, Details, Hook, and Outro.`;

    const response = await callLLM(prompt);
    res.json({ text: response });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

app.use("/api", apiRouter);
app.use("/.netlify/functions/api", apiRouter);
