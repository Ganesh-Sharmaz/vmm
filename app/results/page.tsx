import React from "react";
import ResultPageComponent from "./ResultPageComponent";
import { Metadata } from "next";
import HomeLayout from "@/components/layouts/HomeLayout/HomeLayout";
export const metadata: Metadata = {
  title: "VMM 2025 Results | Vishal Mega Mart Guard Selection List",
  description: "Check your VMM 2025 result, AIR rank, scorecard, and selection status for the prestigious Vishal Mega Mart Security Guard post.",
};

function page() {
  return <HomeLayout>
    <ResultPageComponent />
  </HomeLayout>
}

export default page;
