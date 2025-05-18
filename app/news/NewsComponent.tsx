// Light theme: white and very light backgrounds, dark text, accent borders
'use client'

import React from "react";
import Link from "next/link";
import newsItems from "../../components/news/newsData";
import AdLeft from "../../components/news/AdLeft";
import AdRight from "../../components/news/AdRight";

type News = {
  id: string;
  title: string;
  date: string;
  content: string;
};

function NewsComponent() {
 

  return (
    <div className="min-h-screen bg-gray-50">
      

      {/* Breaking News Banner */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 text-white">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-block bg-white text-red-600 text-sm font-bold px-3 py-1 rounded-full mb-4 animate-pulse">
              BREAKING NEWS
            </div>
            <h2 className="text-3xl font-bold mb-4">VMM Security Guard Results Declared!</h2>
            <p className="text-lg text-red-100">
              Competition reaches unprecedented levels as only 2 out of 10 lakh secure positions
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-row justify-center gap-8 w-full max-w-7xl mx-auto px-4 py-12">
        {/* AdLeft */}
        <div className="hidden lg:block">
          <AdLeft />
        </div>

        {/* Main News Content */}
        <div className="max-w-3xl w-full">
          {/* Top Stories */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <span className="text-red-600">Top Stories</span>
              <span className="text-sm bg-red-600 text-white px-2 py-1 rounded-full">EXCLUSIVE</span>
            </h2>
            <div className="space-y-6">
              {(newsItems as News[]).slice(0, 2).map((news) => (
                <Link key={news.id} href={`/news/${news.id}`} className="block group">
                  <article className="bg-white rounded-lg shadow-md overflow-hidden transition-transform group-hover:scale-[1.02]">
                    <div className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                          Breaking
                        </span>
                        <time className="text-sm text-gray-500">{news.date}</time>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                        {news.title}
                      </h3>
                      <p className="text-gray-600">{news.content}</p>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </section>

          {/* Latest News */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <span>Latest Updates</span>
              <span className="text-sm bg-blue-600 text-white px-2 py-1 rounded-full">TRENDING</span>
            </h2>
            <div className="space-y-6">
              {(newsItems as News[]).slice(2).map((news) => (
                <Link key={news.id} href={`/news/${news.id}`} className="block group">
                  <article className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden transition-transform group-hover:scale-[1.02]">
                    <div className="p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <time className="text-sm text-gray-500">{news.date}</time>
                        <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                          Latest
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                        {news.title}
                      </h3>
                      <p className="text-gray-600 text-sm">{news.content}</p>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </section>
        </div>

        {/* AdRight */}
        <div className="hidden lg:block">
          <AdRight />
        </div>
      </div>

      {/* Newsletter */}
      <div className="bg-blue-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">Stay Updated with VMM Times</h2>
            <p className="text-blue-100 mb-6">
              Get the latest security guard exam news and updates delivered to your inbox.
              No spam, only whistle alerts!
            </p>
            <div className="flex gap-4 justify-center">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-3 rounded-lg bg-white text-gray-900 w-full max-w-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors">
                Subscribe
              </button>
            </div>
            <p className="text-xs text-blue-200 mt-4">
              By subscribing, you agree to receive promotional materials about polythene bags.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewsComponent;
