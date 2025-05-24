import Header from "@/components/header/Header";
import React from "react";

const HomeLayout = ({
    children,
}: Readonly<{
    children: React.ReactNode,
}>) => {
    return <>
        <Header />
        {children}</>
};

export default HomeLayout;
