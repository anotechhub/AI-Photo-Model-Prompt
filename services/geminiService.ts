import { GoogleGenAI } from "@google/genai";

// Fungsi ini disederhanakan dan tidak lagi menerima apiKey opsional.
export async function generatePrompt(
    pose: string, 
    lighting: string, 
    aspectRatio: string,
): Promise<string> {

    const apiKey = process.env.API_KEY;

    if (!apiKey) {
        throw new Error("API_KEY is not configured. Please set it as an environment variable.");
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

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: masterPrompt,
        });
        
        const text = response.text.trim().replace(/\n/g, ' ');
        return text;

    } catch (error) {
        console.error("Error generating prompt with Gemini API:", error);
        if (error instanceof Error) {
            // Memberikan pesan error yang lebih ramah pengguna untuk masalah API key umum.
            if (error.message.includes('API key not valid')) {
                 throw new Error(`Failed to generate prompt: The provided API key is not valid. Please check your environment variable.`);
            }
            throw new Error(`Failed to generate prompt: ${error.message}`);
        }
        throw new Error("An unknown error occurred while communicating with the Gemini API.");
    }
}