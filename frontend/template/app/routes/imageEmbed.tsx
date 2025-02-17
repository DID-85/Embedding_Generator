// // app/routes/app/batch-search.tsx
// import { useState, useEffect } from 'react';
// import AppLayout from '~/components/layout/AppLayout';
// import ReactMarkdown from 'react-markdown';
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";

// export default function ImageEmbedPage() {
//   const [file, setFile] = useState<File | null>(null);
//   const [textPrompt, setTextPrompt] = useState('');
//   const [result, setResult] = useState<{
//     image_metadata: string;
//     image_vector_embedding: number[];
//     image_text_embedding: number[];
//   } | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [activeTab, setActiveTab] = useState("description");
//   const [imagePreview, setImagePreview] = useState<string | null>(null);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!file || !textPrompt) {
//       setError('Please provide both an image and a text prompt');
//       return;
//     }

//     setLoading(true);
//     setError(null);

//     try {
//       const formData = new FormData();
//       formData.append('file', file);
//       formData.append('text_prompt', textPrompt);

//       const response = await fetch('http://localhost:8000/advanced_image_embedding', {
//         method: 'POST',
//         body: formData,
//       });

//       if (!response.ok) {
//         throw new Error('Failed to process image');
//       }

//       const data = await response.json();
//       setResult(data);
//     } catch (err) {
//       setError(err instanceof Error ? err.message : 'An error occurred');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       setFile(file);
//       // Create preview URL
//       const previewUrl = URL.createObjectURL(file);
//       setImagePreview(previewUrl);
//     }
//   };

//   // Cleanup preview URL when component unmounts
//   useEffect(() => {
//     return () => {
//       if (imagePreview) {
//         URL.revokeObjectURL(imagePreview);
//       }
//     };
//   }, [imagePreview]);

//   return (
//     <AppLayout>
//       <div className="max-w-4xl mx-auto p-2 overflow-y-auto max-h-[95vh]">
//         <h2 className="text-2xl font-bold mb-6 text-cyan-500">Image Embeddings Generator</h2>
        
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Upload Image
//             </label>
//             <input
//               type="file"
//               accept="image/*"
//               onChange={handleFileChange}
//               className="w-full p-2 border border-gray-300 rounded-md text-black"
//             />
//             {imagePreview && (
//               <div className="mt-4">
//                 <img
//                   src={imagePreview}
//                   alt="Preview"
//                   className="max-h-60 rounded-lg object-contain bg-gray-100 p-2"
//                 />
//               </div>
//             )}
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Text Prompt
//             </label>
//             <textarea
//               value={textPrompt}
//               onChange={(e) => setTextPrompt(e.target.value)}
//               className="w-full p-2 border border-gray-300 rounded-md"
//               placeholder="Enter your prompt about the image..."
//               rows={3}
//             />
//           </div>

//           <button
//             type="submit"
//             disabled={loading}
//             className="bg-cyan-500 text-white px-4 py-2 rounded-md hover:bg-cyan-600 disabled:bg-gray-400"
//           >
//             {loading ? 'Processing...' : 'Generate Embeddings'}
//           </button>
//         </form>

//         {error && (
//           <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-md">
//             {error}
//           </div>
//         )}

//         {result && (
//           <div className="mt-6 border border-black rounded-md overflow-y-auto">
//             <Tabs defaultValue="description" className="w-full" onValueChange={setActiveTab}>
//               <TabsList className="grid w-full grid-cols-3">
//                 <TabsTrigger value="description">Description</TabsTrigger>
//                 <TabsTrigger value="image-vector">Image Vector</TabsTrigger>
//                 <TabsTrigger value="text-vector">Text Vector</TabsTrigger>
//               </TabsList>

//               <div className="max-h-[400px] overflow-y-auto">
//                 <TabsContent value="description" className="mt-4 text-black">
//                   <div className="p-4 bg-gray-50 rounded-md">
//                     <h3 className="font-semibold mb-2">Image Description:</h3>
//                     <ReactMarkdown className="prose prose-sm max-w-none">
//                       {result.image_metadata}
//                     </ReactMarkdown>
//                   </div>
//                 </TabsContent>

//                 <TabsContent value="image-vector" className="mt-4 text-black">
//                   <div className="p-4 bg-gray-50 rounded-md">
//                     <h3 className="font-semibold mb-2">
//                       Image Vector Embedding 
//                       <span className="text-sm font-normal ml-2">
//                         (Dimension: {result.image_vector_embedding.length})
//                       </span>
//                     </h3>
//                     <div className="text-sm text-black">
//                       <pre className="whitespace-pre-wrap">
//                         [{result.image_vector_embedding.join(', ')}]
//                       </pre>
//                     </div>
//                   </div>
//                 </TabsContent>

