import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar = ({ links, contact, className = "" }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className={`sticky top-0 lg:fixed lg:top-0 lg:left-0 lg:right-0 z-50 w-full bg-white/90 backdrop-blur-md border-b border-gray-200/60 shadow-xs transition-all ${className}`}>
      <div className="max-w-4xl mx-auto px-4 py-3.5 flex items-center justify-between">
        
        {/* Desktop Links (Visible on sm and above) */}
        <div className="hidden sm:flex items-center gap-5">
          {links &&
            links.map((link, index) => (
              <a
                key={index}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-gray-800 hover:text-black transition-colors text-sm sm:text-base"
              >
                {link.name}
              </a>
            ))}
        </div>

        {/* Desktop Contact Info (Visible on sm and above) */}
        <div className="hidden sm:flex items-center gap-4">
          {contact &&
            contact.map((item, index) => (
              <a
                key={index}
                href={
                  item.includes("@")
                    ? `mailto:${item}`
                    : item.startsWith("+")
                    ? `tel:${item.replace(/\s+/g, "")}`
                    : item
                }
                className="font-semibold text-gray-600 hover:text-black transition-colors text-xs sm:text-sm"
              >
                {item}
              </a>
            ))}
        </div>

        {/* Mobile Header Bar (Visible on small devices) */}
        <div className="flex sm:hidden w-full items-center justify-between">
          <span className="font-bold text-gray-900 text-base">Portfolio</span>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-1.5 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="sm:hidden border-t border-gray-100 bg-white/95 px-4 pt-3 pb-4 space-y-3 shadow-md">
          {/* Mobile Links */}
          <div className="flex flex-col space-y-2">
            <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Navigation</span>
            {links &&
              links.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsOpen(false)}
                  className="font-medium text-gray-800 hover:text-black py-1 text-sm border-b border-gray-50 flex items-center justify-between"
                >
                  <span>{link.name}</span>
                  <span className="text-xs text-gray-400">↗</span>
                </a>
              ))}
          </div>

          {/* Mobile Contact Info */}
          <div className="flex flex-col space-y-2 pt-2 border-t border-gray-100">
            <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Contact</span>
            {contact &&
              contact.map((item, index) => (
                <a
                  key={index}
                  href={
                    item.includes("@")
                      ? `mailto:${item}`
                      : item.startsWith("+")
                      ? `tel:${item.replace(/\s+/g, "")}`
                      : item
                  }
                  onClick={() => setIsOpen(false)}
                  className="font-medium text-gray-600 hover:text-black py-0.5 text-xs"
                >
                  {item}
                </a>
              ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;