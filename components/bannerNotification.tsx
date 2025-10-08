import { useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle, X } from "lucide-react";

export function NotificationBanner({ show }: { show: boolean }) {
  const [showBanner, setShowBanner] = useState(show);

  if (!showBanner) return null;

  return (
    <Alert className="fixed z-30 bottom-4 right-2 sm:right-4 max-w-[95%] sm:max-w-sm border-secondary/50 text-secondary border-b-4 pb-4 shadow-sm [&>svg]:text-yellow-500">
      <AlertTriangle className="size-5" />
      <AlertTitle className="mt-2">Notifications désactivées</AlertTitle>
      <AlertDescription className="mt-2 text-gray-700">
        Vous avez refusé les notifications. Pour les activer, rendez-vous dans
        les paramètres de votre navigateur et autorisez les notifications pour
        ce site.
      </AlertDescription>

      <button
        className="absolute top-3 right-3"
        onClick={() => setShowBanner(false)}
      >
        <X className="w-4 h-4" />
      </button>
    </Alert>
  );
}
