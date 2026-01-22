interface WaveformAnimationProps {
  isPlaying?: boolean;
  barCount?: number;
  height?: number;
}

const WaveformAnimation = ({ 
  isPlaying = false, 
  barCount = 16,
  height = 48 
}: WaveformAnimationProps) => {
  return (
    <div 
      className="flex items-end justify-center gap-[2px]"
      style={{ height: `${height}px` }}
    >
      {Array.from({ length: barCount }).map((_, i) => (
        <div
          key={i}
          className="waveform-bar w-1"
          style={{
            height: `${Math.random() * 60 + 40}%`,
            animationPlayState: isPlaying ? "running" : "paused",
            animationDelay: `${i * 0.05}s`,
          }}
        />
      ))}
    </div>
  );
};

export default WaveformAnimation;
