import { VolumeOff, Volume2Icon } from "lucide-react";
import { useGameStore } from "../hooks/useGameStore";

export default function SfxButton() {
  const sfxEnabled = useGameStore((state) => state.sfx);
  const toggleSfx = useGameStore((state) => state.toggleSfx);

  return (
    <button className="py-3 px-4" onClick={() => toggleSfx()}>
      {sfxEnabled ? <Volume2Icon /> : <VolumeOff />}
    </button>
  );
}
