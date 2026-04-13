'use client';

import { useEffect, useRef } from 'react';

export default function FloatingTooltip() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tt = ref.current;
    if (!tt) return;

    let hideTimer: ReturnType<typeof setTimeout>;

    function position(badge: Element) {
      if (!tt) return;
      const r = badge.getBoundingClientRect();
      const tw = tt.offsetWidth || 240;
      const th = tt.offsetHeight || 60;
      let left = r.left + r.width / 2 - tw / 2;
      let top = r.top - th - 10;
      const vw = window.innerWidth;
      if (left < 8) left = 8;
      if (left + tw > vw - 8) left = vw - tw - 8;
      if (top < 8) top = r.bottom + 10;
      tt.style.left = left + 'px';
      tt.style.top = top + 'px';
    }

    function onOver(e: MouseEvent) {
      const badge = (e.target as Element).closest('[data-tip]');
      if (!badge || !tt) return;
      clearTimeout(hideTimer);
      tt.textContent = badge.getAttribute('data-tip') || '';
      tt.classList.add('visible');
      position(badge);
    }

    function onMove(e: MouseEvent) {
      const badge = (e.target as Element).closest('[data-tip]');
      if (badge) position(badge);
    }

    function onOut(e: MouseEvent) {
      const badge = (e.target as Element).closest('[data-tip]');
      if (!badge || !tt) return;
      hideTimer = setTimeout(() => tt.classList.remove('visible'), 80);
    }

    document.addEventListener('mouseover', onOver);
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseout', onOut);

    return () => {
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseout', onOut);
    };
  }, []);

  return <div id="sig-tooltip" ref={ref} />;
}
