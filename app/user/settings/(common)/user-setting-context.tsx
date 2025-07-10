"use client";
import { getUserProfile } from "@/actions/user.actions";
import { createContext, useContext } from "react";
type UserProfile = Awaited<ReturnType<typeof getUserProfile>>;

type UserSettingsContextType = {
  user: UserProfile;
};

const UserSettingsContext = createContext<UserSettingsContextType | undefined>(
  undefined
);

export function UserSettingsProviderClient({
  user,
  children,
}: {
  user: UserProfile;
  children: React.ReactNode;
}) {
  return (
    <UserSettingsContext.Provider value={{ user }}>
      {children}
    </UserSettingsContext.Provider>
  );
}

export function useUserSettings() {
  const context = useContext(UserSettingsContext);
  if (!context) {
    throw new Error("useUserSettings must be used within UserSettingsProvider");
  }
  return context;
}
