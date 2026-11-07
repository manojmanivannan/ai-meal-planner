import React from 'react';

interface BrandLogoProps {
  className?: string;
  size?: number;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({ className = '', size = 40 }) => {
  return (
    <div 
      className={`relative inline-flex items-center justify-center shrink-0 rounded-xl overflow-hidden shadow-sm ${className}`}
      style={{ width: size, height: size }}
    >
      <svg 
        viewBox="0 0 48 48" 
        width={size} 
        height={size} 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <defs>
          <linearGradient id="brand-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#15803d" />
            <stop offset="100%" stopColor="#166534" />
          </linearGradient>
        </defs>
        
        {/* Background rounded squircle */}
        <rect width="48" height="48" rx="12" fill="url(#brand-grad)" />
        
        {/* Rising steam */}
        <path d="M18 13C17 11.5 18 10 17 8.5" stroke="#ECFDF5" strokeWidth="2" strokeLinecap="round" opacity="0.9" />
        <path d="M24 12C23 10.5 24 9 23 7.5" stroke="#ECFDF5" strokeWidth="2" strokeLinecap="round" />
        <path d="M30 13C29 11.5 30 10 29 8.5" stroke="#ECFDF5" strokeWidth="2" strokeLinecap="round" opacity="0.9" />

        {/* Cookware / Bowl */}
        <path d="M12 21C12 18.5 14 17 17 17H31C34 17 36 18.5 36 21V23C36 29 30.6 34 24 34C17.4 34 12 29 12 23V21Z" fill="#FFFFFF" />
        
        {/* Inner rim depth */}
        <ellipse cx="24" cy="21" rx="10" ry="2.5" fill="#047857" opacity="0.25" />
        
        {/* Kitchen Table foundation */}
        <path d="M14 38H34" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" opacity="0.95" />
        <path d="M20 34V38M28 34V38" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
      </svg>
    </div>
  );
};
