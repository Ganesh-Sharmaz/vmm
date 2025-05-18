import React from "react";
import newsItems from "./newsData";
import Link from "next/link";

type News = {
  id: string;
  title: string;
  date: string;
  content: string;
};

const NewsSection = () => {
  return (
    <div className="bg-white rounded-2xl shadow-md border-2 border-yellow-400 p-0 overflow-hidden font-['Georgia','Times_New_Roman',Roboto,serif]">
      <div className="bg-gradient-to-r from-red-600 to-yellow-400 flex items-center gap-2 px-4 py-2">
        <span className="text-white font-extrabold text-lg animate-pulse font-['Roboto','Arial',sans-serif]">📰 BREAKING NEWS</span>
        <span className="bg-black text-yellow-300 font-bold text-xs px-2 py-1 rounded ml-2 font-['Roboto','Arial',sans-serif]">LIVE</span>
      </div>
      <ul className="space-y-0 divide-y divide-yellow-100">
        {(newsItems as News[]).map((news, idx: number) => (
          <li
            key={idx}
            className={`px-5 py-4 ${idx === 0 ? 'bg-yellow-50 animate-pulse border-l-4 border-red-500' : 'bg-white'} flex flex-col gap-1`}
          >
            <Link href={`/news/${news.id}`} className="hover:underline">
              <div className="flex items-center gap-2 mb-1">
                {idx === 0 && (
                  <span className="bg-red-600 text-white font-bold text-xs px-2 py-1 rounded uppercase tracking-wider animate-pulse font-['Roboto','Arial',sans-serif]">FLASH</span>
                )}
                {idx === 1 && (
                  <span className="bg-blue-700 text-white font-bold text-xs px-2 py-1 rounded uppercase tracking-wider font-['Roboto','Arial',sans-serif]">EXCLUSIVE</span>
                )}
                <span className="text-xs text-gray-400 font-semibold font-['Roboto','Arial',sans-serif]">{news.date}</span>
              </div>
              <div className="font-extrabold text-lg text-black uppercase leading-tight font-['Georgia','Times_New_Roman',Roboto,serif]">
                {news.title}
              </div>
              <div className="text-gray-700 text-sm font-medium italic font-['Georgia','Times_New_Roman',Roboto,serif]">
                {news.content}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NewsSection; 