# Multi-Modal Embedding Generator

Version: 1.0  Date: 16th February 2025  Author: Didhit Patel

Multi-Modal Embedding Generator is a unified platform designed to generate embeddings from text, images, and audio in a single, integrated solution. The system uses a Remix-based frontend paired with a FastAPI backend, combining both cloud-based (Azure OpenAI) and on-premise (Fastembed, Groq) technologies. This file is a direct copy of the original README structure from the project zip, with updated content.

Overview:
This project enables users to generate and manage embeddings across multiple modalities. It leverages advanced models such as Azure's text-embedding-3-large and Whisper for transcription, Fastembed’s BAAI/bge-small-en-v1.5 and Qdrant/clip-ViT-B-32-vision for on-premise tasks, and Groq’s llama-3.2-11b-vision-preview for sophisticated vision-language processing. The architecture is containerized with Docker and balanced via Nginx for scalable deployments.

Installation & Setup:
1. Clone the Repository:
git clone https://github.com/DID-85/Multi-Modal_Emdedding_generator.git
cd Multi-Modal_Emdedding_generator

2. Backend Setup (FastAPI):
   - Create and activate a virtual environment:
     python -m venv .venv
     (Windows) .\.venv\Scripts\activate  (macOS/Linux) source .venv/bin/activate
   - Install backend dependencies:
     cd backend
     pip install -r requirements.txt

3. Frontend Setup (Remix):
   cd ../frontend
   npm install
   npm run build

Running the Project:

For local development, open two terminals:

Terminal 1 (Backend): 
cd backend
uvicorn main:app --reload --port 8000
Terminal 2 (Frontend):
cd frontend
npm run dev

Docker Deployment:
From the project root, run:
docker compose -f compose.yaml up --build

Key Commands:
Start Backend: uvicorn main:app --reload
Start Frontend: npm run dev
Build Production: npm run build && docker compose up
Clean Docker: docker compose down -v

Environment Configuration:
Create a .env file at the project root with the following entries:
GROQ_API_KEY=your_key
AZURE_API_KEY=your_key
(Note: Windows users should use double backslashes (\\) in file paths.)

API Endpoints Summary:
• GET /get-on-prem-text_embedding
  - Generates on-premise text embeddings using Fastembed (BAAI/bge-small-en-v1.5).
• POST /image_embedding
  - Produces image embeddings via Qdrant/clip-ViT-B-32-vision.
• POST /get-azure-embedding
  - Generates cloud-based text embeddings using Azure OpenAI (text-embedding-3-large).
• POST /advanced_image_embedding
  - Combines LLaMA vision and CLIP embeddings for advanced image analysis.
• POST /translate_and_embed
  - Processes audio files for transcription (using Azure Whisper) and text embedding.
• POST /Image_QNA
  - Executes multimodal Q&A using LLaMA-3.2-11b-vision-preview.
```
Project Structure:
The repository is organized as follows:
Multi-Modal_Emdedding_generator/
  ├── backend/           # FastAPI backend source files and dependencies
  ├── frontend/          # Remix frontend application and assets
  ├── compose.yaml       # Docker Compose configuration for containerized deployment
  ├── .env               # Environment variable configuration file
  └── README.md          # This README file
```
This project demonstrates an end-to-end approach to multimodal embedding generation, ensuring efficient data processing, seamless user experience, and scalable deployment through containerization. For more detailed technical information, please refer to the technical documentation provided within the project.

License:
This project is licensed under the MIT License.
