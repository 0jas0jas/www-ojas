"use client";

import { useCallback, useEffect, useState } from "react";
import type { GuestPost } from "@/lib/guest";

/** Private moderation page for the guest wall: hide, unhide or delete posts. */
export default function AdminPage() {
  const [posts, setPosts] = useState<GuestPost[] | null>(null);
  const [authed, setAuthed] = useState<boolean | null>(null);
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const load = useCallback(async () => {
    const res = await fetch("/api/admin/guest");
    if (res.status === 401) return setAuthed(false);
    const data = await res.json();
    if (!res.ok) {
      setAuthed(true);
      return setMsg(data.error ?? "couldn't load posts");
    }
    setAuthed(true);
    setPosts(data.posts);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/admin/login", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ password }) });
    if (!res.ok) return setMsg((await res.json().catch(() => ({}))).error ?? "nope");
    setMsg("");
    setPassword("");
    load();
  };

  const setHidden = async (p: GuestPost, hidden: boolean) => {
    const res = await fetch("/api/admin/guest", { method: "PATCH", headers: { "content-type": "application/json" }, body: JSON.stringify({ id: p.id, hidden }) });
    if (res.ok) setPosts((ps) => ps?.map((x) => (x.id === p.id ? { ...x, hidden } : x)) ?? null);
  };

  const remove = async (p: GuestPost) => {
    if (!window.confirm("Delete this post for good?")) return;
    const res = await fetch(`/api/admin/guest?id=${encodeURIComponent(p.id)}`, { method: "DELETE" });
    if (res.ok) setPosts((ps) => ps?.filter((x) => x.id !== p.id) ?? null);
  };

  return (
    <main className="mx-auto max-w-5xl px-4 py-10 text-[var(--paper)]">
      <h1 className="anton text-5xl">guest wall · admin</h1>

      {authed === false && (
        <form onSubmit={login} className="mt-8 flex max-w-sm flex-col gap-3 bg-[var(--paper)] p-5 text-[var(--ink)]">
          <label className="lbl" htmlFor="pw">PASSWORD</label>
          <input id="pw" type="password" className="field" value={password} onChange={(e) => setPassword(e.target.value)} autoFocus />
          <button type="submit" className="anton h-11 bg-[var(--ink)] text-xl text-[var(--paper)]">let me in</button>
        </form>
      )}

      {msg && <p className="mt-4 text-[var(--orange)]">{msg}</p>}

      {authed && posts && (
        <>
          <div className="mt-4 flex items-center gap-4 text-sm">
            <span>{posts.length} posts · {posts.filter((p) => p.hidden).length} hidden</span>
            <button
              type="button"
              className="underline"
              onClick={async () => {
                await fetch("/api/admin/login", { method: "DELETE" });
                setAuthed(false);
                setPosts(null);
              }}
            >
              log out
            </button>
          </div>
          <ul className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((p) => (
              <li key={p.id} className={`flex flex-col gap-2 bg-[var(--paper)] p-3 text-[var(--ink)] ${p.hidden ? "opacity-50" : ""}`}>
                <div className="text-xs">
                  {p.kind} · {new Date(p.created_at).toLocaleString()} {p.hidden && "· HIDDEN"}
                </div>
                {p.image_url && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={p.image_url} alt="" className="h-40 w-full object-contain" style={{ background: p.color ?? "#ddd" }} />
                )}
                {p.text && <p className="marker" style={{ background: p.color ?? undefined }}>{p.text}</p>}
                {p.caption && <p className="text-sm">caption: {p.caption}</p>}
                <p className="text-sm">— {p.name || "a visitor"}</p>
                <div className="mt-auto flex gap-2">
                  <button type="button" onClick={() => setHidden(p, !p.hidden)} className="h-10 flex-1 border-2 border-[var(--ink)]">
                    {p.hidden ? "unhide" : "hide"}
                  </button>
                  <button type="button" onClick={() => remove(p)} className="h-10 flex-1 bg-[var(--red)] text-[var(--paper)]">
                    delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </main>
  );
}
