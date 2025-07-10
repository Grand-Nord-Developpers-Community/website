import { withAuth } from "@/lib/withAuth";
import SideBar from "./(common)/Sidebar";
import ButtonSideBar from "./(common)/button-sidebar";
import { getUserProfile } from "@/actions/user.actions";
import { UserSettingsProviderClient } from "./(common)/user-setting-context";

export default async function PageRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user } = await withAuth({ requireProfileCompletion: true });
  const profile = await getUserProfile(user.id);
  return (
    <div className="relative screen-wrapper">
      <h1 className="text-3xl font-bold my-6">Paramètres</h1>
      <div className="flex flex-col md:flex-row gap-6">
        <aside className="hidden md:block md:w-1/4">
          <div className="sticky top-20">
            <SideBar />
          </div>
        </aside>
        <main className="w-full md:w-3/4">
          <UserSettingsProviderClient user={profile}>
            {children}
          </UserSettingsProviderClient>
        </main>
      </div>

      <ButtonSideBar />
    </div>
  );
}
