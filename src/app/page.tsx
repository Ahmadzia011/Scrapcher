// app/page.tsx
import Navbar from '../components/Navbar';
import { PrimaryDashboard } from '../components/PrimaryDashboard';
import Script from 'next/script';

export default function Page() {
  return (
    <div className="flex flex-col h-screen bg-[#FDFCFB]">

    <Script 
      src="http://localhost:3000/api/widget" 
      data-name="Prodiji Assitant"
      data-accent="#f59e0b"
      data-background="#f8fafc"
      data-panel="#ffffff"
      data-text="#0f172a"
      async>
       </Script>
      <Navbar />  
      <div className="flex flex-1 overflow-hidden">
        <PrimaryDashboard />
      </div>
    </div>
  );
}
