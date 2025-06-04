import { useChatStore } from "../store/useChatStore";

import Sidebar from "../components/Sidebar";
import NoChatSelected from "../components/NoChatSelected";
import ChatContainer from "../components/ChatContainer";

const HomePage = () => {
  const { selectedUser } = useChatStore();

  return (
    <div className="h-screen">
      <div className="flex items-center justify-center pt-20 px-4">
        <div className="bg-base-100/80 rounded-lg shadow-cl w-full max-w-6xl h-[calc(100vh-8rem)] backdrop-blur-md">
          <div className="flex h-full rounded-lg overflow-hidden">
            <div className="bg-[#23272f]/90 border-r border-base-300 h-full">
              <Sidebar />
            </div>
            <div className="flex-1 h-full bg-[#1F2937] flex flex-col">
              {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default HomePage;
