import { useState, useMemo } from "react";

/**
 * Mini music player UI with animated equalizer.
 *
 * Props:
 * - title?: string
 * - artist?: string
 * - coverSrc?: string
 * - playing?: boolean (controlled). If omitted, component manages its own state.
 * - onToggle?: (nextPlaying: boolean) => void
 * - className?: string
 */
export default function MusicPlayerMini({
  title = "Illegal",
  artist = "Unknown Artist",
  cover,         // new alias
  image,         // new alias
  artwork,       // new alias
  coverSrc: coverProp, // support old prop name as alias
  playing: controlledPlaying,
  onToggle,
  className = "",
}) {
  const resolvedCover = coverProp || cover || image || artwork;

  const [uncontrolledPlaying, setUncontrolledPlaying] = useState(true);
  const playing = controlledPlaying ?? uncontrolledPlaying;

  const handleToggle = () => {
    const next = !playing;
    if (controlledPlaying === undefined) setUncontrolledPlaying(next);
    onToggle?.(next);
  };

  const initials = useMemo(() => {
    const s = (title || "").trim();
    if (!s) return "♪";
    const parts = s.split(/\s+/).slice(0, 2);
    return parts.map(p => p[0]).join("").toUpperCase();
  }, [title]);

  return (
    <div
      className={`mpm-container ${className}`}
      role="region"
      aria-label="Mini music player"
    >
      <style>
        {`
        .mpm-container{display:flex;align-items:center;gap:12px;padding:10px 12px;border-radius:12px;background:rgba(20,20,20,.75);backdrop-filter:blur(6px);box-shadow:0 8px 24px rgba(0,0,0,.25);}
        .mpm-cover{width:56px;height:56px;border-radius:8px;object-fit:cover;background:#111;box-shadow:0 6px 14px rgba(0,0,0,.35);overflow:hidden;display:flex;align-items:center;justify-content:center;color:#bbb;font-weight:700;font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Ubuntu,"Helvetica Neue",Arial;}
        .mpm-meta{min-width:0;display:flex;flex-direction:column;gap:4px}
        .mpm-title{font-size:14px;line-height:1.2;color:#f5f5f5;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
        .mpm-artist{font-size:12px;line-height:1.2;color:#bbb;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
        .mpm-controls{margin-left:auto;display:flex;align-items:center;gap:10px}
        .mpm-btn{appearance:none;border:0;background:#fff;color:#111;border-radius:999px;width:36px;height:36px;display:grid;place-items:center;cursor:pointer;box-shadow:0 6px 14px rgba(255,255,255,.15);}
        .mpm-btn:active{transform:translateY(1px)}
        .mpm-btn svg{width:16px;height:16px;display:block;margin:auto}

        /* Equalizer */
        .mpm-eq{height:38px;width:18px;display:flex;gap:2px;align-items:flex-end}
        .mpm-eq span{flex:1;height:100%;border-radius:1px;background:#FFE600;opacity:.95;transform-origin:bottom;will-change:transform;animation:mpm-bounce .8s ease-in-out infinite}
        .mpm-eq span:nth-child(2){animation-delay:.1s;animation-duration:.7s}
        .mpm-eq span:nth-child(3){animation-delay:.2s;animation-duration:1.1s}
        .mpm-eq span:nth-child(4){animation-delay:.15s;animation-duration:.9s}
        .mpm-eq span:nth-child(5){animation-delay:.05s;animation-duration:1.2s}
        @keyframes mpm-bounce{0%{transform:scaleY(.2)}25%{transform:scaleY(.85)}50%{transform:scaleY(.4)}75%{transform:scaleY(1)}100%{transform:scaleY(.2)}}
        .mpm-eq.paused span{animation-play-state:paused;transform:scaleY(.3)}

        @media (prefers-reduced-motion: reduce){
          .mpm-eq span{animation:none;}
          .mpm-progress > i{animation:none}
        }
      `}
      </style>

      {resolvedCover ? (
        <img className="mpm-cover" src={resolvedCover} alt="Cover art" onError={(e)=>{e.currentTarget.style.display='none'}} />
      ) : (
        <div className="mpm-cover" aria-hidden>{initials}</div>
      )}

      <div className="mpm-meta" style={{flex:1}}>
        <div className="mpm-title" title={title}>{title}</div>
        <div className="mpm-artist" title={artist}>{artist}</div>
        <div className="mpm-progress" aria-hidden><i/></div>
      </div>

      <div className="mpm-controls">
        <div className={`mpm-eq ${playing ? '' : 'paused'}`} aria-hidden>
          <span/><span/><span/><span/><span/>
        </div>
      </div>
    </div>
  );
}