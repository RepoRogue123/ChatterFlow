import { X, Palette } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import { useState, useRef, useEffect } from "react";
import ChatboxBgPopover from "./ChatboxBgPopover";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();
  const [showBgPopover, setShowBgPopover] = useState(false);
  const popoverRef = useRef();

  // Close popover when clicking outside
  useEffect(() => {
    if (!showBgPopover) return;
    function handleClick(e) {
      if (popoverRef.current && !popoverRef.current.contains(e.target)) {
        setShowBgPopover(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [showBgPopover]);

  return (
    <div className="p-2.5 border-b border-base-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="avatar">
            <div className="size-10 rounded-full relative">
              <img src={selectedUser.profilePic || "/avatar.png"} alt={selectedUser.fullName} />
            </div>
          </div>

          {/* User info */}
          <div>
            <h3 className="font-medium">{selectedUser.fullName}</h3>
            <p className="text-sm text-base-content/70">
              {onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}
            </p>
          </div>
        </div>

        {/* Right side: Palette icon and Close button */}
        <div className="flex items-center gap-2 relative">
          <button
            className="btn btn-ghost btn-sm p-1.5"
            title="Change chat background"
            onClick={() => setShowBgPopover((v) => !v)}
          >
            <Palette className="size-5" />
          </button>
          {showBgPopover && (
            <div ref={popoverRef}>
              <ChatboxBgPopover onClose={() => setShowBgPopover(false)} />
            </div>
          )}
          <button onClick={() => setSelectedUser(null)}>
            <X />
          </button>
        </div>
      </div>
    </div>
  );
};
export default ChatHeader;
