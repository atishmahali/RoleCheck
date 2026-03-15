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
    const { type, ...inputData } = req.body;
    let prompt = "";
    
    if (type === 'answers') {
      prompt = `Generate structured, highly effective screening questions based on the following job description. These questions are meant for a phone screening conversation, so they should be conversational, easy to understand over the phone, and focused on high-signal topics rather than deep coding exercises.
    
Input:
${JSON.stringify(inputData, null, 2)}

For each question, you MUST provide an "Expected Answer" and a list of "Expected Keywords" (highlighted in **bold**). Ensure the questions are clear, comprehensive, and perfectly calibrated to the seniority and engineering bar. Format the output clearly using Markdown, with sections for each Skill/Rubric.`;
    } else {
      prompt = `Generate structured, highly effective screening questions based on the following job description. These questions are meant for a phone screening conversation, so they should be conversational, easy to understand over the phone, and focused on high-signal topics rather than deep coding exercises.
    
Input:
${JSON.stringify(inputData, null, 2)}

For each question, you MUST provide a list of expected keywords. The expected keywords MUST be placed on the next line immediately following the question. You MUST explicitly start the line with the exact text "Expected Keywords:" followed by the keywords highlighted in **bold**. Do NOT provide an expected answer, only the keywords. Ensure the questions are clear, comprehensive, and perfectly calibrated to the seniority and engineering bar. Format the output clearly using Markdown, with sections for each Skill/Rubric.`;
    }

    const response = await callLLM(prompt);
    res.json({ text: response });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

apiRouter.post("/generate-answers", async (req, res) => {
  try {
    const { title, questions, type } = req.body;
    let prompt = "";
    
    if (type === 'answers') {
      prompt = `You are an expert technical interviewer. I will provide you with a role/skill and a list of screening questions. 
For each question, provide a concise "Expected Answer" and a list of "Expected Keywords" (highlighted in **bold**).

Role/Skill: ${title}
Questions:
${questions.map((q: string, i: number) => `${i + 1}. ${q}`).join('\n')}

Format the output clearly using Markdown, listing each question followed by its Expected Answer and Expected Keywords.`;
    } else {
      prompt = `You are an expert technical interviewer. I will provide you with a role/skill and a list of screening questions. 
For each question, provide a list of expected keywords. The expected keywords MUST be placed on the next line immediately following the question. You MUST explicitly start the line with the exact text "Expected Keywords:" followed by the keywords highlighted in **bold**. Do NOT provide an expected answer, only the keywords.

Role/Skill: ${title}
Questions:
${questions.map((q: string, i: number) => `${i + 1}. ${q}`).join('\n')}

Format the output clearly using Markdown, listing each question followed immediately by its Expected Keywords on the next line.`;
    }

    const response = await callLLM(prompt);
    res.json({ text: response });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

apiRouter.post("/generate-custom-questions", async (req, res) => {
  try {
    const { title, type, experience } = req.body;
    const prompt = `You are an expert technical interviewer. Generate a list of 5-7 highly effective screening questions for a candidate with ${experience} years of experience for the ${title} (${type}) role.
These questions should be conversational, easy to understand over the phone, and focused on high-signal topics suitable for their experience level.
Do NOT provide answers, ONLY the questions. Format the output as a simple Markdown numbered list.`;

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
