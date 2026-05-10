// app/page.tsx
import Navbar from '../app/components/NavBar';
import ChatBox from '../app/components/ChatBox';
import { Sidebar } from 'lucide-react';

export default async function Page() {

  return (
    <div className="flex flex-col h-screen bg-[#FDFCFB]">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        
        <ChatBox />
      </div>
    </div>
  );
}