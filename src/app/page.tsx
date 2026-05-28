// app/page.tsx
import Navbar from '../components/Navbar';
import { PrimaryDashboard } from '../components/PrimaryDashboard';

export default function Page() {
  return (
    <div className="flex flex-col h-screen bg-[#FDFCFB]">

    <script 
      src="https://scrapcher.vercel.app/api/widget" 
      data-name="Assistant"
      data-accent="#f59e0b"
      data-background="#f8fafc"
      data-panel="#ffffff"
      data-text="#0f172a"
      async>
       </script>
       
      <Navbar />  
      <div className="flex flex-1 overflow-hidden">
        <PrimaryDashboard />
      </div>
    </div>
  );
}
