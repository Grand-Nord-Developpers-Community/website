"use client";

import { useState } from "react";
import ActivityAndEvent from "@/interfaces/activityAndEvent";

import { Calendar, Locate } from "lucide-react";
import Link from "next/link";
import { formatDateFrench } from "@/utils/date";

function HeadSectionEvent({
  event,
  views = 0,
}: {
  event: ActivityAndEvent;
  views?: number;
}) {
  const [showModal, setShowModal] = useState(false);

  const isEventExpired = new Date(event.datetime) < new Date();

  const handleRegisterClick = () => {
    if (isEventExpired) {
      setShowModal(true);
    } else if (event.link) {
      window.open(event.link, "_blank");
    }
  };

  return (
    <div className="bg-primary">
      <div className="relative screen-wrapper py-12 max-md:pb-[180px]">
        <div className="w-full gap-5 flex max-md:flex-wrap items-center justify-between">
          <div className="space-y-4">
            <span className="text-gray-400">
              <Link href="/events">&larr; Retour aux événements</Link>
            </span>

            <h1 className="max-md:w-full text-4xl max-sm:text-2xl md:text-5xl font-bold tracking-tight text-secondary">
              {event.title}
            </h1>

            <div className="flex items-center gap-4 text-sm text-gray-200">
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {formatDateFrench(event.datetime)}
              </span>
              <span className="flex items-center gap-1">
                <Locate className="h-4 w-4" />
                {event.location}
              </span>
              <span>{views} vues</span>
            </div>

            {/* Bouton d'inscription */}
            {event.link && (
              <button
                onClick={handleRegisterClick}
                className="mt-4 px-4 py-2 bg-secondary text-white font-semibold rounded hover:bg-secondary/80 transition"
              >
                S'enregistrer
              </button>
            )}

            {/* Modal */}
            {showModal && (
              <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
                <div className="bg-white p-6 rounded shadow-lg max-w-sm text-center">
                  <h2 className="text-lg font-bold mb-2">Événement expiré</h2>
                  <p>La date de cet événement est déjà passée.</p>
                  <button
                    onClick={() => setShowModal(false)}
                    className="mt-4 px-4 py-2 bg-primary text-white rounded hover:bg-primary/80 transition"
                  >
                    Fermer
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeadSectionEvent;
