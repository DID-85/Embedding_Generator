// app/components/common/Sidebar.tsx
import { useState } from 'react';
import { Link as RemixLink } from '@remix-run/react';
import TierModal from './TierModal';

// Add this interface at the top
interface NavItem {
  to: string;
  label: string;
  isButton?: boolean;
}

const navItems: NavItem[] = [
  { to: '/user-guide', label: 'User Guide' },
  { to: '/textEmbed', label: 'Text Embeddings Generator' },
  { to: '/imageEmbed', label: 'Image Embeddings Generator' },
  { to: '/audioEmbed', label: 'Audio Embedding and Transcription Generator'},
  { to: '/imageQNA', label: 'Image QNA' },
  { to: '/VideoEmbed', label: 'Video Embedding' },
];

export default function Sidebar() {
  const [showTiers, setShowTiers] = useState(false);

  return (
    <div className="w-64 bg-gray-800 text-white p-4 flex flex-col">
      <div className="company-logo p-4">
        <img src="/image-removebg-preview.png" alt="Company Logo" className="h-50 w-auto" />
      </div>
      <nav className="flex-1 mt-4">
        <ul>
          {navItems.map((item) => (
            <li key={item.label} className="mb-2">
              {item.isButton ? (
                <button className="block w-full text-left py-2 px-4 hover:bg-gray-700" onClick={() => alert('Profile Button Clicked')}>
                  {item.label}
                </button>
              ) : (
                <RemixLink to={item.to} className="block py-2 px-4 hover:bg-gray-700">
                  {item.label}
                </RemixLink>
              )}
            </li>
          ))}
        </ul>
      </nav>
      <button
        onClick={() => setShowTiers(true)}
        className="mt-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        View Tiers
      </button>
      {showTiers && <TierModal onClose={() => setShowTiers(false)} />}
    </div>
  );
}