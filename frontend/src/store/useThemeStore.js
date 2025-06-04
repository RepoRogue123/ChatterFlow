import { create } from "zustand";

const getInitialChatboxBg = () => {
  try {
    const stored = localStorage.getItem("chatbox-bg");
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
};

export const useThemeStore = create((set) => ({
  theme: localStorage.getItem("chat-theme") || "coffee",
  setTheme: (theme) => {
    localStorage.setItem("chat-theme", theme);
    set({ theme });
  },
  // Chatbox background customization
  chatboxBg: getInitialChatboxBg(), // { type: 'preset' | 'custom', value: string } or null
  setChatboxBg: (bg) => {
    localStorage.setItem("chatbox-bg", JSON.stringify(bg));
    set({ chatboxBg: bg });
  },
  resetChatboxBg: () => {
    localStorage.removeItem("chatbox-bg");
    set({ chatboxBg: null });
  },
}));
