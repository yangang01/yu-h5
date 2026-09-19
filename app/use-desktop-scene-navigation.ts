'use client';

import {useEffect, useRef, type Dispatch, type SetStateAction} from 'react';

export function useDesktopSceneNavigation(
  act: number,
  setAct: Dispatch<SetStateAction<number>>,
  setPulse: Dispatch<SetStateAction<number>>,
) {
  const wheelState = useRef({total: 0, lastEvent: -Infinity, lockedUntil: 0});

  useEffect(() => {
    const state = wheelState.current;
    state.total = 0;
    state.lockedUntil = performance.now() + 1200;

    const onWheel = (event: WheelEvent) => {
      // Preserve browser zoom and horizontal gestures, plus the opening/finale interactions.
      if (event.ctrlKey || Math.abs(event.deltaX) >= Math.abs(event.deltaY) || act < 1 || act > 6) return;
      event.preventDefault();
      const now = performance.now();
      const gap = now - state.lastEvent;
      state.lastEvent = now;
      if (now < state.lockedUntil) {
        state.total = 0;
        return;
      }
      // A long trackpad gesture must settle before it can advance another scene.
      if (state.lockedUntil > 0 && gap < 180) return;
      state.lockedUntil = 0;
      const delta = event.deltaY * (event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? window.innerHeight : 1);
      if (gap > 180 || Math.sign(delta) !== Math.sign(state.total)) state.total = 0;
      state.total += delta;
      if (Math.abs(state.total) < 55) return;

      const next = Math.max(1, Math.min(6, act + Math.sign(state.total)));
      state.total = 0;
      if (next === act) return;
      state.lockedUntil = now + 1200;
      setAct(next);
      setPulse(value => value + 1);
    };

    window.addEventListener('wheel', onWheel, {passive: false});
    return () => window.removeEventListener('wheel', onWheel);
  }, [act, setAct, setPulse]);
}
