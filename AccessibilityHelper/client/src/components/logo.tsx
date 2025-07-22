interface LogoProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export default function Logo({ size = "md", className = "" }: LogoProps) {
  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-8 h-8", 
    lg: "w-12 h-12"
  };

  return (
    <div className={`${sizeClasses[size]} ${className}`}>
      <svg
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Gradient definitions */}
        <defs>
          <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4ade80" />
            <stop offset="100%" stopColor="#0ea5e9" />
          </linearGradient>
        </defs>
        
        {/* Main B shape with accessibility symbol */}
        <rect
          x="4"
          y="6"
          width="3"
          height="20"
          rx="1.5"
          fill="url(#logoGradient)"
        />
        
        {/* Top curve of B */}
        <path
          d="M7 6h8c3.3 0 6 2.7 6 6s-2.7 6-6 6H7V6z"
          fill="url(#logoGradient)"
          opacity="0.8"
        />
        
        {/* Bottom curve of B */}
        <path
          d="M7 18h10c3.3 0 6 2.7 6 6s-2.7 6-6 6H7v-12z"
          fill="url(#logoGradient)"
        />
        
        {/* Accessibility bridge symbol */}
        <circle
          cx="26"
          cy="10"
          r="2"
          fill="#ffffff"
          opacity="0.9"
        />
        <path
          d="M24 14h4c1 0 1.8 0.8 1.8 1.8v2.4c0 1-0.8 1.8-1.8 1.8h-4c-1 0-1.8-0.8-1.8-1.8v-2.4c0-1 0.8-1.8 1.8-1.8z"
          fill="#ffffff"
          opacity="0.9"
        />
        <rect
          x="25"
          y="20"
          width="2"
          height="6"
          rx="1"
          fill="#ffffff"
          opacity="0.9"
        />
      </svg>
    </div>
  );
}