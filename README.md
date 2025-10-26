# MedTech Surgical Planning Web App

A full-stack mini web application for medical image processing, focused on surgical planning. This application allows users to upload medical images and apply different processing phases (arterial or venous) to simulate different visualization techniques.

## Live Demo

The application is deployed and accessible at: [GitHub Pages URL]

## Features

- Upload medical images (JPG/PNG formats)
- Select between two image processing phases:
  - **Arterial Phase**: Applies increased contrast to the image
  - **Venous Phase**: Applies Gaussian smoothing to the image
- Side-by-side display of original and processed images
- Responsive design for desktop and mobile devices
- Real-time processing with visual feedback

## Architecture

This project follows a client-server architecture:

- **Frontend**: Next.js application with React components and TailwindCSS
- **Backend**: Python FastAPI server with scikit-image for image processing
- **Deployment**: Frontend on GitHub Pages, Backend on Hugging Face Spaces

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/bun
- Python 3.8+ (for backend development)

### Frontend Development

1. Clone the repository:
```bash
git clone https://github.com/yourusername/ff16c880f29eeba3615f1e874f52996a-fe.git
cd ff16c880f29eeba3615f1e874f52996a-fe
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
bun install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
bun dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

### Backend Connection

The frontend is configured to connect to:
- Local development: `http://localhost:8000`
- Production: `https://huggingface.co/spaces/demonarch/ff16c880f29eeba3615f1e874f52996a-be`

## How to Use

1. Open the application in your browser
2. Click the "Upload Medical Image" button to select an image from your device
3. Choose either "Arterial Phase" or "Venous Phase" processing
4. Click "Process Image" to send the image to the backend for processing
5. View the original and processed images side by side

## Technologies Used

- **Frontend**: Next.js, React, TailwindCSS
- **Backend**: FastAPI, scikit-image
- **Deployment**: GitHub Pages, Hugging Face Spaces
