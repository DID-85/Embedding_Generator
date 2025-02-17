// app/routes/user-guide.tsx
import { Link } from '@remix-run/react';
import AppLayout from '~/components/layout/AppLayout';

export default function UserGuidePage() {
  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto p-6 text-black h-[95vh] overflow-y-scroll">
        <h1 className="text-3xl font-bold mb-8 text-cyan-500">User Guide</h1>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-cyan-600">Text Embeddings Generator</h2>
          <div className="bg-white rounded-lg shadow-md p-6 mb-4">
            <p className="mb-4">
              Convert your text into numerical vectors using our Text Embeddings Generator. This tool offers:
            </p>
            <ul className="list-disc ml-6 mb-4">
              <li>Dual embedding generation (On-Prem and Azure)</li>
              <li>Real-time vector visualization</li>
              <li>Dimension information for generated embeddings</li>
              <li>Raw vector data access</li>
            </ul>
            <Link 
              to="/textEmbed" 
              className="inline-block bg-cyan-500 text-white px-4 py-2 rounded hover:bg-cyan-600"
            >
              Try Text Embeddings →
            </Link>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-cyan-600">Image Embeddings Generator</h2>
          <div className="bg-white rounded-lg shadow-md p-6 mb-4">
            <p className="mb-4">
              Generate embeddings from images with detailed analysis:
            </p>
            <ul className="list-disc ml-6 mb-4">
              <li>Upload and preview images</li>
              <li>Add custom text prompts</li>
              <li>Get detailed image descriptions</li>
              <li>Generate both image and text vector embeddings</li>
            </ul>
            <Link 
              to="/imageEmbed" 
              className="inline-block bg-cyan-500 text-white px-4 py-2 rounded hover:bg-cyan-600"
            >
              Try Image Embeddings →
            </Link>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-cyan-600">Audio Embedding and Transcription</h2>
          <div className="bg-white rounded-lg shadow-md p-6 mb-4">
            <p className="mb-4">
              Process audio files for embeddings and transcriptions:
            </p>
            <ul className="list-disc ml-6 mb-4">
              <li>Upload audio files</li>
              <li>Get accurate transcriptions</li>
              <li>Generate audio embeddings</li>
              <li>View transcription text and corresponding vectors</li>
            </ul>
            <Link 
              to="/audioEmbed" 
              className="inline-block bg-cyan-500 text-white px-4 py-2 rounded hover:bg-cyan-600"
            >
              Try Audio Processing →
            </Link>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-cyan-600">Image QNA</h2>
          <div className="bg-white rounded-lg shadow-md p-6 mb-4">
            <p className="mb-4">
              Interactive image analysis and question-answering:
            </p>
            <ul className="list-disc ml-6 mb-4">
              <li>Upload images for analysis</li>
              <li>Ask questions about the image</li>
              <li>Get AI-powered responses</li>
              <li>Multiple question support</li>
            </ul>
            <Link 
              to="/imageQNA" 
              className="inline-block bg-cyan-500 text-white px-4 py-2 rounded hover:bg-cyan-600"
            >
              Try Image QNA →
            </Link>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-cyan-600">Service Tiers</h2>
          <div className="bg-white rounded-lg shadow-md p-6 mb-4">
            <p className="mb-4">
              Explore our different service tiers:
            </p>
            <ul className="list-disc ml-6 mb-4">
              <li>Free tier with basic features</li>
              <li>Premium tier with advanced capabilities</li>
              <li>Enterprise solutions</li>
              <li>Custom pricing options</li>
            </ul>
            <button 
              onClick={() => (document.querySelector('[data-tier-button]') as HTMLButtonElement)?.click()}
              className="inline-block bg-cyan-500 text-white px-4 py-2 rounded hover:bg-cyan-600"
            >
              View Tiers →
            </button>
          </div>
        </section>
      </div>
    </AppLayout>
  );  
}