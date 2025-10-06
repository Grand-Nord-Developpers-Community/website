import React from "react";
import ProfileHeader from "@/components/profile/profile-header";
import {
  getUserProfile,
  getUserProfileMeta,
  getUsers,
} from "@/actions/user.actions";
import { notFound } from "next/navigation";
import ProfileWrapper from "../(common)/profile-wrapper";
import ProfileSection from "@/components/profile/profil-section";
// export async function generateStaticParams() {
//   const users = await getUsers();
//   return users.map((p) => p.username);
// }
export async function generateMetadata({
  params,
}: {
  params: { username: string };
}) {
  const user = await getUserProfileMeta(params.username);
  if (!user) return {};

  const baseUrl = process.env.BASE_URL || "http://localhost:3000";
  const url = `${baseUrl}/user/${params.username}`;
  const description = user.bio || "Pas de bio";
  const ogImage = `/api/og/user/${params.username}`;

  return {
    title: "Profil GNDC : " + user.name,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: user.name,
      description,
      url,
      type: "article",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: user.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Profil GNDC : " + user.name,
      description,
      images: [ogImage],
    },
  };
}
const ProfilePage = async ({ params }: { params: { username: string } }) => {
  const userprofile = await getUserProfile(params.username);
  if (!userprofile) {
    return notFound();
  }
  return (
    <div className="min-h-screen bg-gray-50">
      <ProfileWrapper>
        <ProfileHeader user={userprofile} />
        <ProfileSection user={userprofile} />
      </ProfileWrapper>
    </div>
  );
};

export default ProfilePage;
