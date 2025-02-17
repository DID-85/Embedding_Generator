// app/components/layout/RootLayout.tsx
import Sidebar from '../common/Sidebar';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 bg-gray-100 p-4">
        {children}
      </div>
    </div>
  );
}