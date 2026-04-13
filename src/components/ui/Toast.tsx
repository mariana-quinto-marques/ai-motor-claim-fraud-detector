'use client';

import { useApp } from '@/context/AppContext';

export default function Toast() {
  const { state } = useApp();

  return (
    <div className={`toast${state.toastMessage ? ' on' : ''}`}>
      <div className="toast-accent" />
      <span>{state.toastMessage}</span>
    </div>
  );
}
