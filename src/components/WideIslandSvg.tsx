import React from "react";

export const WideIslandSvg = ({
  fillColor = "#58CC02",
  ...props
}: React.SVGAttributes<SVGElement> & { fillColor?: string }) => {
  return (
    <svg width="320" height="150" viewBox="0 0 320 150" {...props}>
      <defs>
        <pattern id="pattern-circles" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse" patternContentUnits="userSpaceOnUse">
          <circle cx="10" cy="10" r="2" fill="rgba(255, 255, 255, 0.15)" />
        </pattern>
      </defs>
      <path
        d="M0 30C0 13.4315 13.4315 0 30 0H290C306.569 0 320 13.4315 320 30V150H0V30Z"
        fill={fillColor}
      />
      <rect x="0" y="0" width="320" height="150" fill="url(#pattern-circles)" />
      
      {/* Subtle light effect on top */}
      <path
        d="M0 30C0 13.4315 13.4315 0 30 0H290C306.569 0 320 13.4315 320 30V50H0V30Z"
        fill="white"
        opacity="0.1"
      />
    </svg>
  );
};

export default WideIslandSvg;