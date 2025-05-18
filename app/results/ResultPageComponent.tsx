"use client";

import React, { useEffect, useState } from "react";
import { RESULTEES, COMMENTS } from "./resulteesdata";
import { app } from "@/app/firebaseConfig";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import Link from "next/link";

const SATIRE_LINES = [
  "Rumor: Practiced bag checking on relatives.",
  "Can spot a suspicious trolley from 100m.",
  "Still waiting for the whistle.",
  "Dreams in polythene bags.",
  "Aunties fear their stare.",
  "Once stopped a trolley with bare hands.",
  "Knows all the mall's secret exits.",
  "Practiced for 27 hours a day.",
  "Lost to Sharma ji's son by 0.0001%.",
  "Aspires to be the next mall manager."
];

const TICKER_TEXT =
  "VMM Security Guard Result 2025: Only the bravest survived the trolley stampede! | Polythene distribution round tougher than ever! | Aunties still undefeated at the entrance.";

const ResultPageComponent = () => {
  const [yourResults, setYourResults] = useState<{ id: string; marks: number; percentile: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentDate] = useState(new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  }));

  useEffect(() => {
    const fetchYourResults = async () => {
      if (typeof window === "undefined") return;
      const idsRaw = localStorage.getItem("vmm_exam_ids");
      if (!idsRaw) {
        setLoading(false);
        return;
      }
      const ids: string[] = JSON.parse(idsRaw);
      const db = getFirestore(app);
      const results: { id: string; marks: number; percentile: string }[] = [];
      for (const id of ids) {
        const docRef = doc(db, "applications", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists() && docSnap.data().examAnswers) {
          const marks = docSnap.data().marks || 0;
          const percentile = (90 + Math.random() * 10).toFixed(4);
          results.push({ id, marks, percentile });
        }
      }
      setYourResults(results);
      setLoading(false);
    };
    fetchYourResults();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Masthead */}
      <div className="w-full bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="text-center border-b border-gray-200 pb-4">
            <div className="text-gray-500 text-sm font-medium">{currentDate}</div>
            <h1 className="font-serif text-5xl font-bold text-gray-900 mt-2 mb-4">The VMM Times</h1>
            <div className="text-sm text-gray-600">Your trusted source for Security Guard recruitment news</div>
          </div>
        </div>
      </div>

      {/* Breaking News Banner */}
      <div className="max-w-7xl mx-auto px-4 mt-8">
        <div className="bg-red-700 text-white p-6 rounded-lg shadow-lg">
          <div className="flex items-center gap-3 mb-2">
            <span className="bg-white text-red-700 px-3 py-1 rounded-full text-sm font-bold animate-pulse">BREAKING NEWS</span>
            <span className="text-sm">Updated 5 minutes ago</span>
          </div>
          <h2 className="text-3xl font-bold mb-3">VMM Security Guard Exam 2025 Results Declared</h2>
          <p className="text-lg font-medium">Competition reaches unprecedented levels as only 2 out of 10 lakh secure positions</p>
        </div>

        {/* News Ticker */}
        <div className="mt-6 bg-blue-600 text-white overflow-hidden rounded-lg">
          <div className="py-3 px-4 flex items-center">
            <span className="font-bold mr-4 bg-white text-blue-600 px-3 py-1 rounded text-sm">LIVE</span>
            <div className="overflow-hidden whitespace-nowrap">
              <div className="animate-ticker inline-block">{TICKER_TEXT}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Column */}
        <div className="lg:col-span-2">
          <div className="space-y-8">
            {/* Top Stories */}
            {RESULTEES.slice(0, 2).map((r, i) => (
              <article key={i} className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-semibold">Top Story</span>
                    <span className="text-gray-500 text-sm">5 mins read</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{r.name} Secures Dream Position</h3>
                  <div className="text-lg text-gray-700 mb-4">
                    Percentile: <span className="font-bold text-red-600">{r.percentile}</span>
                  </div>
                  <div className="flex items-center gap-2 text-green-700 font-semibold mb-3">
                    <span className="text-2xl">🏆</span>
                    <span>Successfully Secured the Position</span>
                  </div>
                  <p className="text-gray-600 italic">{SATIRE_LINES[i]}</p>
                </div>
              </article>
            ))}

            {/* Other Stories */}
            {RESULTEES.slice(2).map((r, i) => (
              <article key={i} className="bg-white rounded-lg shadow-sm border border-gray-100 p-5">
                <div className="flex items-center gap-2 mb-3">
                  <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">Latest Update</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{r.name}</h3>
                <div className="text-gray-700 mb-3">
                  Achieved <span className="font-semibold text-blue-600">{r.percentile}</span> percentile
                </div>
                <div className={`flex items-center gap-2 ${r.gotJob ? 'text-green-700' : 'text-red-600'} font-medium`}>
                  <span className="text-xl">{r.gotJob ? '🏆' : '😢'}</span>
                  <span>{r.gotJob ? 'Position Secured' : 'Better luck next year'}</span>
                </div>
                <p className="text-gray-500 text-sm italic mt-2">{SATIRE_LINES[(i + 2)]}</p>
              </article>
            ))}

            {/* Expert Comments Section */}
            <section className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 mt-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Expert Analysis & Comments</h3>
              <div className="space-y-4">
                {COMMENTS.map((c, i) => (
                  <div key={i} className="flex gap-3 items-start pb-3 border-b border-gray-100 last:border-0">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-blue-600 font-semibold">{i + 1}</span>
                      </div>
                    </div>
                    <p className="text-gray-700">{c}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6 sticky top-24">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Your Results Dashboard</h3>
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              </div>
            ) : yourResults.length === 0 ? (
              <div className="bg-red-50 text-red-700 p-4 rounded-lg">
                <p className="font-medium mb-2">No attempts recorded</p>
                <p className="text-sm">{"Don't miss out on the opportunity! The next exam window opens soon."}</p>
              </div>
            ) : (
              <div className="space-y-4">
                {yourResults.map((r, i) => (
                  <div key={i} className="border-b border-gray-100 last:border-0 pb-4">
                    <div className="text-sm text-gray-500 mb-1">Application ID</div>
                    <div className="font-mono text-blue-600 font-medium mb-2">{r.id}</div>
                    <div className="grid grid-cols-2 gap-4 mb-3">
                      <div>
                        <div className="text-sm text-gray-500">Marks</div>
                        <div className="font-semibold">{r.marks}/105</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">Percentile</div>
                        <div className="font-semibold">{r.percentile}</div>
                      </div>
                    </div>
                    <Link 
                      href={`/results/${r.id}`}
                      className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium text-sm"
                    >
                      View Detailed Report
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

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
};

export default ResultPageComponent; 