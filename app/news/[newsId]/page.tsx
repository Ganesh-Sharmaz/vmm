import React from "react";
import NewsLandingPage from "./NewsLandingPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "VMM Breaking News",
  description: "Read trending headlines: students dropping IIT for VMM, new mock strategies, AIR leaks & more from the Vishal Mega Mart entrance race.",
};

interface Props {
  params: Promise<{ newsId: string }> ;
}

const Page = async ({ params }: Props) => {
  const resolvedParams = await params;
  return <NewsLandingPage newsId={resolvedParams.newsId} />;
};

export default Page;
