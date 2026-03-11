import express from "express";
import dotenv from "dotenv";

dotenv.config();

export const app = express();
const PORT = 3000;

app.use(express.json());

const apiRouter = express.Router();

// API Routes
apiRouter.post("/generate-oncall-questions", async (req, res) => {
  try {
    const prompt = `Generate structured screening questions based on the following job description.
    
Input:
${JSON.stringify(req.body, null, 2)}

Output Format:
{
  "Questions": [
    {
      "Skill/Rubric Name": "string",
      "isRubric": "True/False",
      "Questions": [
        {
          "Q": "string",
          "Keywords": ["string"]
        }
      ]
    }
  ]
}

Ensure the output is valid JSON.`;

    const response = await callLLM(prompt);
    res.json(JSON.parse(response));
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

apiRouter.post("/improve-phone-screening", async (req, res) => {
  try {
    const prompt = `Improve the following phone screening questions to be more effective, clear, and comprehensive.

Input:
${JSON.stringify(req.body, null, 2)}

Output Format:
{
  "Questions": [
    {
      "Rubric": "string",
      "isRubric": "True/False",
      "Questions": [
        {
          "Q": "string",
          "Keywords": ["string"]
        }
      ]
    }
  ]
}

Ensure the output is valid JSON.`;

    const response = await callLLM(prompt);
    res.json(JSON.parse(response));
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

Output Format:
{
  "fitment_check_questions": [
    {
      "question": "string",
      "keywords": ["string"]
    }
  ],
  "soft_skills_check_questions": [
    {
      "question": "string",
      "keywords": ["string"]
    }
  ]
}

Ensure the output is valid JSON.`;

    const response = await callLLM(prompt);
    res.json(JSON.parse(response));
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

Output Format:
{
  "Intro": "string",
  "Details": "string",
  "Hook": "string",
  "Outro": "string"
}

Ensure the output is valid JSON.`;

    const response = await callLLM(prompt);
    res.json(JSON.parse(response));
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

app.use("/api", apiRouter);
app.use("/.netlify/functions/api", apiRouter);

async function startServer() {
  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static("dist"));
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

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
          content: "You are an expert technical recruiter and interviewer. You generate high quality interview questions and scripts. Always output valid JSON without markdown formatting."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      response_format: { type: "json_object" }
    })
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`LLM API Error: ${response.status} ${response.statusText} - ${errorBody}`);
  }

  const data = await response.json();
  return data.choices[0].message.content;
}

if (!process.env.AWS_LAMBDA_FUNCTION_NAME && !process.env.VERCEL) {
  startServer();
}
