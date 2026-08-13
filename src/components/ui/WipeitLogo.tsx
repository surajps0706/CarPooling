import React from 'react';

interface WipeitLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'dark' | 'light';
}

export const WipeitLogo: React.FC<WipeitLogoProps> = ({
  className = '',
  size = 'md',
  variant = 'dark'
}) => {
  const heightMap = {
    sm: 'h-8',
    md: 'h-11',
    lg: 'h-16'
  };

  const textColor = variant === 'light' ? '#FFFFFF' : '#0F2537';
  const blueColor = '#007BFF';

  return (
    <div className={`inline-flex items-center gap-2 select-none ${className}`}>
      <svg
        viewBox="0 0 520 160"
        className={`${heightMap[size]} w-auto drop-shadow-sm`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Sparkles top left */}
        <path
          d="M140 18L143 28L153 31L143 34L140 44L137 34L127 31L137 28Z"
          fill={blueColor}
        />
        <path
          d="M165 8L167.5 16L175.5 18.5L167.5 21L165 29L162.5 21L154.5 18.5L162.5 16Z"
          fill={blueColor}
        />

        {/* Car outline roof and washing water jet stream */}
        <path
          d="M60 62C75 48 115 32 170 32C225 32 265 48 280 62"
          stroke={textColor}
          strokeWidth="6"
          strokeLinecap="round"
        />

        {/* Pressure Washer Nozzle & Spray */}
        <path
          d="M260 58 L305 24 L315 28 L272 62"
          fill={textColor}
        />
        <path
          d="M315 28 L355 45 M317 32 L360 55 M318 36 L355 68"
          stroke={blueColor}
          strokeWidth="4"
          strokeLinecap="round"
        />

        {/* Water droplets */}
        <circle cx="348" cy="74" r="5" fill={blueColor} />
        <circle cx="360" cy="50" r="3.5" fill={blueColor} />
        <circle cx="330" cy="60" r="3" fill={blueColor} />

        {/* MAIN TEXT: WIPE IT */}
        <g fill={textColor}>
          {/* 'W' with tire tread slashes */}
          <path d="M20 65 L48 135 L68 135 L82 92 L96 135 L116 135 L144 65 L120 65 L106 108 L92 65 L76 65 L62 108 L44 65 Z" />
          {/* Tire treads on W */}
          <line x1="28" y1="75" x2="36" y2="80" stroke="#FFFFFF" strokeWidth="3.5" strokeLinecap="round" />
          <line x1="32" y1="87" x2="40" y2="92" stroke="#FFFFFF" strokeWidth="3.5" strokeLinecap="round" />
          <line x1="36" y1="99" x2="44" y2="104" stroke="#FFFFFF" strokeWidth="3.5" strokeLinecap="round" />

          {/* 'I' */}
          <rect x="154" y="65" width="22" height="70" rx="3" />

          {/* 'P' with Car Front Cutout */}
          <path d="M184 65 H245 C265 65 275 75 275 90 C275 105 265 115 245 115 H206 V135 H184 V65 Z M206 82 V98 H238 C248 98 253 94 253 90 C253 86 248 82 238 82 H206 Z" />
          {/* Car front icon inside P */}
          <g fill={textColor}>
            <path d="M214 96 C214 91 222 88 230 88 C238 88 246 91 246 96 L248 104 H212 Z" fill="#FFFFFF" />
            <circle cx="220" cy="100" r="2" fill={textColor} />
            <circle cx="240" cy="100" r="2" fill={textColor} />
          </g>

          {/* 'E' with blue swoosh */}
          <path d="M285 65 H340 V82 H307 V91 H332 V108 H307 V118 H342 V135 H285 V65 Z" />
          <path d="M307 118 Q325 128 348 135 H307 Z" fill={blueColor} />

          {/* 'I' of IT (Motorcycle Front view) */}
          <rect x="365" y="65" width="22" height="70" rx="3" />
          <line x1="371" y1="75" x2="381" y2="82" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
          <line x1="371" y1="90" x2="381" y2="97" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
          <line x1="371" y1="105" x2="381" y2="112" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />

          {/* 'T' */}
          <path d="M395 65 H450 V82 H433 V135 H412 V82 H395 V65 Z" />
        </g>

        {/* Motorcycle Front graphic over IT */}
        <g stroke={textColor} strokeWidth="4" fill="none">
          {/* Handlebars */}
          <path d="M375 58 C385 45 400 42 410 40 M445 58 C435 45 420 42 410 40" strokeWidth="4.5" strokeLinecap="round" />
          {/* Mirrors */}
          <ellipse cx="372" cy="40" rx="6" ry="10" fill={textColor} stroke="none" />
          <ellipse cx="448" cy="40" rx="6" ry="10" fill={textColor} stroke="none" />
          {/* Headlight */}
          <circle cx="410" cy="54" r="11" fill={blueColor} stroke={textColor} strokeWidth="4" />
          <circle cx="410" cy="54" r="4" fill="#FFFFFF" stroke="none" />
        </g>

        {/* Subtitle Line: — CAR • BIKE • WASH — */}
        <line x1="50" y1="152" x2="110" y2="152" stroke={blueColor} strokeWidth="3" strokeLinecap="round" />
        <text
          x="260"
          y="156"
          textAnchor="middle"
          fill={textColor}
          fontSize="15"
          fontWeight="900"
          letterSpacing="4.5"
        >
          CAR • BIKE • WASH
        </text>
        <line x1="410" y1="152" x2="470" y2="152" stroke={blueColor} strokeWidth="3" strokeLinecap="round" />
      </svg>
    </div>
  );
};
