'use client'

import React, { useState } from "react";
import NewsSection from "@/components/news/NewsSection";
import { app } from "@/app/firebaseConfig";
import { getFirestore, doc, setDoc, updateDoc, increment } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";

function ExamPageComponent() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const db = getFirestore(app);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const form = e.currentTarget;
    const formData = new FormData(form);
    const name = formData.get("name") as string;
    const fatherName = formData.get("fatherName") as string;
    const occupation = formData.get("occupation") as string;
    const dream = formData.get("dream") as string;
    const skills = formData.getAll("skills") as string[];
    const height = formData.get("height") as string;
    const motherDream = formData.get("motherDream") as string;
    // Check if all fields are filled
    const allFilled = name && fatherName && occupation && dream && skills.length && height && motherDream;
    const marks = allFilled ? 5 : 0;
    const userId = uuidv4();
    console.log("Form submission started");
    console.log("Form data:", { name, fatherName, occupation, dream, skills, height, motherDream, marks, userId });
    try {
      // Store full application
      console.log("Writing application data to Firestore...");
      await setDoc(doc(db, "applications", userId), {
        name,
        fatherName,
        occupation,
        dream,
        skills,
        height,
        motherDream,
        marks,
        createdAt: new Date().toISOString(),
      });
      // Increment total users
      console.log("Incrementing total users counter...");
      await updateDoc(doc(db, "meta", "totals"), { totalUsers: increment(1) });
      // Add to examees
      console.log("Adding user to 'examees' collection...");
      await setDoc(doc(db, "examees", userId), { name, userId });
      // Redirect to exam landing
      // Save userId to localStorage for result tracking
      if (typeof window !== 'undefined') {
        const prev = localStorage.getItem('vmm_exam_ids');
        const ids: string[] = prev ? JSON.parse(prev) : [];
        if (!ids.includes(userId)) ids.push(userId);
        localStorage.setItem('vmm_exam_ids', JSON.stringify(ids));
      }
      console.log("Submission successful! Redirecting to exam page for userId:", userId);
      router.push(`/exams/${userId}`);
    } catch (err) {
      // @ts-expect-error Firestore error may not be typed, handle 'not-found' error
      if (err.code === "not-found") {
        console.log("meta/totals doc not found, creating it...");
        await setDoc(doc(db, "meta", "totals"), { totalUsers: 1 });
        await setDoc(doc(db, "examees", userId), { name, userId });
        console.log("Submission successful after creating totals! Redirecting to exam page for userId:", userId);
        router.push(`/exams/${userId}`);
      } else {
        console.error("Submission failed:", err);
        setError("Submission failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="font-sans bg-white min-h-screen">
      <main className="max-w-5xl mx-auto px-2 flex flex-col lg:flex-row gap-8 pt-8 pb-16">
        {/* Main Exam Form */}
        <section className="w-full lg:w-2/3 flex flex-col items-center">
          <div className="bg-gradient-to-r from-blue-100 to-cyan-100 rounded-2xl shadow-md border border-blue-200 p-8 w-full max-w-xl mb-8">
            <h1 className="text-2xl md:text-3xl font-extrabold text-blue-700 mb-2 text-center drop-shadow-lg">
              VMM Security Guard Entrance Exam 2024
            </h1>
            <p className="text-gray-700 text-center mb-4 italic font-semibold">
              &quot;Because guarding shopping carts is a calling, not a job.&quot;
            </p>
          </div>
          <form className="bg-white rounded-2xl shadow-2xl border-2 border-blue-400 p-10 w-full max-w-xl flex flex-col gap-8" onSubmit={handleSubmit}>
            <div>
              <label className="block text-blue-900 font-extrabold mb-2" htmlFor="name">
                Full Name <span className="text-xs text-gray-500 font-semibold">(as on your Aadhar, or your mom&apos;s WhatsApp group)</span>
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="w-full border-2 border-blue-400 rounded-lg px-4 py-2 focus:outline-none focus:ring-4 focus:ring-blue-300 bg-blue-50 text-blue-900 placeholder-blue-400 font-semibold transition-shadow"
                placeholder="e.g. Shaktimaan Sharma"
              />
            </div>
            <div>
              <label className="block text-blue-900 font-extrabold mb-2" htmlFor="fatherName">
                Father&apos;s Name <span className="text-xs text-gray-500 font-semibold">(or &apos;Papa&apos; if you forgot)</span>
              </label>
              <input
                id="fatherName"
                name="fatherName"
                type="text"
                required
                className="w-full border-2 border-blue-400 rounded-lg px-4 py-2 focus:outline-none focus:ring-4 focus:ring-blue-300 bg-blue-50 text-blue-900 placeholder-blue-400 font-semibold transition-shadow"
                placeholder="e.g. Bheem Singh (Legendary Trolley Lifter)"
              />
            </div>
            <div>
              <label className="block text-blue-900 font-extrabold mb-2" htmlFor="occupation">
                Current Occupation <span className="text-xs text-gray-500 font-semibold">(be honest, we won&apos;t judge... much)</span>
              </label>
              <input
                id="occupation"
                name="occupation"
                type="text"
                required
                className="w-full border-2 border-blue-400 rounded-lg px-4 py-2 focus:outline-none focus:ring-4 focus:ring-blue-300 bg-blue-50 text-blue-900 placeholder-blue-400 font-semibold transition-shadow"
                placeholder="e.g. Professional Queue Stand-er"
              />
            </div>
            <div>
              <label className="block text-blue-900 font-extrabold mb-2" htmlFor="dream">
                Why do you want to be a VMM Security Guard?
              </label>
              <textarea
                id="dream"
                name="dream"
                rows={3}
                required
                className="w-full border-2 border-blue-400 rounded-lg px-4 py-2 focus:outline-none focus:ring-4 focus:ring-blue-300 bg-blue-50 text-blue-900 placeholder-blue-400 font-semibold transition-shadow"
                placeholder="Because my dream is to blow the whistle at suspicious trolleys."
              />
            </div>
            <div>
              <label className="block text-blue-900 font-extrabold mb-2" htmlFor="skills">
                Special Skills <span className="text-xs text-gray-500 font-semibold">(select all that apply)</span>
              </label>
              <div className="flex flex-wrap gap-4 mt-2">
                <label className="flex items-center gap-2 text-blue-900 font-semibold">
                  <input type="checkbox" name="skills" value="whistle" className="accent-blue-600 w-5 h-5" />
                  Whistle Blowing (Advanced)
                </label>
                <label className="flex items-center gap-2 text-blue-900 font-semibold">
                  <input type="checkbox" name="skills" value="bag-check" className="accent-blue-600 w-5 h-5" />
                  Bag Checking (Expert)
                </label>
                <label className="flex items-center gap-2 text-blue-900 font-semibold">
                  <input type="checkbox" name="skills" value="stare" className="accent-blue-600 w-5 h-5" />
                  Intense Staring at Customers
                </label>
                <label className="flex items-center gap-2 text-blue-900 font-semibold">
                  <input type="checkbox" name="skills" value="trolley" className="accent-blue-600 w-5 h-5" />
                  Trolley Traffic Management
                </label>
                <label className="flex items-center gap-2 text-blue-900 font-semibold">
                  <input type="checkbox" name="skills" value="polythene" className="accent-blue-600 w-5 h-5" />
                  Polythene Distribution (with Attitude)
                </label>
              </div>
            </div>
            <div>
              <label className="block text-blue-900 font-extrabold mb-2" htmlFor="height">
                Height (in cm) <span className="text-xs text-gray-500 font-semibold">(bonus points if you can touch the height bar)</span>
              </label>
              <input
                id="height"
                name="height"
                type="number"
                min="100"
                max="250"
                required
                className="w-full border-2 border-blue-400 rounded-lg px-4 py-2 focus:outline-none focus:ring-4 focus:ring-blue-300 bg-blue-50 text-blue-900 placeholder-blue-400 font-semibold transition-shadow"
                placeholder="e.g. 173"
              />
            </div>
            <div>
              <label className="block text-blue-900 font-extrabold mb-2" htmlFor="motherDream">
                Is it your mother&apos;s dream too?
              </label>
              <select
                id="motherDream"
                name="motherDream"
                required
                className="w-full border-2 border-blue-400 rounded-lg px-4 py-2 focus:outline-none focus:ring-4 focus:ring-blue-300 bg-blue-50 text-blue-900 font-semibold transition-shadow"
              >
                <option value="">Select</option>
                <option value="yes">Yes, she already bought the whistle</option>
                <option value="no">No, she wanted me to be a cashier</option>
                <option value="secret">It&apos;s a family secret</option>
              </select>
            </div>
            <button
              type="submit"
              className="mt-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-extrabold text-lg px-8 py-3 rounded-xl shadow-xl uppercase tracking-wider transition-transform hover:scale-105 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-cyan-300"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit Application"}
            </button>
            {error && <div className="text-red-600 text-center font-bold mt-2">{error}</div>}
            <div className="text-xs text-gray-500 text-center mt-2 italic font-semibold">
              *All applications will be judged by the strictest aunties at the entrance.
            </div>
          </form>
        </section>
        {/* Right: News Section */}
        <aside className="w-full lg:w-1/3 flex-shrink-0">
          <div className="bg-white rounded-2xl shadow-md border border-slate-200 p-6 mb-6">
            <h3 className="text-lg font-bold text-blue-700 mb-2 flex items-center gap-2">
              <span role="img" aria-label="news">📰</span> Breaking News
            </h3>
            <NewsSection />
          </div>
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs text-gray-500 text-center font-semibold italic">
            “Rumor has it: Next year, guards might get chairs!”
          </div>
        </aside>
      </main>
    </div>
  );
}

export default ExamPageComponent;
