import React from "react";
import ExamLandingPage from "./ExamLandingPage";

interface Props {
  params: Promise<{ examId: string }> ;
}

const Page = async ({ params }: Props) => {
  const resolvedParams = await params;
  return <ExamLandingPage examId={resolvedParams.examId} />;
};

export default Page;
