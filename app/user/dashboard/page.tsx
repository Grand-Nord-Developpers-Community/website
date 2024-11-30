"use client";
import { useState, useEffect } from "react";
import { auth } from "@/auth";

const Dashboard: React.FC = async () => {
  const [authentification, setAuthentification] = useState();

  useEffect(() => {
    const updateViews = async () => {
      const a = await auth();
      setAuthentification(a);
    };

    updateViews();
  }, []);
  return <>{JSON.stringify(authentification)}</>;
};

export default Dashboard;
