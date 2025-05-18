import React from "react";
import ExamLandingPage from "./ExamLandingPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Attempt the VMM Security Guard Exam 2025",
  description: "Your VMM exam is live! View your performance, check AIR, and see if you’re closer to becoming a Vishal Mega Mart Security Guard.",
};

interface Props {
  params: Promise<{ examId: string }> ;
}

const Page = async ({ params }: Props) => {
  const resolvedParams = await params;
  return <ExamLandingPage examId={resolvedParams.examId} />;
};

export default Page;
