import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="footer-glass p-3 sticky bottom-0 flex items-center justify-center z-10">
      <div className="footer-content flex flex-wrap justify-center text-xs sm:text-sm font-medium text-foreground gap-x-1.5 gap-y-0.5">
        <span>Powered by</span>
        <a
          href="https://github.com/komari-monitor/komari"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-accent-foreground/90 transition-colors font-semibold">
          Komari Monitor
        </a>
        
        <span>•</span>
        
        <span>Theme by</span>
        <span className="font-semibold">
          PurCarte
        </span>
        
        <span>•</span>
        
        <a
          href="https://github.com/Mapleawaa/Another-komari-theme-purcarte"
          target="_blank"
          rel="noopener noreferrer"
          className="rainbow-text font-semibold">
          Modified by CyreneNight
        </a>
      </div>
    </footer>
  );
};

export default Footer;
