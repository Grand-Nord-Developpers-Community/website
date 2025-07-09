import React from "react";
import ProfileHeader from "@/components/profile/profile-header";
import { getUserProfile } from "@/actions/user.actions";
import { auth } from "@/lib/auth";
import ProfileWrapper from "../(common)/profile-wrapper";
import ProfileSection from "@/components/profile/profil-section";

const ProfilePage = async () => {
  const { user } = await auth();
  if (!user) return null;
  const userprofile = await getUserProfile(user.id);
  return (
    <ProfileWrapper>
      <ProfileHeader user={userprofile} />
      <ProfileSection user={userprofile} />
    </ProfileWrapper>
  );
};

export default ProfilePage;
