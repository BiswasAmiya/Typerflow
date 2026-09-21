import { useTheme } from '../context/ThemeContext';

interface TypeSmoothIconProps {
  size?: number;
  className?: string;
}

export default function TypeSmoothIcon({ size = 32, className = '' }: TypeSmoothIconProps) {
  const { theme } = useTheme();
  
  const primaryColor = theme === 'dark' ? '#B8FB3C' : '#03045E';
  const secondaryColor = theme === 'dark' ? '#03045E' : '#B8FB3C';
  
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 64 64" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Keyboard base */}
      <rect x="8" y="24" width="48" height="28" rx="4" fill={primaryColor} opacity="0.2"/>
      <rect x="8" y="24" width="48" height="28" rx="4" stroke={primaryColor} strokeWidth="2"/>
      
      {/* Keyboard keys */}
      <rect x="14" y="30" width="6" height="6" rx="1" fill={primaryColor}/>
      <rect x="22" y="30" width="6" height="6" rx="1" fill={primaryColor}/>
      <rect x="30" y="30" width="6" height="6" rx="1" fill={primaryColor}/>
      <rect x="38" y="30" width="6" height="6" rx="1" fill={primaryColor}/>
      <rect x="46" y="30" width="6" height="6" rx="1" fill={primaryColor}/>
      
      <rect x="14" y="38" width="6" height="6" rx="1" fill={primaryColor}/>
      <rect x="22" y="38" width="6" height="6" rx="1" fill={primaryColor}/>
      <rect x="30" y="38" width="6" height="6" rx="1" fill={primaryColor}/>
      <rect x="38" y="38" width="6" height="6" rx="1" fill={primaryColor}/>
      <rect x="46" y="38" width="6" height="6" rx="1" fill={primaryColor}/>
      
      <rect x="18" y="46" width="28" height="4" rx="1" fill={primaryColor}/>
      
      {/* Smooth motion waves */}
      <path 
        d="M 12 18 Q 20 12, 28 18 T 44 18 T 52 18" 
        stroke={secondaryColor} 
        strokeWidth="2.5" 
        strokeLinecap="round"
        fill="none"
        opacity="0.8"
      />
      <path 
        d="M 16 12 Q 24 6, 32 12 T 48 12" 
        stroke={secondaryColor} 
        strokeWidth="2" 
        strokeLinecap="round"
        fill="none"
        opacity="0.5"
      />
      
      {/* Speed lines */}
      <line x1="52" y1="20" x2="58" y2="20" stroke={secondaryColor} strokeWidth="2" strokeLinecap="round"/>
      <line x1="54" y1="24" x2="58" y2="24" stroke={secondaryColor} strokeWidth="2" strokeLinecap="round"/>
      <line x1="52" y1="28" x2="56" y2="28" stroke={secondaryColor} strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}
