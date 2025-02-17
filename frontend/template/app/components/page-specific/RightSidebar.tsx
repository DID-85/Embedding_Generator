// app/components/app-specific/RightSidebar.tsx
import { useState } from 'react';

export default function RightSidebar() {
  const [role, setRole] = useState('');
  const [outputStyle, setOutputStyle] = useState('');
  const [knowledgeSources, setKnowledgeSources] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [chatType, setChatType] = useState('recent'); // 'recent' or 'saved'
  const [showContactModal, setShowContactModal] = useState(false);

  const handleKnowledgeSourceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
    setKnowledgeSources(selectedOptions);
  };


  return (
    <div>
      <div className="mb-4">
        <h3 className="font-bold mb-2 text-cyan-700">Role</h3>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full p-2 border rounded bg-slate-100 text-black"
        >
          <option value="">Select Role</option>
          <option value="role1">Role 1</option>
          <option value="role2">Role 2</option>
        </select>
      </div>

      <div className="mb-4">
        <h3 className="font-bold mb-2 text-cyan-700">Output Style</h3>
        <textarea
          value={outputStyle}
          onChange={(e) => setOutputStyle(e.target.value)}
          className="w-full p-2 border rounded bg-slate-100 text-black"
          rows={3}
        />
      </div>

      <div className="mb-4">
        <h3 className="font-bold mb-2 text-cyan-700">Knowledge Sources</h3>
        <select
          multiple
          value={knowledgeSources}
          onChange={handleKnowledgeSourceChange}
          className="w-full p-2 border rounded bg-slate-100 text-black"
          size={4} // Adjust size to show more options
        >
          <option value="source1">Source 1</option>
          <option value="source2">Source 2</option>
          <option value="source3">Source 3</option>
          <option value="source4">Source 4</option>
        </select>
      </div>

      <div className="mb-4">
        <h3 className="font-bold mb-2 text-cyan-700">Search</h3>
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-2 border rounded mb-2 bg-slate-100 text-black"
        />
        <div className="flex items-center">
          <input
            type="radio"
            id="recentChats"
            name="chatType"
            value="recent"
            checked={chatType === 'recent'}
            onChange={(e) => setChatType(e.target.value)}
            className="mr-2"
          />
          <label htmlFor="recentChats" className="mr-4 text-black">Recent chats</label>
          <input
            type="radio"
            id="savedChats"
            name="chatType"
            value="saved"
            checked={chatType === 'saved'}
            onChange={(e) => setChatType(e.target.value)}
            className="mr-2"
          />
          <label htmlFor="savedChats" className='text-black'>Saved chats</label>
        </div>
      </div>

      <div>
        <button
          onClick={() => setShowContactModal(true)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Contact Us
        </button>
        {showContactModal && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
            <div className="bg-white p-6 rounded-md">
              <h2 className="text-lg font-bold mb-4 text-black">Contact Us</h2>
              <p className='text-black'>Contact information will be displayed here.</p>
              <button onClick={() => setShowContactModal(false)} className="mt-4 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded">
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}