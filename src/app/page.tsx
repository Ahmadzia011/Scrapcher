// app/page.tsx
import Navbar from '../components/Navbar';
import { PrimaryDashboard } from '../components/PrimaryDashboard';

export default function Page() {
  return (
    <div className="flex flex-col h-screen bg-[#FDFCFB]">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <PrimaryDashboard />
      </div>
    </div>
  );
}
