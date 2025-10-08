import { getNotificationPreferences } from "@/actions/notification.action";
import NotificationPage from "./notification";
import { redirect } from "next/navigation";
export default async function PreferencesPage() {
  const data = await getNotificationPreferences();
  if (!data) {
    redirect("/login");
  }
  return (
    <div className="max-w-2xl">
      <div className="space-y-6">
        {/* <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Préférences de notification
          </h1>
          <p className="text-muted-foreground mt-2">
            Gérez vos préférences de notification pour les emails et
            l'application.
          </p>
        </div> */}

        <NotificationPage preferences={data!} />
      </div>
    </div>
  );
}
