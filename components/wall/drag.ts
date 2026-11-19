/**
 * Picking things up off the wall.
 *
 * Mouse / pen: press and move more than a few px → you're holding it. A plain click still clicks.
 * Touch: press and hold ~0.3s without moving → you're holding it. Moving earlier is a normal
 * swipe, so the wall still scrolls on phones.
 * Nothing is saved: a refresh puts everything back.
 */

/** Inside these, pointer presses are for the control, not for dragging. */
export const DRAG_IGNORE = "input, textarea, button, select, label, canvas, [data-nodrag]";

const HOLD_MS = 280;

/** Current wall scale (screen px per design px), from the --s CSS variable. */
export function currentScale(): number {
  const v = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--s"));
  return v > 0 ? v : 1;
}

/** Cancel the click that browsers fire after a drag ends on a link. */
export function swallowNextClick() {
  const swallow = (ev: MouseEvent) => {
    ev.preventDefault();
    ev.stopPropagation();
  };
  window.addEventListener("click", swallow, { capture: true, once: true });
  setTimeout(() => window.removeEventListener("click", swallow, { capture: true }), 0);
}

type DragOptions = {
  /** where the piece is now, in design px */
  from: { x: number; y: number };
  onMove: (x: number, y: number) => void;
  onPickUp?: () => void;
  onDrop?: () => void;
};

export function beginDrag(e: React.PointerEvent, o: DragOptions) {
  if (e.button !== 0) return;
  if ((e.target as HTMLElement).closest(DRAG_IGNORE)) return;

  const sx = e.clientX;
  const sy = e.clientY;
  const id = e.pointerId;
  const touch = e.pointerType === "touch";
  const s = currentScale();
  let active = false;
  let timer = 0;

  const blockScroll = (ev: TouchEvent) => ev.preventDefault();

  const pickUp = () => {
    active = true;
    o.onPickUp?.();
    if (touch) {
      window.addEventListener("touchmove", blockScroll, { passive: false });
      navigator.vibrate?.(8);
    }
  };

  const cleanup = () => {
    window.clearTimeout(timer);
    window.removeEventListener("pointermove", move);
    window.removeEventListener("pointerup", up);
    window.removeEventListener("pointercancel", up);
    window.removeEventListener("touchmove", blockScroll);
  };

  const move = (ev: PointerEvent) => {
    if (ev.pointerId !== id) return;
    const dx = ev.clientX - sx;
    const dy = ev.clientY - sy;
    if (!active) {
      if (touch) {
        // moved before the hold finished: it's a swipe, let the page scroll
        if (Math.hypot(dx, dy) > 8) cleanup();
        return;
      }
      if (Math.hypot(dx, dy) < 5) return;
      pickUp();
    }
    o.onMove(Math.round(o.from.x + dx / s), Math.round(o.from.y + dy / s));
  };

  const up = (ev: PointerEvent) => {
    if (ev.pointerId !== id) return;
    const wasHeld = active;
    cleanup();
    if (wasHeld) {
      o.onDrop?.();
      swallowNextClick();
    }
  };

  if (touch) timer = window.setTimeout(pickUp, HOLD_MS);
  window.addEventListener("pointermove", move);
  window.addEventListener("pointerup", up);
  window.addEventListener("pointercancel", up);
}
