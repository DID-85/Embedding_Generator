import { useState, useEffect } from 'react';
import { Clipboard, Download } from "lucide-react"; // Icons for Copy & Download
import AppLayout from '~/components/layout/AppLayout';
import { Button } from '~/components/ui/button';

interface VideoEmbeddingResponse {
  task_id: string;
  embeddings: {
    embedding_scope: string;
    start_offset_sec: number;
    end_offset_sec: number;
    embeddings: number[];
  }[];
}

export default function VideoEmbedPage() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState<VideoEmbeddingResponse | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      // Create a preview URL for the video
      const videoPreviewUrl = URL.createObjectURL(selectedFile);
      setVideoUrl(videoPreviewUrl);
    }
  };

  // Cleanup video URL when component unmounts
  useEffect(() => {
    return () => {
      if (videoUrl) {
        URL.revokeObjectURL(videoUrl);
      }
    };
  }, [videoUrl]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      setError('Please upload a video file');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('video_file', file);

      const response = await fetch('http://localhost:8000/create-video-embedding/', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to process video');
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError('Failed to process video. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard!");
  };

  const downloadData = (data: string, filename: string) => {
    const blob = new Blob([data], { type: "application/json" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <AppLayout>
      {/* ✅ This container ensures full scrollability */}
      <div className="max-w-3xl mx-auto p-4 h-screen overflow-y-auto">
        <h2 className="text-xl font-bold mb-4 text-cyan-500">Video Embedding Generator</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="video-upload" className="block text-sm font-medium text-black">
              Upload Video File
            </label>
            <input
              id="video-upload" // ✅ Fixed accessibility issue
              type="file"
              accept="video/*"
              onChange={handleFileChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 text-black"
            />
          </div>

          {videoUrl && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <h3 className="text-sm font-medium mb-2 text-black">Video Preview</h3>
              <video controls className="w-full">
                <source src={videoUrl} type="video/mp4" />
                Your browser does not support the video element.
              </video>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-cyan-500 text-white py-2 px-4 rounded-md hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 disabled:opacity-50"
          >
            {loading ? 'Processing...' : 'Generate Embeddings'}
          </button>
        </form>

        {error && (
          <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-md">
            {error}
          </div>
        )}

        {result && (
          <div className="mt-6 space-y-4">
            <div className="p-4 bg-gray-50 rounded-md">
              <h3 className="text-lg font-medium mb-2 text-black">Task ID:</h3>
              <p className="text-black">{result.task_id}</p> {/* ✅ Text color changed to black */}
              <div className="mt-2 flex space-x-2">
                <Button onClick={() => copyToClipboard(result.task_id)}>
                  <Clipboard size={16} className="mr-1" /> Copy
                </Button>
                <Button onClick={() => downloadData(result.task_id, "video_task_id.txt")}>
                  <Download size={16} className="mr-1" /> Download
                </Button>
              </div>
            </div>

            {/* ✅ Scrollable embedding section */}
            <div className="p-4 bg-gray-50 rounded-md max-h-[60vh] overflow-y-auto">
              <h3 className="text-lg font-medium mb-2 text-black">Embedding Segments:</h3>
              {result.embeddings.map((segment, index) => (
                <div key={index} className="p-4 bg-white rounded-md mb-4 border border-gray-300">
                  <h4 className="text-md font-semibold text-black">
                    Segment {index + 1}
                  </h4>
                  <p className="text-black">
                    Scope: {segment.embedding_scope} | Start: {segment.start_offset_sec}s | End: {segment.end_offset_sec}s
                  </p>
                  <div className="max-h-40 overflow-y-auto bg-gray-100 p-2 rounded-md">
                    <pre className="text-xs text-black whitespace-pre-wrap">
                      [{segment.embeddings.slice(0, 10).join(", ")}...]
                    </pre>
                  </div>
                  <p className="text-gray-500 text-sm mt-2">
                    Vector dimension: {segment.embeddings.length}
                  </p>
                  <div className="mt-2 flex space-x-2">
                    <Button onClick={() => copyToClipboard(JSON.stringify(segment.embeddings))}>
                      <Clipboard size={16} className="mr-1" /> Copy
                    </Button>
                    <Button onClick={() => downloadData(JSON.stringify(segment.embeddings, null, 2), `video_embedding_segment_${index + 1}.json`)}>
                      <Download size={16} className="mr-1" /> Download
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
