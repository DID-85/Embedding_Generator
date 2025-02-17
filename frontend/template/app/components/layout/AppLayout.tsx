// app/components/layout/AppLayout.tsx
import Sidebar from '../common/Sidebar';
import RightSidebar from '../page-specific/RightSidebar';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
      <div className="flex h-screen bg-red-700">
      {/* <Sidebar /> */}
      <div className="flex-1 flex flex-col bg-gray-100">
        <div className="center-section flex-1 flex">
          <main className="flex-1 p-4">
          {children}
          </main>
        </div>
      </div>
    </div>
  );
}