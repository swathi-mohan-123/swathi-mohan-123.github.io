"use client";

import { useState, type ReactNode } from "react";

type SketchProps = {
  label: string;
  action: string;
  idle: string;
  active: string;
  children: ReactNode;
};

export default function Sketch({ label, action, idle, active, children }: SketchProps) {
  const [on, setOn] = useState(false);

  return (
    <div className="sketch" data-on={on}>
      <div className="sketch-head">
        <span className="hand">{label}</span>
        <button type="button" aria-pressed={on} onClick={() => setOn(!on)}>
          {on ? "Reset ↺" : `${action} ↗`}
        </button>
      </div>
      {children}
      <p className="sketch-status" role="status">
        {on ? active : idle}
      </p>
    </div>
  );
}
