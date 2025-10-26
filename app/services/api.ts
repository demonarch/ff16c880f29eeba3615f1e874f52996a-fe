/**
 * API service for communicating with the backend
 */

/**
 * Process an image with the selected phase
 * @param file The image file to process
 * @param phase The phase to apply (arterial or venous)
 * @returns Promise with the processed image data URL
 */
export async function processImage(file: File, phase: string): Promise<{ processed_image: string }> {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("phase", phase);

  // In production, use the Hugging Face URL
  const apiUrl = process.env.NODE_ENV === "production" 
    ? "https://huggingface.co/spaces/demonarch/ff16c880f29eeba3615f1e874f52996a-be/process"
    : "http://localhost:8000/process";

  const response = await fetch(apiUrl, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`Server responded with ${response.status}`);
  }

  // The backend returns JSON with a base64 image
  return await response.json();
}