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
    <div className="flex min-h-screen items-center justify-center font-sans">
      <main className="flex min-h-screen w-full max-w-6xl flex-col items-center py-12 px-4 sm:px-8 md:px-16">
        <div className="w-full text-center mb-12">
          <div className="inline-block p-2 px-4 bg-indigo-100 dark:bg-indigo-900 rounded-full text-indigo-800 dark:text-indigo-200 text-sm font-medium mb-4">
            Medical Imaging Technology
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800 dark:text-white bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent">
            MedTech Surgical Planning
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Upload a medical image and select a phase for advanced processing and analysis
          </p>
        </div>

        <div className="w-full max-w-4xl bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-12">
          <form onSubmit={handleSubmit} className="w-full mb-6">
            <div className="mb-8">
              <label className="block text-base font-semibold mb-3 text-gray-700 dark:text-gray-200">
                Upload Medical Image
              </label>
              <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center hover:border-indigo-500 dark:hover:border-indigo-400 transition-colors">
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/jpg"
                  onChange={handleImageChange}
                  className="hidden"
                  id="file-upload"
                />
                <label htmlFor="file-upload" className="cursor-pointer">
                  <div className="flex flex-col items-center justify-center">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      width="48" 
                      height="48" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      className="mb-3 opacity-70 text-gray-600 dark:text-gray-300"
                    >
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                      <polyline points="14 2 14 8 20 8"></polyline>
                      <line x1="12" y1="18" x2="12" y2="12"></line>
                      <line x1="9" y1="15" x2="15" y2="15"></line>
                    </svg>
                    <span className="text-gray-700 dark:text-gray-200 font-medium">
                      {selectedImage ? selectedImage.name : "Drag and drop or click to upload"}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      Supported formats: JPEG, PNG
                    </span>
                  </div>
                </label>
              </div>
            </div>

            <div className="mb-8">
              <label className="block text-base font-semibold mb-3 text-gray-700 dark:text-gray-200">
                Select Processing Phase
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all ${selectedPhase === "arterial" ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-900/30" : "border-gray-200 dark:border-gray-700"}`}>
                  <input
                    type="radio"
                    name="phase"
                    value="arterial"
                    checked={selectedPhase === "arterial"}
                    onChange={handlePhaseChange}
                    className="mr-3 h-4 w-4 text-indigo-600"
                  />
                  <div>
                    <span className="block font-medium text-gray-800 dark:text-gray-100">Arterial Phase</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">Increased contrast for better visualization</span>
                  </div>
                </label>
                <label className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all ${selectedPhase === "venous" ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-900/30" : "border-gray-200 dark:border-gray-700"}`}>
                  <input
                    type="radio"
                    name="phase"
                    value="venous"
                    checked={selectedPhase === "venous"}
                    onChange={handlePhaseChange}
                    className="mr-3 h-4 w-4 text-indigo-600"
                  />
                  <div>
                    <span className="block font-medium text-gray-800 dark:text-gray-100">Venous Phase</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">Gaussian smoothing for enhanced details</span>
                  </div>
                </label>
              </div>
            </div>

            <button
              type="submit"
              disabled={!selectedImage || isLoading}
              className="w-full py-3 px-6 bg-gradient-to-r from-indigo-600 to-blue-500 text-white rounded-lg hover:from-indigo-700 hover:to-blue-600 disabled:opacity-60 disabled:cursor-not-allowed font-medium text-base shadow-md hover:shadow-lg transition-all flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing Image...
                </>
              ) : "Process Image"}
            </button>
            
            {error && (
              <div className="mt-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg flex items-start">
                <svg className="h-5 w-5 text-red-500 mr-2 mt-0.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                {error}
              </div>
            )}
          </form>
        </div>

        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8">
          {previewImage && (
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
              <div className="p-6 border-b border-gray-100 dark:border-gray-700">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Original Image</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Source medical scan</p>
              </div>
              <div className="aspect-square relative overflow-hidden bg-gray-50 dark:bg-gray-900">
                <img 
                  src={previewImage} 
                  alt="Original" 
                  className="object-contain w-full h-full p-4"
                />
              </div>
            </div>
          )}
          
          {processedImageUrl && (
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
              <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                    Processed Image
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {selectedPhase === "arterial" ? "Arterial Phase - Enhanced contrast" : "Venous Phase - Gaussian smoothing"}
                  </p>
                </div>
                <button
                  onClick={() => {
                    // Create a temporary anchor element
                    const link = document.createElement('a');
                    link.href = processedImageUrl;
                    link.download = `processed-${selectedPhase}-${selectedImage?.name || 'image'}`; 
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                  }}
                  className="flex items-center space-x-1 px-3 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md transition-colors text-sm font-medium"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="7 10 12 15 17 10"></polyline>
                    <line x1="12" y1="15" x2="12" y2="3"></line>
                  </svg>
                  <span>Save Image</span>
                </button>
              </div>
              <div className="aspect-square relative overflow-hidden bg-gray-50 dark:bg-gray-900">
                <img 
                  src={processedImageUrl} 
                  alt="Processed" 
                  className="object-contain w-full h-full p-4"
                />
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
