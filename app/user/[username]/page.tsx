import React from "react";
import ProfileHeader from "@/components/profile/profile-header";
import { getUserProfile } from "@/actions/user.actions";
import { notFound } from "next/navigation";
import ProfileWrapper from "../(common)/profile-wrapper";
import ProfileSection from "@/components/profile/profil-section";

const ProfilePage = async ({ params }: { params: { username: string } }) => {
  const userprofile = await getUserProfile(params.username);
  if (!userprofile) {
    return notFound();
  }

  return (
    <>
      <ProfileWrapper>
        <ProfileHeader user={userprofile} />
        <ProfileSection user={userprofile} />
      </ProfileWrapper>
    </>
  );
};

export default ProfilePage;
