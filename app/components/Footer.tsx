import React from 'react';
import Link from 'next/link';

export default function Footer() {
  const currentYear = 2025;
  
  return (
    <footer className="w-full border-t border-gray-200 py-6 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm text-gray-600">
              © {currentYear} <Link 
                href="https://github.com/demonarch"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 transition-colors"
              >
                demonarch
              </Link>. All rights reserved.
            </p>
          </div>
          <div>
            <Link 
              href="https://github.com/demonarch/ff16c880f29eeba3615f1e874f52996a-mono"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
            >
              GitHub Repository
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}