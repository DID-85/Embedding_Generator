// app/components/common/TierModal.tsx
interface TierModalProps {
    onClose: () => void;
  }
  
  export default function TierModal({ onClose }: TierModalProps) {
    return (
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
        <div className="bg-white p-6 rounded-md">
          <h2 className="text-lg font-bold mb-4 text-black">Subscription Tiers</h2>
          <ul className="text-black">
            <li>Tier 1: Basic Access</li>
            <li>Tier 2: Premium Access</li>
            <li>Tier 3: Enterprise Access</li>
          </ul>
          <button onClick={onClose} className="mt-4 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded">
            Close
          </button>
        </div>
      </div>
    );
  }