import React from 'react'

/** 一个卡通火箭 + 云层的占位 SVG 插画 */
export const DefaultRocketIllustration: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 600 400" xmlns="http://www.w3.org/2000/svg" aria-label="rocket-illustration">
    <defs>
      <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#e0f2fe"/>
        <stop offset="100%" stopColor="#fce7f3"/>
      </linearGradient>
      <linearGradient id="rocket" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#93c5fd"/>
        <stop offset="100%" stopColor="#fda4af"/>
      </linearGradient>
    </defs>

    <rect width="100%" height="100%" fill="url(#sky)"/>

    {/* 云层 */}
    <g fill="#fff" opacity="0.9">
      <ellipse cx="120" cy="300" rx="90" ry="28"/>
      <ellipse cx="200" cy="310" rx="110" ry="30"/>
      <ellipse cx="280" cy="300" rx="90" ry="28"/>
    </g>

    {/* 火箭主体 */}
    <g transform="translate(180,60)">
      <path d="M120 0 C150 40 160 90 160 130 C160 170 150 220 120 260 C90 220 80 170 80 130 C80 90 90 40 120 0 Z" fill="url(#rocket)"/>
      <circle cx="120" cy="120" r="18" fill="#fff" stroke="#60a5fa" strokeWidth="4"/>
      {/* 侧翼 */}
      <path d="M80 150 L40 180 L80 210 Z" fill="#fda4af"/>
      <path d="M160 150 L200 180 L160 210 Z" fill="#93c5fd"/>
      {/* 尾焰 */}
      <path d="M110 250 L120 310 L130 250 Z" fill="#f59e0b"/>
      <path d="M116 250 L120 290 L124 250 Z" fill="#fbbf24"/>
    </g>
  </svg>
)

