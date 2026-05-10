// app/page.tsx
import Navbar from './components/NavBar';
import ChatBox from './components/ChatBox';
import SideBar from './components/SideBar';

export default function Page() {

  return (
    <div className="flex flex-col h-screen bg-[#FDFCFB]">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <SideBar />
        <ChatBox />
      </div>
    </div>
  );
}