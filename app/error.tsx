"use client";

import { useEffect, useState } from "react";

import Link from "next/link";
import { Suspense } from "react";
const Custom500 = ({ error, reset }: { error: Error; reset: () => void }) => {
  const [Error, setError] = useState("");
  useEffect(() => {
    // Log the error to an error reporting service
    setError(JSON.stringify(error));
  }, [error]);
  return (
    <div className="screen-wrapper">
      <div className="w-full min-h-[80vh] flex justify-center items-center">
        <main className="sm:flex">
          <p className="text-secondary text-4xl font-bold tracking-tight sm:text-5xl">
            500
          </p>
          <div className="sm:ml-6">
            <div className="sm:border-l sm:border-gray-200 sm:pl-6">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                Erreur interne du serveur
              </h1>
              <p className="mt-1 text-base text-gray-500">
                Le serveur a rencontré une erreur interne. Veuillez réessayer
                plus tard.
                <br />
                Code erreur :
                <code className="rounded-sm bg-slate-100 p-1 text-xs">
                  {Error}
                </code>
              </p>
            </div>
            <div className="mt-10 flex space-x-3 sm:border-l sm:border-transparent sm:pl-6">
              <Link href="/">
                <span className="inline-flex items-center rounded-md  border-transparent  bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary/80">
                  Retour accueil
                </span>
              </Link>
              <Link href="/contact">
                <span className="inline-flex items-center rounded-md border border-transparent bg-secondary/50 px-4 py-2 text-sm font-medium text-white hover:bg-secondary/80 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2">
                  Contact support
                </span>
              </Link>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Custom500;
