import { GoogleGenAI } from "@google/genai";

// Tentukan tipe untuk handler Netlify Function
interface HandlerEvent {
  body: string | null;
  // FIX: Added httpMethod to the HandlerEvent interface to resolve the type error.
  httpMethod: string;
}

interface HandlerContext {
  // bisa ditambahkan properti lain jika perlu
}

interface HandlerResponse {
  statusCode: number;
  body: string;
  headers?: { [key: string]: string };
}

// Netlify Function Handler
export async function handler(event: HandlerEvent, context: HandlerContext): Promise<HandlerResponse> {
  // Hanya izinkan metode POST
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' }),
      headers: { 'Allow': 'POST' }
    };
  }

  const apiKey = process.env.API_KEY;

  if (!apiKey) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "API_KEY is not configured on the server." }),
    };
  }

  try {
    const { pose, lighting, aspectRatio } = JSON.parse(event.body || '{}');

    if (!pose || !lighting || !aspectRatio) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Missing required parameters: pose, lighting, aspectRatio." }),
      };
    }

    const ai = new GoogleGenAI({ apiKey });

    const masterPrompt = `
      You are an expert prompt engineer for AI image generation. 
      Your task is to create a single, cohesive, and highly detailed paragraph that describes a photo of a model.
      Do not use lists, bullet points, or labels like "Pose:", "Lighting:", etc.
      Combine the following elements into a rich, descriptive prompt that is ready to be used in an AI image generator.

      Core Elements:
      - Pose Style: ${pose}
      - Lighting Style: ${lighting}

      Desired Output Characteristics:
      - The final image should have an aspect ratio of --ar ${aspectRatio}.
      - The description should be vivid, invoking a mood and atmosphere.
      - Mention details about the model's expression, potential clothing, and the background environment that complements the pose and lighting.
      - Aim for a photorealistic, high-resolution final image (e.g., 'photorealistic, 8k, detailed').

      Generate the prompt now.
    `;
    
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: masterPrompt,
    });
    
    const text = response.text.trim().replace(/\n/g, ' ');

    return {
      statusCode: 200,
      body: JSON.stringify({ prompt: text }),
      headers: {
        'Content-Type': 'application/json',
      },
    };

  } catch (error) {
    console.error("Error in Netlify function:", error);
    const errorMessage = error instanceof Error ? error.message : "An unknown server error occurred.";
    return {
      statusCode: 500,
      body: JSON.stringify({ error: `Failed to communicate with Gemini API: ${errorMessage}` }),
    };
  }
}
