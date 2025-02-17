// // app/routes/rag-knowledge.tsx
// import { useState, useEffect } from 'react';
// import AppLayout from '~/components/layout/AppLayout';

// interface TranslationResponse {
//   text: string;
//   text_embedding: number[];
// }

// export default function AudioEmbedPage() {
//   const [file, setFile] = useState<File | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [result, setResult] = useState<TranslationResponse | null>(null);
//   const [audioUrl, setAudioUrl] = useState<string | null>(null);

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       setFile(file);
//       // Create audio URL for preview
//       const audioUrl = URL.createObjectURL(file);
//       setAudioUrl(audioUrl);
//     }
//   };

//   // Cleanup audio URL when component unmounts
//   useEffect(() => {
//     return () => {
//       if (audioUrl) {
//         URL.revokeObjectURL(audioUrl);
//       }
//     };
//   }, [audioUrl]);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!file) {
//       setError('Please upload an audio file');
//       return;
//     }

//     setLoading(true);
//     setError('');

//     try {
//       const formData = new FormData();
//       formData.append('audio_file', file);

//       const response = await fetch('http://localhost:8000/translate_and_embed/', {
//         method: 'POST',
//         body: formData,
//       });

//       if (!response.ok) {
//         throw new Error('Failed to process audio');
//       }

