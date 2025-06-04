import { useChatStore } from "../store/useChatStore";
import { useEffect, useRef } from "react";
import { useThemeStore } from "../store/useThemeStore";

import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import { useAuthStore } from "../store/useAuthStore";
import { formatMessageTime } from "../lib/utils";

const getChatboxBgStyle = (chatboxBg) => {
  if (!chatboxBg) return { background: "#1F2937" };
  if (chatboxBg.type === "preset") {
    if (chatboxBg.value.startsWith("linear-gradient")) {
      return { background: chatboxBg.value };
    } else if (chatboxBg.value.startsWith("url")) {
      return {
        backgroundImage: chatboxBg.value,
        backgroundSize: "cover",
        backgroundPosition: "center",
      };
    } else {
      return { background: chatboxBg.value };
    }
  } else if (chatboxBg.type === "custom") {
    return {
      backgroundImage: `url('${chatboxBg.value}')`,
      backgroundSize: "cover",
      backgroundPosition: "center",
    };
  }
  return { background: "#1F2937" };
};

const ChatContainer = () => {
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();
  const { authUser } = useAuthStore();
  const { chatboxBg } = useThemeStore();
  const messageEndRef = useRef(null);

  useEffect(() => {
    getMessages(selectedUser._id);
    subscribeToMessages();
    return () => unsubscribeFromMessages();
  }, [selectedUser._id, getMessages, subscribeToMessages, unsubscribeFromMessages]);

  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const chatboxBgStyle = getChatboxBgStyle(chatboxBg);

  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-auto animate-fade-in" style={chatboxBgStyle}>
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-auto animate-fade-in" style={chatboxBgStyle}>
      <ChatHeader />

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={message._id}
            className={`chat ${message.senderId === authUser._id ? "chat-end" : "chat-start"} animate-slide-in`}
            style={{ animationDelay: `${index * 100}ms` }}
            ref={messageEndRef}
          >
            <div className="chat-image avatar">
              <div className="size-10 rounded-full border hover:scale-105 transition-transform duration-300">
                <img
                  src={
                    message.senderId === authUser._id
                      ? authUser.profilePic || "/avatar.png"
                      : selectedUser.profilePic || "/avatar.png"
                  }
                  alt="profile pic"
                  className="hover:opacity-90 transition-opacity duration-300"
                />
              </div>
            </div>
            <div className="chat-header mb-1">
              <time className="text-xs opacity-50 ml-1">
                {formatMessageTime(message.createdAt)}
              </time>
            </div>
            <div className={`chat-bubble flex flex-col ${
              message.senderId === authUser._id 
                ? 'bg-primary text-primary-content hover:bg-primary/90' 
                : 'bg-base-300 hover:bg-base-300/90'
            } transition-colors duration-300`}>
              {message.image && (
                <img
                  src={message.image}
                  alt="Attachment"
                  className="sm:max-w-[200px] rounded-md mb-2 hover:scale-[1.02] transition-transform duration-300"
                />
              )}
              {message.text && (
                <p className="break-words">{message.text}</p>
              )}
            </div>
          </div>
        ))}
      </div>

      <MessageInput />
    </div>
  );
};
export default ChatContainer;
