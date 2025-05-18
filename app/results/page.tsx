import React from "react";
import ResultPageComponent from "./ResultPageComponent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "VMM 2025 Results | Vishal Mega Mart Guard Selection List",
  description: "Check your VMM 2025 result, AIR rank, scorecard, and selection status for the prestigious Vishal Mega Mart Security Guard post.",
};

function page() {
  return <ResultPageComponent />;
}

export default page;
