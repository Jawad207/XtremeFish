"use client";
import Backtotop from "@/shared/layout-components/backtotop/backtotop";
import Footer from "@/shared/layout-components/footer/footer";
import Header from "@/shared/layout-components/header/header";
import Sidebar from "@/shared/layout-components/sidebar/sidebar";
import Switcher from "@/shared/layout-components/switcher/switcher";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Layout = ({ children }: any) => {
  const [loading, setLoading] = useState(true); // For waiting on auth check
  const router = useRouter();
  const isAuthenticated = useSelector((state: any) => state.auth.isAuthenticated); // Replace with actual auth state

  // useEffect(() => {
  //   if(isAuthenticated == undefined) {
  //     console.log('still figuring out')
  //   }

  //   if (!isAuthenticated) {

  //     // Redirect to login page if not authenticated
  //     router.push("/");
  //   } else {
  //     // Allow page to load once auth is confirmed
  //     setLoading(false);
  //   }
  // }, [isAuthenticated, router]);

  // if (loading || isAuthenticated === undefined) {
  //   // Show a loading spinner or nothing while auth is being checked
  //   return <div>Loading...</div>;
  // }

  return (
    <>
      <Switcher />
      <div className="page">
        <Header />
        <Sidebar />
        <div className="main-content app-content">
          <div className="container-fluid">{children}</div>
        </div>
        <Footer />
      </div>
      <Backtotop />
    </>
  );
};

export default Layout;
