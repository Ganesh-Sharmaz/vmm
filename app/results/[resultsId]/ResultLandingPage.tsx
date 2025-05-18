"use client";

import React, { useState } from "react";
import Link from "next/link";

interface ExamData {
  examAnswers?: string[];
  marks?: number;
}

interface Props {
  data: ExamData | null;
  id: string;
}

const ResultLandingPage = ({ data, id }: Props) => {
  const [percentile] = useState((90 + Math.random() * 10).toFixed(4));
  const [currentDate] = useState(new Date().toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  }));

  if (!data) {
    return (
      <div className="min-h-screen bg-[#f5f5f5] flex flex-col items-center justify-center p-4">
        <div className="text-2xl font-bold text-red-800 mb-4">Result Not Found</div>
        <div className="text-gray-700 text-center mb-6">The requested result document could not be located in our database.</div>
        <Link 
          href="/results" 
          className="text-blue-800 hover:text-blue-900 font-medium flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Return to Results Portal
        </Link>
      </div>
    );
  }

  const marks = data.marks || 0;

  return (
    <div className="min-h-screen bg-[#f8f9fa] p-4 md:p-8 relative">
      {/* Watermark */}
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none opacity-[0.03]">
        <div className="transform rotate-45 text-9xl font-bold text-gray-900">
          VMM SECURITY
        </div>
      </div>

      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-lg">
        {/* Header */}
        <div className="bg-[#000080] text-white p-6 md:p-8 text-center border-b-4 border-[#FFD700]">
          <div className="flex justify-center items-center gap-4 mb-6">
            <div className="w-20 h-20 md:w-24 md:h-24 bg-white rounded-full flex items-center justify-center border-4 border-[#FFD700]">
              <div className="text-[#000080] font-bold text-sm md:text-base">VMM SEAL</div>
            </div>
          </div>
          <h1 className="text-2xl md:text-4xl font-bold mb-3 tracking-wide">VISHAL MEGA MART</h1>
          <h2 className="text-xl md:text-2xl font-semibold mb-2">Security Guard Examination Result</h2>
          <p className="text-base md:text-lg mt-2 text-yellow-100 font-medium">Academic Year 2024</p>
        </div>

        {/* Result Content */}
        <div className="p-6 md:p-8">
          {/* Student Details */}
          <div className="mb-8 border-2 border-gray-300 rounded-lg overflow-hidden">
            <table className="w-full text-base md:text-lg">
              <tbody>
                <tr className="border-b-2 border-gray-300">
                  <td className="font-semibold bg-gray-100 p-4 w-1/3 text-gray-800">Roll Number:</td>
                  <td className="p-4 font-medium text-black">{id}</td>
                </tr>
                <tr className="border-b-2 border-gray-300">
                  <td className="font-semibold bg-gray-100 p-4 text-gray-800">Date of Result:</td>
                  <td className="p-4 font-medium text-black">{currentDate}</td>
                </tr>
                <tr>
                  <td className="font-semibold bg-gray-100 p-4 text-gray-800">Examination:</td>
                  <td className="p-4 font-medium text-black">Security Guard Proficiency Test 2024</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Marks Table */}
          <div className="mb-8 border-2 border-gray-300 rounded-lg overflow-hidden">
            <div className="bg-gray-900 text-white p-4 font-bold text-lg">
              MARKS STATEMENT
            </div>
            <table className="w-full text-base md:text-lg">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-4 border border-gray-300 text-left font-bold text-gray-800">Qualification</th>
                  <th className="p-4 border border-gray-300 text-center font-bold text-gray-800">Marks/Details</th>
                  <th className="p-4 border border-gray-300 text-center font-bold text-gray-800">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-4 border border-gray-300 text-black">12th Standard</td>
                  <td className="p-4 border border-gray-300 text-center font-medium text-black">{data.examAnswers?.[3] || "N/A"}</td>
                  <td className="p-4 border border-gray-300 text-center">
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                      Number(data.examAnswers?.[3]) >= 60 
                        ? "bg-green-100 text-green-800" 
                        : "bg-yellow-100 text-yellow-800"
                    }`}>
                      {Number(data.examAnswers?.[3]) >= 60 ? "PASS" : "REVIEW"}
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="p-4 border border-gray-300 text-black">10th Standard</td>
                  <td className="p-4 border border-gray-300 text-center font-medium text-black">{data.examAnswers?.[4] || "N/A"}</td>
                  <td className="p-4 border border-gray-300 text-center">
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                      Number(data.examAnswers?.[4]) >= 60 
                        ? "bg-green-100 text-green-800" 
                        : "bg-yellow-100 text-yellow-800"
                    }`}>
                      {Number(data.examAnswers?.[4]) >= 60 ? "PASS" : "REVIEW"}
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="p-4 border border-gray-300 text-black">Academic Backlogs</td>
                  <td className="p-4 border border-gray-300 text-center font-medium text-black">{data.examAnswers?.[5] || "0"}</td>
                  <td className="p-4 border border-gray-300 text-center">
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                      Number(data.examAnswers?.[5]) === 0 
                        ? "bg-green-100 text-green-800" 
                        : "bg-red-100 text-red-800"
                    }`}>
                      {Number(data.examAnswers?.[5]) === 0 ? "CLEAR" : "PENDING"}
                    </span>
                  </td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="p-4 border border-gray-300 font-bold text-gray-800">Total Marks (out of 105)</td>
                  <td className="p-4 border border-gray-300 text-center font-bold text-gray-900">{marks}</td>
                  <td className="p-4 border border-gray-300 text-center text-black">
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-bold ${
                      marks >= 40 
                        ? "bg-green-100 text-green-800" 
                        : "bg-red-100 text-red-800"
                    }`}>
                      {marks >= 40 ? "QUALIFIED" : "NOT QUALIFIED"}
                    </span>
                  </td>
                </tr>
                <tr className="bg-blue-50">
                  <td className="p-4 border border-gray-300 font-bold text-gray-800">Percentile</td>
                  <td colSpan={2} className="p-4 border border-gray-300 text-center font-bold text-blue-900 text-lg">
                    {percentile}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Final Result */}
          <div className="mb-8 border-2 border-gray-300 rounded-lg overflow-hidden">
            <div className="bg-gray-900 text-white p-4 font-bold text-lg">
              FINAL VERDICT
            </div>
            <div className="p-6 text-center">
              {marks < 40 ? (
                <div className="text-red-800 font-bold text-xl bg-red-50 p-4 rounded-lg border border-red-200">
                  NOT QUALIFIED - Eligible for Polythene Counter Operations Only
                </div>
              ) : marks < 80 ? (
                <div className="text-green-800 font-bold text-xl bg-green-50 p-4 rounded-lg border border-green-200">
                  QUALIFIED - Certified Trolley Traffic Manager
                </div>
              ) : (
                <div className="text-blue-800 font-bold text-xl bg-blue-50 p-4 rounded-lg border border-blue-200">
                  HIGHLY QUALIFIED - Elite Security Personnel
                </div>
              )}
            </div>
          </div>

          {/* Official Footer */}
          <div className="mt-12 border-t-2 border-gray-300 pt-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center text-base">
              <div className="text-gray-700 mb-4 md:mb-0">
                <div className="font-semibold">Date of Issue:</div>
                <div>{currentDate}</div>
              </div>
              <div className="text-right">
                <div className="font-bold text-gray-900 text-lg mb-1">Controller of Examinations</div>
                <div className="text-gray-700">VMM Security Division</div>
              </div>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="mt-8 text-sm text-gray-600 text-center bg-gray-50 p-4 rounded-lg">
            <p className="font-medium mb-1">This is a computer-generated result. No signature is required.</p>
            <p>For verification, please contact the VMM Security Division Office.</p>
          </div>
        </div>
      </div>

      {/* Screenshot Instructions */}
      <div className="mt-8 text-center">
        <p className="text-gray-700 font-medium mb-3">To save your result, take a screenshot:</p>
        <div className="text-sm text-gray-600 space-y-2 bg-white p-4 rounded-lg shadow-sm inline-block">
          <p>• On Windows: Press Windows + Shift + S</p>
          <p>• On Mac: Press Command + Shift + 4</p>
          <p>• On Mobile: Use your device&apos;s screenshot function</p>
        </div>
      </div>
    </div>
  );
};

export default ResultLandingPage;
