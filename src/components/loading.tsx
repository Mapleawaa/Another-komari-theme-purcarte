import { useEffect, useState } from "react";
import "./Loading.css";

type LoadingProps = {
  text?: string;
  children?: React.ReactNode;
  size?: number;
  className?: string;
};

const Loading = ({ text = "加载中...", children, size, className }: LoadingProps) => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    // Add a small delay to ensure the loading animation is visible
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div 
      className={`loading-container flex items-center justify-center flex-col min-h-screen p-4 ${className || ""}`}
      style={{ 
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'scale(1)' : 'scale(0.95)',
        transition: 'opacity 0.3s ease, transform 0.3s ease'
      }}
    >
      <div className={`showbox scale-${size ? size * 10 : 50}`}>
        <div className="loader">
          <svg className="circular" viewBox="25 25 50 50">
            <circle
              className="path"
              cx="50"
              cy="50"
              r="20"
              fill="none"
              strokeWidth="2"
              strokeMiterlimit="10"
            />
          </svg>
        </div>
      </div>
      <div className="loading-text mt-8 text-center">
        <p className="text-lg font-medium opacity-80 transition-opacity duration-300">请稍候</p>
        <p className="text-sm text-foreground/60 mt-2 transition-opacity duration-300">{text}</p>
        <div className="mt-6 text-xs text-foreground/50 animate-pulse">
          资源正在加载中...
        </div>
      </div>
      <div className="mt-8 transition-all duration-300">
        {children}
      </div>
    </div>
  );
};

export default Loading;
