import * as React from "react";
import { MOBILE_ASPECT } from "./screens";

/** Phone bezel sized to the mobile screenshots; stack images inside it. */
const PhoneFrame: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = "",
}) => (
  <div
    className={`rounded-[2rem] border-[6px] border-ink-900 bg-ink-900 shadow-[0_25px_60px_-15px_rgba(15,23,42,0.5)] ${className}`}
  >
    <div
      className="relative overflow-hidden rounded-[1.6rem] bg-[#f7f8fa]"
      style={{ aspectRatio: MOBILE_ASPECT }}
    >
      {children}
    </div>
  </div>
);

export default PhoneFrame;
