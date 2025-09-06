import React from "react";
import ProfileHeader from "@/components/profile/profile-header";
import {
  computeAndUpdateUserXP,
  computeUserXP,
  getUserProfile,
  measure,
  recomputeAllUsersXP,
} from "@/actions/user.actions";
import { notFound } from "next/navigation";
import ProfileWrapper from "../(common)/profile-wrapper";
import ProfileSection from "@/components/profile/profil-section";

const ProfilePage = async ({ params }: { params: { username: string } }) => {
  const userprofile = await getUserProfile(params.username);
  if (!userprofile) {
    return notFound();
  }
  //await recomputeAllUsersXP();
  // const xp1 = await measure("My method", () => computeUserXP(userprofile.id));
  // const xp2 = await measure("Optimized method", () =>
  //   computeAndUpdateUserXP(userprofile.id)
  // );

  // console.log(`Mine result: ${xp1}`);
  // console.log(`Optimized result: ${xp2}`);
  //const result = await computeUserXP(userprofile.id);
  //console.log("Xp : " + result);
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
