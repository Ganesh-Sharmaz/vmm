import React from "react";
import ExamPageComponent from "./ExamPageComponent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "VMM Security Guard Entrance Exam 2025",
  description: "Prepare for India's most competitive exam! Attempt the Vishal Mega Mart Security Guard Mock Test online. Practice questions, ranks & more.",
};

function page() {
  return <ExamPageComponent />;
}

export default page;
