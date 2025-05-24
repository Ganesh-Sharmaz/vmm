"use client";

import React, { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Header from "@/components/adminComponents/header/Header";

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('adminAuth') === 'true';
    const isAuthPage = pathname === '/admin/auth';

    if (!isAuthenticated && !isAuthPage) {
      router.push('/admin/auth');
    } else if (isAuthenticated && isAuthPage) {
      router.push('/admin');
    }
  }, [pathname, router]);

  // If we're on the auth page, don't show the header
  if (pathname === '/admin/auth') {
    return <>{children}</>;
  }

  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default Layout;
