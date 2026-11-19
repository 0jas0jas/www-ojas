"use client";

import { useEffect } from "react";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="plaster flex min-h-screen items-center justify-center p-4">
      <div className="relative max-w-md -rotate-[0.5deg] bg-[var(--sticky)] p-8 pt-10 text-[var(--ink)] shadow-[0_14px_28px_rgba(0,0,0,.6)]">
        <span className="pin" />
        <h2 className="anton text-4xl">something fell off the wall</h2>
        <p className="marker mt-3 text-lg">an unexpected error happened. give it another go.</p>
        <button type="button" onClick={() => reset()} className="anton mt-6 h-12 w-full bg-[var(--ink)] text-xl text-[var(--paper)]">
          try again
        </button>
      </div>
    </div>
  );
}
