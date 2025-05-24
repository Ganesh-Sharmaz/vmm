import React from "react";
import ExamLandingPage from "./ExamLandingPage";
import { Metadata } from "next";
import HomeLayout from "@/components/layouts/HomeLayout/HomeLayout";
export const metadata: Metadata = {
  title: "Attempt the VMM Security Guard Exam 2025",
  description: "Your VMM exam is live! View your performance, check AIR, and see if you’re closer to becoming a Vishal Mega Mart Security Guard.",
};

interface Props {
  params: Promise<{ examId: string }> ;
}

const Page = async ({ params }: Props) => {
  const resolvedParams = await params;
  return <HomeLayout>
    <ExamLandingPage examId={resolvedParams.examId} />
  </HomeLayout>
};

export default Page;
