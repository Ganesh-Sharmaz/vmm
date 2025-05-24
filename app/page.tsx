import React from "react";
import HomePageComponent from "./homepage/HomePageComponent";
import HomeLayout from "@/components/layouts/HomeLayout/HomeLayout";

function page() {
  return <HomeLayout>
    <HomePageComponent />
  </HomeLayout>;
}

export default page;
