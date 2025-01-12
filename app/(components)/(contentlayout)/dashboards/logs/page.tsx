'use client'
import React from "react";
import CallLogsPage from "@/appPages/CallLogsPage";
import SubscriptionPage from "@/appPages/SubscriptionPage";
import { useSelector } from "react-redux";
const CallLogs = () => {
  const user = useSelector((state: any) => state.auth.user);
  return (
    <>
      {user.subscription && Object.keys(user.subscription).length ? (
        <CallLogsPage />
      ) : (
        <SubscriptionPage />
      )}
    </>
  );
};

export default CallLogs;
