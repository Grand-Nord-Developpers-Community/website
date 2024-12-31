import React from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
const Custom500 = ({
  message,
  className = "",
}: {
  message: string;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "w-full min-h-[30vh] flex justify-center items-center",
        className,
      )}
    >
      <main className="sm:flex">
        <p className="text-secondary text-4xl font-bold tracking-tight sm:text-5xl">
          500
        </p>
        <div className="sm:ml-6">
          <div className="sm:border-l sm:border-gray-200 sm:pl-6">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Erreur est survenu
            </h1>
            <p className="mt-1 text-base text-gray-500">
              Le serveur a rencontré une erreur interne. Veuillez réessayer plus
              tard.
              <br />
              Code erreur :{" "}
              <code className="rounded-sm bg-slate-100 p-1 text-xs">
                {message}
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
  );
};
export default Custom500;
