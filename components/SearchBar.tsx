import { Search, X, Command } from "lucide-react";
import { useEffect, useRef } from "react";

type Props = {
  value: string;
  onChange: (val: string) => void;
};

export default function SearchBar({ value, onChange }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  // LOGIC SHORTCUT CTRL+K / CMD+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="relative group w-full max-w-2xl mx-auto">
      {/* Glow effect */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-500 to-orange-600 rounded-2xl opacity-0 blur group-focus-within:opacity-20 transition duration-500"></div>
      
      <div className="relative flex items-center">
        <div className="absolute left-4 z-10 text-zinc-500 group-focus-within:text-amber-500 transition-colors">
          <Search size={20} strokeWidth={2.5} />
        </div>

        <input
          ref={inputRef} // Hubungkan ref di sini
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Cari cafe, lokasi, atau vibe..."
          className="w-full rounded-2xl bg-zinc-900 border border-white/10 py-4 pl-12 pr-12 text-sm text-white placeholder:text-zinc-600 transition-all focus:outline-none focus:border-amber-500/50 focus:bg-zinc-800/50 shadow-2xl"
        />

        <div className="absolute right-4 flex items-center gap-2">
          {value ? (
            <button
              onClick={() => onChange("")}
              className="p-1 rounded-md bg-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-700 transition-all"
            >
              <X size={16} />
            </button>
          ) : (
            <div className="hidden md:flex items-center gap-1 px-2 py-1 rounded-lg border border-white/5 bg-white/5 text-[10px] font-black text-zinc-500 uppercase">
              <span className="text-[8px]">CTRL</span> K
            </div>
          )}
        </div>
      </div>
    </div>
  );
}