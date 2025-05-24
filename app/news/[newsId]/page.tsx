import React from "react";
import NewsLandingPage from "./NewsLandingPage";
import { Metadata } from "next";
import HomeLayout from "@/components/layouts/HomeLayout/HomeLayout";

export const metadata: Metadata = {
  title: "VMM Breaking News",
  description: "Read trending headlines: students dropping IIT for VMM, new mock strategies, AIR leaks & more from the Vishal Mega Mart entrance race.",
};

interface Props {
  params: Promise<{ newsId: string }>;
}

const Page = async ({ params }: Props) => {
  const resolvedParams = await params;
  return <HomeLayout><NewsLandingPage newsId={resolvedParams.newsId} /></HomeLayout>
};

export default Page;
