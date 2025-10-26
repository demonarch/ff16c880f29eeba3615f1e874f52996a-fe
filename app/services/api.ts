/**
 * API service for communicating with the backend
 */

/**
 * Process an image with the selected phase
 * @param file The image file to process
 * @param phase The phase to apply (arterial or venous)
 * @returns Promise with the processed image URL
 */
export async function processImage(file: File, phase: string): Promise<{ processedImageUrl: string }> {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("phase", phase);

  // In production, use the Hugging Face URL
  const apiUrl = process.env.NODE_ENV === "production" 
    ? "https://huggingface.co/spaces/demonarch/ff16c880f29eeba3615f1e874f52996a-be/process"
    : "http://localhost:8000/process";

  // Request binary data instead of JSON
  const response = await fetch(apiUrl, {
    method: "POST",
    body: formData,
    headers: {
      "Accept": "image/png, image/jpeg"
    }
  });

  if (!response.ok) {
    throw new Error(`Server responded with ${response.status}`);
  }

  try {
    // Try to get binary data
    const blob = await response.blob();
    const processedImageUrl = URL.createObjectURL(blob);
    return { processedImageUrl };
  } catch (error) {
    // Fallback to JSON with base64 if binary fails
    const data = await response.json();
    return { processedImageUrl: data.processed_image };
  }
}