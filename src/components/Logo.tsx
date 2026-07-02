import React from 'react';

export function Logo({ className = "w-12 h-12" }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <circle cx="50" cy="50" r="48" stroke="currentColor" strokeWidth="1" className="text-primary"/>
      <circle cx="50" cy="50" r="42" stroke="currentColor" strokeWidth="0.5" className="text-secondary"/>
      
      {/* Decorative floral/hair curves */}
      <path d="M 30 70 C 20 50, 40 30, 50 20 C 60 30, 80 50, 70 70" stroke="currentColor" strokeWidth="0.5" fill="none" className="text-accent" />
      <path d="M 40 70 C 35 60, 45 45, 50 40 C 55 45, 65 60, 60 70" stroke="currentColor" strokeWidth="0.5" fill="none" className="text-primary" />
      
      {/* Initials */}
      <text 
        x="50" 
        y="58" 
        fontFamily="'Playfair Display', serif" 
        fontSize="24" 
        fontWeight="400" 
        textAnchor="middle" 
        fill="currentColor"
        className="text-dark"
      >
        BG
      </text>
    </svg>
  );
}
