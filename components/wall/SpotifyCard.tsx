"use client";

import { useEffect, useState } from "react";

type Track = { name: string; artist: string; albumArt: string; spotifyUrl: string };

/** "Top track this month", pulled live from /api/spotify. */
export function SpotifyCard() {
  const [track, setTrack] = useState<Track | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    fetch("/api/spotify")
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then(setTrack)
      .catch(() => setFailed(true));
  }, []);

  return (
    <>
      <div style={{ fontSize: 13, letterSpacing: ".2em", color: "var(--orange)" }}>ON REPEAT</div>
      <div className="anton" style={{ fontSize: 46, lineHeight: 0.95 }}>top track this month</div>
      <a
        href={track?.spotifyUrl ?? "https://open.spotify.com"}
        target="_blank"
        rel="noopener noreferrer"
        style={{ display: "flex", alignItems: "center", gap: 14, background: "#2a201b", padding: 12, borderRadius: 6, color: "inherit", textDecoration: "none" }}
      >
        {track?.albumArt ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={track.albumArt} alt="" width={56} height={56} draggable={false} style={{ width: 56, height: 56, objectFit: "cover", flexShrink: 0 }} />
        ) : (
          <span style={{ width: 56, height: 56, borderRadius: "50%", background: "var(--orange)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
              <path d="M5 3 L15 9 L5 15 Z" fill="var(--ink)" />
            </svg>
          </span>
        )}
        <span style={{ display: "flex", flexDirection: "column", gap: 4, minWidth: 0 }}>
          <span style={{ fontSize: 15, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
            {track ? track.name : failed ? "the jukebox is broken" : "warming up the jukebox…"}
          </span>
          <span style={{ fontSize: 12, color: "#b8ab98", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
            {track ? `${track.artist} · play on spotify ↗` : "live from spotify"}
          </span>
        </span>
      </a>
    </>
  );
}