//       const data = await response.json();
//       setResult(data);
//     } catch (err) {
//       setError('Failed to process audio. Please try again.');
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const formatEmbedding = (embedding: number[]) => {
//     return embedding.slice(0, 5).map(n => n.toFixed(6)).join(', ') + '...';
//   };

//   return (
//     <AppLayout>
//       <div className="max-w-3xl mx-auto p-4 h-full flex flex-col">
//         <h2 className="text-xl font-bold mb-4 text-cyan-500">Audio Translation & Embedding</h2>
        
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium mb-2 text-black">
//               Upload Audio File
//               <input
//                 type="file"
//                 accept="audio/*"
//                 onChange={handleFileChange}
//                 className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"
//               />
//             </label>
            
//             {audioUrl && (
//               <div className="mt-4 p-4 bg-gray-50 rounded-lg">
//                 <h3 className="text-sm font-medium mb-2 text-black">Audio Preview</h3>
//                 <audio
//                   controls
//                   className="w-full"
//                   src={audioUrl}
//                 >
//                   Your browser does not support the audio element.
//                 </audio>
//               </div>
//             )}
//           </div>

//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full bg-cyan-500 text-white py-2 px-4 rounded-md hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 disabled:opacity-50"
//           >
//             {loading ? 'Processing...' : 'Process Audio'}
//           </button>
//         </form>

//         {error && (
//           <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-md">
//             {error}
//           </div>
//         )}

//         {result && (
//           <div className="mt-6 flex-1 min-h-0 overflow-y-auto">
//             <div className="space-y-4">
//               <div className="p-4 bg-gray-50 rounded-md">
//                 <h3 className="text-lg font-medium mb-2 text-black">Transcription:</h3>
//                 <p className="text-gray-700">{result.text}</p>
//               </div>
              
//               <div className="p-4 bg-gray-50 rounded-md">
//                 <h3 className="text-lg font-medium mb-2 text-black">Embedding Vector:</h3>
//                 <div className="max-h-60 overflow-y-auto font-mono text-sm bg-white border border-gray-200 rounded p-3">
//                   <p className="text-gray-700 whitespace-pre-wrap">
//                     [
//                       {result.text_embedding.map((value, index) => (
//                         `${value.toFixed(6)}${index < result.text_embedding.length - 1 ? ',' : ''}\n`
//                       ))}
//                     ]
//                   </p>
//                 </div>
//                 <p className="text-gray-500 text-sm mt-2">
//                   Vector dimension: {result.text_embedding.length}
//                 </p>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </AppLayout>
//   );
// }

import { useState, useEffect } from 'react';
import { Clipboard, Download } from "lucide-react"; // Import icons
import AppLayout from '~/components/layout/AppLayout';
import { Button } from '~/components/ui/button';

interface TranslationResponse {
  text: string;
  text_embedding: number[];
}

export default function AudioEmbedPage() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState<TranslationResponse | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFile(file);
      // Create audio URL for preview
      const audioUrl = URL.createObjectURL(file);
      setAudioUrl(audioUrl);
    }
  };

  // Cleanup audio URL when component unmounts
  useEffect(() => {
    return () => {
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
      }
    };
  }, [audioUrl]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      setError('Please upload an audio file');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('audio_file', file);

      const response = await fetch('http://localhost:8000/translate_and_embed/', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to process audio');
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError('Failed to process audio. Please try again.');
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
      <div className="max-w-3xl mx-auto p-4 h-full flex flex-col">
        <h2 className="text-xl font-bold mb-4 text-cyan-500">Audio Translation & Embedding</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2 text-black">
              Upload Audio File
              <input
                type="file"
                accept="audio/*"
                onChange={handleFileChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"
              />
            </label>
            
            {audioUrl && (
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <h3 className="text-sm font-medium mb-2 text-black">Audio Preview</h3>
                <audio
                  controls
                  className="w-full"
                  src={audioUrl}
                >
                  Your browser does not support the audio element.
                </audio>
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-cyan-500 text-white py-2 px-4 rounded-md hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 disabled:opacity-50"
          >
            {loading ? 'Processing...' : 'Process Audio'}
          </button>
        </form>

        {error && (
          <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-md">
            {error}
          </div>
        )}

        {result && (
          <div className="mt-6 flex-1 min-h-0 overflow-y-auto">
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-md">
                <h3 className="text-lg font-medium mb-2 text-black">Transcription:</h3>
                <p className="text-gray-700">{result.text}</p>
                <div className="mt-2 flex space-x-2">
                  <Button
                    size="sm"
                    className="flex items-center gap-2 bg-gray-700 hover:bg-gray-800 text-white px-3 py-1 rounded-md"
                    onClick={() => copyToClipboard(result.text)}
                  >
                    <Clipboard size={16} /> Copy
                  </Button>
                  <Button
                    size="sm"
                    className="flex items-center gap-2 bg-gray-700 hover:bg-gray-800 text-white px-3 py-1 rounded-md"
                    onClick={() => downloadData(result.text, "transcription.txt")}
                  >
                    <Download size={16} /> Download
                  </Button>
                </div>
              </div>
              
              <div className="p-4 bg-gray-50 rounded-md">
                <h3 className="text-lg font-medium mb-2 text-black">Embedding Vector:</h3>
                <div className="max-h-60 overflow-y-auto font-mono text-sm bg-white border border-gray-200 rounded p-3">
                  <p className="text-gray-700 whitespace-pre-wrap">
                    [
                      {result.text_embedding.map((value, index) => (
                        `${value.toFixed(6)}${index < result.text_embedding.length - 1 ? ',' : ''}\n`
                      ))}
                    ]
                  </p>
                </div>
                <p className="text-gray-500 text-sm mt-2">
                  Vector dimension: {result.text_embedding.length}
                </p>
                <div className="mt-2 flex space-x-2">
                  <Button
                    size="sm"
                    className="flex items-center gap-2 bg-gray-700 hover:bg-gray-800 text-white px-3 py-1 rounded-md"
                    onClick={() => copyToClipboard(JSON.stringify(result.text_embedding))}
                  >
                    <Clipboard size={16} /> Copy
                  </Button>
                  <Button
                    size="sm"
                    className="flex items-center gap-2 bg-gray-700 hover:bg-gray-800 text-white px-3 py-1 rounded-md"
                    onClick={() => downloadData(JSON.stringify(result.text_embedding, null, 2), "audio_embedding.json")}
                  >
                    <Download size={16} /> Download
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
