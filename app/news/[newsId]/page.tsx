import React from "react";
import NewsLandingPage from "./NewsLandingPage";

interface Props {
  params: Promise<{ newsId: string }> ;
}

const Page = async ({ params }: Props) => {
  const resolvedParams = await params;
  return <NewsLandingPage newsId={resolvedParams.newsId} />;
};

export default Page;
