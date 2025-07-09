import { redirect } from "next/navigation";

export default function SettingsRoot() {
  redirect("/user/settings/profile");
}
