import React from "react";
import Image from "next/image";
import adData from "./adData";

const AdRight = () => (
  <aside className="lg:flex flex-col items-center w-56 min-h-[400px] bg-white border-l border-slate-200 shadow-md rounded-l-2xl p-4 mt-8 gap-4">
    {adData.slice(Math.ceil(adData.length / 2)).map((ad, idx) => (
      <div key={idx} className="w-full bg-slate-50 border border-slate-200 rounded-xl flex flex-col items-center justify-center p-4 mb-2 shadow-sm">
        <Image width={64} height={64} src={ad.image} alt={ad.title} className="mb-2" />
        <span className="text-base font-bold text-blue-700 text-center mb-1">{ad.title}</span>
        <span className="text-xs text-gray-600 text-center mb-1">{ad.description}</span>
        <span className="text-xs text-blue-400 italic text-center">{ad.tagline}</span>
      </div>
    ))}
  </aside>
);

export default AdRight; 