// // app/routes/app/web-search.tsx
// import { useState, useEffect } from 'react';
// import AppLayout from '~/components/layout/AppLayout';
// import ReactMarkdown from 'react-markdown';

// interface ChatMessage {
//   role: 'user' | 'assistant';
//   content: string;
// }

// export default function ImageQNAPage() {
//   const [file, setFile] = useState<File | null>(null);
//   const [prompt, setPrompt] = useState('');
//   const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [imagePreview, setImagePreview] = useState<string | null>(null);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!prompt) {
//       setError('Please provide a question');
//       return;
//     }

//     if (!file && chatHistory.length === 0) {
//       setError('Please provide an image');
//       return;
//     }

//     setLoading(true);
//     setError('');

//     // Add user message to chat history
//     const newUserMessage: ChatMessage = { role: 'user', content: prompt };
//     setChatHistory(prev => [...prev, newUserMessage]);

//     try {
//       const formData = new FormData();
//       // Only append file if it's the first message
//       if (chatHistory.length === 0 && file) {
//         formData.append('file', file);
//       }
//       formData.append('text_prompt', prompt);
//       formData.append('chat_history', JSON.stringify(chatHistory));

//       const response = await fetch('http://localhost:8000/Image_QNA', {
//         method: 'POST',
//         body: formData,
//       });

//       if (!response.ok) {
//         throw new Error('Failed to get response');
//       }

//       const data = await response.json();
      
//       // Add assistant response to chat history
//       setChatHistory(prev => [...prev, { role: 'assistant', content: data.response }]);
//       setPrompt(''); // Clear input after sending
//     } catch (err) {
//       setError('Failed to process request. Please try again.');
//       console.error(err);
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
//       <div className="max-w-3xl mx-auto p-4 h-[calc(100vh-64px)] flex flex-col">
//         <h2 className="text-xl font-bold mb-4 text-cyan-500">Image QNA Chat</h2>
        
//         {chatHistory.length === 0 && (
//           <div className="mb-4 space-y-4 text-black">
//             <label className="block text-sm font-medium mb-2">
//               Upload Image
//               <input
//                 type="file"
//                 accept="image/*"
//                 onChange={handleFileChange}
//                 className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"
//               />
//             </label>
//             {imagePreview && (
//               <div className="mt-2">
//                 <img
//                   src={imagePreview}
//                   alt="Preview"
//                   className="max-h-60 rounded-lg object-contain bg-gray-100 p-2"
//                 />
//               </div>
//             )}
//           </div>
//         )}

//         <div className="flex-1 overflow-y-auto mb-4 text-black">
//           <div className="space-y-4 pb-4">
//             {chatHistory.map((message, index) => (
//               <div
//                 key={index}
//                 className={`p-4 rounded-lg ${
//                   message.role === 'user'
//                     ? 'bg-cyan-100 ml-auto max-w-[80%]'
//                     : 'bg-gray-100 mr-auto max-w-[80%]'
//                 }`}
//               >
//                 <div className="prose prose-cyan max-w-none">
//                   <ReactMarkdown>{message.content}</ReactMarkdown>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {error && (
//           <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
//             {error}
//           </div>
//         )}

//         <form onSubmit={handleSubmit} className="sticky bottom-0 bg-white pt-2">
//           <div className="flex gap-2">
//             <input
//               type="text"
//               value={prompt}
//               onChange={(e) => setPrompt(e.target.value)}
//               placeholder="Ask a question about the image..."
//               className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"
//             />
//             <button
//               type="submit"
//               disabled={loading}
//               className="bg-cyan-500 text-white py-2 px-4 rounded-md hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 disabled:opacity-50"
//             >
//               {loading ? 'Sending...' : 'Send'}
//             </button>
//           </div>
//         </form>
//       </div>
//     </AppLayout>
//   );
// }


import { useState, useEffect } from 'react';
import { Clipboard, Download } from "lucide-react"; // Import icons
import AppLayout from '~/components/layout/AppLayout';
import ReactMarkdown from 'react-markdown';
import { Button } from '~/components/ui/button';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export default function ImageQNAPage() {
  const [file, setFile] = useState<File | null>(null);
  const [prompt, setPrompt] = useState('');
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt) {
      setError('Please provide a question');
      return;
    }

    if (!file && chatHistory.length === 0) {
      setError('Please provide an image');
      return;
    }

    setLoading(true);
    setError('');

    // Add user message to chat history
    const newUserMessage: ChatMessage = { role: 'user', content: prompt };
    setChatHistory(prev => [...prev, newUserMessage]);

    try {
      const formData = new FormData();
      // Only append file if it's the first message
      if (chatHistory.length === 0 && file) {
        formData.append('file', file);
      }
      formData.append('text_prompt', prompt);
      formData.append('chat_history', JSON.stringify(chatHistory));

      const response = await fetch('http://localhost:8000/Image_QNA', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const data = await response.json();
      
      // Add assistant response to chat history
      setChatHistory(prev => [...prev, { role: 'assistant', content: data.response }]);
      setPrompt(''); // Clear input after sending
    } catch (err) {
      setError('Failed to process request. Please try again.');
      console.error(err);
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

  const copyToClipboard = (content: string) => {
    navigator.clipboard.writeText(content);
    alert("Copied to clipboard!");
  };

  const downloadChat = () => {
    const chatData = JSON.stringify(chatHistory, null, 2);
    const blob = new Blob([chatData], { type: "application/json" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "chat_history.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <AppLayout>
      <div className="max-w-3xl mx-auto p-4 h-[calc(100vh-64px)] flex flex-col">
        <h2 className="text-xl font-bold mb-4 text-cyan-500">Image QNA Chat</h2>
        
        {chatHistory.length === 0 && (
          <div className="mb-4 space-y-4 text-black">
            <label className="block text-sm font-medium mb-2">
              Upload Image
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"
              />
            </label>
            {imagePreview && (
              <div className="mt-2">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="max-h-60 rounded-lg object-contain bg-gray-100 p-2"
                />
              </div>
            )}
          </div>
        )}

        <div className="flex-1 overflow-y-auto mb-4 text-black">
          <div className="space-y-4 pb-4">
            {chatHistory.map((message, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg ${
                  message.role === 'user'
                    ? 'bg-cyan-100 ml-auto max-w-[80%]'
                    : 'bg-gray-100 mr-auto max-w-[80%]'
                }`}
              >
                <div className="prose prose-cyan max-w-none">
                  <ReactMarkdown>{message.content}</ReactMarkdown>
                </div>
                {message.role === 'assistant' && (
                  <div className="mt-2 flex space-x-2">
                    <Button
                      size="sm"
                      className="flex items-center gap-2 bg-gray-700 hover:bg-gray-800 text-white px-3 py-1 rounded-md"
                      onClick={() => copyToClipboard(message.content)}
                    >
                      <Clipboard size={16} /> Copy
                    </Button>
                    <Button
                      size="sm"
                      className="flex items-center gap-2 bg-gray-700 hover:bg-gray-800 text-white px-3 py-1 rounded-md"
                      onClick={downloadChat}
                    >
                      <Download size={16} /> Download
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="sticky bottom-0 bg-white pt-2">
          <div className="flex gap-2">
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Ask a question about the image..."
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-cyan-500 text-white py-2 px-4 rounded-md hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 disabled:opacity-50"
            >
              {loading ? 'Sending...' : 'Send'}
            </button>
          </div>
        </form>
      </div>
    </AppLayout>
  );
}
