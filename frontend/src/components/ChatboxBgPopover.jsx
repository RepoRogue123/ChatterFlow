import { useRef, useState } from "react";
import { useThemeStore } from "../store/useThemeStore";

const PRESET_BACKGROUNDS = [
  { type: "preset", value: "#1F2937", label: "Dark" },
  { type: "preset", value: "#0ea5e9", label: "Blue" },
  { type: "preset", value: "#14B8A6", label: "Teal" },
  { type: "preset", value: "linear-gradient(135deg,#667eea 0%,#764ba2 100%)", label: "Aurora" },
  { type: "preset", value: "linear-gradient(135deg,#ff9966 0%,#ff5e62 100%)", label: "Sunset" },
  { type: "preset", value: "url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80')", label: "Abstract" },
];

export default function ChatboxBgPopover({ onClose }) {
  const { chatboxBg, setChatboxBg, resetChatboxBg } = useThemeStore();
  const [preview, setPreview] = useState(chatboxBg);
  const fileInputRef = useRef();

  const handlePreset = (bg) => setPreview(bg);

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setPreview({ type: "custom", value: ev.target.result });
    };
    reader.readAsDataURL(file);
  };

  const handleApply = () => {
    setChatboxBg(preview);
    onClose();
  };

  const handleReset = () => {
    resetChatboxBg();
    setPreview(null);
    onClose();
  };

  // Preview style
  let previewStyle = {};
  if (preview) {
    if (preview.type === "preset") {
      if (preview.value.startsWith("linear-gradient")) {
        previewStyle.background = preview.value;
      } else if (preview.value.startsWith("url")) {
        previewStyle.backgroundImage = preview.value;
        previewStyle.backgroundSize = "cover";
        previewStyle.backgroundPosition = "center";
      } else {
        previewStyle.background = preview.value;
      }
    } else if (preview.type === "custom") {
      previewStyle.backgroundImage = `url('${preview.value}')`;
      previewStyle.backgroundSize = "cover";
      previewStyle.backgroundPosition = "center";
    }
  }

  return (
    <div className="absolute right-0 mt-2 w-80 bg-base-100 rounded-lg shadow-lg border border-base-300 z-50 p-4 animate-fade-in">
      <h4 className="font-semibold mb-2">Chat Background</h4>
      <div className="flex flex-wrap gap-2 mb-3">
        {PRESET_BACKGROUNDS.map((bg) => (
          <button
            key={bg.label}
            className={`w-10 h-10 rounded border-2 ${preview && preview.value === bg.value ? "border-accent" : "border-transparent"}`}
            style={bg.value.startsWith("linear-gradient") || bg.value.startsWith("url") ? { background: bg.value, backgroundSize: "cover", backgroundPosition: "center" } : { background: bg.value }}
            title={bg.label}
            onClick={() => handlePreset(bg)}
          />
        ))}
        <label className="w-10 h-10 rounded border-2 border-dashed border-base-300 flex items-center justify-center cursor-pointer hover:border-accent">
          <input type="file" accept="image/*" className="hidden" ref={fileInputRef} onChange={handleFile} />
          <span className="text-xs text-base-content/60">+</span>
        </label>
      </div>
      <div className="mb-3">
        <div className="rounded-lg h-20 w-full border border-base-300" style={previewStyle} />
      </div>
      <div className="flex gap-2 justify-end">
        <button className="btn btn-sm" onClick={handleReset}>Reset</button>
        <button className="btn btn-sm btn-accent" onClick={handleApply} disabled={!preview}>Apply</button>
      </div>
    </div>
  );
} 