# PneumoScan — Frontend

Next.js 14 frontend for the Pneumonia Detection API. Uploads chest X-ray images, displays the model's prediction, and renders the original image alongside the Grad-CAM heatmap.

## Project structure

```
pneumoscan/
├── app/
│   ├── globals.css          # Tailwind base + custom animations
│   ├── layout.jsx           # Root layout (Inter font, metadata)
│   └── page.jsx             # Home page
├── components/
│   ├── Header.jsx           # Top navigation bar
│   ├── DropZone.jsx         # Drag-and-drop file uploader
│   ├── ResultPanel.jsx      # Prediction result + image comparison
│   └── PneumoniaDetector.jsx  # Stateful orchestrator
├── lib/
│   ├── api.js               # Typed API client (predict, checkHealth)
│   └── utils.js             # cn(), formatPct(), formatBytes()
├── .env.local.example       # Environment variable template
├── next.config.js
├── tailwind.config.js
└── package.json
```

## Prerequisites

- Node.js ≥ 18
- The FastAPI backend running (see `main.py`)

## Setup

```bash
# 1. Install dependencies
npm install

# 2. Configure the backend URL
cp .env.local.example .env.local
# Edit .env.local and set NEXT_PUBLIC_API_URL if needed (defaults to http://localhost:8000)

# 3. Start the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

| Variable               | Default                    | Description              |
|------------------------|----------------------------|--------------------------|
| `NEXT_PUBLIC_API_URL`  | `http://localhost:8000`    | FastAPI backend base URL |

## API contract

The frontend expects the `/predict` endpoint to return:

```json
{
  "filename":       "chest.png",
  "prediction":     "PNEUMONIA",
  "probability":    0.784,
  "original_image": "<base64 PNG>",
  "gradcam":        "<base64 PNG>"
}
```

## Build for production

```bash
npm run build
npm start
```

## Notes

- The app is fully responsive (mobile → desktop).
- Supports PNG, JPG, and WebP uploads.
- The loading state shows an animated skeleton while waiting for the API.
- Object URLs created for image previews are revoked on clear to avoid memory leaks.
