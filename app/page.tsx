"use client";

import { useState } from "react";
import Image from "next/image";
import { processImage } from "./services/api";

export default function Home() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [processedImageUrl, setProcessedImageUrl] = useState<string | null>(null);
  const [selectedPhase, setSelectedPhase] = useState<string>("arterial");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      setProcessedImageUrl(null);
      setError(null);
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePhaseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedPhase(e.target.value);
    setProcessedImageUrl(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedImage) {
      setError("Please select an image first");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const data = await processImage(selectedImage, selectedPhase);
      setProcessedImageUrl(data.processedImageUrl);
    } catch (err) {
      setError(`Error processing image: ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-5xl flex-col items-center py-12 px-4 bg-white dark:bg-black sm:px-8 md:px-16">
        <div className="w-full text-center mb-8">
          <h1 className="text-3xl font-bold mb-2 text-black dark:text-zinc-50">
            MedTech Surgical Planning
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400">
            Upload a medical image and select a phase for processing
          </p>
        </div>

        <form onSubmit={handleSubmit} className="w-full max-w-3xl mb-8">
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2 text-black dark:text-zinc-50">
              Upload Medical Image
            </label>
            <input
              type="file"
              accept="image/jpeg,image/png,image/jpg"
              onChange={handleImageChange}
              className="w-full p-2 border border-zinc-300 rounded-md dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium mb-2 text-black dark:text-zinc-50">
              Select Phase
            </label>
            <div className="flex gap-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="phase"
                  value="arterial"
                  checked={selectedPhase === "arterial"}
                  onChange={handlePhaseChange}
                  className="mr-2"
                />
                <span className="text-black dark:text-zinc-50">Arterial Phase (Increased Contrast)</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="phase"
                  value="venous"
                  checked={selectedPhase === "venous"}
                  onChange={handlePhaseChange}
                  className="mr-2"
                />
                <span className="text-black dark:text-zinc-50">Venous Phase (Gaussian Smoothing)</span>
              </label>
            </div>
          </div>

          <button
            type="submit"
            disabled={!selectedImage || isLoading}
            className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed"
          >
            {isLoading ? "Processing..." : "Process Image"}
          </button>
          
          {error && (
            <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-md">
              {error}
            </div>
          )}
        </form>

        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
          {previewImage && (
            <div className="border border-zinc-200 dark:border-zinc-700 rounded-lg p-4">
              <h2 className="text-xl font-medium mb-3 text-black dark:text-zinc-50">Original Image</h2>
              <div className="aspect-square relative overflow-hidden rounded-md bg-zinc-100 dark:bg-zinc-800">
                <img 
                  src={previewImage} 
                  alt="Original" 
                  className="object-contain w-full h-full"
                />
              </div>
            </div>
          )}
          
          {processedImageUrl && (
            <div className="border border-zinc-200 dark:border-zinc-700 rounded-lg p-4">
              <h2 className="text-xl font-medium mb-3 text-black dark:text-zinc-50">
                Processed Image ({selectedPhase === "arterial" ? "Arterial Phase" : "Venous Phase"})
              </h2>
              <div className="aspect-square relative overflow-hidden rounded-md bg-zinc-100 dark:bg-zinc-800">
                <img 
                  src={processedImageUrl} 
                  alt="Processed" 
                  className="object-contain w-full h-full"
                />
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
