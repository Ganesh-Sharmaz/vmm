"use client";

import React, { useState } from "react";
import Link from "next/link";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentDate] = useState(new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  }));

  return (
    <header className="w-full bg-white border-b border-gray-200">
      {/* Top Bar */}
      <div className="bg-gray-900 text-white py-1">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center text-sm">
            <span className="font-medium">{currentDate}</span>
            <div className="hidden sm:flex items-center gap-4">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                LIVE Updates
              </span>
              <span>|</span>
              <span>VMM Security Times</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Logo/Brand */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="flex flex-col">
              <span className="text-3xl font-serif font-bold text-gray-900 tracking-tight group-hover:text-blue-600 transition-colors">
                VMM Times
              </span>
              <span className="text-sm text-gray-500">Security Guard Edition</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden sm:flex items-center gap-6">
            <Link 
              href="/news" 
              className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
            >
              Latest News
            </Link>
            <Link 
              href="/results" 
              className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
            >
              Results
            </Link>
            <Link 
              href="/exams" 
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-sm"
            >
              Apply Now for Security Guard Job !!
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="sm:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <svg 
              className="w-6 h-6 text-gray-600" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              {menuOpen ? (
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Breaking News Ticker */}
        <div className="py-2 border-t border-gray-100 overflow-hidden">
          <div className="flex items-center gap-4">
            <span className="flex-shrink-0 bg-red-600 text-white text-sm font-bold px-3 py-1 rounded">
              BREAKING
            </span>
            <div className="overflow-hidden whitespace-nowrap">
              <div className="animate-ticker inline-block text-gray-600">
                VMM Security Guard Results 2025 Declared | Only 2 out of 10 lakh secure positions | Competition tougher than ever | Next application window opening soon
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="sm:hidden border-t border-gray-200 bg-white">
          <div className="max-w-7xl mx-auto px-4 py-3 space-y-3">
            <Link 
              href="/news" 
              className="block text-gray-600 hover:text-gray-900 font-medium py-2 transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              Latest News
            </Link>
            <Link 
              href="/results" 
              className="block text-gray-600 hover:text-gray-900 font-medium py-2 transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              Results
            </Link>
            <Link 
              href="/exams" 
              className="block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors text-center shadow-sm"
              onClick={() => setMenuOpen(false)}
            >
              Apply Now
            </Link>
          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes ticker {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
        .animate-ticker {
          animation: ticker 30s linear infinite;
        }
      `}</style>
    </header>
  );
}

export default Header;
