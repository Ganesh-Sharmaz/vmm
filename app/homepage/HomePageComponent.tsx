'use client'

import React from "react";
import NewsSection from "@/components/news/NewsSection";
import Link from "next/link";

const slogans = [
  "VMM: Where Shopping Bags Outlast Relationships!",
  "Crack the Exam, Guard the Nation (and the Discount Rack)!",
  "Harder than JEE, NEET, UPSC — Only Legends Guard the Trolleys!",
];

const motivationalQuotes = [
  '"99% Attendance, 1% Actually Working."',
  '"If you can guard Vishal, you can guard your secrets."',
  '"AIR 1: All India Rakshak! (Aisle Inspector Rank 1)"',
  '"Dream Big. Guard the Entry Bigger."',
  '"No Pain, No Free Polythene."',
];

const TICKER_TEXT = "Breaking: VMM Security Guard Results 2025 Declared! | Only 2 out of 10 lakh secure positions | Competition tougher than ever | Next application window opening soon";

export default function HomePageComponent() {
  

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Hero Section */}
      <div className="bg-gradient-to-b from-blue-900 to-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-block bg-red-600 text-white text-sm font-bold px-3 py-1 rounded-full mb-6 animate-pulse">
              APPLICATIONS OPEN
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">{slogans[0]}</h2>
            <p className="text-xl md:text-2xl text-blue-100 mb-4 italic">{slogans[1]}</p>
            <p className="text-lg text-blue-200 mb-8">{slogans[2]}</p>
            <Link
              href="/exams"
              className="inline-block bg-white text-blue-900 font-bold text-lg px-8 py-4 rounded-lg shadow-lg hover:bg-blue-50 transition-colors"
            >
              Apply for the Most Prestigious Guard Post!
            </Link>
            <div className="mt-4 text-sm text-blue-200 italic">*Free polythene with every application. T&amp;C apply.</div>
          </div>
        </div>
      </div>

      {/* News Ticker */}
      <div className="bg-blue-600 text-white overflow-hidden">
        <div className="py-3 px-4 max-w-7xl mx-auto flex items-center">
          <span className="font-bold mr-4 bg-white text-blue-600 px-3 py-1 rounded text-sm flex-shrink-0">LIVE</span>
          <div className="overflow-hidden whitespace-nowrap">
            <div className="animate-ticker inline-block">{TICKER_TEXT}</div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2">
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <span role="img" aria-label="inspiration" className="text-3xl">💡</span>
                Life Lessons from the Aisle
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {motivationalQuotes.map((quote, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-600"
                  >
                    <blockquote className="text-gray-700 font-serif italic text-lg">
                      {quote}
                    </blockquote>
                  </div>
                ))}
              </div>
            </section>

            <section className="bg-white rounded-lg shadow-md p-8 border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <span role="img" aria-label="exam" className="text-2xl">🛒</span>
                About the Legendary Exam
              </h3>
              <div className="prose prose-blue max-w-none">
                <ul className="space-y-4 text-gray-600">
                  <li className="flex items-start gap-3">
                    <span className="text-blue-600 font-bold">•</span>
                    <span>India&apos;s most prestigious and competitive security guard entrance exam (for shopping carts and hearts).</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-blue-600 font-bold">•</span>
                    <span>Over 15 lakh aspirants, 2 selections, 1 free whistle.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-blue-600 font-bold">•</span>
                    <span>Includes Physical, Mental, and Whistle-Blowing Aptitude Tests (literally).</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-blue-600 font-bold">•</span>
                    <span>Preparation requires discipline, courage, and a love for Vishal Mega Mart memes.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-blue-600 font-bold">•</span>
                    <span>Coaching available from Class 1 onwards. Parental pressure included free.</span>
                  </li>
                </ul>
              </div>
            </section>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-4 border-b border-gray-100">
                  <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                    <span role="img" aria-label="news" className="text-xl">📰</span>
                    Latest Updates
                  </h3>
                </div>
                <NewsSection />
              </div>
              
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></span>
                  <span className="text-sm font-medium text-yellow-800">RUMOR ALERT</span>
                </div>
                <p className="text-sm text-yellow-700 italic font-medium">
                  `Next year, guards might get chairs! Sources say it&apos;s still under consideration.`
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <style jsx global>{`
        @keyframes ticker {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
        .animate-ticker {
          animation: ticker 30s linear infinite;
        }
      `}</style>
    </div>
  );
}
