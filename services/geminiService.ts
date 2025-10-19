// Fungsi ini tidak lagi berinteraksi langsung dengan Gemini API.
// Sebaliknya, ia memanggil Netlify Function yang aman sebagai proxy.
export async function generatePrompt(
    pose: string, 
    lighting: string, 
    aspectRatio: string,
): Promise<string> {

    try {
        const response = await fetch('/.netlify/functions/generate-prompt', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ pose, lighting, aspectRatio }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || `Request failed with status ${response.status}`);
        }

        const data = await response.json();
        return data.prompt;

    } catch (error) {
        console.error("Error calling generate-prompt function:", error);
        if (error instanceof Error) {
            throw new Error(`Failed to generate prompt: ${error.message}`);
        }
        throw new Error("An unknown error occurred while communicating with the server.");
    }
}
