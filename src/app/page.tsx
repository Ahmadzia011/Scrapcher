// app/page.tsx
import { Suspense } from 'react';
import Navbar from './components/navbar';
import { PrimaryDashboard } from './components/primary-dashboard';
import SideBar from './components/sidebar';


export default function Page() {
  return (
    <div className="flex flex-col h-screen bg-[#FDFCFB]">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <SideBar />
        <PrimaryDashboard />
      </div>
    </div>
  );
}
