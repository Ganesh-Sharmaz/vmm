'use client'

import React, { useEffect, useState } from "react";
import { app } from "@/app/firebaseConfig";
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { QUESTIONS, QandA } from "./qanda";
import Image from "next/image";

interface ExamLandingPageProps {
  examId: string;
}

function ExamLandingPage({ examId }: ExamLandingPageProps) {
  const [loading, setLoading] = useState(true);
  const [exists, setExists] = useState(false);
  const [timer, setTimer] = useState(300); // 5 minutes
  const [answers, setAnswers] = useState<(string | null)[]>(Array(QUESTIONS.length).fill(null));
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      console.log("Checking if user exists in 'examees' collection for id:", examId);
      const db = getFirestore(app);
      const docRef = doc(db, "examees", examId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        console.log("User found! Showing exam page.");
        setExists(true);
      } else {
        console.log("User not found! Showing error.");
        setExists(false);
      }
      setLoading(false);
    };
    if (examId) checkUser();
  }, [examId]);

  useEffect(() => {
    if (!exists) return;
    if (timer === 0) return;
    const interval = setInterval(() => setTimer((t) => t - 1), 1000);
    if (timer === 300) console.log("Timer started for 5 minutes");
    return () => clearInterval(interval);
  }, [exists, timer]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const randomExamMarks = Math.floor(Math.random() * 101); // 0-100
    try {
      const db = getFirestore(app);
      const appRef = doc(db, "applications", examId);
      const appSnap = await getDoc(appRef);
      let prevMarks = 0;
      if (appSnap.exists()) {
        prevMarks = appSnap.data().marks || 0;
      }
      await updateDoc(appRef, {
        marks: prevMarks + randomExamMarks,
        examAnswers: answers,
        examScore: randomExamMarks
      });
      router.push(`/results/${examId}`);
    } catch (err) {
      console.log(err);
      alert("Failed to submit exam. Please try again.");
      setSubmitting(false);
    }
  };

  if (loading) return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  if (!exists) return <div className="flex items-center justify-center min-h-screen text-red-600 font-bold text-xl">No such exam found. Did you try to sneak in?</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-cyan-100 flex flex-col items-center py-8 px-2">
      {/* Sticky timer for mobile and desktop */}
      <div className="w-full max-w-2xl sticky top-0 z-20 flex justify-center mb-4">
        <div className="bg-white/90 border-2 border-blue-300 shadow-lg rounded-xl px-6 py-3 flex items-center gap-3 mt-2 animate-fade-in">
          <span className="text-blue-700 font-bold text-lg md:text-xl">⏰</span>
          <span className="text-blue-800 font-extrabold text-lg md:text-2xl tracking-wider">
            {Math.floor(timer / 60)}:{(timer % 60).toString().padStart(2, '0')}
          </span>
          <span className="text-blue-500 font-semibold hidden sm:inline">left to become a legend!</span>
        </div>
      </div>
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border-2 border-blue-300 p-4 sm:p-8 flex flex-col gap-6 animate-fade-in">
        <h1 className="text-2xl md:text-3xl font-extrabold text-blue-700 text-center drop-shadow mb-2">
          VMM Security Guard Exam
        </h1>
        <div className="text-center text-base md:text-lg font-bold text-cyan-700 mb-4">
          <span className="inline-block bg-cyan-100 px-3 py-1 rounded-full shadow-sm mb-2">Competition is fierce! Only the bravest survive.</span><br />
          <span className="text-blue-500 font-semibold">Answer wisely. Fame, glory, and possibly a whistle await!</span>
        </div>
        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
          {QUESTIONS.map((q: QandA, idx: number) => (
            <div key={idx} className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-4 border-2 border-blue-100 shadow-md transition-all duration-200 hover:scale-[1.01]">
              <div className="font-bold text-blue-800 mb-2 text-base md:text-lg flex items-center gap-2">
                <span className="bg-blue-200 text-blue-800 rounded-full px-3 py-1 text-xs md:text-sm font-extrabold shadow">Q{idx + 1}</span>
                {q.question}
              </div>
              {q.image && (
                <div className="flex justify-center my-2">
                  <Image src={q.image} alt="question related" className="max-h-32 rounded-lg border border-blue-200 shadow" />
                </div>
              )}
              {q.type === 'mcq' && q.options && (
                <div className="flex flex-col gap-2 mt-2">
                  {q.options.map((opt, oidx) => (
                    <label key={oidx} className="flex items-center gap-3 text-blue-900 font-medium cursor-pointer transition-colors hover:text-cyan-700">
                      <input
                        type="radio"
                        name={`q${idx}`}
                        value={opt}
                        checked={answers[idx] === opt}
                        onChange={() => setAnswers(ans => { const copy = [...ans]; copy[idx] = opt; return copy; })}
                        className="accent-cyan-600 w-5 h-5 transition-all duration-150"
                      />
                      <span className="text-sm md:text-base">{opt}</span>
                    </label>
                  ))}
                </div>
              )}
              {q.type === 'input' && (
                <div className="flex flex-col gap-2 mt-2">
                  <input
                    type="text"
                    name={`q${idx}`}
                    value={answers[idx] || ''}
                    onChange={e => setAnswers(ans => { const copy = [...ans]; copy[idx] = e.target.value; return copy; })}
                    placeholder={q.inputLabel}
                    className="w-full border-2 border-blue-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-300 bg-blue-50 text-blue-900 placeholder-blue-400 font-semibold transition-shadow"
                  />
                </div>
              )}
            </div>
          ))}
          <button
            type="submit"
            className="mt-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-extrabold text-lg px-8 py-3 rounded-xl shadow-xl uppercase tracking-wider transition-transform hover:scale-105 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-cyan-300 disabled:opacity-60"
            disabled={submitting}
          >
            {submitting ? "Submitting..." : "Submit Answers (and hope for the best)"}
          </button>
        </form>
        <div className="text-xs text-blue-400 text-center mt-2 italic font-semibold">
          *If you finish early, you get extra staring practice.<br />
          <span className="text-cyan-600">Remember: Only the boldest can handle the trolley stampede.</span>
        </div>
      </div>
      <style jsx global>{`
        .animate-fade-in {
          animation: fadeIn 0.7s cubic-bezier(0.4,0,0.2,1);
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: none; }
        }
      `}</style>
    </div>
  );
}

export default ExamLandingPage;
