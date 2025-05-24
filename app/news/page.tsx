import React from "react";
import NewsComponent from "./NewsComponent";
import { Metadata } from "next";
import HomeLayout from "@/components/layouts/HomeLayout/HomeLayout";

export const metadata: Metadata = {
  title: "VMM Recruitment News 2025 | Vishal Mega Mart Latest Updates",
  description: "Get the latest Vishal Mega Mart exam news, toppers, cut-offs, and recruitment trends. Stay informed about VMM 2025 announcements.",
};

function page() {
  return <HomeLayout>
    <NewsComponent />;
  </HomeLayout>
}

export default page;
