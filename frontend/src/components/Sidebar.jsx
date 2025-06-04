import { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";
import { Users, ToggleRight, ToggleLeft } from "lucide-react";

const Sidebar = () => {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } = useChatStore();

  const { onlineUsers } = useAuthStore();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const filteredUsers = showOnlineOnly
    ? users.filter((user) => onlineUsers.includes(user._id))
    : users;

  if (isUsersLoading) return <SidebarSkeleton />;

  return (
    <aside className="h-full w-20 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200 bg-[#23272f]/90">
      <div className="border-b border-base-300 w-full p-5">
        <div className="flex items-center gap-2">
          <Users className="size-6" />
          <span className="font-medium hidden lg:block">Contacts</span>
        </div>
        {/* Online filter toggle with icon */}
        <div className="mt-3 hidden lg:flex items-center gap-2">
          <label className="cursor-pointer flex items-center gap-2">
            <input
              type="checkbox"
              checked={showOnlineOnly}
              onChange={(e) => setShowOnlineOnly(e.target.checked)}
              className="checkbox checkbox-sm hidden"
            />
            {showOnlineOnly ? (
              <ToggleRight className="size-5 text-emerald-500" />
            ) : (
              <ToggleLeft className="size-5 text-zinc-500" />
            )}
            <span className="text-sm select-none">Show online only</span>
          </label>
          <span className="text-xs text-zinc-500">({onlineUsers.length - 1} online)</span>
        </div>
      </div>

      <div className="overflow-y-auto w-full py-3">
        {filteredUsers.map((user, idx) => (
          <div key={user._id}>
            <button
              onClick={() => setSelectedUser(user)}
              className={`
                w-full p-3 flex items-center gap-3
                transition-all duration-200
                hover:bg-base-300/60 hover:-translate-y-0.5
                ${selectedUser?._id === user._id ? "bg-base-300/80 ring-2 ring-emerald-400" : ""}
              `}
            >
              <div className="relative mx-auto lg:mx-0">
                <img
                  src={user.profilePic || "/avatar.png"}
                  alt={user.name}
                  className={`size-12 object-cover rounded-full border-2 transition-all duration-300
                    ${onlineUsers.includes(user._id)
                      ? "border-emerald-400 shadow-[0_0_0_3px_rgba(20,184,166,0.3)]"
                      : "border-zinc-600"}
                  `}
                />
                {/* Online indicator dot */}
                <span
                  className={`absolute bottom-0 right-0 size-3 rounded-full ring-2 ring-zinc-900
                    ${onlineUsers.includes(user._id) ? "bg-emerald-400" : "bg-zinc-500"}`}
                />
              </div>
              {/* User info - only visible on larger screens */}
              <div className="hidden lg:block text-left min-w-0">
                <div className="font-medium truncate">{user.fullName}</div>
                <div className="text-sm text-zinc-400">
                  {onlineUsers.includes(user._id) ? "Online" : "Offline"}
                </div>
              </div>
            </button>
            {/* Divider line except after last user */}
            {idx < filteredUsers.length - 1 && (
              <div className="border-b border-base-300 mx-4" />
            )}
          </div>
        ))}

        {filteredUsers.length === 0 && (
          <div className="text-center text-zinc-500 py-4">No online users</div>
        )}
      </div>
    </aside>
  );
};
export default Sidebar;