//                 <TabsContent value="text-vector" className="mt-4 text-black">
//                   <div className="p-4 bg-gray-50 rounded-md">
//                     <h3 className="font-semibold mb-2">
//                       Image Text Embedding
//                       <span className="text-sm font-normal ml-2">
//                         (Dimension: {result.image_text_embedding.length})
//                       </span>
//                     </h3>
//                     <div className="text-sm text-black">
//                       <pre className="whitespace-pre-wrap">
//                         [{result.image_text_embedding.join(', ')}]
//                       </pre>
//                     </div>
//                   </div>
//                 </TabsContent>
//               </div>
//             </Tabs>
//           </div>
//         )}
//       </div>
//     </AppLayout>
//   );
// }



import { useState, useEffect } from 'react';
import { Clipboard, Download } from "lucide-react"; // Import icons
import AppLayout from '~/components/layout/AppLayout';
import ReactMarkdown from 'react-markdown';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { Button } from '~/components/ui/button';

export default function ImageEmbedPage() {
  const [file, setFile] = useState<File | null>(null);
  const [textPrompt, setTextPrompt] = useState('');
  const [result, setResult] = useState<{
    image_metadata: string;
    image_vector_embedding: number[];
    image_text_embedding: number[];
  } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("description");
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !textPrompt) {
      setError('Please provide both an image and a text prompt');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('text_prompt', textPrompt);

      const response = await fetch('http://localhost:8000/advanced_image_embedding', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to process image');
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFile(file);
      // Create preview URL
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  // Cleanup preview URL when component unmounts
  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

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
      <div className="max-w-4xl mx-auto p-2 overflow-y-auto max-h-[95vh]">
        <h2 className="text-2xl font-bold mb-6 text-cyan-500">Image Embeddings Generator</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full p-2 border border-gray-300 rounded-md text-black"
            />
            {imagePreview && (
              <div className="mt-4">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="max-h-60 rounded-lg object-contain bg-gray-100 p-2"
                />
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Text Prompt
            </label>
            <textarea
              value={textPrompt}
              onChange={(e) => setTextPrompt(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Enter your prompt about the image..."
              rows={3}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-cyan-500 text-white px-4 py-2 rounded-md hover:bg-cyan-600 disabled:bg-gray-400"
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
          <div className="mt-6 border border-black rounded-md overflow-y-auto">
            <Tabs defaultValue="description" className="w-full" onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="image-vector">Image Vector</TabsTrigger>
                <TabsTrigger value="text-vector">Text Vector</TabsTrigger>
              </TabsList>

              <div className="max-h-[400px] overflow-y-auto">
                <TabsContent value="description" className="mt-4 text-black">
                  <div className="p-4 bg-gray-50 rounded-md">
                    <h3 className="font-semibold mb-2">Image Description:</h3>
                    <ReactMarkdown className="prose prose-sm max-w-none">
                      {result.image_metadata}
                    </ReactMarkdown>
                    <div className="mt-2 flex space-x-2">
                      <Button onClick={() => copyToClipboard(result.image_metadata)}>Copy</Button>
                      <Button onClick={() => downloadData(result.image_metadata, "image_description.txt")}>Download</Button>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="image-vector" className="mt-4 text-black">
                  <div className="p-4 bg-gray-50 rounded-md">
                    <h3 className="font-semibold mb-2">
                      Image Vector Embedding 
                      <span className="text-sm font-normal ml-2">
                        (Dimension: {result.image_vector_embedding.length})
                      </span>
                    </h3>
                    <div className="text-sm text-black">
                      <pre className="whitespace-pre-wrap">
                        [{result.image_vector_embedding.join(', ')}]
                      </pre>
                    </div>
                    <div className="mt-2 flex space-x-2">
                      <Button onClick={() => copyToClipboard(JSON.stringify(result.image_vector_embedding))}>Copy</Button>
                      <Button onClick={() => downloadData(JSON.stringify(result.image_vector_embedding, null, 2), "image_vector.json")}>Download</Button>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="text-vector" className="mt-4 text-black">
                  <div className="p-4 bg-gray-50 rounded-md">
                    <h3 className="font-semibold mb-2">
                      Image Text Embedding
                      <span className="text-sm font-normal ml-2">
                        (Dimension: {result.image_text_embedding.length})
                      </span>
                    </h3>
                    <div className="text-sm text-black">
                      <pre className="whitespace-pre-wrap">
                        [{result.image_text_embedding.join(', ')}]
                      </pre>
                    </div>
                    <div className="mt-2 flex space-x-2">
                      <Button onClick={() => copyToClipboard(JSON.stringify(result.image_text_embedding))}>Copy</Button>
                      <Button onClick={() => downloadData(JSON.stringify(result.image_text_embedding, null, 2), "image_text_embedding.json")}>Download</Button>
                    </div>
                  </div>
                </TabsContent>
              </div>
            </Tabs>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
